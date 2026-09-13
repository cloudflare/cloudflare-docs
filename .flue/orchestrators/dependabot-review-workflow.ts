/**
 * DependabotReviewWorkflow — durable Dependabot review pipeline (D6).
 *
 * Cloudflare `WorkflowEntrypoint` that replaces the 0.11
 * `workflows/dependabot-review.ts`. Re-exported from `cloudflare.ts` so the
 * generated Worker entry (`export * from cloudflare.ts`) picks it up; bound as
 * `DEPENDABOT_REVIEW` in `wrangler.jsonc`. Kicked from `pipeline-entry.ts` for
 * Dependabot PRs (opened/reopened/synchronize/ready_for_review) and for
 * `/review`/`/full-review` commands on Dependabot PRs.
 *
 * Steps: fetch PR + parse packages → placeholder (comment mode) → drive the
 * `dependabot-reviewer` agent (`lib/run-dependabot-review.ts`) → render + post
 * (or log), swapping 👀→👍 on the trigger comment. All GitHub side-effects stay
 * in trusted TS; the agent only reasons and submits (D5).
 *
 * `DOCS_FLUE_REVIEW_MODE`: `log` (default) renders and logs without posting;
 * `comment` creates/updates the single Dependabot review comment.
 */
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import {
	addReactionToComment,
	getInstallationToken,
	getPullRequest,
	removeReactionFromComment,
} from "../lib/github";
import {
	BOT_COMMENT_MARKER,
	type DependabotPackage,
	type DependabotReviewResult,
	findExistingBotComment,
	parseDependabotPackages,
	postOrUpdateComment,
	renderComment,
} from "../lib/dependabot-review";
import { runDependabotReview } from "../lib/run-dependabot-review";

/** Params carried in the Workflow instance payload (built by pipeline-entry). */
export interface DependabotReviewParams {
	number: number;
	/** Comment id that triggered a /review — 👀→👍 swapped on it when done. */
	triggerCommentId?: number;
	/** Reaction id of the 👀 to remove when the review completes. */
	triggerEyesReactionId?: number | null;
}

interface DependabotEnv {
	DOCS_FLUE_REVIEW_MODE?: string;
	[key: string]: unknown;
}

interface FetchPrOutput {
	isDependabot: boolean;
	author: string;
	title: string;
	body: string;
	headSha: string;
	packages: DependabotPackage[];
}

function inProgressBody(prNumber: number, packageCount: number): string {
	return [
		BOT_COMMENT_MARKER,
		`<!-- pr: ${prNumber} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Dependabot review",
		"",
		`⏳ Review in progress for **${packageCount}** package${packageCount !== 1 ? "s" : ""}…`,
	].join("\n");
}

function failureBody(prNumber: number): string {
	return [
		BOT_COMMENT_MARKER,
		`<!-- pr: ${prNumber} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Dependabot review",
		"",
		"❌ Review failed — this is usually a transient error. It will retry on the next push.",
	].join("\n");
}

export class DependabotReviewWorkflow extends WorkflowEntrypoint<
	DependabotEnv,
	DependabotReviewParams
