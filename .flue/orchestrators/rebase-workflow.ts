/**
 * RebaseWorkflow — durable /rebase pipeline (D6).
 *
 * Cloudflare `WorkflowEntrypoint` that replaces the 0.11 `workflows/rebase.ts`.
 * Re-exported from `cloudflare.ts` (picked up by `export * from cloudflare.ts`);
 * bound as `REBASE` in `wrangler.jsonc`. Kicked from `pipeline-entry.ts` for the
 * `/rebase` codeowner command.
 *
 * Flow (each phase is a durable step with its own error handling, mirroring
 * ReviewOrchestrator):
 *   1. prepare  — token, fetch PR, validate base==production + not a fork, post
 *      the "in progress" status. Terminal halts (wrong base / fork) post their
 *      status and swap 👀→👎 here.
 *   2. attempt  — GitHub update-branch (rebase). Clean → complete; conflict →
 *      step 3; API error → failed.
 *   3. resolve  — AI-assisted conflict resolution (`resolveConflictsWithAI`
 *      driving the rebase-conflict-resolver agent) + `applyResolution` on high
 *      confidence. Medium/low → halted-confidence.
 *   4. trigger  — on any successful rebase, kick a fresh full review via
 *      `REVIEW_ORCHESTRATOR.create({ forceFullReview, bypassReviewLimit })`.
 *
 * All GitHub side-effects (comments, reactions, refs, commits) stay in trusted
 * TS; the agent only reasons and submits (D5).
 */
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import type { ReviewOrchestratorParams } from "../cloudflare";
import {
	addReactionToComment,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	pollForBranchUpdate,
	removeReactionFromComment,
	updatePullRequestBranch,
	type GitHubIssueComment,
} from "../lib/github";
import { partitionComments, type RebaseStatus } from "../lib/code-review-state";
import {
	postOrUpdateComment,
	renderRebaseStatusUpdate,
} from "../lib/code-review-render";
import {
	applyResolution,
	resolveConflictsWithAI,
} from "../lib/rebase-conflict";
import { runRebaseConflictAgent } from "../lib/run-rebase-conflict";

/** Params carried in the Workflow instance payload (built by pipeline-entry). */
export interface RebaseParams {
	prNumber: number;
	triggerCommentId: number;
	triggerEyesReactionId: number | null;
	senderLogin: string;
}

interface RebaseEnv {
	REVIEW_ORCHESTRATOR: Workflow<ReviewOrchestratorParams>;
	[key: string]: unknown;
}

/** Locate the shared code-review bot comment on the PR (holds the rebase status line). */
async function findBotComment(
	token: string,
	prNumber: number,
): Promise<GitHubIssueComment | null> {
	const { botComment } = partitionComments(
		await getIssueComments(token, prNumber),
	);
	return botComment;
}

/** Post/update the rebase status line into the shared bot comment. */
async function postRebaseStatus(
	token: string,
	prNumber: number,
	status: RebaseStatus,
	detail: string | undefined,
	senderLogin: string,
): Promise<void> {
	const botComment = await findBotComment(token, prNumber);
	const body = renderRebaseStatusUpdate(
		status,
		detail,
		senderLogin,
		botComment?.body ?? null,
	);
	await postOrUpdateComment(token, prNumber, botComment, body);
}

/**
 * Replace the 👀 reaction on the trigger comment with a result indicator.
 * success true → 👍 (rebase completed); false → 👎 (halted or failed).
 */
async function swapReaction(
	token: string,
	commentId: number,
	eyesReactionId: number | null,
	success: boolean,
): Promise<void> {
	if (eyesReactionId) {
		await removeReactionFromComment(token, commentId, eyesReactionId).catch(
			() => {},
		);
	}
	await addReactionToComment(token, commentId, success ? "+1" : "-1").catch(
		() => {},
	);
}

type PrepareResult =
	| { phase: "token-error" }
	| { phase: "halt"; reason: string }
	| { phase: "proceed"; priorSha: string };

