/**
 * Trusted-code driver for the per-file style-guide fan-out.
 *
 * Ports the 0.11 `runStyleGuideReviewInProcess` to the 2.0
 * one-agent-instance-per-file model. For each selected MDX file it parses the
 * added lines in trusted code, dispatches a dedicated `StyleGuideFile` instance
 * (`id: `${runId}:sg:${i}``), reads them concurrently with a per-file timeout,
 * assigns stable `SG-` ids, and merges.
 *
 * A single file's failure (timeout, model error, no result) is degraded to an
 * empty result — it never aborts the pool.
 */
import { init } from "@flue/runtime";
import * as v from "valibot";
import StyleGuideFile, {
	STYLE_GUIDE_FILE_DATA,
	type StyleGuideFileInput,
} from "../agents/style-guide-file";
import {
	assignFindingIds,
	StyleGuideResultFromModelSchema,
	type StyleGuideResult,
} from "./style-guide-results";
import { parseAddedLines } from "./code-review-files";
import {
	STYLE_GUIDE_CONCURRENCY,
	STYLE_GUIDE_FILE_TIMEOUT_MS,
	mergeStyleGuideResults,
	type StyleGuidePullRequest,
	type PullRequestFiles,
} from "./style-guide-files";
import { withConcurrency } from "./inproc-utils";

const DISPATCH_MESSAGE =
	"Review the added lines of this file against the style guide and submit your findings.";

export interface RunStyleGuideOptions {
	prNumber: number;
	pullRequest: StyleGuidePullRequest;
	/** Reviewable files selected by `selectStyleGuideFiles`. */
	files: PullRequestFiles;
	runId: string;
	concurrency?: number;
	/** Per-file hard timeout in ms. Defaults to STYLE_GUIDE_FILE_TIMEOUT_MS. */
	fileTimeoutMs?: number;
}

/**
 * Run style-guide review across all selected files, one agent instance per
 * file, and return the merged {@link StyleGuideResult}.
 */
export async function runStyleGuide(
	options: RunStyleGuideOptions,
): Promise<StyleGuideResult> {
	const {
		prNumber,
		pullRequest,
		files,
		runId,
		concurrency = STYLE_GUIDE_CONCURRENCY,
		fileTimeoutMs = STYLE_GUIDE_FILE_TIMEOUT_MS,
	} = options;

	if (files.length === 0) {
		return {
			findings: [],
			summary: "No reviewable documentation files changed.",
			reviewedFiles: [],
		};
	}

	const total = files.length;
	const tasks = files.map(
		(file, index) => async (): Promise<StyleGuideResult> => {
			try {
				const addedLines = file.patch ? parseAddedLines(file.patch) : [];

				console.log({
					message: `Style-guide review: reviewing file (${index + 1}/${total}) — ${file.filename}`,
					event: "style_guide_specialist",
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
					},
					instanceId: `${runId}:sg:${index}`,
					fileTimeoutMs,
				});

				console.log({
					message: `Style-guide review: done reviewing file (${index + 1}/${total}) — ${file.filename} — ${result.findings.length} finding(s)`,
					event: "style_guide_specialist",
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
					message: `Style-guide file review failed (degraded): PR #${prNumber} — ${file.filename} — ${errMsg}`,
					event: "style_guide_specialist",
					number: prNumber,
					filename: file.filename,
					runId,
					error: errMsg,
					action: "style_guide_file_degraded",
				});
				// Degrade: empty result, and deliberately NOT in reviewedFiles so
				// the reconciler does not falsely resolve prior findings on a file
				// we could not actually review.
				return {
					findings: [],
					summary: "Style-guide review could not complete for this file.",
					reviewedFiles: [],
				};
			}
		},
	);

	const results = await withConcurrency(tasks, concurrency);
	return mergeStyleGuideResults(results);
}

/** Dispatch and read one per-file agent instance, bounded by a timeout. */
async function reviewOneFile({
	input,
	instanceId,
	fileTimeoutMs,
}: {
	input: StyleGuideFileInput;
	instanceId: string;
	fileTimeoutMs: number;
}): Promise<StyleGuideResult> {
	const agent = init(StyleGuideFile, { id: instanceId });
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
		await Promise.resolve(agent.abort()).catch(() => {});
		throw err;
	}

	const rawData = reply.data[STYLE_GUIDE_FILE_DATA]?.[0];
	if (rawData === undefined) {
		return {
			findings: [],
			summary: "Style-guide review produced no result.",
			reviewedFiles: [input.filename],
		};
	}

	const parsed = v.parse(StyleGuideResultFromModelSchema, rawData);
	const findings = await assignFindingIds(parsed.findings);
	return {
		findings,
		summary: parsed.summary,
		reviewedFiles: [input.filename],
	};
}