> {
	async run(
		event: Readonly<WorkflowEvent<DependabotReviewParams>>,
		step: WorkflowStep,
	): Promise<Record<string, unknown>> {
		const env = this.env;
		const params = event.payload;
		const runId = event.instanceId;
		const number = params.number;
		const reviewMode = env.DOCS_FLUE_REVIEW_MODE ?? "log";
		const ghEnv = env as unknown as Record<string, string>;

		// ── 1. Fetch PR metadata + parse packages ───────────────────────────────
		const ctx = await step.do<FetchPrOutput>("fetch-pr", async () => {
			const token = await getInstallationToken(ghEnv);
			const pr = await getPullRequest(token, number);
			return {
				isDependabot: (pr.user?.login ?? "") === "dependabot[bot]",
				author: pr.user?.login ?? "",
				title: pr.title,
				body: pr.body ?? "",
				headSha: pr.head.sha,
				packages: parseDependabotPackages(pr.body ?? ""),
			};
		});

		if (!ctx.isDependabot) {
			return {
				acted: false,
				reason: "not_dependabot",
				author: ctx.author,
			};
		}
		if (ctx.packages.length === 0) {
			return { acted: false, reason: "no_packages_parsed" };
		}

		console.log({
			message: `Dependabot review started: PR #${number} — ${ctx.packages.length} package(s)`,
			event: "dependabot_review",
			number,
			packages: ctx.packages.map((p) => `${p.name} ${p.from}→${p.to}`),
			runId,
			action: "started",
		});

		// ── 2. Placeholder "in progress" comment (comment mode only) ────────────
		if (reviewMode === "comment") {
			await step.do("placeholder-comment", async () => {
				const token = await getInstallationToken(ghEnv);
				const existing = await findExistingBotComment(token, number);
				await postOrUpdateComment(
					token,
					number,
					existing,
					inProgressBody(number, ctx.packages.length),
				);
				return { posted: true };
			});
		}

		// ── 3. Run the dependabot reviewer agent ────────────────────────────────
		const review = await step.do<{
			ok: boolean;
			result: DependabotReviewResult | null;
		}>("review", async () => {
			try {
				const result = await runDependabotReview(
					{
						prNumber: number,
						prTitle: ctx.title,
						prBody: ctx.body,
						packages: ctx.packages,
					},
					`${runId}:dependabot:${ctx.headSha}`,
				);
				return { ok: true, result };
			} catch (err) {
				console.error({
					message: `Dependabot review agent failed: PR #${number} — ${err instanceof Error ? err.message : String(err)}`,
					event: "dependabot_review",
					number,
					runId,
					action: "agent_failed",
				});
				return { ok: false, result: null };
			}
		});

		if (!review.ok || !review.result) {
			if (reviewMode === "comment") {
				await step.do("publish-failure", async () => {
					const token = await getInstallationToken(ghEnv);
					const fresh = await findExistingBotComment(token, number);
					await postOrUpdateComment(
						token,
						number,
						fresh,
						failureBody(number),
					).catch(() => {});
					return { posted: true };
				});
			}
			return {
				acted: false,
				reason: "review_failed",
				packageCount: ctx.packages.length,
			};
		}

		const result = review.result;

		// ── 4. Render + post/log the final comment ──────────────────────────────
		const published = await step.do<{
			finalized: boolean;
			reason?: string;
		}>("publish", async () => {
			const token = await getInstallationToken(ghEnv);

			// Head-guard: a newer push already owns the comment — do not clobber it.
			const freshPr = await getPullRequest(token, number);
			if (freshPr.head.sha !== ctx.headSha) {
				console.log({
					message: `Dependabot review: head moved during review (was ${ctx.headSha.slice(0, 7)}, now ${freshPr.head.sha.slice(0, 7)}), skipping publish`,
					event: "dependabot_review",
					number,
					runId,
					action: "head_moved_skip_publish",
				});
				return { finalized: false, reason: "head_moved" };
			}

			const commentBody = renderComment(result, number);

			if (reviewMode === "log") {
				console.log({
					message: `Dependabot review complete (log mode): PR #${number} — ${ctx.packages.length} package(s), recommendation: ${result.recommendation}`,
					event: "dependabot_review",
					number,
					mode: reviewMode,
					recommendation: result.recommendation,
					packageCount: ctx.packages.length,
					runId,
					action: "complete_log_mode",
					commentBody,
				});
				return { finalized: true };
			}

			const fresh = await findExistingBotComment(token, number);
			await postOrUpdateComment(token, number, fresh, commentBody);

			// Swap 👀 → 👍 on the trigger comment if this was a slash-command run.
			if (params.triggerCommentId) {
				if (params.triggerEyesReactionId) {
					await removeReactionFromComment(
						token,
						params.triggerCommentId,
						params.triggerEyesReactionId,
					).catch(() => {});
				}
				await addReactionToComment(token, params.triggerCommentId, "+1").catch(
					() => {},
				);
			}

			console.log({
				message: `Dependabot review complete: PR #${number} — ${result.recommendation}`,
				event: "dependabot_review",
				number,
				mode: reviewMode,
				recommendation: result.recommendation,
				packageCount: ctx.packages.length,
				runId,
				action: "complete_comment_posted",
			});
			return { finalized: true };
		});

		if (!published.finalized) {
			return {
				acted: false,
				reason: published.reason ?? "not_finalized",
				packageCount: ctx.packages.length,
			};
		}

		return {
			acted: true,
			recommendation: result.recommendation,
			packageCount: ctx.packages.length,
			summary: result.summary,
		};
	}
}
