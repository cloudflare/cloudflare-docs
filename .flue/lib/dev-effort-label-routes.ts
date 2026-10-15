import { Hono } from "hono";
import { hasValidInternalToken } from "./dev-review-routes";
import { reviewMode, type ReviewRunEnv } from "./review/run-context";
import type { EffortLabelParams } from "../orchestrators/effort-label-workflow";

export interface DevEffortLabelEnv {
	DOCS_FLUE_INTERNAL_TOKEN?: string;
	DOCS_FLUE_REVIEW_MODE?: string;
	EFFORT_LABEL: Workflow<EffortLabelParams>;
	[key: string]: unknown;
}

export const devEffortLabelRoutes = new Hono();

devEffortLabelRoutes.use("*", async (c, next) => {
	const env = c.env as unknown as DevEffortLabelEnv;
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

/** Start an effort-label replay for an existing issue; log mode is a dry run. */
devEffortLabelRoutes.post("/:number", async (c) => {
	const env = c.env as unknown as DevEffortLabelEnv;
	const number = Number(c.req.param("number"));
	if (!Number.isInteger(number) || number < 1)
		return c.text("Invalid number", 400);
	const id = `replay-effort-label-${number}-${Date.now()}`;
	await env.EFFORT_LABEL.create({ id, params: { number, replay: true } });
	return c.json({ id, mode: reviewMode(env as unknown as ReviewRunEnv) }, 202);
});

devEffortLabelRoutes.get("/:id", async (c) => {
	const env = c.env as unknown as DevEffortLabelEnv;
	const instance = await env.EFFORT_LABEL.get(c.req.param("id"));
	const status = await instance.status();
	return c.json({
		status: status.status,
		output: status.output ?? null,
		error: status.error ?? null,
	});
});
