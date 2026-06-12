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
	getPullRequest,
	isCodeOwner,
	verifyGitHubSignature,
} from "../lib/github";
import { getInternalHeaders } from "../lib/internal-auth";

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

	if (
		!req ||
		(!isSpamFilterEvent &&
			!isCodeReviewEvent &&
			!isDependabotReviewEvent &&
			!isFullReviewCommand &&
			!isReviewCommand)
	) {
		return { acted: false, summary: "No action needed." };
	}

	if (!number) {
		return { acted: false, summary: "No issue or PR number found." };
	}

	// ── 3a. Handle Dependabot PR events ─────────────────────────────────────
	if (isDependabotReviewEvent) {
		const internalHeaders = getInternalHeaders(env as Record<string, string>);
		const baseUrl = new URL(req.url);
		const dependabotUrl = new URL(baseUrl);
		dependabotUrl.pathname = `/workflows/dependabot-review`;
		dependabotUrl.searchParams.set("wait", "result");
		const dependabotResponse = await fetch(dependabotUrl, {
			method: "POST",
			headers: internalHeaders,
			body: JSON.stringify({ eventType: "pull_request", number }),
		});
		if (!dependabotResponse.ok) {
			console.log({
				message: `Dependabot review dispatch failed: ${webhookLabel}`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				action: "dependabot_review_dispatch_failed",
				status: dependabotResponse.status,
			});
		}
		return {
			acted: true,
			summary: `Dependabot review dispatched for PR #${number}.`,
		};
	}

	// ── 3. Handle /full-review command ──────────────────────────────────────
	if (isFullReviewCommand) {
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
				message: `Full review command ignored — ${senderLogin} is not a codeowner`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				action: "full_review_ignored_not_codeowner",
			});
			return { acted: false, summary: "Commenter is not a codeowner." };
		}

		// Acknowledge immediately with 👀 so the user knows we saw it
		const eyesReactionId = await addReactionToComment(token, commentId, "eyes");

		// Check if the PR is from Dependabot — if so route to dependabot-review
		const prForSlash = await getPullRequest(token, number).catch(() => null);
		const internalHeaders = getInternalHeaders(typedEnv);
		const baseUrl = new URL(req.url);
		const reviewUrl = new URL(baseUrl);
		if (prForSlash?.user?.login === "dependabot[bot]") {
			reviewUrl.pathname = `/workflows/dependabot-review`;
			reviewUrl.searchParams.set("wait", "result");
			const _reviewResponse = await fetch(reviewUrl, {
				method: "POST",
				headers: internalHeaders,
				body: JSON.stringify({
					eventType: "pull_request",
					number,
					triggerCommentId: commentId,
					triggerEyesReactionId: eyesReactionId,
				}),
			});
		} else {
			reviewUrl.pathname = `/workflows/code-review-orchestrator`;
			reviewUrl.searchParams.set("wait", "result");
			const _reviewResponse = await fetch(reviewUrl, {
				method: "POST",
				headers: internalHeaders,
				body: JSON.stringify({
					eventType: "pull_request",
					number,
					forceFullReview: true,
					bypassReviewLimit: true,
					triggerCommentId: commentId,
					triggerEyesReactionId: eyesReactionId,
				}),
			});
		}

		// console.log({
		// 	message: `Full review dispatched by ${senderLogin}: PR #${number}`,
		// 	event: "github_webhook_orchestrator",
		// 	delivery,
		// 	number,
		// 	action: "full_review_dispatched",
		// 	ok: reviewResponse.ok,
		// });

		return {
			acted: true,
			summary: `Full review triggered by @${senderLogin}.`,
		};
	}

	// ── 4. Handle /review command ────────────────────────────────────────────
	if (isReviewCommand) {
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
				message: `Review command ignored — ${senderLogin} is not a codeowner`,
				event: "github_webhook_orchestrator",
				delivery,
				number,
				action: "review_ignored_not_codeowner",
			});
			return { acted: false, summary: "Commenter is not a codeowner." };
		}

		// Acknowledge immediately with 👀
		const eyesReactionId = await addReactionToComment(token, commentId, "eyes");

		// Check if the PR is from Dependabot — if so route to dependabot-review
		const prForReview = await getPullRequest(token, number).catch(() => null);
		const internalHeaders = getInternalHeaders(typedEnv);
		const baseUrl = new URL(req.url);
		const reviewUrl = new URL(baseUrl);
		if (prForReview?.user?.login === "dependabot[bot]") {
			reviewUrl.pathname = `/workflows/dependabot-review`;
			reviewUrl.searchParams.set("wait", "result");
			const _reviewResponse = await fetch(reviewUrl, {
				method: "POST",
				headers: internalHeaders,
				body: JSON.stringify({
					eventType: "pull_request",
					number,
					triggerCommentId: commentId,
					triggerEyesReactionId: eyesReactionId,
				}),
			});
		} else {
			reviewUrl.pathname = `/workflows/code-review-orchestrator`;
			reviewUrl.searchParams.set("wait", "result");
			const _reviewResponse = await fetch(reviewUrl, {
				method: "POST",
				headers: internalHeaders,
				body: JSON.stringify({
					eventType: "pull_request",
					number,
					bypassReviewLimit: true,
					triggerCommentId: commentId,
					triggerEyesReactionId: eyesReactionId,
				}),
			});
		}

		// console.log({
		// 	message: `Review dispatched by ${senderLogin}: PR #${number}`,
		// 	event: "github_webhook_orchestrator",
		// 	delivery,
		// 	number,
		// 	action: "review_dispatched",
		// 	ok: reviewResponse.ok,
		// });

		return { acted: true, summary: `Review triggered by @${senderLogin}.` };
	}

	const baseUrl = new URL(req.url);
	const internalHeaders = getInternalHeaders(env as Record<string, string>);
	const results: Record<string, unknown> = {};

	// ── 5. Dispatch spam-and-off-topic-filter (issues + PRs on open/reopen) ─
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
			// console.log({
			// 	message: `Spam filter skipped — ${senderLogin} is a codeowner: ${itemLabel}`,
			// 	event: "github_webhook_orchestrator",
			// 	delivery,
			// 	number,
			// 	action: "spam_filter_skipped_codeowner",
			// });
			results.spamFilter = { result: { closed: false }, skipped: true };
		} else {
			const filterUrl = new URL(baseUrl);
			filterUrl.pathname = `/workflows/spam-and-off-topic-filter`;
			filterUrl.searchParams.set("wait", "result");
			const filterResponse = await fetch(filterUrl, {
				method: "POST",
				headers: internalHeaders,
				body: JSON.stringify({ eventType, number }),
			});

			if (!filterResponse.ok) {
				console.log({
					message: `Spam filter dispatch failed: ${webhookLabel}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					action: "spam_filter_dispatch_failed",
					status: filterResponse.status,
				});
				throw new Error(
					`Spam and off-topic filter failed: ${filterResponse.status} ${await filterResponse.text()}`,
				);
			}

			const filterResult = (await filterResponse.json()) as {
				result?: {
					closed?: boolean;
					is_spam?: boolean;
					confidence?: string;
					reason?: string;
				};
				_meta?: { runId?: string };
			};
			const closed = filterResult.result?.closed ?? false;
			// console.log({
			// 	message: `${itemType} ${closed ? "closed" : "left open"}: ${itemLabel}`,
			// 	event: "github_webhook_orchestrator",
			// 	delivery,
			// 	eventType,
			// 	webhookAction,
			// 	number,
			// 	action: "spam_filter_dispatched",
			// 	filterRunId: filterResult._meta?.runId,
			// 	closed,
			// 	is_spam: filterResult.result?.is_spam,
			// 	confidence: filterResult.result?.confidence,
			// 	reason: filterResult.result?.reason,
			// });
			results.spamFilter = filterResult;

			// If spam filter closed the item, skip code review
			if (closed) {
				return results;
			}
		} // end else (not skipSpamFilter)
	}

	// ── 6. Dispatch code-review-orchestrator (PRs only) ─────────────────────
	if (isCodeReviewEvent) {
		// Suppress code review on draft PRs unless the action is ready_for_review
		const isDraft =
			(body.pull_request as Record<string, unknown> | undefined)?.draft ===
			true;
		if (!isDraft || webhookAction === "ready_for_review") {
			const reviewUrl = new URL(baseUrl);
			reviewUrl.pathname = `/workflows/code-review-orchestrator`;
			reviewUrl.searchParams.set("wait", "result");
			const reviewResponse = await fetch(reviewUrl, {
				method: "POST",
				headers: internalHeaders,
				body: JSON.stringify({ eventType: "pull_request", number }),
			});

			if (!reviewResponse.ok) {
				// Code review failure is non-fatal — log and continue
				console.log({
					message: `Code review dispatch failed: ${webhookLabel}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					action: "code_review_dispatch_failed",
					status: reviewResponse.status,
				});
			} else {
				const reviewResult = (await reviewResponse.json()) as {
					result?: unknown;
					_meta?: { runId?: string };
				};
				// console.log({
				// 	message: `Code review dispatched: ${itemLabel}`,
				// 	event: "github_webhook_orchestrator",
				// 	delivery,
				// 	eventType,
				// 	webhookAction,
				// 	number,
				// 	action: "code_review_dispatched",
				// 	reviewRunId: reviewResult._meta?.runId,
				// });
				results.codeReview = reviewResult;
			}
		}
	}

	return results;
}

