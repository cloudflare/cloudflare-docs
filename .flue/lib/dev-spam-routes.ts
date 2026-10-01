import { Hono } from "hono";
import { hasValidInternalToken } from "./dev-review-routes";
import { getInstallationToken, getIssue } from "./github";
import { reviewMode, type ReviewRunEnv } from "./review/run-context";
import type { IngestParams } from "../orchestrators/ingest-workflow";

export interface DevSpamEnv {
	DOCS_FLUE_INTERNAL_TOKEN?: string;
	DOCS_FLUE_REVIEW_MODE?: string;
	INGEST: Workflow<IngestParams>;
	[key: string]: unknown;
}

export const devSpamRoutes = new Hono();

devSpamRoutes.use("*", async (c, next) => {
	const env = c.env as unknown as DevSpamEnv;
	if (!env.DOCS_FLUE_INTERNAL_TOKEN)
		return c.text("Internal token not configured", 500);
	if (
		!(await hasValidInternalToken(
			c.req.header("x-dev-secret"),
			env.DOCS_FLUE_INTERNAL_TOKEN,
		))
	)
		return c.text("Unauthorized", 401);
	await next();
});

/** Start a replay for an existing issue or PR; log mode is a dry run. */
devSpamRoutes.post("/:number", async (c) => {
	const env = c.env as unknown as DevSpamEnv;
	const number = Number(c.req.param("number"));
	if (!Number.isInteger(number) || number < 1)
		return c.text("Invalid number", 400);
	const type = c.req.query("type");
	let isPullRequest: boolean;
	if (type === "pull_request") isPullRequest = true;
	else if (type === "issue") isPullRequest = false;
	else if (type === undefined) {
		// The issues API also returns PRs; `pull_request` is only set on those.
		const token = await getInstallationToken(
			env as unknown as Record<string, string>,
		);
		const item = (await getIssue(token, number)) as { pull_request?: unknown };
		isPullRequest = item.pull_request != null;
	} else return c.text("type must be issue or pull_request", 400);

	const id = `replay-spam-${number}-${Date.now()}`;
	await env.INGEST.create({
		id,
		params: {
			eventType: isPullRequest ? "pull_request" : "issues",
			number,
			isPullRequest,
			isDraft: false,
			replay: true,
		},
	});
	return c.json({ id, mode: reviewMode(env as unknown as ReviewRunEnv) }, 202);
});

devSpamRoutes.get("/:id", async (c) => {
	const env = c.env as unknown as DevSpamEnv;
	const instance = await env.INGEST.get(c.req.param("id"));
	const status = await instance.status();
	return c.json({
		status: status.status,
		output: status.output ?? null,
		error: status.error ?? null,
	});
});
