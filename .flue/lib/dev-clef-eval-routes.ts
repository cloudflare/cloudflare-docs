import { Hono } from "hono";
import { evaluateCommentSpam, type CommentSpamContext } from "./comment-spam";
import type { AiRunner } from "./clef";
import { hasValidInternalToken } from "./dev-review-routes";
import { evaluateItemSpam, type ItemSpamInput } from "./spam-filter";

export interface DevClefEvalEnv {
	AI: AiRunner;
	DOCS_FLUE_AI_GATEWAY_ID?: string;
	DOCS_FLUE_INTERNAL_TOKEN?: string;
	[key: string]: unknown;
}

/**
 * Runs the spam gates' Clef calls directly so evals can check real model
 * behavior. The caller must mount this behind the eval-routes gate
 * (DOCS_FLUE_ENABLE_EVAL_ROUTES); this file only enforces the token.
 */
export const clefEvalRoutes = new Hono();

clefEvalRoutes.use("*", async (c, next) => {
	const env = c.env as unknown as DevClefEvalEnv;
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

clefEvalRoutes.post("/item", async (c) => {
	const env = c.env as unknown as DevClefEvalEnv;
	const input = await c.req.json<ItemSpamInput>();
	return c.json(
		await evaluateItemSpam(env.AI, input, env.DOCS_FLUE_AI_GATEWAY_ID),
	);
});

clefEvalRoutes.post("/comment", async (c) => {
	const env = c.env as unknown as DevClefEvalEnv;
	const context = await c.req.json<CommentSpamContext>();
	return c.json(
		await evaluateCommentSpam(env.AI, context, env.DOCS_FLUE_AI_GATEWAY_ID),
	);
});
