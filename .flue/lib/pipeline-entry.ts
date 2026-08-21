/**
 * Webhook → durable pipeline entry point.
 *
 * `app.ts` verifies the HMAC and classifies the event, then calls
 * `startReviewPipeline` for actionable events. This is the single seam between
 * the (stateless) HTTP ingress and the durable orchestration. It stays fast:
 * every long-running path is a Cloudflare Workflow that this function *kicks*
 * and returns from immediately, so the webhook always answers within GitHub's
 * delivery timeout. The only inline GitHub calls are the codeowner
 * authorization + reaction bookkeeping for slash commands, and the codeowner
 * check for spam-filter events (to decide whether a codeowner skips the
 * INGEST gate). These are a handful of sub-second API calls.
 *
 * Routing (ports the 0.11 `orchestrate` workflow):
 *   - codeowner slash command → handled inline (auth, 👀/👍, kick workflow or
 *     set an R2 flag).
 *   - Dependabot PR event → `DEPENDABOT_REVIEW` (skips the spam gate).
 *   - spam-filter event (issue / non-Dependabot PR):
 *       · sender is a codeowner → skip the gate; kick `REVIEW_ORCHESTRATOR`
 *         directly for a non-draft PR.
 *       · otherwise → `INGEST`, which runs the spam gate and, for a clean
 *         non-draft PR, kicks the review itself.
 *
 * The durable orchestrators drive the specialist Flue agents via bindings
 * (`init().dispatch().read()` from inside Workflow steps) — there is no
 * worker-to-worker HTTP and no internal-auth surface.
 */
import type { ReviewOrchestratorParams } from "../cloudflare";
import type { DependabotReviewParams } from "../orchestrators/dependabot-review-workflow";
import type { RebaseParams } from "../orchestrators/rebase-workflow";
import type { IngestParams } from "../orchestrators/ingest-workflow";
import {
	addReactionToComment,
	getInstallationToken,
	isCodeOwner,
} from "./github";
import {
	setAutoReviewDisabled,
	setReviewLimitIgnored,
} from "./code-review-state";
import type { WebhookClassification } from "./webhook-classify";

export interface PipelineEnv {
	DOCS_FLUE_BUCKET: R2Bucket;
	DOCS_FLUE_REVIEW_MODE?: string;
	/** Personal/org token (read:org) for codeowner team-membership checks. */
	GITHUB_ORG_TOKEN?: string;
	/** App-owned Cloudflare Workflows. */
	REVIEW_ORCHESTRATOR: Workflow<ReviewOrchestratorParams>;
	DEPENDABOT_REVIEW: Workflow<DependabotReviewParams>;
	REBASE: Workflow<RebaseParams>;
	INGEST: Workflow<IngestParams>;
	[key: string]: unknown;
}

/** Route an actionable webhook classification into the durable pipeline. */
export async function startReviewPipeline(
	env: PipelineEnv,
	c: WebhookClassification,
	_rawBody: string,
): Promise<void> {
	const number = c.number;
	if (number === undefined) return;

	// ── 1. Codeowner slash commands (handled inline) ────────────────────────
	if (c.command) {
		await handleCommand(env, c, number);
		return;
	}

	// ── 2. Dependabot PR event → dependabot review (skips the spam gate) ─────
	if (c.isDependabotReviewEvent) {
		await env.DEPENDABOT_REVIEW.create({ params: { number } });
		log("dependabot-review", c, number, "dependabot_review_kicked");
		return;
	}

	// ── 3. Spam-filter event (issue / non-Dependabot PR) ────────────────────
	if (c.isSpamFilterEvent) {
		const ghEnv = env as unknown as Record<string, string>;

		// Codeowners skip the spam gate — their issues and PRs are never spam.
		let codeowner = false;
		if (c.senderLogin) {
			try {
				const token = await getInstallationToken(ghEnv);
				codeowner = await isCodeOwner(
					token,
					env.GITHUB_ORG_TOKEN ?? "",
					c.senderLogin,
				);
			} catch {
				codeowner = false;
			}
		}

		const draftSkipped = c.isDraft && c.action !== "ready_for_review";

		if (codeowner) {
			// Skip the gate; kick the review directly for a non-draft PR.
			if (c.isCodeReviewEvent && !draftSkipped) {
				await env.REVIEW_ORCHESTRATOR.create({ params: { number } });
				log("code-review", c, number, "review_kicked_codeowner_skip_spam");
			} else {
				log("spam-filter", c, number, "codeowner_skip_no_review");
			}
			return;
		}

		// Non-codeowner → durable spam gate (kicks the review itself if clean).
		await env.INGEST.create({
			params: {
				eventType: c.eventType === "issues" ? "issues" : "pull_request",
				number,
				isPullRequest: c.eventType === "pull_request",
				isDraft: c.isDraft,
				action: c.action,
			},
		});
		log("ingest", c, number, "ingest_kicked");
		return;
	}

	log("none", c, number, "classified_pending_route");
}

