import { WorkerEntrypoint } from "cloudflare:workers";
import { generateRedirectsEvaluator } from "redirects-in-workers";
import redirectsFileContents from "../dist/_redirects";
import functions from "./functions";

const redirectsEvaluator = generateRedirectsEvaluator(redirectsFileContents);

export default class extends WorkerEntrypoint<Env> {
	override async fetch(request: Request) {
		const redirect = await redirectsEvaluator(request, this.env.ASSETS);
		if (redirect) {
			return redirect;
		}

		return await functions.fetch(request, this.env, this.ctx);
	}
}
