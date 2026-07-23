import type { APIRoute } from "astro";
import BasePrompt from "~/content/partials/prompts/base-prompt.txt?raw";

export const GET: APIRoute = async () => {
	return new Response(BasePrompt, {
		headers: { "content-type": "text/plain" },
	});
};
