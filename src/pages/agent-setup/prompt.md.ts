import type { APIRoute } from "astro";
import promptText from "~/content/agent-setup/prompt.md?raw";

export const GET: APIRoute = () => {
	return new Response(promptText, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
};
