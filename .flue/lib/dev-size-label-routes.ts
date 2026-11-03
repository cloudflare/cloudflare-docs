import { Hono } from "hono";
import { hasValidInternalToken } from "./dev-review-routes";
import { getInstallationToken, getPullRequest } from "./github";
import { reconcileSizeLabel } from "./pr-size-label";
import { reviewMode, type ReviewRunEnv } from "./review/run-context";

export interface DevSizeLabelEnv {
	DOCS_FLUE_INTERNAL_TOKEN?: string;
	DOCS_FLUE_REVIEW_MODE?: string;
	[key: string]: unknown;
}

export const devSizeLabelRoutes = new Hono();

devSizeLabelRoutes.use("*", async (c, next) => {
	const env = c.env as unknown as DevSizeLabelEnv;
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

/** Replay size labeling for an existing PR; log mode is a dry run. */
devSizeLabelRoutes.post("/:number", async (c) => {
	const env = c.env as unknown as DevSizeLabelEnv;
	const number = Number(c.req.param("number"));
	if (!Number.isInteger(number) || number < 1)
		return c.text("Invalid number", 400);
	const mode = reviewMode(env as unknown as ReviewRunEnv);
	const token = await getInstallationToken(
		env as unknown as Record<string, string>,
	);
	const pr = await getPullRequest(token, number);
	const result = await reconcileSizeLabel(token, pr, {
		dryRun: mode !== "comment",
	});
	return c.json({
		mode,
		current: pr.labels.map((l) => l.name).filter((n) => n.startsWith("size/")),
		changes: pr.additions + pr.deletions,
		...result,
	});
});