// ── Command handling ────────────────────────────────────────────────────────

async function handleCommand(
	env: PipelineEnv,
	c: WebhookClassification,
	number: number,
): Promise<void> {
	const ghEnv = env as unknown as Record<string, string>;
	const commentId = c.commentId;
	const sender = c.senderLogin;
	if (!commentId || !sender) {
		log(`command:${c.command}`, c, number, "command_missing_comment_or_sender");
		return;
	}

	// Authorize: the command only runs for codeowners.
	let token: string;
	let codeowner: boolean;
	try {
		token = await getInstallationToken(ghEnv);
		codeowner = await isCodeOwner(token, env.GITHUB_ORG_TOKEN ?? "", sender);
	} catch (err) {
		log(
			`command:${c.command}`,
			c,
			number,
			"command_auth_failed",
			err instanceof Error ? err.message : String(err),
		);
		return;
	}
	if (!codeowner) {
		log(`command:${c.command}`, c, number, "command_ignored_not_codeowner");
		return;
	}

	switch (c.command) {
		case "ignore-review-limit": {
			try {
				await setReviewLimitIgnored(env.DOCS_FLUE_BUCKET, number, sender);
			} catch (err) {
				log(
					"command:ignore-review-limit",
					c,
					number,
					"command_write_failed",
					err instanceof Error ? err.message : String(err),
				);
				return;
			}
			await addReactionToComment(token, commentId, "+1").catch(() => {});
			log("command:ignore-review-limit", c, number, "ignore_review_limit_set");
			return;
		}

		case "disable-auto-review": {
			try {
				await setAutoReviewDisabled(env.DOCS_FLUE_BUCKET, number, sender);
			} catch (err) {
				log(
					"command:disable-auto-review",
					c,
					number,
					"command_write_failed",
					err instanceof Error ? err.message : String(err),
				);
				return;
			}
			await addReactionToComment(token, commentId, "+1").catch(() => {});
			log("command:disable-auto-review", c, number, "auto_review_disabled");
			return;
		}

		case "rebase": {
			const eyes = await addReactionToComment(token, commentId, "eyes").catch(
				() => null,
			);
			await env.REBASE.create({
				params: {
					prNumber: number,
					triggerCommentId: commentId,
					triggerEyesReactionId: eyes,
					senderLogin: sender,
				},
			});
			log("command:rebase", c, number, "rebase_kicked");
			return;
		}

		case "review":
		case "full-review": {
			const eyes = await addReactionToComment(token, commentId, "eyes").catch(
				() => null,
			);
			// Dependabot PR: /review + /full-review route to the Dependabot path.
			if (c.commentPrAuthorLogin === "dependabot[bot]") {
				await env.DEPENDABOT_REVIEW.create({
					params: {
						number,
						triggerCommentId: commentId,
						triggerEyesReactionId: eyes,
					},
				});
				log(`command:${c.command}`, c, number, "dependabot_review_kicked");
				return;
			}
			await env.REVIEW_ORCHESTRATOR.create({
				params: {
					number,
					forceFullReview: c.command === "full-review",
					bypassReviewLimit: true,
					triggerCommentId: commentId,
					triggerEyesReactionId: eyes,
				},
			});
			log(`command:${c.command}`, c, number, "review_kicked");
			return;
		}
	}
}

// ── Logging ──────────────────────────────────────────────────────────────────

function log(
	route: string,
	c: WebhookClassification,
	number: number,
	action: string,
	error?: string,
): void {
	console.log({
		message: `Webhook pipeline: ${route} for #${number} → ${action}`,
		event: "pipeline_entry",
		route,
		number,
		eventType: c.eventType,
		action: c.action,
		sender: c.senderLogin,
		action_taken: action,
		...(error ? { error } : {}),
	});
}
