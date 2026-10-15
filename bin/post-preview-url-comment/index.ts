// Posts the Workers for Platforms preview comment. Runs in the
// `publish-preview` job; the Worker Preview comment is posted separately by
// `worker-preview.ts` in its own job.
import * as core from "@actions/core";

import { PREVIEW_URL_REGEX } from "./constants";
import {
	filesTable,
	getChangedPaths,
	getPullContext,
	upsertComment,
} from "./shared";

async function run(): Promise<void> {
	try {
		if (!process.env.BRANCH_SLUG) {
			throw new Error("Could not find BRANCH_SLUG in env");
		}

		const pull = await getPullContext();

		const previewUrl = {
			branch: `https://${process.env.BRANCH_SLUG}.preview.developers.cloudflare.com`,
			commit: `https://${pull.commitSha.slice(0, 8)}.preview.developers.cloudflare.com`,
		};

		core.info(
			`Commit URL: ${previewUrl.commit}\nBranch URL: ${previewUrl.branch}`,
		);

		const paths = await getChangedPaths(pull);

		await upsertComment(
			pull,
			PREVIEW_URL_REGEX,
			`**Preview URL:** ${previewUrl.commit}\n**Preview Branch URL:** ${previewUrl.branch}${filesTable(paths, previewUrl.branch)}`,
		);
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		}
		process.exit();
	}
}

run();
