import { describe, expect, it } from "vitest";
import {
	BOT_COMMENT_MARKER,
	extractReviewedAt,
	extractReviewedHeadSha,
	partitionComments,
} from "./code-review-state";
import type { GitHubIssueComment } from "./github";

// ── extractReviewedHeadSha ─────────────────────────────────────────────────────

describe("extractReviewedHeadSha", () => {
	it("returns null for null input", () => {
		expect(extractReviewedHeadSha(null)).toBeNull();
	});

	it("returns null for empty string", () => {
		expect(extractReviewedHeadSha("")).toBeNull();
	});

	it("returns null when marker is absent", () => {
		expect(extractReviewedHeadSha("no markers here")).toBeNull();
	});

	it("extracts a valid 40-char SHA", () => {
		const sha = "a".repeat(40);
		expect(extractReviewedHeadSha(`<!-- reviewed-head-sha: ${sha} -->`)).toBe(
			sha,
		);
	});

	it("extracts SHA from a realistic bot comment body", () => {
		const sha = "1234567890abcdef1234567890abcdef12345678";
		const body = [
			BOT_COMMENT_MARKER,
			`<!-- reviewed-head-sha: ${sha} -->`,
			`<!-- reviewed-at: 2024-01-01T00:00:00.000Z -->`,
			"",
			"## Review",
			"",
			"✅ No issues found.",
		].join("\n");
		expect(extractReviewedHeadSha(body)).toBe(sha);
	});
});

// ── extractReviewedAt ──────────────────────────────────────────────────────────

describe("extractReviewedAt", () => {
	it("returns null for null input", () => {
		expect(extractReviewedAt(null)).toBeNull();
	});

	it("returns null when marker is absent", () => {
		expect(extractReviewedAt("no markers here")).toBeNull();
	});

	it("extracts the reviewed-at timestamp", () => {
		const ts = "2024-06-15T12:34:56.789Z";
		expect(extractReviewedAt(`<!-- reviewed-at: ${ts} -->`)).toBe(ts);
	});

	it("extracts timestamp from a multi-line body", () => {
		const ts = "2024-01-01T00:00:00.000Z";
		const body = [
			BOT_COMMENT_MARKER,
			"<!-- reviewed-head-sha: " + "a".repeat(40) + " -->",
			`<!-- reviewed-at: ${ts} -->`,
			"",
			"## Review",
		].join("\n");
		expect(extractReviewedAt(body)).toBe(ts);
	});
});

// ── partitionComments ──────────────────────────────────────────────────────────

function makeComment(
	overrides: Partial<GitHubIssueComment> = {},
): GitHubIssueComment {
	return {
		id: Math.floor(Math.random() * 1e9),
		body: "A human comment",
		user: { login: "contributor", type: "User" },
		created_at: "2024-01-01T10:00:00Z",
		updated_at: "2024-01-01T10:00:00Z",
		...overrides,
	};
}

function botComment(reviewedAt?: string): GitHubIssueComment {
	const body = [
		BOT_COMMENT_MARKER,
		"<!-- reviewed-head-sha: " + "a".repeat(40) + " -->",
		...(reviewedAt ? [`<!-- reviewed-at: ${reviewedAt} -->`] : []),
		"",
		"## Review",
		"",
		"✅ No issues found.",
	].join("\n");
	return makeComment({
		body,
		user: { login: "cloudflare-docs-bot", type: "Bot" },
		created_at: reviewedAt ?? "2024-01-01T12:00:00Z",
	});
}

describe("partitionComments", () => {
	it("returns null botComment and empty human list for empty array", () => {
		const { botComment: bc, humanCommentsAfterBot } = partitionComments([]);
		expect(bc).toBeNull();
		expect(humanCommentsAfterBot).toEqual([]);
	});

	it("returns all non-bot humans when no bot comment exists", () => {
		const comments = [
			makeComment({ created_at: "2024-01-01T09:00:00Z" }),
			makeComment({ created_at: "2024-01-01T10:00:00Z" }),
		];
		const { botComment: bc, humanCommentsAfterBot } =
			partitionComments(comments);
		expect(bc).toBeNull();
		expect(humanCommentsAfterBot).toHaveLength(2);
	});

	it("identifies the bot comment by the marker", () => {
		const bot = botComment();
		const { botComment: bc } = partitionComments([makeComment(), bot]);
		expect(bc?.body).toContain(BOT_COMMENT_MARKER);
	});

	it("picks the LAST bot comment when multiple exist", () => {
		const bot1 = botComment("2024-01-01T10:00:00Z");
		const bot2 = botComment("2024-01-01T14:00:00Z");
		const { botComment: bc } = partitionComments([bot1, makeComment(), bot2]);
		expect(extractReviewedAt(bc?.body ?? null)).toBe("2024-01-01T14:00:00Z");
	});

	it("excludes comments before the bot's reviewed-at timestamp", () => {
		const reviewedAt = "2024-01-01T12:00:00Z";
		const bot = botComment(reviewedAt);
		const before = makeComment({ created_at: "2024-01-01T11:00:00Z" });
		const after = makeComment({ created_at: "2024-01-01T13:00:00Z" });
		const { humanCommentsAfterBot } = partitionComments([before, bot, after]);
		expect(humanCommentsAfterBot).toHaveLength(1);
		expect(humanCommentsAfterBot[0].created_at).toBe("2024-01-01T13:00:00Z");
	});

	it("excludes Bot-type users from the human list", () => {
		const bot = botComment("2024-01-01T12:00:00Z");
		const automatedBot = makeComment({
			body: "Dependabot says hi",
			user: { login: "dependabot[bot]", type: "Bot" },
			created_at: "2024-01-01T13:00:00Z",
		});
		const human = makeComment({ created_at: "2024-01-01T14:00:00Z" });
		const { humanCommentsAfterBot } = partitionComments([
			bot,
			automatedBot,
			human,
		]);
		expect(humanCommentsAfterBot).toHaveLength(1);
		expect(humanCommentsAfterBot[0].user?.type).toBe("User");
	});

	it("falls back to bot comment created_at when reviewed-at is absent", () => {
		// Bot comment without reviewed-at embedded
		const bc = makeComment({
			body: BOT_COMMENT_MARKER + "\n## Review\n\n✅ No issues found.",
			user: { login: "bot", type: "Bot" },
			created_at: "2024-01-01T12:00:00Z",
		});
		const before = makeComment({ created_at: "2024-01-01T11:00:00Z" });
		const after = makeComment({ created_at: "2024-01-01T13:00:00Z" });
		const { humanCommentsAfterBot } = partitionComments([before, bc, after]);
		expect(humanCommentsAfterBot).toHaveLength(1);
		expect(humanCommentsAfterBot[0].created_at).toBe("2024-01-01T13:00:00Z");
	});
});
