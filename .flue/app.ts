import { env as workerEnv } from "cloudflare:workers";
import { registerProvider } from "@flue/runtime";
import { flue } from "@flue/runtime/routing";

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

export default {
	fetch(req: Request, env: Record<string, string>, ctx: ExecutionContext) {
		return flue().fetch(req, env, ctx);
	},
};
