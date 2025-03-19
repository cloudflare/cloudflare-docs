import { WorkerEntrypoint } from "cloudflare:workers";
import { generateRedirectsEvaluator } from "redirects-in-workers";
import redirectsFileContents from "../dist/__redirects";

const redirectsEvaluator = generateRedirectsEvaluator(redirectsFileContents);

export default class extends WorkerEntrypoint<Env> {
	override async fetch(request: Request) {
		try {
			try {
				// @ts-expect-error Ignore Fetcher type mismatch
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
					// @ts-expect-error Ignore Fetcher type mismatch
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
