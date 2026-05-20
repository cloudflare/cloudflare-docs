/**
 * Orchestrator agent
 *
 * Receives GitHub webhooks (issues, pull_request events), verifies the
 * signature, and dispatches to the appropriate subagent.
 *
 * Today the only pipeline is `spam-and-off-topic-filter`. Future agents (triage,
 * code-review, …) can be added here by extending the routing logic below.
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
	const itemUrl = getIssueOrPullRequestUrl(eventType, body, number);
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
	const shouldFilter =
		["issues", "pull_request"].includes(eventType) &&
		(["opened", "reopened"].includes(webhookAction as string) ||
			(eventType === "pull_request" && webhookAction === "ready_for_review"));

	if (!req || !shouldFilter) {
		// console.log({
		// 	message: `GitHub webhook ignored: ${webhookLabel}`,
		// 	event: "github_webhook_orchestrator",
		// 	delivery,
		// 	eventType,
		// 	webhookAction,
		// 	number,
		// 	title,
		// 	url: itemUrl,
		// 	sender: senderLogin,
		// 	action: "ignored",
		// 	reason:
		// 		"only issues/pull_request opened, reopened, and pull_request ready_for_review events are filtered",
		// });
		return { acted: false, summary: "No action needed." };
	}

	// ── 3. Dispatch spam-and-off-topic-filter ───────────────────────────────
	if (!number) {
		// console.log({
		// 	message: `GitHub webhook ignored: missing number for ${webhookLabel}`,
		// 	event: "github_webhook_orchestrator",
		// 	delivery,
		// 	eventType,
		// 	webhookAction,
		// 	title,
		// 	url: itemUrl,
		// 	sender: senderLogin,
		// 	action: "ignored",
		// 	reason: "missing issue or PR number",
		// });
		return { acted: false, summary: "No issue or PR number found." };
	}

	const url = new URL(req.url);
	url.pathname = `/agents/spam-and-off-topic-filter/${encodeURIComponent(id)}`;
	const response = await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ eventType, number }),
	});

	if (!response.ok) {
		console.log({
			message: `Spam and off-topic filter dispatch failed: ${webhookLabel}`,
			event: "github_webhook_orchestrator",
			delivery,
			eventType,
			webhookAction,
			number,
			title,
			url: itemUrl,
			sender: senderLogin,
			action: "dispatch_failed",
			status: response.status,
		});
		throw new Error(
			`Spam and off-topic filter failed: ${response.status} ${await response.text()}`,
		);
	}

	const result = (await response.json()) as {
		result?: unknown;
		_meta?: { runId?: string };
	};
	const filterResult = result.result as {
		closed?: boolean;
		is_spam?: boolean;
		confidence?: string;
		reason?: string;
	};
	const filterOutcome = filterResult.closed ? "Closed" : "Left open";
	console.log({
		message: `${itemType} ${filterOutcome}: ${itemLabel}`,
		event: "github_webhook_orchestrator",
		delivery,
		eventType,
		webhookAction,
		number,
		title,
		url: itemUrl,
		sender: senderLogin,
		action: "dispatched",
		filterRunId: result._meta?.runId,
		closed: filterResult.closed,
		is_spam: filterResult.is_spam,
		confidence: filterResult.confidence,
		reason: filterResult.reason,
	});

	return result;
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
