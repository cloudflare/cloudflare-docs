import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BOT_COMMENT_MARKER } from "./code-review-state";
import {
	renderComment,
	renderFailureComment,
	renderPendingComment,
	renderRebaseStatusUpdate,
	renderReviewLimitComment,
} from "./code-review-render";
import type { ReconcileResult, RenderReviewInput } from "./code-review-render";

const FIXED_DATE = "2024-06-15T12:00:00.000Z";
const HEAD_SHA = "a".repeat(40);
const SHORT_SHA = HEAD_SHA.slice(0, 7);

beforeEach(() => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date(FIXED_DATE));
});

afterEach(() => {
	vi.useRealTimers();
});

// ── Helpers ────────────────────────────────────────────────────────────────────

function emptyReconcile(
	overrides: Partial<ReconcileResult> = {},
): ReconcileResult {
	return {
		active: [],
		ignored_by_reviewer: [],
		resolved: [],
		summary: "No issues.",
		...overrides,
	};
}

function makeFinding(
	overrides: Partial<ReconcileResult["active"][number]> = {},
): ReconcileResult["active"][number] {
	return {
		id: "CR-abc123def456",
		severity: "warning",
		path: "src/content/docs/workers/index.mdx",
		rule: "Missing semicolon",
		evidence: "Semicolon absent",
		suggestion: "Add semicolon",
		...overrides,
	};
}

function cleanReviews(): RenderReviewInput {
	return {
		code: emptyReconcile(),
		style: emptyReconcile(),
		conventions: emptyReconcile(),
	};
}

// ── renderPendingComment ───────────────────────────────────────────────────────

describe("renderPendingComment", () => {
	it("contains the bot marker", () => {
		expect(renderPendingComment(HEAD_SHA, false)).toContain(BOT_COMMENT_MARKER);
	});

	it("embeds the head SHA", () => {
		const body = renderPendingComment(HEAD_SHA, false);
		expect(body).toContain(`<!-- reviewed-head-sha: ${HEAD_SHA} -->`);
	});

	it("embeds status: pending", () => {
		expect(renderPendingComment(HEAD_SHA, false)).toContain(
			"<!-- status: pending -->",
		);
	});

	it("shows initial review message when not an update", () => {
		expect(renderPendingComment(HEAD_SHA, false)).toContain(
			`Review in progress for commit \`${SHORT_SHA}\``,
		);
	});

	it("shows update message when isUpdate is true", () => {
		expect(renderPendingComment(HEAD_SHA, true)).toContain(
			`Reviewing new changes (commit \`${SHORT_SHA}\`)`,
		);
	});

	it("shows full review message when forceFullReview is true", () => {
		expect(renderPendingComment(HEAD_SHA, false, true)).toContain(
			`Full review in progress`,
		);
	});

	it("preserves existing non-pending body below a separator", () => {
		const existing = [
			BOT_COMMENT_MARKER,
			`<!-- reviewed-head-sha: ${"b".repeat(40)} -->`,
			`<!-- reviewed-at: 2024-01-01T00:00:00.000Z -->`,
			"",
			"## Review",
			"",
			"✅ No issues found in prior review.",
		].join("\n");
		const body = renderPendingComment(HEAD_SHA, true, false, existing);
		expect(body).toContain("✅ No issues found in prior review.");
		expect(body).toContain("---");
	});

	it("does not duplicate content if existingBody is already pending", () => {
		const existing = renderPendingComment("b".repeat(40), false);
		const body = renderPendingComment(HEAD_SHA, true, false, existing);
		// Should NOT contain the old pending text body in a preserved block
		expect(body.split("<!-- status: pending -->")).toHaveLength(2);
	});
});

// ── renderFailureComment ───────────────────────────────────────────────────────

describe("renderFailureComment", () => {
	it("contains the bot marker", () => {
		expect(renderFailureComment(HEAD_SHA)).toContain(BOT_COMMENT_MARKER);
	});

	it("embeds status: failure", () => {
		expect(renderFailureComment(HEAD_SHA)).toContain(
			"<!-- status: failure -->",
		);
	});

	it("mentions the short SHA", () => {
		expect(renderFailureComment(HEAD_SHA)).toContain(`\`${SHORT_SHA}\``);
	});

	it("contains ❌ indicator", () => {
		expect(renderFailureComment(HEAD_SHA)).toContain("❌");
	});
});

