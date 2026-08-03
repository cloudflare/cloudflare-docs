import { env as workerEnv } from "cloudflare:workers";
import { setProvider } from "@flue/runtime";
import { createAgentRouter } from "@flue/runtime/routing";
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
import CodeReviewFile from "./agents/code-review-file";
import StyleGuideFile from "./agents/style-guide-file";
import ConventionsReviewer from "./agents/conventions-reviewer";
import ReconcileReviewer from "./agents/reconcile-reviewer";
import SpamFilter from "./agents/spam-filter";

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
	DOCS_FLUE_ENABLE_EVAL_ROUTES?: string;
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

// ── Eval routes ─────────────────────────────────────────────────────────────
// Mount each reviewable agent behind a shared internal-token gate so
// vitest-evals can drive them over HTTP during CI. Requires both
// DOCS_FLUE_ENABLE_EVAL_ROUTES=1 and DOCS_FLUE_INTERNAL_TOKEN to be set in
// the Worker env. The Vite config only injects these during eval runs
// (DOCS_FLUE_AGENT_EVALS=1), so eval routes are never live in production or
// normal dev.
const EVAL_AGENTS = [
	CodeReviewFile,
	StyleGuideFile,
	ConventionsReviewer,
	ReconcileReviewer,
	SpamFilter,
] as const;

app.use("/eval/agents/*", async (c, next) => {
	const env = c.env as unknown as WebhookEnv;
	if (env.DOCS_FLUE_ENABLE_EVAL_ROUTES !== "1") return c.text("Not Found", 404);
	const secret = env.DOCS_FLUE_INTERNAL_TOKEN;
	if (!secret) return c.text("Not Found", 404);
	const provided = c.req.header("x-dev-secret");
	if (!provided || provided !== secret) return c.text("Unauthorized", 401);
	await next();
});

for (const agent of EVAL_AGENTS) {
	const name = agent.agentName;
	if (!name) continue;
	app.route(`/eval/agents/${name}`, createAgentRouter(agent));
}

export default app;
