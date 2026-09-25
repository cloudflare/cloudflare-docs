import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	buildCommentSpamAuditRecord,
	getCommentSpamContext,
	shouldDeleteComment,
	spamDeletionAuditKey,
	SPAM_DELETIONS_PREFIX,
	type CommentSpamContext,
} from "./comment-spam";

const github = vi.hoisted(() => ({
	findIssueComment: vi.fn(),
	getIssue: vi.fn(),
	isCodeOwner: vi.fn(),
}));
vi.mock("./github", async (importOriginal) => ({
	...(await importOriginal<typeof import("./github")>()),
	findIssueComment: github.findIssueComment,
	getIssue: github.getIssue,
	isCodeOwner: github.isCodeOwner,
}));

const comment = {
	id: 5818809326,
	body: "best deals here http://spam.example",
	created_at: "2026-09-24T00:00:00Z",
	updated_at: "2026-09-24T00:00:00Z",
	html_url:
		"https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809326",
	user: { login: "spam-user" },
	author_association: "NONE",
};

const item = {
	number: 33664,
	title: "Update pages docs",
	body: "A real PR body",
	state: "open",
	html_url: "https://github.com/cloudflare/cloudflare-docs/pull/33664",
	user: { login: "pr-author" },
	author_association: "CONTRIBUTOR",
	labels: [],
};

function mockResolved(commentAuthor: string, itemAuthor: string) {
	github.findIssueComment.mockResolvedValue({
		...comment,
		user: { login: commentAuthor },
	});
	github.getIssue.mockResolvedValue({
		...item,
		user: { login: itemAuthor },
	});
	github.isCodeOwner.mockResolvedValue(false);
}

const params = {
	commentId: comment.id,
	parentNumber: 33664,
	isPullRequest: true,
};

describe("shouldDeleteComment", () => {
	it("deletes only high-confidence spam", () => {
		expect(shouldDeleteComment({ is_spam: true, confidence: "high" })).toBe(
			true,
		);
	});

	it.each([
		[true, "medium"],
		[true, "low"],
		[false, "high"],
		[false, "low"],
	] as const)(
		"does not delete on is_spam=%s confidence=%s",
		(is_spam, confidence) => {
			expect(shouldDeleteComment({ is_spam, confidence })).toBe(false);
		},
	);
});

describe("spamDeletionAuditKey", () => {
	it("lives under the spam-gate prefix", () => {
		expect(spamDeletionAuditKey(5818809326)).toBe(
			`${SPAM_DELETIONS_PREFIX}/5818809326.json`,
		);
	});
});

describe("getCommentSpamContext", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("builds context for a non-exempt comment", async () => {
		mockResolved("spam-user", "pr-author");
		const result = await getCommentSpamContext("token", "org-token", params);
		expect(result.skip).toBeUndefined();
		if (result.skip) return;
		expect(result.context.comment.id).toBe(comment.id);
		expect(result.context.comment.author).toBe("spam-user");
		expect(result.context.parent.kind).toBe("pull_request");
		expect(result.context.parent.author).toBe("pr-author");
	});

	it("skips when the comment no longer exists", async () => {
		github.findIssueComment.mockResolvedValue(undefined);
		const result = await getCommentSpamContext("token", "org-token", params);
		expect(result.skip).toBe("comment-missing");
		expect(github.getIssue).not.toHaveBeenCalled();
	});

	it.each(["OWNER", "MEMBER", "COLLABORATOR"] as const)(
		"skips write-access authors (%s)",
		async (association) => {
			github.findIssueComment.mockResolvedValue({
				...comment,
				author_association: association,
			});
			github.getIssue.mockResolvedValue(item);
			const result = await getCommentSpamContext("token", "org-token", params);
			expect(result.skip).toBe("write-access");
		},
	);

	it("skips bot authors", async () => {
		mockResolved("cloudflare-docs-bot[bot]", "pr-author");
		const result = await getCommentSpamContext("token", "org-token", params);
		expect(result.skip).toBe("bot-author");
	});

	it("skips the item author commenting on their own item", async () => {
		mockResolved("pr-author", "pr-author");
		const result = await getCommentSpamContext("token", "org-token", params);
		expect(result.skip).toBe("item-author");
	});

	it("skips codeowners", async () => {
		mockResolved("community-coder", "pr-author");
		github.isCodeOwner.mockResolvedValue(true);
		const result = await getCommentSpamContext("token", "org-token", params);
		expect(result.skip).toBe("codeowner");
	});

	it("truncates oversized bodies", async () => {
		mockResolved("spam-user", "pr-author");
		github.findIssueComment.mockResolvedValue({
			...comment,
			body: "x".repeat(30_000),
		});
		github.getIssue.mockResolvedValue({ ...item, body: "y".repeat(5_000) });
		const result = await getCommentSpamContext("token", "org-token", params);
		if (result.skip) throw new Error("expected context");
		expect(result.context.comment.body).toHaveLength(20_000);
		expect(result.context.parent.body).toHaveLength(2_000);
	});

	it("labels issues as issues", async () => {
		mockResolved("spam-user", "issue-author");
		const result = await getCommentSpamContext("token", "org-token", {
			...params,
			isPullRequest: false,
		});
		if (result.skip) throw new Error("expected context");
		expect(result.context.parent.kind).toBe("issue");
	});
});

describe("buildCommentSpamAuditRecord", () => {
	const context: CommentSpamContext = {
		comment: {
			id: comment.id,
			body: comment.body,
			url: comment.html_url,
			author: "spam-user",
			author_association: "NONE",
		},
		parent: {
			kind: "pull_request",
			number: 33664,
			title: "Update pages docs",
			state: "open",
			url: item.html_url,
			body: "A real PR body",
			author: "pr-author",
		},
	};
	const verdict = {
		is_spam: true,
		confidence: "high",
		reason: "Promotional link drop",
	};

	it("captures comment, parent, verdict, and run id", () => {
		const record = buildCommentSpamAuditRecord(
			context,
			verdict,
			"run-123",
			new Date("2026-09-24T01:02:03Z"),
		);
		expect(record).toEqual({
			comment_id: comment.id,
			comment_url: comment.html_url,
			comment_body: comment.body,
			comment_author: "spam-user",
			comment_author_association: "NONE",
			parent: {
				kind: "pull_request",
				number: 33664,
				url: item.html_url,
				title: "Update pages docs",
			},
			verdict: {
				is_spam: true,
				confidence: "high",
				reason: "Promotional link drop",
			},
			deleted_at: "2026-09-24T01:02:03.000Z",
			workflow_run_id: "run-123",
		});
	});
});
