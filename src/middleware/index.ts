import { defineMiddleware } from "astro:middleware";

const MIDDLECACHE_BASE = "https://middlecache.ced.cloudflare.com/";
const AI_MODEL_SCHEMA_R2_PREFIX = "v1/workers-ai-model-catalog";
const SCHEMA_FILE_RE =
	/^\/(ai|workers-ai)\/models\/.+\/((?:sync|streaming|batch|schema)-(?:input|output))\.json$/;

// `astro dev` only middleware so that `/api/...` links can be viewed,
// and so that AI model schema JSON files are proxied from middlecache
// (in production these are served by the Cloudflare Worker via R2).
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

		if (SCHEMA_FILE_RE.test(pathname)) {
			const r2Key = `${AI_MODEL_SCHEMA_R2_PREFIX}${pathname}`;
			return fetch(`${MIDDLECACHE_BASE}${r2Key}`, {
				headers: { "accept-encoding": "identity" },
			});
		}
	}

	return next();
});
