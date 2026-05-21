/**
 * Orchestrator agent
 *
 * Receives GitHub webhooks (issues, pull_request events), verifies the
 * signature, and dispatches to the appropriate subagents:
 *
 * - spam-and-off-topic-filter: runs on opened/reopened/ready_for_review
 * - code-review-orchestrator: runs on PR opened/reopened/synchronize/ready_for_review
 *   (only if spam filter did not close the item)
 *
 * POST /agents/orchestrate/:id
 */
import type { FlueContext } from "@flue/runtime";
import { verifyGitHubSignature } from "../lib/github";

export const triggers = { webhook: true };

export default async function ({ id, payload, env, req }: FlueContext) {
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
	// 	url: itemUrl,
	// 	sender: senderLogin,
	// 	senderType: sender?.type,
	// 	action: "received",
	// });

	// ── 2. Route to the right pipeline ─────────────────────────────────────
	const isSpamFilterEvent =
		["issues", "pull_request"].includes(eventType) &&
		(["opened", "reopened", "synchronize"].includes(webhookAction as string) ||
			(eventType === "pull_request" && webhookAction === "ready_for_review"));

	const isCodeReviewEvent =
		eventType === "pull_request" &&
		["opened", "reopened", "synchronize", "ready_for_review"].includes(
			webhookAction as string,
		);

	if (!req || (!isSpamFilterEvent && !isCodeReviewEvent)) {
		return { acted: false, summary: "No action needed." };
	}

	if (!number) {
		return { acted: false, summary: "No issue or PR number found." };
	}

	const baseUrl = new URL(req.url);
	const results: Record<string, unknown> = {};

	// ── 3. Dispatch spam-and-off-topic-filter (issues + PRs on open/reopen) ─
	if (isSpamFilterEvent) {
		const filterUrl = new URL(baseUrl);
		filterUrl.pathname = `/agents/spam-and-off-topic-filter/${encodeURIComponent(id)}`;
		const filterResponse = await fetch(filterUrl, {
			method: "POST",
			headers: { "content-type": "application/json" },
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
			result?: { closed?: boolean; is_spam?: boolean; confidence?: string; reason?: string };
			_meta?: { runId?: string };
		};
		const closed = filterResult.result?.closed ?? false;
		console.log({
			message: `${itemType} ${closed ? "closed" : "left open"}: ${itemLabel}`,
			event: "github_webhook_orchestrator",
			delivery,
			eventType,
			webhookAction,
			number,
			action: "spam_filter_dispatched",
			filterRunId: filterResult._meta?.runId,
			closed,
			is_spam: filterResult.result?.is_spam,
			confidence: filterResult.result?.confidence,
			reason: filterResult.result?.reason,
		});
		results.spamFilter = filterResult;

		// If spam filter closed the item, skip code review
		if (closed) {
			return results;
		}
	}

	// ── 4. Dispatch code-review-orchestrator (PRs only) ─────────────────────
	if (isCodeReviewEvent) {
		// Suppress code review on draft PRs unless the action is ready_for_review
		const isDraft =
			(body.pull_request as Record<string, unknown> | undefined)?.draft === true;
		if (!isDraft || webhookAction === "ready_for_review") {
			const reviewUrl = new URL(baseUrl);
			reviewUrl.pathname = `/agents/code-review-orchestrator/${encodeURIComponent(id)}`;
			const reviewResponse = await fetch(reviewUrl, {
				method: "POST",
				headers: { "content-type": "application/json" },
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
				console.log({
					message: `Code review dispatched: ${itemLabel}`,
					event: "github_webhook_orchestrator",
					delivery,
					eventType,
					webhookAction,
					number,
					action: "code_review_dispatched",
					reviewRunId: reviewResult._meta?.runId,
				});
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
	if (eventType === "issues") {
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
	return "GitHub webhook";
}

function getIssueOrPullRequestTitle(
	eventType: string,
	body: Record<string, unknown>,
) {
	if (eventType === "issues") {
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
