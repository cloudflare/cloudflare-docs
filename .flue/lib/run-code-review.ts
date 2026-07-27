/**
 * Trusted-code driver for the per-file code-review fan-out.
 *
 * Ports the 0.11 `runCodeReviewInProcess` to the 2.0 one-agent-instance-per-file
 * model. For each selected file it parses the added lines and fetches the full
 * file content in trusted code (no model round-trips for setup), dispatches a
 * dedicated `CodeReviewFile` instance (`id: `${runId}:cr:${i}``), reads them
 * concurrently with a per-file timeout, assigns stable `CR-` ids, and merges.
 *
 * A single file's failure (timeout, model error, no result) is degraded to an
 * empty result — it never aborts the pool.
 */
import { init } from "@flue/runtime";
import * as v from "valibot";
import CodeReviewFile, {
	CODE_REVIEW_FILE_DATA,
	type CodeReviewFileInput,
} from "../agents/code-review-file";
import {
	assignCodeReviewFindingIds,
	CodeReviewResultFromModelSchema,
	type CodeReviewResult,
} from "./code-review-results";
import {
	CODE_REVIEW_CONCURRENCY,
	CODE_REVIEW_FILE_TIMEOUT_MS,
	FILE_CONTENT_MAX_BYTES,
	mergeCodeReviewResults,
	parseAddedLines,
	type CodeReviewPullRequest,
	type PullRequestFiles,
} from "./code-review-files";
import { getRepoFileContent } from "./github";
import { withConcurrency } from "./inproc-utils";

const DISPATCH_MESSAGE =
	"Review the changed lines of this file and submit your findings.";

export interface RunCodeReviewOptions {
	/** GitHub installation token — stays in trusted code, backs the repo tools. */
	token: string;
	/** PR head SHA — used to fetch full file content and by `read_repo_file`. */
	headSha: string;
	/** Repository root AGENTS.md, injected as agent instructions. Omitted if unfetchable. */
	repoAgentsMd?: string;
	prNumber: number;
	pullRequest: CodeReviewPullRequest;
	/** Reviewable files selected by `selectCodeReviewFiles`. */
	files: PullRequestFiles;
	runId: string;
	concurrency?: number;
	/** Per-file hard timeout in ms. Defaults to CODE_REVIEW_FILE_TIMEOUT_MS. */
	fileTimeoutMs?: number;
}

/**
 * Run code review across all selected files, one agent instance per file, and
 * return the merged {@link CodeReviewResult}.
 */
export async function runCodeReview(
	options: RunCodeReviewOptions,
): Promise<CodeReviewResult> {
	const {
		token,
		headSha,
		repoAgentsMd,
		prNumber,
		pullRequest,
		files,
		runId,
		concurrency = CODE_REVIEW_CONCURRENCY,
		fileTimeoutMs = CODE_REVIEW_FILE_TIMEOUT_MS,
	} = options;

	if (files.length === 0) {
		return {
			findings: [],
			summary: "No reviewable code files changed.",
			reviewedFiles: [],
		};
	}

	const total = files.length;
	const tasks = files.map(
		(file, index) => async (): Promise<CodeReviewResult> => {
			try {
				// Parse added lines and fetch full file content in trusted code —
				// the model receives pre-computed data and never parses the diff.
				const addedLines = file.patch ? parseAddedLines(file.patch) : [];
				const raw = await getRepoFileContent(
					token,
					file.filename,
					headSha,
				).catch(() => null);
				const fileContent =
					raw === null
						? ""
						: raw.length > FILE_CONTENT_MAX_BYTES
							? raw.slice(0, FILE_CONTENT_MAX_BYTES) +
								`\n\n[...truncated at ${FILE_CONTENT_MAX_BYTES / 1024} KB — file is ${raw.length} bytes total]`
							: raw;

				console.log({
					message: `Code review: reviewing file (${index + 1}/${total}) — ${file.filename}`,
					event: "code_review_specialist",
					number: prNumber,
					filename: file.filename,
					fileIndex: index + 1,
					totalFiles: total,
					runId,
					action: "file_start",
				});

				const result = await reviewOneFile({
					input: {
						pullRequest,
						filename: file.filename,
						addedLines,
						fileContent,
						headSha,
						...(repoAgentsMd ? { repoAgentsMd } : {}),
					},
					instanceId: `${runId}:cr:${index}`,
					fileTimeoutMs,
				});

				console.log({
					message: `Code review: done reviewing file (${index + 1}/${total}) — ${file.filename} — ${result.findings.length} finding(s)`,
					event: "code_review_specialist",
					number: prNumber,
					filename: file.filename,
					findings: result.findings.length,
					fileIndex: index + 1,
					totalFiles: total,
					runId,
					action: "file_complete",
				});

				return result;
			} catch (err) {
				const errMsg = err instanceof Error ? err.message : String(err);
				console.error({
					message: `Code review file review failed (degraded): PR #${prNumber} — ${file.filename} — ${errMsg}`,
					event: "code_review_specialist",
					number: prNumber,
					filename: file.filename,
					runId,
					error: errMsg,
					action: "code_review_file_degraded",
				});
				// Degrade: empty result, and deliberately NOT in reviewedFiles so
				// the reconciler does not falsely resolve prior findings on a file
				// we could not actually review.
				return {
					findings: [],
					summary: "Code review could not complete for this file.",
					reviewedFiles: [],
				};
			}
		},
	);

	const results = await withConcurrency(tasks, concurrency);
	return mergeCodeReviewResults(results);
}

/** Dispatch and read one per-file agent instance, bounded by a timeout. */
async function reviewOneFile({
	input,
	instanceId,
	fileTimeoutMs,
}: {
	input: CodeReviewFileInput;
	instanceId: string;
	fileTimeoutMs: number;
}): Promise<CodeReviewResult> {
	const agent = init(CodeReviewFile, { id: instanceId });
	const receipt = await agent.dispatch({
		message: DISPATCH_MESSAGE,
		initialData: input,
	});

	let reply;
	try {
		reply = await agent.read(receipt, {
			signal: AbortSignal.timeout(fileTimeoutMs),
		});
	} catch (err) {
		// The read signal only cancels observation; durably stop the instance so
		// a wedged file does not keep burning model calls after we gave up.
		await Promise.resolve(agent.abort()).catch(() => {});
		throw err;
	}

	const rawData = reply.data[CODE_REVIEW_FILE_DATA]?.[0];
	if (rawData === undefined) {
		return {
			findings: [],
			summary: "Code review produced no result.",
			reviewedFiles: [],
		};
	}

	const parsed = v.parse(CodeReviewResultFromModelSchema, rawData);
	const findings = await assignCodeReviewFindingIds(parsed.findings);
	return {
		findings,
		summary: parsed.summary,
		reviewedFiles: [input.filename],
	};
}
