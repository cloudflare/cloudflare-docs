import { env } from "cloudflare:workers";
import { setProvider } from "@flue/runtime";
import { cloudflareBindingProvider } from "@flue/runtime/cloudflare/workers-ai";
import { createAgentRouter } from "@flue/runtime/routing";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import {
	verifyGitHubSignature,
	getInstallationToken,
	getPullRequest,
} from "./lib/github";
import { classifyWebhook, isActionable } from "./lib/webhook-classify";
import { startReviewPipeline } from "./lib/pipeline-entry";
import { REVIEW_AGENTS } from "./lib/review-agents";

setProvider(
	cloudflareBindingProvider({
		binding: env.AI,
		streamIdleTimeoutMs: 120_000,
		gateway: env.DOCS_FLUE_AI_GATEWAY_ID
			? { id: env.DOCS_FLUE_AI_GATEWAY_ID }
			: undefined,
	}),
);

const app = new Hono<{ Bindings: Env }>();
app.use("*", bodyLimit({ maxSize: 2 * 1024 * 1024 }));
app.get("/health", (c) => c.json({ ok: true }));

async function sameSecret(
	provided: string,
	expected: string,
): Promise<boolean> {
	const encode = (text: string) =>
		crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	const [a, b] = await Promise.all([encode(provided), encode(expected)]);
	let difference = 0;
	const left = new Uint8Array(a),
		right = new Uint8Array(b);
	for (let index = 0; index < left.length; index++)
		difference |= left[index] ^ right[index];
	return difference === 0;
}

app.post("/webhooks/github", async (c) => {
	if (!c.env.GITHUB_WEBHOOK_SECRET)
		return c.text("Webhook not configured", 503);
	const bodyText = await c.req.text();
	if (
		!(await verifyGitHubSignature(
			bodyText,
			c.req.header("x-hub-signature-256") ?? "",
			c.env.GITHUB_WEBHOOK_SECRET,
		))
	)
		return c.text("Unauthorized", 401);
	let body: Record<string, unknown>;
	try {
		const parsed: unknown = JSON.parse(bodyText);
		if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed))
			return c.text("Invalid payload", 400);
		body = parsed as Record<string, unknown>;
	} catch {
		return c.text("Invalid JSON", 400);
	}
	const repository = body.repository as { full_name?: string } | undefined;
	if (repository?.full_name !== "cloudflare/cloudflare-docs")
		return c.json({ acted: false });
	const classification = classifyWebhook(
		c.req.header("x-github-event") ?? "",
		body,
	);
	if (!isActionable(classification)) return c.json({ acted: false });
	const source = classification.command
		? `comment-${classification.commentId}`
		: c.req.header("x-github-delivery");
	if (!source) return c.text("Missing delivery ID", 400);
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(source),
	);
	const delivery = Array.from(new Uint8Array(digest), (byte) =>
		byte.toString(16).padStart(2, "0"),
	)
		.join("")
		.slice(0, 40);
	await startReviewPipeline(c.env, classification, delivery);
	return c.json({ acted: true, delivery }, 202);
});

app.use("/dev/*", async (c, next) => {
	const secret = c.env.DOCS_FLUE_INTERNAL_TOKEN;
	if (!secret) return c.text("Not Found", 404);
	if (!(await sameSecret(c.req.header("x-dev-secret") ?? "", secret)))
		return c.text("Unauthorized", 401);
	await next();
});
app.post("/dev/review/:number", async (c) => {
	const number = Number(c.req.param("number"));
	if (!Number.isSafeInteger(number) || number <= 0)
		return c.text("Invalid PR number", 400);
	const pr = await getPullRequest(await getInstallationToken(c.env), number);
	const runId = crypto.randomUUID();
	const admitted = await c.env.REVIEW_COORDINATOR.getByName(
		`pr-${number}`,
	).request({
		number,
		runId,
		headSha: pr.head.sha,
		baseSha: pr.base.sha,
		baseRef: pr.base.ref,
		title: pr.title,
		body: pr.body ?? "",
		author: pr.user?.login ?? "",
		moderate: false,
		force: true,
	});
	return c.json({ admitted, runId }, 202);
});
app.use("/eval/agents/*", async (c, next) => {
	const secret = c.env.DOCS_FLUE_INTERNAL_TOKEN;
	if (c.env.DOCS_FLUE_ENABLE_EVAL_ROUTES !== "1" || !secret)
		return c.text("Not Found", 404);
	if (!(await sameSecret(c.req.header("x-dev-secret") ?? "", secret)))
		return c.text("Unauthorized", 401);
	await next();
});
for (const agent of Object.values(REVIEW_AGENTS))
	app.route(`/eval/agents/${agent.agentName}`, createAgentRouter(agent));

export default app;
