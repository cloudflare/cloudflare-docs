import { Buffer } from "node:buffer";
import { parseDependabotPackages } from "./dependabot-review";
import { getSandbox } from "@cloudflare/sandbox";
import {
	artifactPrefix,
	type ReviewJob,
	type ReviewUnit,
	type Snapshot,
} from "./review-domain";

export function reviewSandbox(env: Env, job: ReviewJob) {
	return getSandbox(env.Sandbox, `review-${job.runId}`, { sleepAfter: "20m" });
}

export async function snapshotCommand<T>(
	env: Env,
	job: ReviewJob,
	action: string,
	start = 0,
	limit = 1,
	paths?: string[],
): Promise<T> {
	const request = JSON.stringify({
		baseSha: job.baseSha,
		headSha: job.headSha,
		previousHead: job.full ? undefined : job.baseline?.headSha,
		action,
		start,
		limit,
		paths,
		metadataOnly:
			job.author === "dependabot[bot]" &&
			parseDependabotPackages(job.body).length > 0,
	});
	const encoded = Buffer.from(request, "utf8").toString("base64");
	const result = await reviewSandbox(env, job).exec(
		`timeout 300s python3 /opt/docs-review/snapshot.py '${encoded}'`,
		{
			timeout: 330_000,
		},
	);
	if (!result.success)
		throw new Error(
			`Snapshot ${action} failed: ${result.stderr.slice(0, 2000)}`,
		);
	return JSON.parse(result.stdout) as T;
}

export const prepareSnapshot = (env: Env, job: ReviewJob, page: number) =>
	snapshotCommand<{ snapshot: Snapshot; units: ReviewUnit[]; done: boolean }>(
		env,
		job,
		"prepare",
		page,
	);
export const readUnit = async (env: Env, job: ReviewJob, index: number) => {
	const object = await env.DOCS_FLUE_BUCKET.get(
		`${artifactPrefix(job)}units/${index}.json`,
	);
	if (!object) throw new Error(`Missing review unit ${index}`);
	return object.json<ReviewUnit>();
};
