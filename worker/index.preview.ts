// Preview Worker — a self-contained copy of `worker/index.ts` used for
// PR preview deployments (wrangler.preview.json -> dist).
//
// It is deployed via CI with:
//   pnpm exec wrangler deploy --config wrangler.preview.json ...
//
// Anti-indexing measures (preview-only, not in production worker):
//   - /robots.txt returns Disallow: / with no AI content signals
//   - X-Robots-Tag header on every response
//   - <meta name="robots"> injected into HTML responses via HTMLRewriter
//   - Sitemap endpoints return 404
import { WorkerEntrypoint } from "cloudflare:workers";
import { generateRedirectsEvaluator } from "redirects-in-workers";
import redirectsFileContents from "../dist/__redirects";

const redirectsEvaluator = generateRedirectsEvaluator(redirectsFileContents, {
	maxLineLength: 10_000, // Usually 2_000
	maxStaticRules: 10_000, // Usually 2_000
	maxDynamicRules: 2_000, // Usually 100
});

const LLMS_FULL_R2_PREFIX = "v1/cloudflare-docs-llms-full";

// Short Markdown 404 for agent clients. Status stays a real 404; the body
// gives agents recovery links instead of the HTML splash page.
const MARKDOWN_404 = `# Page not found

The page you requested does not exist or has moved.

Browse the documentation via [llms.txt](/llms.txt).

Search the documentation via the [AI Search API](https://ai-search.developers.cloudflare.com/api/ai-search/search) (POST \`{"messages":[{"role":"user","content":"your query"}]}\`).
`;

/** True when the client asked for Markdown, via /index.md or Accept header. */
function requestsMarkdown(request: Request): boolean {
	if (new URL(request.url).pathname.endsWith("/index.md")) return true;
	return (request.headers.get("Accept") ?? "").includes("text/markdown");
}

