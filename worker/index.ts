import { WorkerEntrypoint } from "cloudflare:workers";
import { generateRedirectsEvaluator } from "redirects-in-workers";
import redirectsFileContents from "../dist/_redirects";
import functions from "./functions";

const redirectsEvaluator = generateRedirectsEvaluator(redirectsFileContents);

export default class extends WorkerEntrypoint<Env> {
	override async fetch(request: Request) {
		try {
			try {
				// Remove once the whacky double-slash rules get removed
				const url = new URL(request.url);
				request = new Request(
					new URL(
						url.pathname.replaceAll("//", "/") + url.search,
						"https://developers.cloudflare.com/",
					),
					request,
				);
			} catch (error) {
				console.error("Could not normalize request URL", error);
			}

			try {
				const redirect = await redirectsEvaluator(request, this.env.ASSETS);
				if (redirect) {
					return redirect;
				}
			} catch (error) {
				console.error("Could not evaluate redirects", error);
			}

			try {
				return await functions.fetch(request, this.env, this.ctx);
			} catch (error) {
				console.error("Could not evaluate functions", error);
			}
		} catch (error) {
			console.error("Unknown error", error);
		}

		return this.env.ASSETS.fetch(request);
	}
}
