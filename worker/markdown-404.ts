// Shared Markdown 404 helpers for the production and preview workers. A
// client that asks for Markdown (via /index.md or Accept: text/markdown)
// gets a short Markdown body with recovery links instead of the HTML splash
// page. Status stays a real 404.

const MARKDOWN_404 = `# Page not found

The page you requested does not exist or has moved.

Browse the documentation via [llms.txt](/llms.txt).

Search the documentation via the [AI Search API](https://ai-search.developers.cloudflare.com/api/ai-search/search) (POST \`{"messages":[{"role":"user","content":"your query"}]}\`).
`;

/** True when the client asked for Markdown, via /index.md or Accept header. */
export function requestsMarkdown(request: Request): boolean {
	if (new URL(request.url).pathname.endsWith("/index.md")) return true;
	return (request.headers.get("Accept") ?? "")
		.split(",")
		.some(
			(type) => type.split(";")[0].trim().toLowerCase() === "text/markdown",
		);
}

export function markdownNotFound(): Response {
	return new Response(MARKDOWN_404, {
		status: 404,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}
