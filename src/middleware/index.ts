import { defineMiddleware } from "astro:middleware";

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
		}
	}

	return next();
});
