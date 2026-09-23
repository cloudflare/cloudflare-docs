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
 * Routing:
 *   - codeowner slash command → handled inline (auth, 👀/👍, kick workflow or
 *     set an R2 flag).
 *   - changelog date check (pull_request events) → handled inline: reconciles
 *     the changelog-date marker comment, then falls through to the routing
 *     below for non-closed events (additive; never replaces review routing).
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
import type { DependabotReviewParams } from "../orchestrators/dependabot-review-workflow";
import type { RebaseParams } from "../orchestrators/rebase-workflow";
import type { IngestParams } from "../orchestrators/ingest-workflow";
import {
	addReactionToComment,
	getInstallationToken,
	getPullRequest,
	isCodeOwner,
	type GitHubPullRequest,
} from "./github";
import { setAutoReviewDisabled } from "./review/state";
import { startReview, type ReviewWorkflowParams } from "./review/start";
import { reconcileChangelogDateComment } from "./changelog-date-check";
import { clearDraftStaleState, setDraftNeverStale } from "./draft-stale";
import type { WebhookClassification } from "./webhook-classify";

export interface PipelineEnv {
	DOCS_FLUE_BUCKET: R2Bucket;
	DOCS_FLUE_REVIEW_MODE?: string;
	/** Personal/org token (read:org) for codeowner team-membership checks. */
	GITHUB_ORG_TOKEN?: string;
	/** App-owned Cloudflare Workflows. */
	REVIEW_ORCHESTRATOR: Workflow<ReviewWorkflowParams>;
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

	// ── 1.5 Changelog date check (additive; never replaces review routing) ──
	// Runs inline like the codeowner commands: a handful of sub-second GitHub
	// API calls. For `closed` events this removes the marker comment and stops
	// (no other routing exists for closed); otherwise routing continues below.
	if (c.isChangelogDateEvent) {
		await runChangelogDateCheckSafely(env, c, number);
		if (c.action === "closed") return;
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
		let token: string | undefined;
		if (c.senderLogin) {
			try {
				token = await getInstallationToken(ghEnv);
				codeowner = await isCodeOwner(
					token!,
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
				const pr = await getPullRequest(token!, number);
				await startReview(env.REVIEW_ORCHESTRATOR, {
					number,
					headSha: pr.head.sha,
					trigger: "auto",
					action: c.action,
					fullReview: false,
				});
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
		case "disable-auto-review": {
			try {
				await setAutoReviewDisabled(env.DOCS_FLUE_BUCKET, number, true);
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

		case "draft-never-stale": {
			let pr: GitHubPullRequest;
			try {
				pr = await getPullRequest(token, number);
			} catch (err) {
				log(
					"command:draft-never-stale",
					c,
					number,
					"command_pr_fetch_failed",
					err instanceof Error ? err.message : String(err),
				);
				return;
			}
			if (pr.state !== "open" || !pr.draft) {
				log(
					"command:draft-never-stale",
					c,
					number,
					"command_ignored_not_draft",
				);
				return;
			}
			try {
				await setDraftNeverStale(env.DOCS_FLUE_BUCKET, number, sender);
			} catch (err) {
				log(
					"command:draft-never-stale",
					c,
					number,
					"command_write_failed",
					err instanceof Error ? err.message : String(err),
				);
				return;
			}
			await clearDraftStaleState(env.DOCS_FLUE_BUCKET, number).catch((err) => {
				log(
					"command:draft-never-stale",
					c,
					number,
					"stale_state_clear_failed",
					err instanceof Error ? err.message : String(err),
				);
			});
			await addReactionToComment(token, commentId, "+1").catch(() => {});
			log("command:draft-never-stale", c, number, "draft_never_stale_set");
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
			const pr = await getPullRequest(token, number);
			await startReview(env.REVIEW_ORCHESTRATOR, {
				number,
				headSha: pr.head.sha,
				trigger: "command",
				fullReview: c.command === "full-review",
				commentId,
				...(eyes ? { eyesReactionId: eyes } : {}),
				requestedBy: sender,
			});
			log(`command:${c.command}`, c, number, "review_kicked");
			return;
		}
	}
}

// ── Changelog date check ─────────────────────────────────────────────────────

/**
 * The changelog date check is deterministic trusted TypeScript (no agent): a
 * few sub-second GitHub API calls (PR fetch, PR files, per-file content,
 * comment list, one comment write), so it runs inline like the codeowner
 * commands. Failures are logged and never break the webhook response or the
 * review routing that follows for non-closed events.
 */
async function runChangelogDateCheckSafely(
	env: PipelineEnv,
	c: WebhookClassification,
	number: number,
): Promise<void> {
	const ghEnv = env as unknown as Record<string, string>;
	try {
		const token = await getInstallationToken(ghEnv);
		const pr = await getPullRequest(token, number);
		const result = await reconcileChangelogDateComment(token, pr);
		log("changelog-date", c, number, `changelog_date_${result.action.kind}`);
	} catch (err) {
		log(
			"changelog-date",
			c,
			number,
			"changelog_date_check_failed",
			err instanceof Error ? err.message : String(err),
		);
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
