import { WorkerEntrypoint } from "cloudflare:workers";
import { generateRedirectsEvaluator } from "redirects-in-workers";
import redirectsFileContents from "../dist/__redirects";

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
