import { WorkerEntrypoint } from "cloudflare:workers";
import { generateRedirectsEvaluator } from "redirects-in-workers";
import redirectsFileContents from "../dist/__redirects";

import { htmlToMarkdown } from "../src/util/markdown";

const redirectsEvaluator = generateRedirectsEvaluator(redirectsFileContents, {
	maxLineLength: 10_000, // Usually 2_000
	maxStaticRules: 10_000, // Usually 2_000
	maxDynamicRules: 2_000, // Usually 100
});

export default class extends WorkerEntrypoint<Env> {
	override async fetch(request: Request) {
		if (request.url.endsWith("/llms-full.txt")) {
			const { pathname } = new URL(request.url);
			const res = await this.env.VENDORED_MARKDOWN.get(pathname.slice(1));

			return new Response(res?.body, {
				headers: {
					"Content-Type": "text/markdown; charset=utf-8",
				},
			});
		}

		if (request.url.endsWith("/index.md")) {
			const htmlUrl = request.url.replace("index.md", "");
			const res = await this.env.ASSETS.fetch(htmlUrl, request);

			if (res.status === 404) {
				const redirect = await redirectsEvaluator(
					new Request(htmlUrl, request),
					this.env.ASSETS,
				);

				if (redirect) {
					const location = redirect.headers.get("location");

					return new Response(null, {
						status: redirect.status,
						headers: {
							Location: location + "index.md",
						},
					});
				}

				return res;
			}

			if (
				res.status === 200 &&
				res.headers.get("content-type")?.startsWith("text/html")
			) {
				const html = await res.text();

				const markdown = await htmlToMarkdown(html, request.url);

				if (!markdown) {
					return new Response("Not Found", { status: 404 });
				}

				return new Response(markdown, {
					headers: {
						"content-type": "text/markdown; charset=utf-8",
						"x-robots-tag": "noindex",
					},
				});
			}
		}

		try {
			try {
				const redirect = await redirectsEvaluator(request, this.env.ASSETS);
				if (redirect) {
					return redirect;
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
					return redirect;
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
