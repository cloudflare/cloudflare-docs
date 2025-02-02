import { WorkerEntrypoint } from "cloudflare:workers";
import { generateRedirectsEvaluator } from "redirects-in-workers";
import redirectsFileContents from "../dist/_redirects";

const redirectsEvaluator = generateRedirectsEvaluator(redirectsFileContents);

export default class extends WorkerEntrypoint<Env> {
	override async fetch(request: Request) {
		try {
			const url = new URL(request.url);
			const normalizedURL = new URL(
				url.pathname.replaceAll("//", "/") + url.search,
				"https://developers.cloudflare.com/",
			);

			const normalizedRequest = new Request(normalizedURL, request);

			// Evaluate redirects on normalized request
			const redirect = await this.evaluateRedirects(normalizedRequest);
			if (redirect) return redirect;

			// Attempt evaluation with forced trailing slash
			const forcedTrailingSlashURL = new URL(
				normalizedRequest.url.replace(/([^/])$/, "$1/"),
				normalizedRequest.url,
			);
			const forcedTrailingSlashRequest = new Request(forcedTrailingSlashURL, request);

			const redirectWithSlash = await this.evaluateRedirects(forcedTrailingSlashRequest);
			if (redirectWithSlash) return redirectWithSlash;

		} catch (error) {
			console.error("Error processing request:", error);
		}

		// Fallback: Fetch from ASSETS
		return this.env.ASSETS.fetch(request);
	}

	private async evaluateRedirects(request: Request) {
		try {
			// @ts-expect-error Ignore Fetcher type mismatch
			return await redirectsEvaluator(request, this.env.ASSETS);
		} catch (error) {
			console.error("Unknown error", error);
			return null;
		}
	}
}
