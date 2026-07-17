/**
 * Style-guide review specialist workflow
 *
 * A stateless specialist dispatched by the code-review orchestrator. It runs in
 * its own Durable Object (its own isolate and memory budget), self-fetches the
 * PR diff for the requested mode (self-healing incremental → full when the
 * branch was rebased, force-pushed, or had production merged in — see
 * fetchFilesForDiffMode), stages it into its own workspace, runs the per-file
 * style-guide fan-out, and returns the findings as its run result.
 *
 * POST /workflows/style-guide-specialist  (internal — admitted by the orchestrator)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import {
	getShellSandbox,
	getDefaultWorkspace,
	removeWorkspacePath,
} from "../connectors/cloudflare-shell";
import { getInstallationToken } from "../lib/github";
import { fetchFilesForDiffMode } from "../lib/diff-fetch";
import { writeDiffToWorkspace } from "../lib/code-review-diff";
import {
	runStyleGuideReviewInProcess,
	selectStyleGuideFiles,
	STYLE_GUIDE_CONCURRENCY,
	STYLE_GUIDE_FILE_TIMEOUT_MS,
} from "../lib/style-guide-inproc";
import { envPositiveInt } from "../lib/env";
import type { StyleGuideResult } from "../lib/style-guide-results";
import {
	type ReviewSpecialistPayload,
	parseReviewSpecialistPayload,
	toDiffPullRequest,
} from "../lib/review-specialist";
import {
	EXPECTED_STREAMS,
	degradedStyleResult,
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
}: FlueContext): Promise<StyleGuideResult> {
	const typedEnv = env as Record<string, unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;

	let input: ReviewSpecialistPayload | undefined;
	let baseUrl = safeOrigin(req);
	let diffDir = "";
	let result: StyleGuideResult = degradedStyleResult();
	let reviewOk = false;

	try {
		input = parseReviewSpecialistPayload(payload, "style-guide-specialist");
		baseUrl = input.baseUrl ?? safeOrigin(req);
		diffDir = `diffs/pr-${input.number}/runs/${runId}`;
		const loader = typedEnv.LOADER as Parameters<
			typeof getShellSandbox
		>[0]["loader"];
		const token = await getInstallationToken(
			typedEnv as Record<string, string>,
		);

		// Per-environment tuning: default to the prod-safe constants, lower locally
		// (single shared process) via env vars in .env.local.
		const concurrency = envPositiveInt(
			typedEnv.STYLE_GUIDE_CONCURRENCY,
			STYLE_GUIDE_CONCURRENCY,
		);
		const fileTimeoutMs = envPositiveInt(
			typedEnv.STYLE_GUIDE_FILE_TIMEOUT_MS,
			STYLE_GUIDE_FILE_TIMEOUT_MS,
		);

		// Self-fetch the diff for the requested mode. Incremental self-heals to
		// the full PR diff when the compare cannot be trusted (base SHA gone,
		// branch diverged via rebase/force-push, or upstream files pulled in by
		// an "Update branch" merge) — see fetchFilesForDiffMode.
		const { files, effectiveMode, reason } = await fetchFilesForDiffMode(
			token,
			input.number,
			input.diffMode,
		);
		if (input.diffMode.type === "incremental" && effectiveMode === "full") {
			console.log({
				message: `Style-guide specialist: incremental diff self-healed to full for PR #${input.number} (${reason})`,
				event: "style_guide_specialist",
				number: input.number,
				runId,
				reason,
				action: "diff_self_healed",
			});
		}

		const selected = selectStyleGuideFiles(files);
		const workspace = getDefaultWorkspace();

		await writeDiffToWorkspace(
			workspace,
			diffDir,
			selected,
			toDiffPullRequest(input.pr),
		);

		console.log({
			message: `Style-guide specialist started: PR #${input.number} — ${selected.length} file(s), concurrency ${concurrency}`,
			event: "style_guide_specialist",
			number: input.number,
			files: selected.length,
			diffMode: effectiveMode,
			requestedDiffMode: input.diffMode.type,
			runId,
			action: "started",
		});

		result = await runStyleGuideReviewInProcess({
			init,
			workspace,
			loader,
			prNumber: input.number,
			pullRequest: {
				number: input.pr.number,
				title: input.pr.title,
				base: input.pr.base,
				head: input.pr.head,
			},
			diffDir,
			files: selected,
			runId,
			concurrency,
			fileTimeoutMs,
		});

		reviewOk = true;

		console.log({
			message: `Style-guide specialist complete: PR #${input.number} — ${result.findings.length} finding(s) across ${result.reviewedFiles.length} file(s)`,
			event: "style_guide_specialist",
			number: input.number,
			findings: result.findings.length,
			reviewedFiles: result.reviewedFiles.length,
			runId,
			action: "complete",
		});
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Style-guide specialist error (degraded): PR #${input?.number ?? "unknown"} — ${errMsg}`,
			event: "style_guide_specialist",
			number: input?.number,
			error: errMsg,
			runId,
			action: "specialist_error_degraded",
		});
		// result and reviewOk keep their degraded defaults.
	} finally {
		// Clean up the run-scoped staged diff so the specialist DO's SQLite does
		// not grow with every run. Safe: the diff is run-scoped scratch, re-fetched
		// each run; cross-run review state lives in R2 + the comment marker.
		// Guard: diffDir is "" when parseReviewSpecialistPayload throws before
		// assigning it — without this check the cleanup would rm -rf "/" on the
		// DO's entire SQLite filesystem.
		if (diffDir) {
			const workspace = getDefaultWorkspace();
			await removeWorkspacePath(workspace, `/${diffDir}`, {
				recursive: true,
				force: true,
			}).catch(() => {});
		}
	}

	// ── Rendezvous: write final result, try to claim finalize lock ─────────────
	await reportSpecialistResult({
		bucket,
		env: typedEnv,
		baseUrl,
		dispatchId: input?.dispatchId ?? "",
		prNumber: input?.number ?? 0,
		headSha: input?.headSha ?? "",
		stream: "style",
		expectedStreams: input?.expectedStreams ?? [...EXPECTED_STREAMS],
		ok: reviewOk,
		result,
		runId,
		eventName: "style_guide_specialist",
	});

	return result;
}
