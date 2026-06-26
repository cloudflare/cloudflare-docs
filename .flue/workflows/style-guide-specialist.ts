/**
 * Style-guide review specialist workflow
 *
 * A stateless specialist dispatched by the code-review orchestrator. It runs in
 * its own Durable Object (its own isolate and memory budget), self-fetches the
 * PR diff for the requested mode, stages it into its own workspace, runs the
 * per-file style-guide fan-out, and returns the findings as its run result.
 *
 * POST /workflows/style-guide-specialist  (internal — admitted by the orchestrator)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { getShellSandbox } from "../connectors/cloudflare-shell";
import {
	getDefaultWorkspace,
	removeWorkspacePath,
} from "../connectors/cloudflare-shell";
import {
	comparePullRequestHeads,
	getInstallationToken,
	getPullRequestFiles,
} from "../lib/github";
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
	writeStreamResult,
	tryClaimFinalize,
	degradedStyleResult,
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
}: FlueContext): Promise<StyleGuideResult> {
	const input: ReviewSpecialistPayload = parseReviewSpecialistPayload(
		payload,
		"style-guide-specialist",
	);
	const typedEnv = env as Record<string, unknown>;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const token = await getInstallationToken(typedEnv as Record<string, string>);
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
	const baseUrl = input.baseUrl ?? (req ? new URL(req.url).origin : "");

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

	const selected = selectStyleGuideFiles(files);
	const workspace = getDefaultWorkspace();
	const diffDir = `diffs/pr-${input.number}/runs/${runId}`;

	// Write a degraded placeholder BEFORE starting the review so finalize
	// always has a result to work with, even if the specialist DO is
	// hard-evicted mid-review and never reaches the success write below.
	// The placeholder is overwritten with the real result on success.
	if (input.dispatchId && baseUrl) {
		await writeStreamResult(
			bucket,
			input.number,
			input.headSha,
			input.dispatchId,
			"style",
			{ ok: false, result: degradedStyleResult() },
		).catch(() => {});
	}

	let result: StyleGuideResult;
	let reviewOk = true;
	try {
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
			diffMode: input.diffMode.type,
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

		console.log({
			message: `Style-guide specialist complete: PR #${input.number} — ${result.findings.length} finding(s) across ${result.reviewedFiles.length} file(s), ok: ${reviewOk}`,
			event: "style_guide_specialist",
			number: input.number,
			findings: result.findings.length,
			reviewedFiles: result.reviewedFiles.length,
			ok: reviewOk,
			runId,
			action: "complete",
		});
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Style-guide specialist error (degraded): PR #${input.number} — ${errMsg}`,
			event: "style_guide_specialist",
			number: input.number,
			error: errMsg,
			runId,
			action: "specialist_error_degraded",
		});
		result = degradedStyleResult();
		reviewOk = false;
	} finally {
		// Clean up the run-scoped staged diff so the specialist DO's SQLite does
		// not grow with every run. Safe: the diff is run-scoped scratch, re-fetched
		// each run; cross-run review state lives in R2 + the comment marker.
		await removeWorkspacePath(workspace, `/${diffDir}`, {
			recursive: true,
			force: true,
		}).catch(() => {});
	}

	// ── Rendezvous: write result, try to claim finalize lock ───────────────────
	if (input.dispatchId && baseUrl) {
		try {
			await writeStreamResult(
				bucket,
				input.number,
				input.headSha,
				input.dispatchId,
				"style",
				{ ok: reviewOk, result },
			);

			const won = await tryClaimFinalize(
				bucket,
				input.number,
				input.headSha,
				input.dispatchId,
				"style",
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
					message: `Style-guide specialist: finalize-review admitted for PR #${input.number}`,
					event: "style_guide_specialist",
					number: input.number,
					headSha: input.headSha,
					dispatchId: input.dispatchId,
					runId,
					action: "finalize_admitted",
				});
			}
		} catch (rendezvousErr) {
			console.log({
				message: `Style-guide specialist: rendezvous error for PR #${input.number} — ${rendezvousErr instanceof Error ? rendezvousErr.message : String(rendezvousErr)}`,
				event: "style_guide_specialist",
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
			message: `Style-guide specialist: no dispatchId/baseUrl — skipping rendezvous for PR #${input.number}`,
			event: "style_guide_specialist",
			number: input.number,
			runId,
			action: "rendezvous_skipped",
		});
	}

	return result;
}
