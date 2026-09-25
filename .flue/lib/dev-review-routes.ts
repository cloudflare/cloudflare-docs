import { Hono } from "hono";
import { getInstallationToken, getPullRequest } from "./github";
import { RUN_ARTIFACTS, reviewMode } from "./review/run-context";
import { getRunArtifact } from "./review/state";
import type { ReviewWorkflowParams } from "./review/start";

export interface DevReviewEnv {
	DOCS_FLUE_BUCKET: R2Bucket;
	DOCS_FLUE_INTERNAL_TOKEN?: string;
	DOCS_FLUE_REVIEW_MODE?: string;
	REVIEW_ORCHESTRATOR: Workflow<ReviewWorkflowParams>;
	[key: string]: unknown;
}

export async function hasValidInternalToken(
	provided: string | undefined,
	secret: string,
): Promise<boolean> {
	if (!provided) return false;
	const encoder = new TextEncoder();
	const left = encoder.encode(provided);
	const right = encoder.encode(secret);
	if (left.byteLength !== right.byteLength) return false;
	return (
		crypto.subtle as unknown as {
			timingSafeEqual(left: Uint8Array, right: Uint8Array): Promise<boolean>;
		}
	).timingSafeEqual(left, right);
}

export const devReviewRoutes = new Hono();

devReviewRoutes.use("*", async (c, next) => {
	const env = c.env as unknown as DevReviewEnv;
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

devReviewRoutes.post("/:number", async (c) => {
	const env = c.env as unknown as DevReviewEnv;
	const number = Number(c.req.param("number"));
	if (!Number.isInteger(number) || number < 1)
		return c.text("Invalid PR number", 400);
	const token = await getInstallationToken(
		env as unknown as Record<string, string>,
	);
	const pr = await getPullRequest(token, number);
	const id = `replay-${number}-${Date.now()}`;
	await env.REVIEW_ORCHESTRATOR.create({
		id,
		params: {
			number,
			headSha: pr.head.sha,
			trigger: "command",
			fullReview: true,
			replay: true,
		},
	});
	// The replay publishes in this mode, so the caller can say where the comment goes.
	return c.json({ id, mode: reviewMode(env) }, 202);
});

devReviewRoutes.get("/:pr/:runId/comment", async (c) => {
	const env = c.env as unknown as DevReviewEnv;
	const artifact = await getRunArtifact<{ markdown: string }>(
		env.DOCS_FLUE_BUCKET,
		Number(c.req.param("pr")),
		c.req.param("runId"),
		RUN_ARTIFACTS.comment,
	);
	return artifact
		? c.text(artifact.markdown, 200, { "Content-Type": "text/markdown" })
		: c.text("Not Found", 404);
});

devReviewRoutes.get("/:id", async (c) => {
	const env = c.env as unknown as DevReviewEnv;
	const instance = await env.REVIEW_ORCHESTRATOR.get(c.req.param("id"));
	const status = await instance.status();
	return c.json({
		status: status.status,
		output: status.output ?? null,
		error: status.error ?? null,
	});
});