// ── renderComment ──────────────────────────────────────────────────────────────

describe("renderComment", () => {
	it("contains the bot marker", () => {
		expect(renderComment(cleanReviews(), HEAD_SHA)).toContain(
			BOT_COMMENT_MARKER,
		);
	});

	it("embeds the reviewed head SHA", () => {
		const body = renderComment(cleanReviews(), HEAD_SHA);
		expect(body).toContain(`<!-- reviewed-head-sha: ${HEAD_SHA} -->`);
	});

	it("shows ✅ status line when no findings", () => {
		expect(renderComment(cleanReviews(), HEAD_SHA)).toContain(
			"✅ No issues found",
		);
	});

	it("includes all three section headings", () => {
		const body = renderComment(cleanReviews(), HEAD_SHA);
		expect(body).toContain("### Code Review");
		expect(body).toContain("### Conventions");
		expect(body).toContain("### Style Guide Review");
	});

	it("shows 🚨 critical count in status line", () => {
		const reviews: RenderReviewInput = {
			...cleanReviews(),
			code: emptyReconcile({
				active: [makeFinding({ severity: "critical", id: "CR-001" })],
			}),
		};
		expect(renderComment(reviews, HEAD_SHA)).toContain("🚨 1 critical");
	});

	it("shows ⚠️ warning count in status line", () => {
		const reviews: RenderReviewInput = {
			...cleanReviews(),
			code: emptyReconcile({
				active: [makeFinding({ severity: "warning", id: "CR-001" })],
			}),
		};
		expect(renderComment(reviews, HEAD_SHA)).toContain("⚠️ 1 warning");
	});

	it("shows 💡 suggestion count in status line", () => {
		const reviews: RenderReviewInput = {
			...cleanReviews(),
			style: emptyReconcile({
				active: [makeFinding({ severity: "suggestion", id: "SG-001" })],
			}),
		};
		expect(renderComment(reviews, HEAD_SHA)).toContain("💡 1 suggestion");
	});

	it("does not render 'Fix in your agent' block when no findings", () => {
		expect(renderComment(cleanReviews(), HEAD_SHA)).not.toContain(
			"Fix in your agent",
		);
	});

	it("renders 'Fix in your agent' block when findings exist", () => {
		const reviews: RenderReviewInput = {
			...cleanReviews(),
			code: emptyReconcile({
				active: [makeFinding({ id: "CR-001" })],
			}),
		};
		expect(renderComment(reviews, HEAD_SHA)).toContain("Fix in your agent");
	});

	it("renders commands block", () => {
		const body = renderComment(cleanReviews(), HEAD_SHA);
		expect(body).toContain("Commands");
		expect(body).toContain("`/review`");
		expect(body).toContain("`/full-review`");
	});

	it("shows ⚠️ failure suffix when a section degraded", () => {
		const reviews: RenderReviewInput = {
			...cleanReviews(),
			codeFailed: true,
		};
		expect(renderComment(reviews, HEAD_SHA)).toContain(
			"Part of the review could not complete",
		);
	});

	it("renders acknowledged block when ignored_by_reviewer is non-empty", () => {
		const ignored = {
			...makeFinding({ id: "CR-001" }),
			reviewer_note: "Not applicable here",
		};
		const reviews: RenderReviewInput = {
			...cleanReviews(),
			code: emptyReconcile({ ignored_by_reviewer: [ignored] }),
		};
		expect(renderComment(reviews, HEAD_SHA)).toContain(
			"Acknowledged by author",
		);
		expect(renderComment(reviews, HEAD_SHA)).toContain("Not applicable here");
	});

	it("✅ no outstanding when ignored but no active findings", () => {
		const ignored = {
			...makeFinding({ id: "CR-001" }),
			reviewer_note: "OK",
		};
		const reviews: RenderReviewInput = {
			...cleanReviews(),
			code: emptyReconcile({ ignored_by_reviewer: [ignored] }),
		};
		expect(renderComment(reviews, HEAD_SHA)).toContain(
			"✅ No outstanding issues",
		);
	});

	it("includes forceFullReview wording when flag is set", () => {
		expect(renderComment(cleanReviews(), HEAD_SHA, true)).toContain(
			"full PR diff",
		);
	});

	it("includes PR number in Fix-in-agent block", () => {
		const reviews: RenderReviewInput = {
			...cleanReviews(),
			code: emptyReconcile({ active: [makeFinding({ id: "CR-001" })] }),
		};
		expect(renderComment(reviews, HEAD_SHA, false, 9999)).toContain("PR #9999");
	});
});

