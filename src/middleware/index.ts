import { defineMiddleware } from "astro:middleware";

// `astro dev` only middleware so that `/api/...` links can be viewed.
export const onRequest = defineMiddleware(async (context, next) => {
	if (import.meta.env.DEV) {
		if (context.url.pathname.startsWith("/api/")) {
			const url = new URL(context.url.pathname, import.meta.env.SITE);

			return fetch(url, {
				headers: {
					"accept-encoding": "identity",
				},
			});
		}
	}

	return next();
});
