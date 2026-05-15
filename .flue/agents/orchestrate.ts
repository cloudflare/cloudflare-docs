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
import type { FlueContext } from "@flue/sdk/client";
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
	const sender = body.sender as Record<string, unknown> | undefined;
	const senderLogin = sender?.login;
	const webhookLabel = `${eventType}.${String(webhookAction ?? "unknown")}${number ? ` #${number}` : ""}${title ? ` "${truncateLogValue(title)}"` : ""}${senderLogin ? ` by @${senderLogin}` : ""}`;

	console.log({
		message: `GitHub webhook received: ${webhookLabel}`,
		event: "github_webhook_orchestrator",
		delivery,
		eventType,
		webhookAction,
		number,
		title,
		sender: senderLogin,
		senderType: sender?.type,
		action: "received",
	});

	// ── 2. Route to the right pipeline ─────────────────────────────────────
	if (
		!req ||
		!(
			["issues", "pull_request"].includes(eventType) &&
			webhookAction === "opened"
		)
	) {
		console.log({
			message: `GitHub webhook ignored: ${webhookLabel}`,
			event: "github_webhook_orchestrator",
			delivery,
			eventType,
			webhookAction,
			number,
			title,
			sender: senderLogin,
			action: "ignored",
			reason: "only issues.opened and pull_request.opened are filtered",
		});
		return { acted: false, summary: "No action needed." };
	}

	// ── 3. Dispatch spam-and-off-topic-filter ───────────────────────────────
	if (!number) {
		console.log({
			message: `GitHub webhook ignored: missing number for ${webhookLabel}`,
			event: "github_webhook_orchestrator",
			delivery,
			eventType,
			webhookAction,
			title,
			sender: senderLogin,
			action: "ignored",
			reason: "missing issue or PR number",
		});
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
			sender: senderLogin,
			action: "dispatch_failed",
			status: response.status,
		});
		throw new Error(
			`Spam and off-topic filter failed: ${response.status} ${await response.text()}`,
		);
	}

	const result = await response.json();
	console.log({
		message: `Spam and off-topic filter completed: ${webhookLabel}`,
		event: "github_webhook_orchestrator",
		delivery,
		eventType,
		webhookAction,
		number,
		title,
		sender: senderLogin,
		action: "dispatched",
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
