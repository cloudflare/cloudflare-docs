/**
 * Finalize-review workflow
 *
 * Admitted by whichever specialist wins the R2 finalize lock. It:
 *   1. Reads the dispatch context + both stream results from R2.
 *   2. Head-guards: skips posting if the PR head has moved on.
 *   3. Idempotency-guards: skips if this headSha is already finalized.
 *   4. Reconciles code and style findings against prior review + human comments.
 *   5. Persists review-<headSha>.json.
 *   6. Renders and posts (or logs) the final review comment.
 *   7. Swaps 👀→👍 on any trigger comment.
 *   8. Marks the auto-review slot consumed (if applicable).
 *   9. Cleans up the pending/<headSha>/<dispatchId>/ namespace.
 *
 * POST /workflows/finalize-review  (internal — admitted by specialists)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { createAgent } from "@flue/runtime";
import reconcileSkill from "../.agents/skills/reconcile-code-review/SKILL.md" with { type: "skill" };
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import {
	addReactionToComment,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	postComment,
	removeReactionFromComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "../lib/github";
import type {
	StyleGuideFinding,
	StyleGuideResult,
} from "../lib/style-guide-results";
import type {
	CodeReviewFinding,
	CodeReviewResult,
} from "../lib/code-review-results";
import {
	BOT_COMMENT_MARKER,
	extractReviewedHeadSha,
	markAutoReviewCompleted,
} from "../lib/code-review-state";
import {
	ReconcileResultSchema,
	type ReconcileResult,
	renderComment,
	renderFailureComment,
} from "../lib/code-review-render";
import {
	readContext,
	readStreamResult,
	cleanupPending,
} from "../lib/finalize-rendezvous";

export const route: WorkflowRouteHandler = async (_c, next) => next();

interface FinalizeReviewPayload {
	eventType: "pull_request";
	number: number;
	headSha: string;
	dispatchId: string;
}

export async function run({
	id: runId,
	init,
	payload,
	env,
}: FlueContext): Promise<Record<string, unknown>> {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, string & unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
	const loader = typedEnv.LOADER as unknown as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const workspace = getDefaultWorkspace();

	// ── 1. Read context + stream results ──────────────────────────────────────
	const ctx = await readContext(
		bucket,
		input.number,
		input.headSha,
		input.dispatchId,
	);
	if (!ctx) {
		console.log({
			message: `Finalize aborted: context missing for PR #${input.number} headSha ${input.headSha} dispatch ${input.dispatchId}`,
			event: "finalize_review",
			number: input.number,
			headSha: input.headSha,
			dispatchId: input.dispatchId,
			runId,
			action: "context_missing",
		});
		return { finalized: false, reason: "context_missing" };
	}

	// Use the review mode that was active when the orchestrator dispatched this
	// run. Each workflow DO may not have the same env-var view as the orchestrator
	// (especially in local dev), so we carry the mode through context.json.
	const reviewMode = ctx.reviewMode;

	const [codePayload, stylePayload] = await Promise.all([
		readStreamResult<CodeReviewResult>(
			bucket,
			input.number,
			input.headSha,
			input.dispatchId,
			"code",
		),
		readStreamResult<StyleGuideResult>(
			bucket,
			input.number,
			input.headSha,
			input.dispatchId,
			"style",
		),
	]);

	if (!codePayload || !stylePayload) {
		console.log({
			message: `Finalize aborted: stream result(s) missing for PR #${input.number}`,
			event: "finalize_review",
			number: input.number,
			headSha: input.headSha,
			dispatchId: input.dispatchId,
			codePresent: !!codePayload,
			stylePresent: !!stylePayload,
			runId,
			action: "stream_results_missing",
		});
		await cleanupPending(bucket, input.number, input.headSha, input.dispatchId);
		return { finalized: false, reason: "stream_results_missing" };
	}

	const codeOk = codePayload.ok;
	const styleOk = stylePayload.ok;
	const codeResult = codePayload.result;
	const styleResult = stylePayload.result;

	const token = await getInstallationToken(typedEnv as Record<string, string>);

	// ── 2. Head-guard: skip if PR has moved on ────────────────────────────────
	// A stale dispatch should not clobber a newer review. If the live head
	// has changed, clean up and exit without touching the comment.
	const pr = await getPullRequest(token, input.number);
	if (pr.head.sha !== input.headSha) {
		console.log({
			message: `Finalize skipped: PR #${input.number} head moved (was ${input.headSha.slice(0, 7)}, now ${pr.head.sha.slice(0, 7)})`,
			event: "finalize_review",
			number: input.number,
			headSha: input.headSha,
			liveHeadSha: pr.head.sha,
			dispatchId: input.dispatchId,
			runId,
			action: "head_guard_skipped",
		});
		await cleanupPending(bucket, input.number, input.headSha, input.dispatchId);
		return { finalized: false, reason: "head_moved" };
	}

	// ── 3. Idempotency-guard: skip if already finalized ───────────────────────
	const allComments = await getIssueComments(token, input.number);
	const botComment =
		allComments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ?? null;
	const alreadyFinalizedSha = extractReviewedHeadSha(botComment?.body ?? null);
	if (
		alreadyFinalizedSha === input.headSha &&
		!botComment?.body?.includes("<!-- status: pending -->")
	) {
		console.log({
			message: `Finalize skipped: PR #${input.number} headSha ${input.headSha.slice(0, 7)} already finalized`,
			event: "finalize_review",
			number: input.number,
			headSha: input.headSha,
			dispatchId: input.dispatchId,
			runId,
			action: "already_finalized",
		});
		await cleanupPending(bucket, input.number, input.headSha, input.dispatchId);
		return { finalized: false, reason: "already_finalized" };
	}

	// ── 4. Reconcile both review streams ──────────────────────────────────────
	const prDir = `diffs/pr-${input.number}`;
	const previousReviewKey = ctx.previousReviewedSha
		? `${prDir}/review-${ctx.previousReviewedSha}.json`
		: null;
	let previousCodeFindings: CodeReviewFinding[] = [];
	let previousStyleFindings: StyleGuideFinding[] = [];
	if (previousReviewKey) {
		try {
			const obj = await bucket.get(previousReviewKey);
			if (obj) {
				const parsed = JSON.parse(await obj.text());
				if (Array.isArray(parsed)) {
					previousStyleFindings = parsed as StyleGuideFinding[];
				} else {
					previousCodeFindings = (parsed.code ?? []) as CodeReviewFinding[];
					previousStyleFindings = (parsed.style ?? []) as StyleGuideFinding[];
				}
			}
		} catch {
			// Non-fatal — fall back to empty previous findings.
		}
	}

	// Create the reconcile agent (same setup as the old orchestrator).
	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
		skills: [reconcileSkill],
	}));
	const harness = await init(agent);
	// Session key scoped to PR + headSha so re-runs for the same head reuse it.
	const sessionKey = `code-review-orchestrator:${input.number}:${input.headSha}`;
	const session = await harness.session(sessionKey);

	const reconcileStream = async (
		streamLabel: "code" | "style",
		currentFindings: (CodeReviewFinding | StyleGuideFinding)[],
		reviewedFiles: string[],
		previousFindings: (CodeReviewFinding | StyleGuideFinding)[],
		fallbackSummary: string,
	): Promise<ReconcileResult> => {
		const needsReconciliation =
			previousFindings.length > 0 || ctx.humanComments.length > 0;

		if (!needsReconciliation) {
			return {
				active: currentFindings,
				ignored_by_reviewer: [],
				resolved: [],
				summary: fallbackSummary,
			};
		}

		const { data } = await session.skill("reconcile-code-review", {
			model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
			args: {
				pullRequest: { number: input.number },
				currentFindings,
				reviewedFiles,
				previousFindings,
				humanComments: ctx.humanComments,
				diffMode: ctx.diffMode,
			},
			result: ReconcileResultSchema,
		});

		const reconciled = data ?? {
			active: currentFindings,
			ignored_by_reviewer: [],
			resolved: [],
			summary: fallbackSummary,
		};

		console.log({
			message: `Reconciliation complete (${streamLabel}): PR #${input.number} — ${reconciled.active.length} active, ${reconciled.ignored_by_reviewer.length} ignored, ${reconciled.resolved.length} resolved`,
			event: "finalize_review",
			number: input.number,
			stream: streamLabel,
			active: reconciled.active.length,
			ignored: reconciled.ignored_by_reviewer.length,
			resolved: reconciled.resolved.length,
			reconciliation_used_fallback: data === undefined,
			runId,
			action: "reconciliation_complete",
		});

		return reconciled;
	};

	const reconciledCode = await reconcileStream(
		"code",
		codeResult.findings,
		codeResult.reviewedFiles,
		previousCodeFindings,
		codeResult.findings.length === 0
			? "No code review issues found."
			: `${codeResult.findings.length} finding(s); no prior review to reconcile against.`,
	);
	const reconciledStyle = await reconcileStream(
		"style",
		styleResult.findings,
		styleResult.reviewedFiles,
		previousStyleFindings,
		styleResult.findings.length === 0
			? "No style-guide issues found."
			: `${styleResult.findings.length} finding(s); no prior review to reconcile against.`,
	);

	// ── 5. Persist findings to R2 ─────────────────────────────────────────────
	const currentReviewKey = `${prDir}/review-${input.headSha}.json`;
	await bucket.put(
		currentReviewKey,
		JSON.stringify({
			code: reconciledCode.active,
			style: reconciledStyle.active,
		}),
	);

	// ── 6. Render the comment ─────────────────────────────────────────────────
	const bothFailed = !codeOk && !styleOk;
	const commentBody = bothFailed
		? renderFailureComment(input.headSha)
		: renderComment(
				{
					code: reconciledCode,
					style: reconciledStyle,
					codeFailed: !codeOk,
					styleFailed: !styleOk,
					codeMode: codeOk ? codeResult.reviewMode : undefined,
				},
				input.headSha,
				ctx.forceFullReview,
			);

	// ── 7. Log or post ────────────────────────────────────────────────────────
	const totalActive =
		reconciledCode.active.length + reconciledStyle.active.length;
	const totalIgnored =
		reconciledCode.ignored_by_reviewer.length +
		reconciledStyle.ignored_by_reviewer.length;
	const totalResolved =
		reconciledCode.resolved.length + reconciledStyle.resolved.length;

	if (reviewMode === "log") {
		console.log({
			message: `Finalize complete (log mode): PR #${input.number} — ${totalActive} active, ${totalIgnored} ignored, ${totalResolved} resolved`,
			event: "finalize_review",
			number: input.number,
			mode: reviewMode,
			active: totalActive,
			ignored: totalIgnored,
			resolved: totalResolved,
			runId,
			action: "complete_log_mode",
			commentBody,
		});
	} else {
		// Locate the bot comment — botComment was fetched above before the
		// idempotency check; re-use it. If null (first-ever review), postComment.
		try {
			await postOrUpdateComment(token, input.number, botComment, commentBody);
		} catch (postErr) {
			console.log({
				message: `Finalize: failed to post comment for PR #${input.number}`,
				event: "finalize_review",
				number: input.number,
				error: postErr instanceof Error ? postErr.message : String(postErr),
				runId,
				action: "comment_post_failed",
			});
		}

		// Swap 👀 → 👍 on the trigger comment if applicable.
		if (ctx.triggerCommentId) {
			if (ctx.triggerEyesReactionId) {
				await removeReactionFromComment(
					token,
					ctx.triggerCommentId,
					ctx.triggerEyesReactionId,
				).catch(() => {});
			}
			await addReactionToComment(token, ctx.triggerCommentId, "+1").catch(
				() => {},
			);
		}

		console.log({
			message: `Finalize complete (comment mode): PR #${input.number} — ${totalActive} active, ${totalIgnored} ignored, ${totalResolved} resolved`,
			event: "finalize_review",
			number: input.number,
			mode: reviewMode,
			active: totalActive,
			ignored: totalIgnored,
			resolved: totalResolved,
			runId,
			action: "complete_comment_posted",
		});
	}

	// ── 8. Mark auto-review slot consumed ─────────────────────────────────────
	// Only when both specialists succeeded and this was an automatic (not
	// codeowner-bypassed) run. Partial runs (one specialist degraded) do not
	// consume a slot so the next push can retry.
	if (!ctx.bypassReviewLimit && codeOk && styleOk) {
		await markAutoReviewCompleted(bucket, input.number, input.headSha).catch(
			() => {},
		);
	}

	// ── 9. Clean up the pending namespace ─────────────────────────────────────
	await cleanupPending(bucket, input.number, input.headSha, input.dispatchId);

	return {
		finalized: true,
		mode: reviewMode,
		active: totalActive,
		ignored: totalIgnored,
		resolved: totalResolved,
		bothFailed,
	};
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parsePayload(payload: unknown): FinalizeReviewPayload {
	const input = payload as Partial<FinalizeReviewPayload>;
	if (
		input.eventType !== "pull_request" ||
		typeof input.number !== "number" ||
		typeof input.headSha !== "string" ||
		typeof input.dispatchId !== "string"
	) {
		throw new Error(
			'[flue] finalize-review requires payload { eventType: "pull_request", number, headSha, dispatchId }.',
		);
	}
	return {
		eventType: input.eventType,
		number: input.number,
		headSha: input.headSha,
		dispatchId: input.dispatchId,
	};
}

async function postOrUpdateComment(
	token: string,
	prNumber: number,
	existingBotComment: GitHubIssueComment | null,
	body: string,
): Promise<void> {
	if (existingBotComment) {
		await updateIssueComment(token, existingBotComment.id, body);
	} else {
		await postComment(token, prNumber, body);
	}
}
