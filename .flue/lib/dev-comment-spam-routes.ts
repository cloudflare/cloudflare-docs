import { Hono } from "hono";
import { hasValidInternalToken } from "./dev-review-routes";
import type { CommentSpamParams } from "./comment-spam";
import { findIssueComment, getInstallationToken } from "./github";
import { reviewMode, type ReviewRunEnv } from "./review/run-context";

export interface DevCommentSpamEnv {
	DOCS_FLUE_INTERNAL_TOKEN?: string;
	DOCS_FLUE_REVIEW_MODE?: string;
	COMMENT_SPAM: Workflow<CommentSpamParams>;
	[key: string]: unknown;
}

export const devCommentSpamRoutes = new Hono();

devCommentSpamRoutes.use("*", async (c, next) => {
	const env = c.env as unknown as DevCommentSpamEnv;
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

/** Start a replay for an existing comment; log mode is a dry run. */
devCommentSpamRoutes.post("/:commentId", async (c) => {
	const env = c.env as unknown as DevCommentSpamEnv;
	const commentId = Number(c.req.param("commentId"));
	if (!Number.isInteger(commentId) || commentId < 1)
		return c.text("Invalid comment ID", 400);
	const token = await getInstallationToken(
		env as unknown as Record<string, string>,
	);
	const comment = await findIssueComment(token, commentId);
	if (!comment) return c.text("Comment not found", 404);
	// issue_url ends in /issues/<number>; the comment's html_url tells PR from issue.
	const parentNumber = Number(comment.issue_url?.split("/").pop());
	if (!Number.isInteger(parentNumber) || parentNumber < 1)
		return c.text("Could not resolve parent number", 502);
	const isPullRequest = /\/pull\/\d+#/.test(comment.html_url ?? "");
	const id = `replay-comment-${commentId}-${Date.now()}`;
	await env.COMMENT_SPAM.create({
		id,
		params: { commentId, parentNumber, isPullRequest, replay: true },
	});
	return c.json({ id, mode: reviewMode(env as unknown as ReviewRunEnv) }, 202);
});

devCommentSpamRoutes.get("/:id", async (c) => {
	const env = c.env as unknown as DevCommentSpamEnv;
	const instance = await env.COMMENT_SPAM.get(c.req.param("id"));
	const status = await instance.status();
	return c.json({
		status: status.status,
		output: status.output ?? null,
		error: status.error ?? null,
	});
});