function markdownNotFound(): Response {
	return new Response(MARKDOWN_404, {
		status: 404,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}

// RFC 9727 requires the path to be exactly /.well-known/api-catalog with no
// extension. The Cloudflare ASSETS binding cannot serve extensionless files
// from dot-prefixed directories, so this must be handled directly in the worker.
const API_CATALOG = JSON.stringify({
	linkset: [
		{
			anchor: "https://developers.cloudflare.com/api/",
			"service-desc": [
				{
					href: "https://developers.cloudflare.com/openapi.json",
					type: "application/json",
				},
			],
			"service-doc": [
				{
					href: "https://developers.cloudflare.com/api/index.md",
					type: "text/markdown",
				},
				{
					href: "https://developers.cloudflare.com/api/",
					type: "text/html",
				},
			],
			status: [
				{
					href: "https://www.cloudflarestatus.com/api/v2/status.json",
					type: "application/json",
				},
			],
		},
	],
});

// --- Preview anti-indexing ---

const ROBOTS_POLICY = "noindex, nofollow, noarchive, nosnippet, noimageindex";

const PREVIEW_ROBOTS_TXT = [
	"User-agent: *",
	"Disallow: /",
	"Content-Signal: ai-train=no, search=no, ai-input=no",
].join("\n");

function withRobotsHeaders(response: Response): Response {
	const headers = new Headers(response.headers);
	headers.set("X-Robots-Tag", ROBOTS_POLICY);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

function injectRobotsMeta(response: Response): Response {
	const contentType = response.headers.get("Content-Type") ?? "";
	if (!contentType.includes("text/html")) return response;
	return new HTMLRewriter()
		.on("head", {
			element(element) {
				element.append(`<meta name="robots" content="${ROBOTS_POLICY}" />`, {
					html: true,
				});
			},
		})
		.transform(response);
}

function hardenResponse(response: Response): Response {
	return injectRobotsMeta(withRobotsHeaders(response));
}

// --- End preview anti-indexing ---

/**
 * When a redirect response is returned for an index.md request, rewrite the
 * Location header so the agent stays in Markdown land instead of landing on
 * an HTML page.
 *
 * Only rewrites relative (same-origin) Location values — external redirects
 * (e.g. to GitHub) are left untouched because appending index.md to a
 * non-docs URL would be nonsensical.
 */
function rewriteRedirectForMarkdown(
	redirect: Response,
	requestUrl: URL,
): Response {
	const location = redirect.headers.get("Location");
	if (!location) return redirect;

	try {
		const dest = new URL(location, requestUrl.origin);

		// Only rewrite same-origin redirects that point to a docs path (trailing /)
		if (dest.origin !== requestUrl.origin) return redirect;
		if (!dest.pathname.endsWith("/")) return redirect;

		dest.pathname += "index.md";

		const headers = new Headers(redirect.headers);
		headers.set("Location", dest.pathname + dest.search + dest.hash);
		return new Response(redirect.body, {
			status: redirect.status,
			headers,
		});
	} catch {
		return redirect;
	}
}

export default class extends WorkerEntrypoint<Env> {
	override async fetch(request: Request) {
		const response = await this.handleRequest(request);
		return hardenResponse(response);
	}

	private async handleRequest(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const { pathname } = url;

		// Image Resizing makes a subrequest to fetch the source image. Scope the
		// bypass to /_astro/ so only asset paths skip the Worker, not arbitrary
		// client requests with a spoofed Via header.
		if (
			pathname.startsWith("/_astro/") &&
			/image-resizing/.test(request.headers.get("via") ?? "")
		) {
			return this.env.ASSETS.fetch(request);
		}

		// Preview-only robots.txt — disallows all crawling and AI content signals
		if (pathname === "/robots.txt") {
			return new Response(PREVIEW_ROBOTS_TXT, {
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
					"Cache-Control": "no-store",
				},
			});
		}

		// Block sitemap endpoints on previews
		if (/^\/sitemap.*\.xml$/.test(pathname)) {
			return new Response("Not found", {
				status: 404,
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
				},
			});
		}

		if (pathname === "/.well-known/api-catalog") {
			return new Response(API_CATALOG, {
				headers: {
					"Content-Type":
						'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
				},
			});
		}

		if (pathname === "/.well-known/mcp/server-card.json") {
			const object = await this.env.MIDDLECACHE.get(
				"v1/cloudflare-mcps/server-card.json",
			);
			if (!object) {
				return new Response("server-card.json not found", { status: 404 });
			}
			return new Response(object.body, {
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			});
		}

		if (pathname === "/openapi.json") {
			const object = await this.env.MIDDLECACHE.get(
				"v1/cloudflare-api-schemas/openapi.json",
			);
			if (!object) {
				return new Response("openapi.json not found", { status: 404 });
			}
			return new Response(object.body, {
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			});
		}

		if (pathname.endsWith("/llms-full.txt")) {
			// pathname is e.g. "/llms-full.txt" or "/workers/llms-full.txt"
			// R2 key: "v1/cloudflare-docs-llms-full/llms-full.txt" or
			//         "v1/cloudflare-docs-llms-full/workers/llms-full.txt"
			const r2Key = `${LLMS_FULL_R2_PREFIX}${pathname}`;
			const object = await this.env.MIDDLECACHE.get(r2Key);

			if (!object) {
				return new Response("llms-full.txt not found", { status: 404 });
			}

			return new Response(object.body, {
				headers: {
					"Content-Type": "text/markdown; charset=utf-8",
				},
			});
		}

		const isMarkdownRequest = url.pathname.endsWith("/index.md");

		try {
			try {
				// For index.md requests, evaluate redirects against the base path
				// (without the index.md suffix) so that redirect rules written for
				// the HTML path (e.g. /learning-paths/ → /resources/) still fire.
				const evalRequest = isMarkdownRequest
					? new Request(
							url.origin +
								url.pathname.slice(0, -"index.md".length) +
								url.search,
							request,
						)
					: request;

				const redirect = await redirectsEvaluator(evalRequest, this.env.ASSETS);
				if (redirect) {
					return isMarkdownRequest
						? rewriteRedirectForMarkdown(redirect, url)
						: redirect;
				}
			} catch (error) {
				console.error("Could not evaluate redirects", error);
			}

			try {
				const forceTrailingSlashURL = new URL(
					request.url.replace(/([^/])$/, "$1/"),
					request.url,
				);
				const redirect = await redirectsEvaluator(
					new Request(forceTrailingSlashURL, request),
					this.env.ASSETS,
				);
				if (redirect) {
					return isMarkdownRequest
						? rewriteRedirectForMarkdown(redirect, url)
						: redirect;
				}
			} catch (error) {
				console.error(
					"Could not evaluate redirects with a forced trailing slash",
					error,
				);
			}
		} catch (error) {
			console.error("Unknown error", error);
		}

		const response = await this.env.ASSETS.fetch(request);

		if (response.status === 404) {
			if (requestsMarkdown(request)) {
				return markdownNotFound();
			}

			const section = new URL(response.url).pathname.split("/").at(1);

			if (!section) return response;

			const notFoundResponse = await this.env.ASSETS.fetch(
				`http://fakehost/${section}/404/`,
			);

			return new Response(notFoundResponse.body, {
				status: 404,
				headers: notFoundResponse.headers,
			});
		}

		return response;
	}
}
