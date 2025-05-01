import { WorkerEntrypoint } from "cloudflare:workers";
import { generateRedirectsEvaluator } from "redirects-in-workers";
import redirectsFileContents from "../dist/__redirects";

import { parse } from "node-html-parser";
import { process } from "../src/util/rehype";

import rehypeParse from "rehype-parse";
import rehypeBaseUrl from "../src/plugins/rehype/base-url";
import rehypeFilterElements from "../src/plugins/rehype/filter-elements";
import remarkGfm from "remark-gfm";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

const redirectsEvaluator = generateRedirectsEvaluator(redirectsFileContents, {
	maxLineLength: 10_000, // Usually 2_000
	maxStaticRules: 10_000, // Usually 2_000
	maxDynamicRules: 2_000, // Usually 100
});

export default class extends WorkerEntrypoint<Env> {
	override async fetch(request: Request) {
		if (request.url.endsWith("/index.md")) {
			const res = await this.env.ASSETS.fetch(
				request.url.replace("index.md", ""),
				request,
			);

			if (res.status === 404) {
				return res;
			}

			if (
				res.status === 200 &&
				res.headers.get("content-type")?.startsWith("text/html")
			) {
				const html = await res.text();

				const content = parse(html).querySelector(".sl-markdown-content");

				if (!content) {
					return new Response("Not Found", { status: 404 });
				}

				const markdown = await process(content.toString(), [
					rehypeParse,
					rehypeBaseUrl,
					rehypeFilterElements,
					[remarkGfm, { tablePipeAlign: false }],
					rehypeRemark,
					remarkStringify,
				]);

				return new Response(markdown, {
					headers: {
						"content-type": "text/markdown; charset=utf-8",
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

		return this.env.ASSETS.fetch(request);
	}
}
