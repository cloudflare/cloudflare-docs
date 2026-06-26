/**
 * Generic code-review specialist workflow
 *
 * A stateless specialist dispatched by the code-review orchestrator. It runs in
 * its own Durable Object (its own isolate and memory budget), self-fetches the
 * PR diff for the requested mode, and returns the findings as its run result.
 *
 * Routing: after selecting reviewable files, it computes the combined diff size
 * and routes to one of two review strategies:
 *
 *   - Fan-out  (combined diff ≤ CODE_REVIEW_HOLISTIC_MAX_BYTES): one session per
 *     file, up to CODE_REVIEW_MAX_FILES files, concurrency CODE_REVIEW_CONCURRENCY.
 *     Good for smaller PRs; per-file findings, parallel sessions.
 *
 *   - Holistic (combined diff >  CODE_REVIEW_HOLISTIC_MAX_BYTES): one session over
 *     the entire PR diff, up to CODE_REVIEW_HOLISTIC_MAX_FILES files. Good for
 *     larger PRs; enables cross-file reasoning, eliminates per-file overhead.
 *
 * Both strategies return a CodeReviewResult and are transparent to the
 * orchestrator. The result carries `reviewMode` so the comment heading reflects
 * which strategy ran.
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
	CODE_REVIEW_HOLISTIC_MAX_BYTES,
	CODE_REVIEW_HOLISTIC_MAX_FILES,
	runCodeReviewInProcess,
	selectCodeReviewFiles,
	CODE_REVIEW_MAX_FILES,
} from "../lib/code-review-inproc";
import {
	CODE_REVIEW_HOLISTIC_TIMEOUT_MS,
	runCodeReviewHolistic,
} from "../lib/code-review-holistic";
import { envPositiveInt } from "../lib/env";
import type { CodeReviewResult } from "../lib/code-review-results";
import {
	type ReviewSpecialistPayload,
	parseReviewSpecialistPayload,
} from "../lib/review-specialist";
import {
	writeStreamResult,
	tryClaimFinalize,
	degradedCodeResult,
} from "../lib/finalize-rendezvous";
import { admitWorkflow } from "../lib/poll-run";
import { getInternalHeaders } from "../lib/internal-auth";

export const route: WorkflowRouteHandler = async (_c, next) => next();

export async function run({
	id: runId,
	init,
	payload,
	env,
	req,
}: FlueContext): Promise<CodeReviewResult> {
	const input: ReviewSpecialistPayload = parseReviewSpecialistPayload(
		payload,
		"code-review-specialist",
	);
	const typedEnv = env as Record<string, unknown>;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const token = await getInstallationToken(typedEnv as Record<string, string>);
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
	// baseUrl: prefer payload (set by orchestrator), fall back to this req's origin.
	const baseUrl = input.baseUrl ?? (req ? new URL(req.url).origin : "");

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
	const holisticMaxBytes = envPositiveInt(
		typedEnv.CODE_REVIEW_HOLISTIC_MAX_BYTES,
		CODE_REVIEW_HOLISTIC_MAX_BYTES,
	);
	const holisticMaxFiles = envPositiveInt(
		typedEnv.CODE_REVIEW_HOLISTIC_MAX_FILES,
		CODE_REVIEW_HOLISTIC_MAX_FILES,
	);
	const holisticTimeoutMs = envPositiveInt(
		typedEnv.CODE_REVIEW_HOLISTIC_TIMEOUT_MS,
		CODE_REVIEW_HOLISTIC_TIMEOUT_MS,
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

	// Select up to the holistic cap (largest-first, filtered). The routing
	// decision is made over this full candidate set; the fan-out path will
	// further trim to CODE_REVIEW_MAX_FILES.
	const reviewable = selectCodeReviewFiles(files, holisticMaxFiles);
	const diffBytes = reviewable.reduce((n, f) => n + (f.patch?.length ?? 0), 0);
	// A forceReviewMode from a codeowner slash command overrides the size-based
	// routing. Otherwise route by diff size: large diffs go holistic.
	const useHolistic =
		input.forceReviewMode === "holistic"
			? true
			: input.forceReviewMode === "fan-out"
				? false
				: diffBytes > holisticMaxBytes;

	const workspace = getDefaultWorkspace();

	// Load AGENTS.md from the PR base ref — best-effort.
	const repoAgentsMd =
		reviewable.length > 0
			? ((await getRepoFileContent(token, "AGENTS.md", input.pr.base).catch(
					() => null,
				)) ?? undefined)
			: undefined;

	const reviewMode = useHolistic ? "holistic" : "fan-out";
	const selectedFiles = useHolistic
		? reviewable
		: reviewable.slice(0, CODE_REVIEW_MAX_FILES);

	console.log({
		message: `Code review specialist started: PR #${input.number} — ${selectedFiles.length} file(s), ${diffBytes} diff bytes, mode: ${reviewMode}`,
		event: "code_review_specialist",
		number: input.number,
		files: selectedFiles.length,
		diffBytes,
		diffMode: input.diffMode.type,
		reviewMode,
		runId,
		action: "started",
	});

	const sharedOptions = {
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
	};

	// Wrap the review in try/catch so a logic error still participates in the
	// rendezvous (writes a degraded result). Only a hard DO eviction before
	// this block would leave no stream result and keep finalize from running.
	let result: CodeReviewResult;
	let reviewOk = true;
	try {
		result = useHolistic
			? await runCodeReviewHolistic({
					...sharedOptions,
					timeoutMs: holisticTimeoutMs,
				})
			: await runCodeReviewInProcess({
					...sharedOptions,
					concurrency,
					fileTimeoutMs,
				});
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Code review specialist error (degraded): PR #${input.number} — ${errMsg}`,
			event: "code_review_specialist",
			number: input.number,
			error: errMsg,
			runId,
			action: "specialist_error_degraded",
		});
		result = degradedCodeResult();
		reviewOk = false;
	}

	console.log({
		message: `Code review specialist complete: PR #${input.number} — ${result.findings.length} finding(s) across ${result.reviewedFiles.length} file(s), mode: ${reviewMode}, ok: ${reviewOk}`,
		event: "code_review_specialist",
		number: input.number,
		findings: result.findings.length,
		reviewedFiles: result.reviewedFiles.length,
		reviewMode,
		ok: reviewOk,
		runId,
		action: "complete",
	});

	// ── Rendezvous: write result, try to claim finalize lock ───────────────────
	if (input.dispatchId && baseUrl) {
		try {
			await writeStreamResult(
				bucket,
				input.number,
				input.headSha,
				input.dispatchId,
				"code",
				{ ok: reviewOk, result },
			);

			const won = await tryClaimFinalize(
				bucket,
				input.number,
				input.headSha,
				input.dispatchId,
				"code",
			);

			if (won) {
				const internalHeaders = getInternalHeaders(
					typedEnv as Record<string, string>,
				);
				await admitWorkflow({
					baseUrl,
					pathname: "/workflows/finalize-review",
					headers: internalHeaders,
					body: {
						eventType: "pull_request",
						number: input.number,
						headSha: input.headSha,
						dispatchId: input.dispatchId,
					},
				});
				console.log({
					message: `Code review specialist: finalize-review admitted for PR #${input.number}`,
					event: "code_review_specialist",
					number: input.number,
					headSha: input.headSha,
					dispatchId: input.dispatchId,
					runId,
					action: "finalize_admitted",
				});
			}
		} catch (rendezvousErr) {
			// Non-fatal: the review ran but rendezvous failed. Log and continue —
			// the review result is still returned in the run stream for observability.
			console.log({
				message: `Code review specialist: rendezvous error for PR #${input.number} — ${rendezvousErr instanceof Error ? rendezvousErr.message : String(rendezvousErr)}`,
				event: "code_review_specialist",
				number: input.number,
				error:
					rendezvousErr instanceof Error
						? rendezvousErr.message
						: String(rendezvousErr),
				runId,
				action: "rendezvous_error",
			});
		}
	} else {
		console.log({
			message: `Code review specialist: no dispatchId/baseUrl — skipping rendezvous for PR #${input.number}`,
			event: "code_review_specialist",
			number: input.number,
			runId,
			action: "rendezvous_skipped",
		});
	}

	return result;
}
