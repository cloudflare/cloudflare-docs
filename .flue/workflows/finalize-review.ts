/**
 * Finalize-review workflow
 *
 * Admitted by whichever specialist wins the R2 finalize lock. It:
 *   1. Reads the dispatch context + all three stream results from R2.
 *   2. Head-guards: skips posting if the PR head has moved on.
 *   3. Idempotency-guards: skips if this headSha is already finalized.
 *   4. Reconciles code, style, and conventions findings against prior review +
 *      human comments via the LLM reconciler.
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
	removeReactionFromComment,
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
import type { DiffMode } from "../lib/code-review-state";
import {
	postOrUpdateComment,
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

	// ── 1. Read context + all stream results ──────────────────────────────────
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

	const [codePayload, stylePayload, conventionsPayload] = await Promise.all([
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
		readStreamResult<CodeReviewResult>(
			bucket,
			input.number,
			input.headSha,
			input.dispatchId,
			"conventions",
		),
	]);

	if (!codePayload || !stylePayload || !conventionsPayload) {
		console.log({
			message: `Finalize aborted: stream result(s) missing for PR #${input.number}`,
			event: "finalize_review",
			number: input.number,
			headSha: input.headSha,
			dispatchId: input.dispatchId,
			codePresent: !!codePayload,
			stylePresent: !!stylePayload,
			conventionsPresent: !!conventionsPayload,
			runId,
			action: "stream_results_missing",
		});
		await cleanupPending(bucket, input.number, input.headSha, input.dispatchId);
		return { finalized: false, reason: "stream_results_missing" };
	}

	const codeOk = codePayload.ok;
	const styleOk = stylePayload.ok;
	const conventionsOk = conventionsPayload.ok;
	const codeResult = codePayload.result;
	const styleResult = stylePayload.result;
	const conventionsResult = conventionsPayload.result;

	const token = await getInstallationToken(typedEnv as Record<string, string>);

	// ── 2. Head-guard: skip if PR has moved on ────────────────────────────────
	// A stale dispatch should not clobber a newer review. If the live head
	// has changed, clean up and exit without touching the comment.
	let pr: Awaited<ReturnType<typeof getPullRequest>>;
	try {
		pr = await getPullRequest(token, input.number);
	} catch (prErr) {
		console.log({
			message: `Finalize aborted: failed to fetch PR #${input.number} — ${prErr instanceof Error ? prErr.message : String(prErr)}`,
			event: "finalize_review",
			number: input.number,
			headSha: input.headSha,
			dispatchId: input.dispatchId,
			error: prErr instanceof Error ? prErr.message : String(prErr),
			runId,
			action: "pr_fetch_failed",
		});
		await cleanupPending(bucket, input.number, input.headSha, input.dispatchId);
		return { finalized: false, reason: "pr_fetch_failed" };
	}
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

	// ── 3. Idempotency-guard: skip if already finalized (comment mode only) ───
	// In log mode we never post to GitHub so there is nothing to be idempotent
	// about — always complete the review and log it. In comment mode we check
	// the bot comment to avoid posting the same review twice for the same head.
	// getIssueComments is only needed in comment mode; skip the GitHub round-trip
	// entirely in log mode.
	let botComment: GitHubIssueComment | null = null;
	if (reviewMode === "comment") {
		let allComments: Awaited<ReturnType<typeof getIssueComments>>;
		try {
			allComments = await getIssueComments(token, input.number);
		} catch (commentsErr) {
			// Treat a failed comment fetch as "not yet finalized" so finalize
			// proceeds rather than crashing the workflow.
			console.log({
				message: `Finalize: failed to fetch comments for PR #${input.number} — treating as not finalized`,
				event: "finalize_review",
				number: input.number,
				error:
					commentsErr instanceof Error
						? commentsErr.message
						: String(commentsErr),
				runId,
				action: "comments_fetch_failed",
			});
			allComments = [];
		}
		botComment =
			allComments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ?? null;
		const alreadyFinalizedSha = extractReviewedHeadSha(
			botComment?.body ?? null,
		);
		// Allow re-finalization when the existing comment is pending (in-progress
		// placeholder) or a failure comment — both are retryable states. A failure
		// comment sets <!-- status: failure --> so a subsequent /review for the
		// same head SHA is not permanently blocked.
		const isRetryableStatus =
			botComment?.body?.includes("<!-- status: pending -->") ||
			botComment?.body?.includes("<!-- status: failure -->");
		if (alreadyFinalizedSha === input.headSha && !isRetryableStatus) {
			console.log({
				message: `Finalize skipped: PR #${input.number} headSha ${input.headSha.slice(0, 7)} already finalized`,
				event: "finalize_review",
				number: input.number,
				headSha: input.headSha,
				dispatchId: input.dispatchId,
				runId,
				action: "already_finalized",
			});
			await cleanupPending(
				bucket,
				input.number,
				input.headSha,
				input.dispatchId,
			);
			return { finalized: false, reason: "already_finalized" };
		}
	}

	// ── 4. Reconcile all review streams ──────────────────────────────────────
	const prDir = `diffs/pr-${input.number}`;
	const previousReviewKey = ctx.previousReviewedSha
		? `${prDir}/review-${ctx.previousReviewedSha}.json`
		: null;
	let previousCodeFindings: CodeReviewFinding[] = [];
	let previousStyleFindings: StyleGuideFinding[] = [];
	let previousConventionsFindings: CodeReviewFinding[] = [];
	if (previousReviewKey) {
		try {
			const obj = await bucket.get(previousReviewKey);
			if (obj) {
				const parsed = JSON.parse(await obj.text());
				if (Array.isArray(parsed)) {
					// Legacy bare array = style-only review.
					previousStyleFindings = parsed as StyleGuideFinding[];
				} else {
					previousCodeFindings = (parsed.code ?? []) as CodeReviewFinding[];
					previousStyleFindings = (parsed.style ?? []) as StyleGuideFinding[];
					previousConventionsFindings = (parsed.conventions ??
						[]) as CodeReviewFinding[];
				}
			}
		} catch {
			// Non-fatal — fall back to empty previous findings.
		}
	}

	// Create the reconcile agent (same setup as before).
	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
		skills: [reconcileSkill],
	}));
	const harness = await init(agent);
	// Session key scoped to PR + headSha so re-runs for the same head reuse it.
	const sessionKey = `code-review-orchestrator:${input.number}:${input.headSha}`;
	const session = await harness.session(sessionKey);

	/**
	 * Reconcile one stream through the LLM reconciler.
	 * diffModeOverride lets conventions force full-diff mode regardless of what
	 * the orchestrator decided for code/style.
	 */
	const reconcileStream = async (
		streamLabel: string,
		currentFindings: (CodeReviewFinding | StyleGuideFinding)[],
		reviewedFiles: string[],
		previousFindings: (CodeReviewFinding | StyleGuideFinding)[],
		fallbackSummary: string,
		diffModeOverride?: DiffMode,
	): Promise<ReconcileResult> => {
		const effectiveDiffMode = diffModeOverride ?? ctx.diffMode;
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

		let data: ReconcileResult | undefined;
		try {
			({ data } = await session.skill("reconcile-code-review", {
				model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
				args: {
					pullRequest: { number: input.number },
					currentFindings,
					reviewedFiles,
					previousFindings,
					humanComments: ctx.humanComments,
					diffMode: effectiveDiffMode,
				},
				result: ReconcileResultSchema,
			}));
		} catch (skillErr) {
			// Reconciler threw — degrade to current findings rather than crashing
			// finalize entirely.
			console.log({
				message: `Reconciliation error (${streamLabel}): PR #${input.number} — ${skillErr instanceof Error ? skillErr.message : String(skillErr)}`,
				event: "finalize_review",
				number: input.number,
				stream: streamLabel,
				error: skillErr instanceof Error ? skillErr.message : String(skillErr),
				runId,
				action: "reconciliation_error",
			});
			return {
				active: currentFindings,
				ignored_by_reviewer: [],
				resolved: [],
				summary: fallbackSummary,
			};
		}

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

	// For degraded streams (specialist failed), carry previous findings forward
	// as active rather than reconciling — an empty degraded result must not
	// falsely resolve prior findings that the specialist never actually reviewed.
	const fullDiff: DiffMode = { type: "full" };

	const reconciledCode = codeOk
		? await reconcileStream(
				"code",
				codeResult.findings,
				codeResult.reviewedFiles,
				previousCodeFindings,
				codeResult.findings.length === 0
					? "No code review issues found."
					: `${codeResult.findings.length} finding(s); no prior review to reconcile against.`,
			)
		: {
				active: previousCodeFindings,
				ignored_by_reviewer: [],
				resolved: [],
				summary:
					"Code review could not complete — prior findings carried forward.",
			};

	const reconciledStyle = styleOk
		? await reconcileStream(
				"style",
				styleResult.findings,
				styleResult.reviewedFiles,
				previousStyleFindings,
				styleResult.findings.length === 0
					? "No style-guide issues found."
					: `${styleResult.findings.length} finding(s); no prior review to reconcile against.`,
			)
		: {
				active: previousStyleFindings,
				ignored_by_reviewer: [],
				resolved: [],
				summary:
					"Style-guide review could not complete — prior findings carried forward.",
			};

	// Conventions always reconciles with full diff mode (PR description is always
	// the current state, regardless of what the code/style diff mode is).
	const reconciledConventions = conventionsOk
		? await reconcileStream(
				"conventions",
				conventionsResult.findings,
				conventionsResult.reviewedFiles,
				previousConventionsFindings,
				conventionsResult.findings.length === 0
					? "No convention issues found."
					: `${conventionsResult.findings.length} finding(s); no prior review to reconcile against.`,
				fullDiff,
			)
		: {
				active: previousConventionsFindings,
				ignored_by_reviewer: [],
				resolved: [],
				summary:
					"Conventions check could not complete — prior findings carried forward.",
			};

	// Clean up the reconciliation session — same pattern as the specialist DOs.
	await session.delete().catch(() => {});

	// ── 5. Persist findings to R2 ─────────────────────────────────────────────
	const currentReviewKey = `${prDir}/review-${input.headSha}.json`;
	await bucket.put(
		currentReviewKey,
		JSON.stringify({
			code: reconciledCode.active,
			style: reconciledStyle.active,
			conventions: reconciledConventions.active,
		}),
	);

	// ── 6. Render the comment ─────────────────────────────────────────────────
	// Failure comment only when both code AND style failed. Conventions
	// failures alone still render the main review with degraded notices.
	const bothFailed = !codeOk && !styleOk;
	const commentBody = bothFailed
		? renderFailureComment(input.headSha)
		: renderComment(
				{
					code: reconciledCode,
					style: reconciledStyle,
					conventions: reconciledConventions,
					codeFailed: !codeOk,
					styleFailed: !styleOk,
					conventionsFailed: !conventionsOk,
				},
				input.headSha,
				ctx.forceFullReview,
				input.number,
			);

	// ── 7. Log or post ────────────────────────────────────────────────────────
	const totalActive =
		reconciledCode.active.length +
		reconciledStyle.active.length +
		reconciledConventions.active.length;
	const totalIgnored =
		reconciledCode.ignored_by_reviewer.length +
		reconciledStyle.ignored_by_reviewer.length +
		reconciledConventions.ignored_by_reviewer.length;
	const totalResolved =
		reconciledCode.resolved.length +
		reconciledStyle.resolved.length +
		reconciledConventions.resolved.length;

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
		// On failure: skip slot consumption and pending cleanup so the next push
		// retries (the review was prepared but never delivered).
		try {
			await postOrUpdateComment(token, input.number, botComment, commentBody);
		} catch (postErr) {
			console.log({
				message: `Finalize: failed to post comment for PR #${input.number} — skipping slot consumption and cleanup`,
				event: "finalize_review",
				number: input.number,
				error: postErr instanceof Error ? postErr.message : String(postErr),
				runId,
				action: "comment_post_failed",
			});
			return { finalized: false, reason: "comment_post_failed" };
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
	// Only when both code and style specialists succeeded and this was an
	// automatic (not codeowner-bypassed) run. Conventions failures do not block
	// slot consumption — they carry less risk and may self-resolve.
	if (!ctx.bypassReviewLimit && codeOk && styleOk) {
		await markAutoReviewCompleted(bucket, input.number, input.headSha).catch(
			(slotErr) => {
				console.log({
					message: `Finalize: failed to mark auto-review slot for PR #${input.number} — slot may remain unconsumed`,
					event: "finalize_review",
					number: input.number,
					error: slotErr instanceof Error ? slotErr.message : String(slotErr),
					runId,
					action: "mark_auto_review_failed",
				});
			},
		);
	}

	// ── 9. Clean up the pending namespace ─────────────────────────────────────
	// Non-fatal: the review was already delivered. Log and return success anyway
	// so finalize does not appear to retry against an already-finalized head.
	try {
		await cleanupPending(bucket, input.number, input.headSha, input.dispatchId);
	} catch (cleanupErr) {
		console.log({
			message: `Finalize: pending namespace cleanup failed for PR #${input.number} — orphaned keys will be overwritten on retry`,
			event: "finalize_review",
			number: input.number,
			error:
				cleanupErr instanceof Error ? cleanupErr.message : String(cleanupErr),
			runId,
			action: "cleanup_failed",
		});
	}

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
