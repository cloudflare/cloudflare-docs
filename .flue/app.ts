import { env as workerEnv } from "cloudflare:workers";
import { setProvider } from "@flue/runtime";
import {
	cloudflareBindingProvider,
	type CloudflareAIBinding,
} from "@flue/runtime/cloudflare";
import { Hono } from "hono";
import { verifyGitHubSignature } from "./lib/github";
import { classifyWebhook, isActionable } from "./lib/webhook-classify";
import { startReviewPipeline, type PipelineEnv } from "./lib/pipeline-entry";

const bindings = workerEnv as unknown as {
	AI: CloudflareAIBinding;
	DOCS_FLUE_AI_GATEWAY_ID?: string;
};

// Configure the model provider at module scope so it is set in every isolate,
// including the per-agent Durable Objects that make model calls. In 2.0 the
// generated entry auto-registers a default `cloudflare` provider; this call
// overrides it to pin the AI Gateway id.
setProvider(
	cloudflareBindingProvider({
		binding: bindings.AI,
		gateway: bindings.DOCS_FLUE_AI_GATEWAY_ID
			? { id: bindings.DOCS_FLUE_AI_GATEWAY_ID }
			: undefined,
	}),
);

type WebhookEnv = PipelineEnv & { GITHUB_WEBHOOK_SECRET?: string };

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

// GitHub webhook ingress. Stateless: verify the HMAC, classify the payload, and
// hand actionable events to the durable review pipeline. There are no internal
// HTTP routes — the orchestrator drives specialist agents via bindings, not
// worker-to-worker HTTP — so no internal-auth middleware is mounted.
app.post("/webhooks/github", async (c) => {
	const env = c.env as unknown as WebhookEnv;

	const secret = env.GITHUB_WEBHOOK_SECRET;
	if (!secret) {
		console.error({
			message: "GITHUB_WEBHOOK_SECRET is not configured; rejecting webhook",
			event: "webhook_misconfigured",
		});
		return c.text("Webhook secret not configured", 500);
	}

	const signature = c.req.header("x-hub-signature-256") ?? "";
	const eventType = c.req.header("x-github-event") ?? "unknown";
	const rawBody = await c.req.text();

	if (!(await verifyGitHubSignature(rawBody, signature, secret))) {
		console.warn({
			message: "GitHub webhook signature verification failed",
			event: "webhook_unauthorized",
			eventType,
		});
		return c.text("Unauthorized", 401);
	}

	let body: Record<string, unknown>;
	try {
		body = JSON.parse(rawBody) as Record<string, unknown>;
	} catch {
		return c.text("Invalid JSON payload", 400);
	}

	const classification = classifyWebhook(eventType, body);
	if (!isActionable(classification)) {
		return c.json({ acted: false, reason: "No action needed." });
	}

	await startReviewPipeline(env, classification, rawBody);
	return c.json({ acted: true }, 202);
});

export default app;
