import type { APIRoute } from "astro";
import tracingText from "~/content/agent-setup/tracing.md?raw";

export const GET: APIRoute = () => {
	return new Response(tracingText, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
};
