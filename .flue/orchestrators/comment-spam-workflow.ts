/**
 * CommentSpamWorkflow — durable spam gate for issue comments (D7).
 *
 * Cloudflare `WorkflowEntrypoint` bound as `COMMENT_SPAM`. Kicked from
 * `pipeline-entry.ts` for `issue_comment` created events whose author is not
 * exempt by payload-derived checks (write access, bots, item author). The
 * codeowner check requires GitHub API calls, so it runs here.
 *
 * Why a workflow: the spam filter is an AI call, so it cannot run inline in
 * the webhook handler without blowing GitHub's delivery timeout. Running it
 * as a durable step lets the handler return 202 immediately while the gate
 * runs in the background.
 *
 * Steps:
 *   1. spam-context — fetches the comment and parent item, then re-runs the
 *      exemption checks against fresh data (including the codeowner check).
 *      Skips without consulting the agent when any exemption matches.
 *   2. spam-verdict — dispatches the comment-spam-filter agent.
 *   3. act — on a high-confidence spam verdict: writes an R2 audit record
 *      first, then deletes the comment. Every failure path fails open — an
 *      agent error or audit failure never deletes a comment.
 */
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import CommentSpamFilter, {
	COMMENT_SPAM_VERDICT_DATA,
} from "../agents/comment-spam-filter";
import { agentStep } from "../lib/agents/agent-step";
import { SMALL_AGENT_DURABILITY } from "../lib/agents/durability";
import {
	buildCommentSpamAuditRecord,
	getCommentSpamContext,
	shouldDeleteComment,
	spamDeletionAuditKey,
	type CommentSpamParams,
} from "../lib/comment-spam";
import { deleteIssueComment, getInstallationToken } from "../lib/github";
import { SpamVerdictSchema } from "../lib/spam-filter";

interface CommentSpamEnv {
	DOCS_FLUE_BUCKET: R2Bucket;
	[key: string]: unknown;
}

export class CommentSpamWorkflow extends WorkflowEntrypoint<
	CommentSpamEnv,
	CommentSpamParams
> {
	async run(
		event: Readonly<WorkflowEvent<CommentSpamParams>>,
		step: WorkflowStep,
	): Promise<Record<string, unknown>> {
		const { commentId, parentNumber, isPullRequest } = event.payload;
		const ghEnv = this.env as unknown as Record<string, string>;

		// ── 1. Context + exemptions ─────────────────────────────────────────────
		const fetched = await step.do("spam-context", async () => {
			const token = await getInstallationToken(ghEnv);
			return getCommentSpamContext(token, ghEnv.GITHUB_ORG_TOKEN ?? "", {
				commentId,
				parentNumber,
				isPullRequest,
			});
		});
		if (fetched.skip) {
			console.log({
				message: `Comment spam gate skipped comment ${commentId} on #${parentNumber}: ${fetched.skip}`,
				event: "comment_spam_filter_verdict",
				commentId,
				number: parentNumber,
				isPullRequest,
				action: "skipped",
				reason: fetched.skip,
			});
			return { acted: true, deleted: false, skipped: fetched.skip };
		}
		const context = fetched.context;

		// ── 2. Agent verdict ────────────────────────────────────────────────────
		const verdict = await agentStep(step, {
			name: "comment-spam-filter",
			agent: CommentSpamFilter,
			id: `${event.instanceId}:comment-spam:${commentId}`,
			message: "Evaluate this comment for spam and submit your verdict.",
			initialData: {
				comment: context.comment,
				parent: context.parent,
			},
			dataName: COMMENT_SPAM_VERDICT_DATA,
			schema: SpamVerdictSchema,
			readTimeoutMs: SMALL_AGENT_DURABILITY.timeoutMs,
		});

		// ── 3. Act ──────────────────────────────────────────────────────────────
		const parent = context.parent;
		const label = `${parent.kind === "pull_request" ? "PR" : "Issue"} #${parent.number} comment ${commentId}`;
		const result = await step.do<{ deleted: boolean }>("act", async () => {
			if (!verdict.ok) {
				console.log({
					message: `Comment spam filter errored (failing open): ${label} — ${verdict.error}`,
					event: "comment_spam_filter_verdict",
					commentId,
					number: parent.number,
					isPullRequest,
					action: "filter_error",
				});
				return { deleted: false };
			}
			if (!shouldDeleteComment(verdict.value)) {
				console.log({
					message: `Comment left: ${label} (${verdict.value.confidence} confidence, not spam)`,
					event: "comment_spam_filter_verdict",
					commentId,
					number: parent.number,
					isPullRequest,
					...verdict.value,
					action: "left_undeleted",
				});
				return { deleted: false };
			}

			// Audit before deleting: if the audit write fails, fail open — no
			// un-auditable deletions.
			const auditKey = spamDeletionAuditKey(commentId);
			const record = buildCommentSpamAuditRecord(
				context,
				verdict.value,
				event.instanceId,
				new Date(),
			);
			try {
				await this.env.DOCS_FLUE_BUCKET.put(
					auditKey,
					JSON.stringify(record, null, 2),
				);
			} catch (error) {
				console.warn(
					`Comment spam audit write failed for ${auditKey}; failing open: ${error}`,
				);
				return { deleted: false };
			}

			const token = await getInstallationToken(ghEnv);
			await deleteIssueComment(token, commentId);
			console.log({
				message: `Comment deleted: ${label} (high confidence spam)`,
				event: "comment_spam_filter_verdict",
				commentId,
				number: parent.number,
				isPullRequest,
				...verdict.value,
				action: "comment_deleted",
			});
			return { deleted: true };
		});

		return { acted: true, deleted: result.deleted };
	}
}
