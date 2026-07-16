/**
 * Orchestrator agent
 *
 * Receives GitHub webhooks (issues, pull_request events), verifies the
 * signature, and dispatches to the appropriate subagents:
 *
 * - dependabot-review: runs on PRs from dependabot[bot] (skips spam filter)
 * - spam-and-off-topic-filter: runs on opened/reopened/synchronize/ready_for_review (non-Dependabot)
 * - code-review-orchestrator: runs on PR opened/reopened/synchronize/ready_for_review
 *   (only if spam filter did not close the item, non-Dependabot)
 *
 * POST /workflows/orchestrate
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import {
	addReactionToComment,
	getInstallationToken,
	isCodeOwner,
	verifyGitHubSignature,
} from "../lib/github";
import { getInternalHeaders } from "../lib/internal-auth";
import { admitWorkflow, pollRun } from "../lib/poll-run";
import {
	setReviewLimitIgnored,
	setAutoReviewDisabled,
} from "../lib/code-review-state";
import {
	getIssueOrPullRequestLabel,
	getIssueOrPullRequestNumber,
	getIssueOrPullRequestTitle,
	getIssueOrPullRequestUrl,
	truncateLogValue,
} from "../lib/github-webhook";

export const route: WorkflowRouteHandler = async (_c, next) => next();

export async function run({ payload, env, req }: FlueContext) {
	// ── 1. Verify the GitHub webhook signature ─────────────────────────────
	const secret = (env as Record<string, string>).GITHUB_WEBHOOK_SECRET;
	const sig = req?.headers.get("x-hub-signature-256") ?? "";
	const delivery = req?.headers.get("x-github-delivery") ?? undefined;
	const eventType =
		(req?.headers.get("x-github-event") as string | null) ?? "unknown";
	const rawBody = req ? await req.text() : JSON.stringify(payload);

	if (!secret) {
		console.log({
			message: `GitHub webhook rejected: secret not configured`,
			event: "github_webhook_orchestrator",
			delivery,
			eventType,
			action: "rejected_secret_missing",
		});
		return new Response("Webhook secret not configured", { status: 500 });
	}

	if (!(await verifyGitHubSignature(rawBody, sig, secret))) {
		console.log({
			message: `GitHub webhook rejected: invalid signature`,
			event: "github_webhook_orchestrator",
			delivery,
			eventType,
			action: "rejected_invalid_signature",
		});
		return new Response("Unauthorized", { status: 401 });
	}

	const body = JSON.parse(rawBody) as Record<string, unknown>;
	const webhookAction = body.action;
	const number = getIssueOrPullRequestNumber(eventType, body);
	const title = getIssueOrPullRequestTitle(eventType, body);
	const _itemUrl = getIssueOrPullRequestUrl(eventType, body, number);
	const itemType = getIssueOrPullRequestLabel(eventType);
	const sender = body.sender as Record<string, unknown> | undefined;
	const senderLogin = sender?.login;
	const itemLabel = `${itemType}${number ? ` #${number}` : ""}${title ? ` "${truncateLogValue(title)}"` : ""}${senderLogin ? ` by @${senderLogin}` : ""}`;
	const webhookLabel = `${eventType}.${String(webhookAction ?? "unknown")} ${itemLabel}`;

	// console.log({
	// 	message: `GitHub webhook received: ${webhookLabel}`,
	// 	event: "github_webhook_orchestrator",
	// 	delivery,
	// 	eventType,
	// 	webhookAction,
	// 	number,
	// 	title,
	// 	sender: senderLogin,
	// 	action: "received",
	// });

	// ── 2. Route to the right pipeline ─────────────────────────────────────

	// Detect Dependabot PRs — route to the Dependabot review workflow instead
	// of the normal spam-filter → code-review pipeline.
	const prAuthorLogin = (
		(body.pull_request as Record<string, unknown> | undefined)?.user as
			| Record<string, unknown>
			| undefined
	)?.login as string | undefined;
	const isDependabotPr =
		eventType === "pull_request" && prAuthorLogin === "dependabot[bot]";

	const isSpamFilterEvent =
		!isDependabotPr &&
		["issues", "pull_request"].includes(eventType) &&
		(["opened", "reopened", "synchronize"].includes(webhookAction as string) ||
			(eventType === "pull_request" && webhookAction === "ready_for_review"));

	const isCodeReviewEvent =
		!isDependabotPr &&
		eventType === "pull_request" &&
		["opened", "reopened", "synchronize", "ready_for_review"].includes(
			webhookAction as string,
		);

	const isDependabotReviewEvent =
		isDependabotPr &&
		["opened", "reopened", "synchronize", "ready_for_review"].includes(
			webhookAction as string,
		);

	// Slash commands: issue_comment on a PR from a codeowner
	const commentBody = (body.comment as Record<string, unknown> | undefined)
		?.body as string | undefined;
	const trimmedComment = commentBody?.trim();
	const isOnPullRequest =
		eventType === "issue_comment" &&
		webhookAction === "created" &&
		(body.issue as Record<string, unknown> | undefined)?.pull_request !==
			undefined;
	const isFullReviewCommand =
		isOnPullRequest && trimmedComment === "/full-review";
	const isReviewCommand = isOnPullRequest && trimmedComment === "/review";
	const isIgnoreReviewLimitCommand =
		isOnPullRequest && trimmedComment === "/ignore-review-limit";
	const isDisableAutoReviewCommand =
		isOnPullRequest && trimmedComment === "/disable-auto-review";
	const isRebaseCommand = isOnPullRequest && trimmedComment === "/rebase";
	const isRebaseWithConflictsCommand =
		isOnPullRequest && trimmedComment === "/rebaseWithConflicts";

	if (
		!req ||
		(!isSpamFilterEvent &&
			!isCodeReviewEvent &&
			!isDependabotReviewEvent &&
			!isFullReviewCommand &&
			!isReviewCommand &&
			!isIgnoreReviewLimitCommand &&
			!isDisableAutoReviewCommand &&
			!isRebaseCommand &&
			!isRebaseWithConflictsCommand)
	) {
		return { acted: false, summary: "No action needed." };
	}

	if (!number) {
		return { acted: false, summary: "No issue or PR number found." };
	}

	// ── 3a. Handle Dependabot PR events ─────────────────────────────────────
	if (isDependabotReviewEvent) {
		const internalHeaders = getInternalHeaders(env as Record<string, string>);
		const baseUrl = new URL(req.url).origin;
		try {
			const runId = await admitWorkflow({
				baseUrl,
				pathname: `/workflows/dependabot-review`,
				headers: internalHeaders,
				body: { eventType: "pull_request", number },
			});
			console.log({
				message: `Dependabot review admitted: PR #${number} — runId: ${runId}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				runId,
				action: "dependabot_review_admitted",
			});
			return {
				acted: true,
				summary: `Dependabot review dispatched for PR #${number}.`,
			};
		} catch (err) {
			const errMsg = err instanceof Error ? err.message : String(err);
			console.log({
				message: `Dependabot review dispatch failed: ${webhookLabel}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				error: errMsg,
				action: "dependabot_review_dispatch_failed",
			});
			return {
				acted: false,
				summary: `Dependabot review dispatch failed: ${errMsg}`,
			};
		}
	}

	// ── 3–4b. Handle review slash commands (/full-review, /review) ─────────────
	if (isFullReviewCommand || isReviewCommand) {
		const commandName = isFullReviewCommand ? "full-review" : "review";

		const commentId = (body.comment as Record<string, unknown> | undefined)
			?.id as number | undefined;
		if (!commentId || !senderLogin) {
			return { acted: false, summary: "Missing comment id or sender." };
		}

		const typedEnv = env as Record<string, string>;
		const token = await getInstallationToken(typedEnv);
		const orgToken = typedEnv.GITHUB_ORG_TOKEN ?? "";
		const codeowner = await isCodeOwner(token, orgToken, senderLogin as string);
		if (!codeowner) {
			console.log({
				message: `${commandName} command ignored — ${senderLogin} is not a codeowner`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				action: `${commandName.replace(/-/g, "_")}_ignored_not_codeowner`,
			});
			return { acted: false, summary: "Commenter is not a codeowner." };
		}

		const eyesReactionId = await addReactionToComment(token, commentId, "eyes");
		// Read the PR author directly from the issue_comment webhook payload
		// (body.issue.user.login) rather than making an extra getPullRequest API
		// call that can fail and silently misroute Dependabot PRs.
		const prAuthorFromPayload = (
			(body.issue as Record<string, unknown> | undefined)?.user as
				| Record<string, unknown>
				| undefined
		)?.login as string | undefined;
		const internalHeaders = getInternalHeaders(typedEnv);
		const baseUrl = new URL(req.url).origin;
		const isDepBot = prAuthorFromPayload === "dependabot[bot]";

		const orchestratorBody = isDepBot
			? {
					eventType: "pull_request" as const,
					number,
					triggerCommentId: commentId,
					triggerEyesReactionId: eyesReactionId,
				}
			: {
					eventType: "pull_request" as const,
					number,
					forceFullReview: !isReviewCommand,
					bypassReviewLimit: true,
					triggerCommentId: commentId,
					triggerEyesReactionId: eyesReactionId,
				};

		try {
			const runId = await admitWorkflow({
				baseUrl,
				pathname: isDepBot
					? `/workflows/dependabot-review`
					: `/workflows/code-review-orchestrator`,
				headers: internalHeaders,
				body: orchestratorBody,
			});
			console.log({
				message: `${commandName} admitted by ${senderLogin}: PR #${number} — runId: ${runId}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				runId,
				action: `${commandName.replace(/-/g, "_")}_admitted`,
			});
			return {
				acted: true,
				summary: `${commandName} triggered by @${senderLogin}.`,
			};
		} catch (err) {
			const errMsg = err instanceof Error ? err.message : String(err);
			console.log({
				message: `${commandName} dispatch failed: PR #${number}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				error: errMsg,
				action: `${commandName.replace(/-/g, "_")}_dispatch_failed`,
			});
			return {
				acted: false,
				summary: `${commandName} dispatch failed: ${errMsg}`,
			};
		}
	}

	// ── 5. Handle /ignore-review-limit command ──────────────────────────────
	if (isIgnoreReviewLimitCommand) {
		const commentId = (body.comment as Record<string, unknown> | undefined)
			?.id as number | undefined;

		if (!commentId || !senderLogin) {
			return { acted: false, summary: "Missing comment id or sender." };
		}

		const typedEnv = env as Record<string, string>;
		const token = await getInstallationToken(typedEnv);
		const orgToken = typedEnv.GITHUB_ORG_TOKEN ?? "";
		const codeowner = await isCodeOwner(token, orgToken, senderLogin as string);

		if (!codeowner) {
			console.log({
				message: `Ignore review limit command ignored — ${senderLogin} is not a codeowner`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				action: "ignore_review_limit_ignored_not_codeowner",
			});
			return { acted: false, summary: "Commenter is not a codeowner." };
		}

		const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
		try {
			await setReviewLimitIgnored(bucket, number, senderLogin as string);
		} catch (writeErr) {
			console.log({
				message: `Failed to persist ignore-review-limit flag for PR #${number}: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				error: writeErr instanceof Error ? writeErr.message : String(writeErr),
				action: "ignore_review_limit_write_failed",
			});
			return {
				acted: false,
				summary: "Failed to persist review limit flag — please try again.",
			};
		}

		// Acknowledge with 👍 — non-fatal if the reaction fails; the flag is
		// already persisted.
		await addReactionToComment(token, commentId, "+1").catch((reactionErr) => {
			console.log({
				message: `ignore-review-limit: reaction failed for PR #${number} — flag was still set`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				error:
					reactionErr instanceof Error
						? reactionErr.message
						: String(reactionErr),
				action: "ignore_review_limit_reaction_failed",
			});
		});

		console.log({
			message: `Review limit permanently ignored by ${senderLogin}: PR #${number}`,
			event: "github_webhook_orchestrator",
			delivery,
			number,
			action: "ignore_review_limit_set",
		});

		return {
			acted: true,
			summary: `Review limit permanently ignored by @${senderLogin}.`,
		};
	}

	// ── 5b. Handle /disable-auto-review command ────────────────────────────────
	if (isDisableAutoReviewCommand) {
		const commentId = (body.comment as Record<string, unknown> | undefined)
			?.id as number | undefined;

		if (!commentId || !senderLogin) {
			return { acted: false, summary: "Missing comment id or sender." };
		}

		const typedEnv = env as Record<string, string>;
		const token = await getInstallationToken(typedEnv);
		const orgToken = typedEnv.GITHUB_ORG_TOKEN ?? "";
		const codeowner = await isCodeOwner(token, orgToken, senderLogin as string);

		if (!codeowner) {
			console.log({
				message: `disable-auto-review command ignored — ${senderLogin} is not a codeowner`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				action: "disable_auto_review_ignored_not_codeowner",
			});
			return { acted: false, summary: "Commenter is not a codeowner." };
		}

		const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
		try {
			await setAutoReviewDisabled(bucket, number, senderLogin as string);
		} catch (writeErr) {
			console.log({
				message: `Failed to persist disable-auto-review flag for PR #${number}: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				error: writeErr instanceof Error ? writeErr.message : String(writeErr),
				action: "disable_auto_review_write_failed",
			});
			return {
				acted: false,
				summary:
					"Failed to persist auto-review disable flag — please try again.",
			};
		}

		// Acknowledge with 👍 — non-fatal if the reaction fails; the flag is
		// already persisted.
		await addReactionToComment(token, commentId, "+1").catch((reactionErr) => {
			console.log({
				message: `disable-auto-review: reaction failed for PR #${number} — flag was still set`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				error:
					reactionErr instanceof Error
						? reactionErr.message
						: String(reactionErr),
				action: "disable_auto_review_reaction_failed",
			});
		});

		console.log({
			message: `Auto-review disabled by ${senderLogin}: PR #${number}`,
			event: "github_webhook_orchestrator",
			delivery,
			number,
			action: "auto_review_disabled",
		});

		return {
			acted: true,
			summary: `Auto-review disabled by @${senderLogin}. Push-triggered reviews will no longer run. Codeowners can still use /review or /full-review.`,
		};
	}

	// ── 5c. Handle /rebase and /rebaseWithConflicts commands ─────────────────────
	if (isRebaseCommand || isRebaseWithConflictsCommand) {
		const commandName = isRebaseCommand ? "rebase" : "rebaseWithConflicts";
		const commentId = (body.comment as Record<string, unknown> | undefined)
			?.id as number | undefined;

		if (!commentId || !senderLogin) {
			return { acted: false, summary: "Missing comment id or sender." };
		}

		const typedEnv = env as Record<string, string>;
		const token = await getInstallationToken(typedEnv);
		const orgToken = typedEnv.GITHUB_ORG_TOKEN ?? "";
		const codeowner = await isCodeOwner(token, orgToken, senderLogin as string);

		if (!codeowner) {
			console.log({
				message: `${commandName} command ignored — ${senderLogin} is not a codeowner`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				action: `${commandName}_ignored_not_codeowner`,
			});
			return { acted: false, summary: "Commenter is not a codeowner." };
		}

		const eyesReactionId = await addReactionToComment(token, commentId, "eyes");
		const internalHeaders = getInternalHeaders(typedEnv);
		const baseUrl = new URL(req.url).origin;

		try {
			const runId = await admitWorkflow({
				baseUrl,
				pathname: `/workflows/rebase`,
				headers: internalHeaders,
				body: {
					prNumber: number,
					mode: isRebaseCommand ? "rebase" : "rebaseWithConflicts",
					triggerCommentId: commentId,
					triggerEyesReactionId: eyesReactionId,
					senderLogin,
				},
			});
			console.log({
				message: `${commandName} admitted by ${senderLogin}: PR #${number} — runId: ${runId}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				runId,
				action: `${commandName}_admitted`,
			});
			return {
				acted: true,
				summary: `${commandName} triggered by @${senderLogin}.`,
			};
		} catch (err) {
			const errMsg = err instanceof Error ? err.message : String(err);
			console.log({
				message: `${commandName} dispatch failed: PR #${number}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				error: errMsg,
				action: `${commandName}_dispatch_failed`,
			});
			return {
				acted: false,
				summary: `${commandName} dispatch failed: ${errMsg}`,
			};
		}
	}

	const baseUrl = new URL(req.url).origin;
	const internalHeaders = getInternalHeaders(env as Record<string, string>);
	const results: Record<string, unknown> = {};

	// ── 6. Dispatch spam-and-off-topic-filter (issues + PRs on open/reopen) ─
	if (isSpamFilterEvent) {
		// Skip spam filter for codeowners — their issues and PRs are never spam.
		let skipSpamFilter = false;
		if (senderLogin) {
			const typedEnv = env as Record<string, string>;
			const token = await getInstallationToken(typedEnv);
			const orgToken = typedEnv.GITHUB_ORG_TOKEN ?? "";
			skipSpamFilter = await isCodeOwner(
				token,
				orgToken,
				senderLogin as string,
			);
		}

		if (skipSpamFilter) {
			results.spamFilter = { result: { closed: false }, skipped: true };
		} else {
			// Admit the spam filter workflow and poll for its result, since we need
			// the `closed` boolean before deciding whether to run code review.
			let runId: string;
			try {
				runId = await admitWorkflow({
					baseUrl,
					pathname: `/workflows/spam-and-off-topic-filter`,
					headers: internalHeaders,
					body: { eventType, number },
				});
			} catch (err) {
				console.log({
					message: `Spam filter dispatch failed: ${webhookLabel}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					error: err instanceof Error ? err.message : String(err),
					action: "spam_filter_dispatch_failed",
				});
				throw new Error(
					`Spam and off-topic filter failed: ${err instanceof Error ? err.message : String(err)}`,
				);
			}

			console.log({
				message: `Spam filter admitted: ${webhookLabel} — runId: ${runId}`,
				event: "github_webhook_orchestrator",
				delivery,
				eventType,
				webhookAction,
				number,
				runId,
				action: "spam_filter_admitted",
			});

			// Spam filter is fast (< 30s usually); 3 minute timeout is generous.
			const pollResult = await pollRun<{
				closed?: boolean;
				is_spam?: boolean;
				confidence?: string;
				reason?: string;
			}>({
				runId,
				baseUrl,
				headers: internalHeaders,
				timeoutMs: 3 * 60 * 1000,
				label: `spam-filter PR #${number}`,
			});

			if (pollResult.timedOut) {
				console.log({
					message: `Spam filter timed out: ${webhookLabel}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					runId,
					action: "spam_filter_timeout",
				});
				// Treat timeout as "not spam" — do not block code review
				results.spamFilter = { result: { closed: false }, timedOut: true };
			} else if (pollResult.isError) {
				console.log({
					message: `Spam filter run failed: ${webhookLabel}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					runId,
					error: pollResult.error?.message,
					action: "spam_filter_run_failed",
				});
				// Treat error as "not spam" — do not block code review
				results.spamFilter = {
					result: { closed: false },
					error: pollResult.error,
				};
			} else {
				const filterResult = pollResult.result;
				const closed = filterResult?.closed ?? false;
				console.log({
					message: `${itemType} ${closed ? "closed" : "left open"}: ${itemLabel}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					runId,
					closed,
					is_spam: filterResult?.is_spam,
					confidence: filterResult?.confidence,
					reason: filterResult?.reason,
					action: "spam_filter_complete",
				});
				results.spamFilter = { result: filterResult };

				// If spam filter closed the item, skip code review
				if (closed) {
					return results;
				}
			}
		} // end else (not skipSpamFilter)
	}

	// ── 7. Dispatch code-review-orchestrator (PRs only) ─────────────────────
	// The code review orchestrator posts its own GitHub comment when done, so
	// we don't need to wait for the result here — fire-and-forget.
	if (isCodeReviewEvent) {
		// Suppress code review on draft PRs unless the action is ready_for_review
		const isDraft =
			(body.pull_request as Record<string, unknown> | undefined)?.draft ===
			true;
		if (!isDraft || webhookAction === "ready_for_review") {
			try {
				const runId = await admitWorkflow({
					baseUrl,
					pathname: `/workflows/code-review-orchestrator`,
					headers: internalHeaders,
					body: { eventType: "pull_request", number },
				});
				console.log({
					message: `Code review admitted: ${webhookLabel} — runId: ${runId}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					runId,
					action: "code_review_admitted",
				});
				results.codeReview = { runId };
			} catch (err) {
				// Code review failure is non-fatal — log and continue
				console.log({
					message: `Code review dispatch failed: ${webhookLabel}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					error: err instanceof Error ? err.message : String(err),
					action: "code_review_dispatch_failed",
				});
			}
		}
	}

	return results;
}
