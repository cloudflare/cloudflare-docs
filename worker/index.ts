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
		if (request.url.endsWith("/markdown.zip")) {
			const res = await this.env.VENDORED_MARKDOWN.get("markdown.zip");

			return new Response(res?.body, {
				headers: {
					"Content-Type": "application/zip",
				},
			});
		}

		if (request.url.endsWith("/llms-full.txt")) {
			const { pathname } = new URL(request.url);
			const res = await this.env.VENDORED_MARKDOWN.get(pathname.slice(1));

			return new Response(res?.body, {
				headers: {
					"Content-Type": "text/markdown; charset=utf-8",
				},
			});
		}

		if (
			request.url.endsWith("/index.md") ||
			request.headers.get("accept")?.includes("text/markdown")
		) {
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

			// CED-7 - Localized content experiment for Spanish
			if (request.url.startsWith("/es-la/fundamentals/")) {
				try {
					// Parse the incoming request URL
					const url = new URL(request.url);
					const path = url.pathname; // Get the path of the URL
					const params = url.search; // Get the query parameters
					const userAgent = request.headers.get("User-Agent") || ""; // Get the userAgent of the URL
					const outgoingHeaders = new Headers();
					outgoingHeaders.append("User-Agent", userAgent);
					// Forward the request to the target server
					const response = await fetch(
						"https://developers.cloudflare.com" + path + params,
						{
							headers: outgoingHeaders,
							cf: {
								// Override DNS resolution to use a specific hostname
								resolveOverride: "smartling.developers.cloudflare.com",
							},
						},
					);
					// Check if the response is successful (status code 2xx)
					if (!response.ok) {
						// If not successful, return an error response
						return new Response(
							`Error: Received status ${response.status} from upstream translation server.`,
							{
								status: response.status,
							},
						);
					}
					// If successful, return the response from the upstream server
					return response;
				} catch (error) {
					// Handle any errors that occur during the process
					console.error("Fetch failed:", error); // Log the error for debugging
					// Return a generic error response
					return new Response(
						"Internal Server Error: Unable to process your request.",
						{
							status: 500,
							headers: {
								"Content-Type": "text/plain",
							},
						},
					);
				}
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
