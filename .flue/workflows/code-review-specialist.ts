/**
 * Generic code-review specialist workflow
 *
 * A stateless specialist dispatched by the code-review orchestrator. It runs in
 * its own Durable Object (its own isolate and memory budget), self-fetches the
 * PR diff for the requested mode, selects up to CODE_REVIEW_MAX_FILES files
 * (largest-diff-first), and fans out one review session per file at bounded
 * concurrency.
 *
 * POST /workflows/code-review-specialist  (internal — admitted by the orchestrator)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import {
	comparePullRequestHeads,
	getInstallationToken,
	getPullRequestFiles,
	getRepoFileContent,
} from "../lib/github";
import {
	CODE_REVIEW_CONCURRENCY,
	CODE_REVIEW_FILE_TIMEOUT_MS,
	runCodeReviewInProcess,
	selectCodeReviewFiles,
} from "../lib/code-review-inproc";
import { envPositiveInt } from "../lib/env";
import type { CodeReviewResult } from "../lib/code-review-results";
import {
	type ReviewSpecialistPayload,
	parseReviewSpecialistPayload,
} from "../lib/review-specialist";
import {
	EXPECTED_STREAMS,
	degradedCodeResult,
	reportSpecialistResult,
} from "../lib/finalize-rendezvous";

export const route: WorkflowRouteHandler = async (_c, next) => next();

/** Derive a safe origin string from an optional request, returning "" on failure. */
function safeOrigin(req: Request | undefined): string {
	if (!req) return "";
	try {
		return new URL(req.url).origin;
	} catch {
		return "";
	}
}

export async function run({
	id: runId,
	init,
	payload,
	env,
	req,
}: FlueContext): Promise<CodeReviewResult> {
	const typedEnv = env as Record<string, unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;

	let input: ReviewSpecialistPayload | undefined;
	// baseUrl is derived from input (or req fallback) once parsing succeeds.
	let baseUrl = safeOrigin(req);
	let result: CodeReviewResult = degradedCodeResult();
	let reviewOk = false;

	try {
		// Parse inside the try so a malformed payload degrades gracefully instead
		// of rejecting the workflow with an unhandled error.
		input = parseReviewSpecialistPayload(payload, "code-review-specialist");
		baseUrl = input.baseUrl ?? safeOrigin(req);
		const loader = typedEnv.LOADER as Parameters<
			typeof getShellSandbox
		>[0]["loader"];
		const token = await getInstallationToken(
			typedEnv as Record<string, string>,
		);

		// Per-environment tuning: default to the prod-safe constants, lower locally
		// (single shared process) via env vars in .env.local.
		const concurrency = envPositiveInt(
			typedEnv.CODE_REVIEW_CONCURRENCY,
			CODE_REVIEW_CONCURRENCY,
		);
		const fileTimeoutMs = envPositiveInt(
			typedEnv.CODE_REVIEW_FILE_TIMEOUT_MS,
			CODE_REVIEW_FILE_TIMEOUT_MS,
		);

		// Self-fetch the diff for the requested mode. Incremental is SHA-pinned;
		// if the base SHA is gone (force-push since the orchestrator decided),
		// self-heal to the full PR diff.
		let files: Awaited<ReturnType<typeof getPullRequestFiles>>;
		if (input.diffMode.type === "incremental") {
			const compare = await comparePullRequestHeads(
				token,
				input.diffMode.fromSha,
				input.diffMode.toSha,
			);
			files = compare
				? compare.files
				: await getPullRequestFiles(token, input.number);
		} else {
			files = await getPullRequestFiles(token, input.number);
		}

		// Select up to CODE_REVIEW_MAX_FILES files, largest-diff-first.
		const selectedFiles = selectCodeReviewFiles(files);
		const diffBytes = selectedFiles.reduce(
			(n, f) => n + (f.patch?.length ?? 0),
			0,
		);

		const workspace = getDefaultWorkspace();

		// Load AGENTS.md from the PR base ref — best-effort.
		const repoAgentsMd =
			selectedFiles.length > 0
				? ((await getRepoFileContent(token, "AGENTS.md", input.pr.base).catch(
						() => null,
					)) ?? undefined)
				: undefined;

		console.log({
			message: `Code review specialist started: PR #${input.number} — ${selectedFiles.length} file(s), ${diffBytes} diff bytes`,
			event: "code_review_specialist",
			number: input.number,
			files: selectedFiles.length,
			diffBytes,
			diffMode: input.diffMode.type,
			runId,
			action: "started",
		});

		result = await runCodeReviewInProcess({
			init,
			workspace,
			loader,
			token,
			headSha: input.headSha,
			repoAgentsMd,
			prNumber: input.number,
			pullRequest: {
				number: input.pr.number,
				title: input.pr.title,
				base: input.pr.base,
				head: input.pr.head,
			},
			files: selectedFiles,
			runId,
			concurrency,
			fileTimeoutMs,
		});

		reviewOk = true;

		console.log({
			message: `Code review specialist complete: PR #${input.number} — ${result.findings.length} finding(s) across ${result.reviewedFiles.length} file(s)`,
			event: "code_review_specialist",
			number: input.number,
			findings: result.findings.length,
			reviewedFiles: result.reviewedFiles.length,
			runId,
			action: "complete",
		});
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Code review specialist error (degraded): PR #${input?.number ?? "unknown"} — ${errMsg}`,
			event: "code_review_specialist",
			number: input?.number,
			error: errMsg,
			runId,
			action: "specialist_error_degraded",
		});
		// result and reviewOk keep their degraded defaults.
	}

	// ── Rendezvous: write final result, try to claim finalize lock ─────────────
	await reportSpecialistResult({
		bucket,
		env: typedEnv,
		baseUrl,
		dispatchId: input?.dispatchId ?? "",
		prNumber: input?.number ?? 0,
		headSha: input?.headSha ?? "",
		stream: "code",
		expectedStreams: input?.expectedStreams ?? [...EXPECTED_STREAMS],
		ok: reviewOk,
		result,
		runId,
		eventName: "code_review_specialist",
	});

	return result;
}