type AttemptResult =
	| { outcome: "clean"; async: boolean; priorSha: string }
	| { outcome: "conflict" }
	| { outcome: "error"; message: string };

export class RebaseWorkflow extends WorkflowEntrypoint<
	RebaseEnv,
	RebaseParams
> {
	async run(
		event: Readonly<WorkflowEvent<RebaseParams>>,
		step: WorkflowStep,
	): Promise<Record<string, unknown>> {
		const env = this.env;
		const { prNumber, triggerCommentId, triggerEyesReactionId, senderLogin } =
			event.payload;
		const ghEnv = env as unknown as Record<string, string>;

		// ── 1. Prepare: token, fetch PR, validate, post in-progress ─────────────
		const prep = await step.do<PrepareResult>("prepare", async () => {
			let token: string;
			try {
				token = await getInstallationToken(ghEnv);
			} catch (err) {
				console.log({
					message: `Rebase: failed to acquire token for PR #${prNumber}: ${err instanceof Error ? err.message : String(err)}`,
					event: "rebase_workflow",
					number: prNumber,
					action: "token_acquisition_failed",
				});
				// 👀 cannot be cleaned up without a token — return early.
				return { phase: "token-error" };
			}

			const pr = await getPullRequest(token, prNumber);

			// Validate: must target production, must not be a fork.
			if (pr.base.ref !== "production") {
				await postRebaseStatus(
					token,
					prNumber,
					"halted-wrong-base",
					pr.base.ref,
					senderLogin,
				);
				await swapReaction(
					token,
					triggerCommentId,
					triggerEyesReactionId,
					false,
				);
				return { phase: "halt", reason: "wrong_base" };
			}

			// head.repo can be null when the fork has been deleted — treat as fork.
			const isFork = (pr.head.repo?.full_name ?? "") !== pr.base.repo.full_name;
			if (isFork) {
				await postRebaseStatus(
					token,
					prNumber,
					"halted-fork",
					undefined,
					senderLogin,
				);
				await swapReaction(
					token,
					triggerCommentId,
					triggerEyesReactionId,
					false,
				);
				return { phase: "halt", reason: "fork" };
			}

			await postRebaseStatus(
				token,
				prNumber,
				"in-progress",
				undefined,
				senderLogin,
			);

			return { phase: "proceed", priorSha: pr.head.sha };
		});

		if (prep.phase === "token-error") {
			return { acted: false, reason: "token_error" };
		}
		if (prep.phase === "halt") {
			return { acted: false, reason: prep.reason };
		}

		// ── 2. Attempt the rebase via the update-branch API ─────────────────────
		const attempt = await step.do<AttemptResult>("attempt", async () => {
			const token = await getInstallationToken(ghEnv);
			try {
				const result = await updatePullRequestBranch(token, prNumber, "rebase");
				if (result.ok) {
					return {
						outcome: "clean",
						async: result.async === true,
						priorSha: prep.priorSha,
					};
				}
				// 422 conflict — fall through to AI resolution.
				return { outcome: "conflict" };
			} catch (err) {
				return {
					outcome: "error",
					message: err instanceof Error ? err.message : String(err),
				};
			}
		});

		if (attempt.outcome === "error") {
			await step.do("attempt-failed", async () => {
				const token = await getInstallationToken(ghEnv);
				await postRebaseStatus(
					token,
					prNumber,
					"failed",
					attempt.message,
					senderLogin,
				);
				await swapReaction(
					token,
					triggerCommentId,
					triggerEyesReactionId,
					false,
				);
				return { posted: true };
			});
			return { acted: false, reason: "api_error", error: attempt.message };
		}

		// ── 3a. Clean rebase ─────────────────────────────────────────────────────
		if (attempt.outcome === "clean") {
			await step.do("finish-clean", async () => {
				const token = await getInstallationToken(ghEnv);
				// Async (202): poll until the head SHA changes. Timeout is treated as
				// success — the subsequent full review runs against the current head.
				if (attempt.async) {
					await pollForBranchUpdate(token, prNumber, attempt.priorSha).catch(
						() => null,
					);
				}
				await postRebaseStatus(
					token,
					prNumber,
					"complete",
					undefined,
					senderLogin,
				);
				await swapReaction(
					token,
					triggerCommentId,
					triggerEyesReactionId,
					true,
				);
				return { posted: true };
			});

			await this.triggerFullReview(step, env, prNumber, "rebase_complete");
			console.log({
				message: `Rebase complete for PR #${prNumber}`,
				event: "rebase_workflow",
				number: prNumber,
				action: "rebase_complete",
			});
			return { acted: true, reason: "rebase_complete" };
		}

		// ── 3b. Conflict: AI-assisted resolution + apply ────────────────────────
		const resolve = await step.do<{
			result: "applied" | "halted" | "failed";
			confidence?: string;
			reason?: string;
			error?: string;
		}>("resolve-and-apply", async () => {
			const token = await getInstallationToken(ghEnv);
			try {
				const pr = await getPullRequest(token, prNumber);
				const resolution = await resolveConflictsWithAI(token, pr, (input) =>
					runRebaseConflictAgent(
						input,
						`${event.instanceId}:rebase-conflict:${pr.head.sha}`,
					),
				);

				if (resolution.confidence === "high") {
					await applyResolution(token, pr, resolution);
					await postRebaseStatus(
						token,
						prNumber,
						"complete",
						undefined,
						senderLogin,
					);
					await swapReaction(
						token,
						triggerCommentId,
						triggerEyesReactionId,
						true,
					);
					return { result: "applied" };
				}

				// Medium/low confidence — stop and explain.
				await postRebaseStatus(
					token,
					prNumber,
					"halted-confidence",
					resolution.reason,
					senderLogin,
				);
				await swapReaction(
					token,
					triggerCommentId,
					triggerEyesReactionId,
					false,
				);
				return {
					result: "halted",
					confidence: resolution.confidence,
					reason: resolution.reason,
				};
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				await postRebaseStatus(
					token,
					prNumber,
					"failed",
					`AI conflict resolution failed: ${message}`,
					senderLogin,
				).catch(() => {});
				await swapReaction(
					token,
					triggerCommentId,
					triggerEyesReactionId,
					false,
				).catch(() => {});
				return { result: "failed", error: message };
			}
		});

		if (resolve.result === "applied") {
			await this.triggerFullReview(step, env, prNumber, "ai_rebase_complete");
			console.log({
				message: `AI rebase complete for PR #${prNumber}`,
				event: "rebase_workflow",
				number: prNumber,
				action: "ai_rebase_complete",
			});
			return { acted: true, reason: "ai_rebase_complete" };
		}

		if (resolve.result === "failed") {
			return {
				acted: false,
				reason: "ai_resolution_error",
				error: resolve.error,
			};
		}

		return {
			acted: false,
			reason:
				resolve.confidence === "medium"
					? "medium_confidence"
					: "low_confidence",
			confidence: resolve.confidence,
		};
	}

	/**
	 * Kick a fresh full review after a successful rebase. The rebase changes the
	 * head SHA so an incremental review would be wrong; force a full re-review and
	 * bypass the auto-review limit. Non-fatal — the rebase already succeeded.
	 */
	private async triggerFullReview(
		step: WorkflowStep,
		env: RebaseEnv,
		prNumber: number,
		context: string,
	): Promise<void> {
		await step.do(`trigger-review-${context}`, async () => {
			try {
				await env.REVIEW_ORCHESTRATOR.create({
					params: {
						number: prNumber,
						forceFullReview: true,
						bypassReviewLimit: true,
					},
				});
				return { triggered: true };
			} catch (err) {
				console.log({
					message: `Could not trigger full review after ${context} for PR #${prNumber}: ${err instanceof Error ? err.message : String(err)}`,
					event: "rebase_workflow",
					number: prNumber,
					action: "review_trigger_failed",
				});
				return { triggered: false };
			}
		});
	}
}