// ── renderReviewLimitComment ───────────────────────────────────────────────────

describe("renderReviewLimitComment", () => {
	it("contains the bot marker", () => {
		expect(renderReviewLimitComment()).toContain(BOT_COMMENT_MARKER);
	});

	it("contains the paused message", () => {
		expect(renderReviewLimitComment()).toContain(
			"Automatic reviews for this PR are paused",
		);
	});

	it("preserves existing non-pending review body", () => {
		const existing = [
			BOT_COMMENT_MARKER,
			`<!-- reviewed-head-sha: ${"a".repeat(40)} -->`,
			`<!-- reviewed-at: 2024-01-01T00:00:00.000Z -->`,
			"",
			"## Review",
			"",
			"✅ No issues found.",
		].join("\n");
		const body = renderReviewLimitComment(existing);
		expect(body).toContain("✅ No issues found.");
	});
});

// ── renderRebaseStatusUpdate ───────────────────────────────────────────────────

describe("renderRebaseStatusUpdate", () => {
	it("in-progress: contains ⏳", () => {
		expect(
			renderRebaseStatusUpdate("in-progress", undefined, "alice", null),
		).toContain("⏳");
	});

	it("in-progress: mentions the sender", () => {
		expect(
			renderRebaseStatusUpdate("in-progress", undefined, "alice", null),
		).toContain("@alice");
	});

	it("complete: contains ✅", () => {
		expect(
			renderRebaseStatusUpdate("complete", undefined, undefined, null),
		).toContain("✅");
	});

	it("failed: contains ❌", () => {
		expect(
			renderRebaseStatusUpdate("failed", "timeout error", undefined, null),
		).toContain("❌");
	});

	it("failed: includes the detail", () => {
		expect(
			renderRebaseStatusUpdate("failed", "network error", undefined, null),
		).toContain("network error");
	});

	it("halted-wrong-base: mentions the base ref", () => {
		expect(
			renderRebaseStatusUpdate("halted-wrong-base", "main", undefined, null),
		).toContain("`main`");
	});

	it("halted-fork: warns about fork", () => {
		expect(
			renderRebaseStatusUpdate("halted-fork", undefined, undefined, null),
		).toContain("fork");
	});

	it("halted-confidence: contains ⚠️ and the reason", () => {
		const body = renderRebaseStatusUpdate(
			"halted-confidence",
			"Too many conflicting files",
			undefined,
			null,
		);
		expect(body).toContain("⚠️");
		expect(body).toContain("Too many conflicting files");
	});

	it("injects status below ## Review in an existing body", () => {
		const existing = [
			BOT_COMMENT_MARKER,
			`<!-- reviewed-head-sha: ${"a".repeat(40)} -->`,
			`<!-- reviewed-at: 2024-01-01T00:00:00.000Z -->`,
			"",
			"## Review",
			"",
			"✅ No issues found.",
		].join("\n");
		const body = renderRebaseStatusUpdate(
			"in-progress",
			undefined,
			"alice",
			existing,
		);
		// The rebase status line should appear and the original review content preserved
		expect(body).toContain("⏳");
		expect(body).toContain("✅ No issues found.");
		const reviewIdx = body.indexOf("## Review");
		const rebaseIdx = body.indexOf("⏳");
		expect(rebaseIdx).toBeGreaterThan(reviewIdx);
	});

	it("refreshes updated-at timestamp", () => {
		const existing = [
			BOT_COMMENT_MARKER,
			"<!-- updated-at: 2023-01-01T00:00:00.000Z -->",
			"",
			"## Review",
			"",
			"✅ No issues found.",
		].join("\n");
		const body = renderRebaseStatusUpdate(
			"complete",
			undefined,
			undefined,
			existing,
		);
		expect(body).toContain(`<!-- updated-at: ${FIXED_DATE} -->`);
		expect(body).not.toContain("2023-01-01");
	});

	it("strips backticks from detail to avoid broken inline code spans", () => {
		const body = renderRebaseStatusUpdate(
			"halted-confidence",
			"branch `feature/test` conflicts",
			undefined,
			null,
		);
		// Backticks stripped, content preserved
		expect(body).toContain("feature/test");
		expect(body).not.toContain("`feature/test`");
	});
});
