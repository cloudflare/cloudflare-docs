import { registerProvider, flue } from "@flue/sdk/app";

export default {
	fetch(req: Request, env: Record<string, string>, ctx: ExecutionContext) {
		// Use the Workers AI binding directly — no external provider or API key needed.
		// Requests route through the docs-flue AI Gateway for observability and rate limiting.
		registerProvider("cloudflare", {
			api: "cloudflare-ai-binding" as const,
			binding: (env as unknown as { AI: Ai }).AI,
			gateway: {
				id: env.DOCS_FLUE_AI_GATEWAY_ID,
			},
		});

		return flue().fetch(req, env, ctx);
	},
};
