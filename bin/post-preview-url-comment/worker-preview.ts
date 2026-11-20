// Posts the Worker Preview comment. Runs in the `publish-worker-preview` job,
// independently of the Workers for Platforms comment in `index.ts`.
import * as core from "@actions/core";

import { WORKER_PREVIEW_URL_REGEX } from "./constants";
import {
	filesTable,
	getChangedPaths,
	getPullContext,
	upsertComment,
} from "./shared";

async function run(): Promise<void> {
	try {
		const previewUrl = process.env.WORKER_PREVIEW_URL?.replace(/\/+$/, "");
		const deploymentUrl = process.env.WORKER_PREVIEW_DEPLOYMENT_URL;

		if (!previewUrl) {
			throw new Error("Could not find WORKER_PREVIEW_URL in env");
		}

		const pull = await getPullContext();
		const paths = await getChangedPaths(pull);

		await upsertComment(
			pull,
			WORKER_PREVIEW_URL_REGEX,
			`**Worker Preview URL:** ${previewUrl}${
				deploymentUrl
					? `\n**Worker Preview Deployment URL:** ${deploymentUrl}`
					: ""
			}${filesTable(paths, previewUrl)}`,
		);
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		}
		process.exit();
	}
}

run();
