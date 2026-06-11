import { env as workerEnv } from "cloudflare:workers";
import { registerProvider } from "@flue/runtime";
import { flue } from "@flue/runtime/routing";
import { Hono, type Hono as HonoApp, type MiddlewareHandler } from "hono";

const INTERNAL_AUTH_HEADER = "x-flue-internal-token";

const bindings = workerEnv as unknown as {
	AI: Ai;
	DOCS_FLUE_AI_GATEWAY_ID: string;
};

// Register at module scope so the provider is configured in every isolate,
// including the per-agent Durable Objects that make model calls.
registerProvider("cloudflare", {
	api: "cloudflare-ai-binding" as const,
	binding: bindings.AI,
	gateway: {
		id: bindings.DOCS_FLUE_AI_GATEWAY_ID,
	},
});

const requireInternalToken: MiddlewareHandler = async (c, next) => {
	const expected = (c.env as Record<string, string | undefined>)
		.DOCS_FLUE_INTERNAL_TOKEN;
	const provided = c.req.header(INTERNAL_AUTH_HEADER);

	if (!expected || provided !== expected) {
		return c.text("Unauthorized", 401);
	}

	await next();
};

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

app.use("/runs/*", requireInternalToken);
app.use("/workflows/*", async (c, next) => {
	// GitHub calls orchestrate directly; it verifies the webhook signature before acting.
	if (new URL(c.req.url).pathname === "/workflows/orchestrate") {
		await next();
		return;
	}
	return requireInternalToken(c, next);
});

// flue() and this app can resolve through separate Hono instances in pnpm's
// dependency graph. They are runtime-compatible; the cast avoids duplicate type
// identities leaking through the mount boundary.
app.route("/", flue() as unknown as HonoApp);

export default app;
