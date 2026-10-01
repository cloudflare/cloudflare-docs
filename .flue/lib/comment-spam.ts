/**
 * Comment-spam-gate domain helpers.
 *
 * Context fetching and pure decision helpers used by the CommentSpamWorkflow.
 * Side-effect calls (the R2 audit write and deleteIssueComment) remain in the
 * workflow so they're easy to audit, mirroring the lib/spam-filter.ts split.
 */
import { findIssueComment, getIssue, isCodeOwner } from "./github";

// ── Constants ─────────────────────────────────────────────────────────────────

/** Comment body cap fed to the agent; comments can be very large. */
export const MAX_COMMENT_BODY_CHARS = 20_000;
/** Parent item body cap fed to the agent (same spirit as MAX_PATCH_CHARS). */
export const MAX_PARENT_BODY_CHARS = 2_000;

/**
 * R2 prefix for audit records of deleted comments. Intentionally outside
 * reviews/v2/ so run cleanup and the clear-R2 script never touch them.
 */
export const SPAM_DELETIONS_PREFIX = "spam-gate/comment-deletions";

// ── Workflow params ───────────────────────────────────────────────────────────

/** Params carried in the CommentSpamWorkflow instance payload. */
export interface CommentSpamParams {
	commentId: number;
	parentNumber: number;
	/** Whether the parent item is a PR (as opposed to an issue). */
	isPullRequest: boolean;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CommentSpamContext {
	comment: {
		id: number;
		body: string;
		url: string;
		author: string;
		author_association: string;
	};
	parent: {
		kind: "issue" | "pull_request";
		number: number;
		title: string;
		state: string;
		url: string;
		body?: string;
		author: string;
	};
}

/**
 * Why the gate skipped a comment without consulting the agent. The codeowner
 * reason requires GitHub API calls, so it is only ever produced after the
 * context fetch; the others are re-verified defensively against fresh data.
 */
export type CommentSpamSkip =
	| "comment-missing"
	| "write-access"
	| "bot-author"
	| "item-author"
	| "codeowner";

export type CommentSpamContextResult =
	| { skip: CommentSpamSkip; context?: undefined }
	| { skip?: undefined; context: CommentSpamContext };

// ── Decision helpers ──────────────────────────────────────────────────────────

/**
 * Deletion bar: high-confidence spam only. Medium and low verdicts are logged
 * but never acted on, because comment deletion is irreversible.
 */
export function shouldDeleteComment(verdict: {
	is_spam: boolean;
	confidence: "low" | "medium" | "high";
}): boolean {
	return verdict.is_spam && verdict.confidence === "high";
}

/** R2 object key for a deleted comment's audit record. */
export function spamDeletionAuditKey(commentId: number): string {
	return `${SPAM_DELETIONS_PREFIX}/${commentId}.json`;
}

// ── Context fetching ──────────────────────────────────────────────────────────

/**
 * Fetch the comment and its parent item, and run the exemption checks that
 * could not be resolved from the webhook payload (fresh comment data plus the
 * codeowner check). Returns a skip reason instead of a context when the
 * comment is exempt or already gone.
 */
export async function getCommentSpamContext(
	installationToken: string,
	orgToken: string,
	input: CommentSpamParams,
): Promise<CommentSpamContextResult> {
	const comment = await findIssueComment(installationToken, input.commentId);
	if (!comment) return { skip: "comment-missing" };

	const item = await getIssue(installationToken, input.parentNumber);
	const author = comment.user?.login ?? "";
	// GitHub always returns author_association; treat a missing value as NONE
	// so unknown data flows to the agent gate rather than being trusted.
	const association = comment.author_association ?? "NONE";

	if (
		association === "OWNER" ||
		association === "MEMBER" ||
		association === "COLLABORATOR"
	) {
		return { skip: "write-access" };
	}
	if (/\[bot\]$/.test(author)) return { skip: "bot-author" };
	if (author === item.user?.login) return { skip: "item-author" };
	if (await isCodeOwner(installationToken, orgToken, author)) {
		return { skip: "codeowner" };
	}

	return {
		context: {
			comment: {
				id: comment.id,
				body: (comment.body ?? "").slice(0, MAX_COMMENT_BODY_CHARS),
				url: comment.html_url ?? "",
				author,
				author_association: association,
			},
			parent: {
				kind: input.isPullRequest ? "pull_request" : "issue",
				number: item.number,
				title: item.title,
				state: item.state,
				url: item.html_url,
				body: item.body ? item.body.slice(0, MAX_PARENT_BODY_CHARS) : undefined,
				author: item.user?.login ?? "",
			},
		},
	};
}

// ── Audit record ──────────────────────────────────────────────────────────────

/** Shape persisted to R2 before a comment is deleted. */
export interface CommentSpamAuditRecord {
	comment_id: number;
	comment_url: string;
	comment_body: string;
	comment_author: string;
	comment_author_association: string;
	parent: {
		kind: string;
		number: number;
		url: string;
		title: string;
	};
	verdict: {
		is_spam: boolean;
		confidence: string;
		reason: string;
	};
	deleted_at: string;
	workflow_run_id: string;
}

/** Build the audit record for a comment that is about to be deleted. */
export function buildCommentSpamAuditRecord(
	context: CommentSpamContext,
	verdict: { is_spam: boolean; confidence: string; reason: string },
	workflowRunId: string,
	deletedAt: Date,
): CommentSpamAuditRecord {
	return {
		comment_id: context.comment.id,
		comment_url: context.comment.url,
		comment_body: context.comment.body,
		comment_author: context.comment.author,
		comment_author_association: context.comment.author_association,
		parent: {
			kind: context.parent.kind,
			number: context.parent.number,
			url: context.parent.url,
			title: context.parent.title,
		},
		verdict: {
			is_spam: verdict.is_spam,
			confidence: verdict.confidence,
			reason: verdict.reason,
		},
		deleted_at: deletedAt.toISOString(),
		workflow_run_id: workflowRunId,
	};
}
