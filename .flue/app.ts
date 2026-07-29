import { env as workerEnv } from "cloudflare:workers";
import { setProvider } from "@flue/runtime";
import {
	cloudflareBindingProvider,
	type CloudflareAIBinding,
} from "@flue/runtime/cloudflare";
import { Hono } from "hono";
import {
	verifyGitHubSignature,
	getPullRequest,
	getInstallationToken,
} from "./lib/github";
import {
	classifyWebhook,
	isActionable,
	type WebhookClassification,
} from "./lib/webhook-classify";
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

type WebhookEnv = PipelineEnv & {
	GITHUB_WEBHOOK_SECRET?: string;
	DOCS_FLUE_INTERNAL_TOKEN?: string;
};

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

// Trigger a review for a PR by number. Fetches the real PR from GitHub,
// builds the same classification a webhook would, and routes through
// startReviewPipeline — spam gate, Dependabot detection, codeowner checks,
// the full pipeline. Gated behind DOCS_FLUE_INTERNAL_TOKEN.
app.post("/dev/review/:number", async (c) => {
	const env = c.env as unknown as WebhookEnv;
	const secret = env.DOCS_FLUE_INTERNAL_TOKEN;
	if (!secret) return c.text("Internal token not configured", 500);

	const provided = c.req.header("x-dev-secret");
	if (!provided || provided !== secret) return c.text("Unauthorized", 401);

	const prNumber = Number(c.req.param("number"));
	if (!Number.isInteger(prNumber) || prNumber <= 0)
		return c.text("Invalid PR number", 400);

	const ghEnv = env as unknown as Record<string, string>;
	const token = await getInstallationToken(ghEnv);
	const pr = await getPullRequest(token, prNumber);

	const classification: WebhookClassification = {
		eventType: "pull_request",
		action: "opened",
		number: prNumber,
		title: pr.title,
		senderLogin: pr.user?.login ?? undefined,
		prAuthorLogin: pr.user?.login ?? undefined,
		isDependabotPr: pr.user?.login === "dependabot[bot]",
		isDependabotReviewEvent: pr.user?.login === "dependabot[bot]",
		isSpamFilterEvent: pr.user?.login !== "dependabot[bot]",
		isCodeReviewEvent: pr.user?.login !== "dependabot[bot]",
		isDraft: pr.draft,
		command: null,
		commentId: undefined,
		commentPrAuthorLogin: undefined,
	};

	if (!isActionable(classification)) {
		return c.json({ acted: false, reason: "No action needed." });
	}

	await startReviewPipeline(env, classification, "");
	return c.json({ acted: true, number: prNumber }, 202);
});

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