function getIssueOrPullRequestNumber(
	eventType: string,
	body: Record<string, unknown>,
) {
	if (eventType === "issues" || eventType === "issue_comment") {
		return (body.issue as Record<string, unknown> | undefined)?.number as
			| number
			| undefined;
	}
	if (eventType === "pull_request") {
		return (body.pull_request as Record<string, unknown> | undefined)
			?.number as number | undefined;
	}
}

function getIssueOrPullRequestUrl(
	eventType: string,
	body: Record<string, unknown>,
	number: number | undefined,
) {
	if (eventType === "issues") {
		return (
			((body.issue as Record<string, unknown> | undefined)?.html_url as
				| string
				| undefined) ??
			(number
				? `https://github.com/cloudflare/cloudflare-docs/issues/${number}`
				: undefined)
		);
	}
	if (eventType === "pull_request") {
		return (
			((body.pull_request as Record<string, unknown> | undefined)?.html_url as
				| string
				| undefined) ??
			(number
				? `https://github.com/cloudflare/cloudflare-docs/pull/${number}`
				: undefined)
		);
	}
}

function getIssueOrPullRequestLabel(eventType: string) {
	if (eventType === "pull_request") return "PR";
	if (eventType === "issues") return "Issue";
	if (eventType === "issue_comment") return "PR";
	return "GitHub webhook";
}

function getIssueOrPullRequestTitle(
	eventType: string,
	body: Record<string, unknown>,
) {
	if (eventType === "issues" || eventType === "issue_comment") {
		return (body.issue as Record<string, unknown> | undefined)?.title as
			| string
			| undefined;
	}
	if (eventType === "pull_request") {
		return (body.pull_request as Record<string, unknown> | undefined)?.title as
			| string
			| undefined;
	}
}

function truncateLogValue(value: string) {
	return value.length > 100 ? `${value.slice(0, 97)}...` : value;
}
