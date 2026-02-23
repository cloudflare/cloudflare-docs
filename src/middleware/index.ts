import { defineMiddleware } from "astro:middleware";
import { htmlToMarkdown } from "~/util/markdown";

// `astro dev` only middleware so that `/api/...` links can be viewed.
export const onRequest = defineMiddleware(async (context, next) => {
	if (import.meta.env.DEV) {
		const { pathname } = context.url;

		if (pathname.startsWith("/api/")) {
			const url = new URL(pathname, import.meta.env.SITE);

			return fetch(url, {
				headers: {
					"accept-encoding": "identity",
				},
			});
		} else if (
			pathname.endsWith("/index.md") ||
			context.request.headers.get("accept")?.includes("text/markdown")
		) {
			const htmlUrl = new URL(pathname.replace("index.md", ""), context.url);
			const html = await (await fetch(htmlUrl)).text();

			const markdown = await htmlToMarkdown(html, context.url.toString());

			if (!markdown) {
				return new Response("Not Found", { status: 404 });
			}

			return new Response(markdown, {
				headers: {
					"content-type": "text/markdown; charset=utf-8",
				},
			});
		}
	}

	return next();
});
