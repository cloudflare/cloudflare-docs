import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	BOT_COMMENT_MARKER,
	MAX_COMMENT_LENGTH,
	parseStatus,
	renderFailure,
	renderPending,
	renderRebaseStatus,
	renderReview,
} from "./render";
import type { RenderInput, TrackedFinding } from "./types";

const SHA = "a".repeat(40);

beforeEach(() => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date("2026-09-22T12:00:00.000Z"));
});

afterEach(() => vi.useRealTimers());

describe("rebase status", () => {
	it("inserts and replaces an escaped status block", () => {
		const first = renderRebaseStatus(
			"in-progress",
			undefined,
			"owner",
			`${BOT_COMMENT_MARKER}\n<!-- reviewed-head-sha: x -->\n## Review`,
		);
		expect(first).toContain("rebase-status:start");
		const replaced = renderRebaseStatus("failed", "<unsafe>", undefined, first);
		expect(replaced.match(/rebase-status:start/g)).toHaveLength(1);
		expect(replaced).toContain("&lt;unsafe&gt;");
	});

	it("renders a minimal comment without a prior bot comment", () => {
		expect(
			renderRebaseStatus(
				"complete",
				undefined,
				undefined,
				"user body",
			).startsWith(BOT_COMMENT_MARKER),
		).toBe(true);
	});
});

function finding(overrides: Partial<TrackedFinding> = {}): TrackedFinding {
	return {
		id: "C-12345678",
		specialist: "code",
		path: "src/example.ts",
		line: 4,
		title: "Handle errors",
		explanation: "The promise rejection is unhandled.",
		firstSeenSha: SHA,
		lastSeenSha: SHA,
		status: "active",
		...overrides,
	};
}

function input(overrides: Partial<RenderInput> = {}): RenderInput {
	return {
		pr: 12,
		headSha: SHA,
		fullReview: false,
		tier: "inline",
		sections: {
			code: { ran: true, failed: false },
			style: { ran: true, failed: false },
			conventions: { ran: true, failed: false },
		},
		active: [],
		resolved: [],
		dismissed: [],
		notReviewed: [],
		judge: "ok",
		...overrides,
	};
}

describe("renderReview", () => {
	it("renders an empty completed review", () => {
		const body = renderReview(input());
		expect(body).toContain(BOT_COMMENT_MARKER);
		expect(body).toContain("<!-- status: complete -->");
		expect(body).toContain("## AI Review");
		expect(body).toContain("✅ Reviewed `aaaaaaa` · 0 findings · incremental");
		expect(body).not.toContain("Fix in your agent");
		expect(body).not.toContain("### Code Review");
		expect(body).not.toContain("### Style Guide");
		expect(body).not.toContain("### Conventions");
	});

	it("renders section failure, skipped, and no-findings states", () => {
		const body = renderReview(
			input({
				sections: {
					code: { ran: true, failed: true },
					style: {
						ran: false,
						failed: false,
						skippedReason: "no docs content changes",
					},
					conventions: { ran: true, failed: false },
				},
			}),
		);
		expect(body).toContain(
			"⚠️ Reviewed `aaaaaaa` · 0 findings · incremental · code review failed",
		);
		expect(body).not.toContain("Skipped: no docs content changes.");
		expect(body).not.toContain("### Code Review");
		expect(body).not.toContain("### Style Guide");
		expect(body).not.toContain("### Conventions");
	});

	it("renders findings by specialist with safe snippet fences", () => {
		const body = renderReview(
			input({
				active: [
					finding({ snippet: "const x = ```value```;" }),
					finding({
						id: "S-12345678",
						specialist: "style",
						path: null,
						title: "Use a direct sentence",
					}),
				],
			}),
		);
		expect(body).toContain("### Code Review");
		expect(body).toContain("**`src/example.ts:4`** · Handle errors");
		expect(body).not.toContain("<sub>C-12345678</sub>");
		expect(body).toContain("- C-12345678 | src/example.ts:4 | Handle errors");
		expect(body).toContain("  ````txt\n  const x = ```value```;\n  ````");
		expect(body).not.toContain("```diff");
		expect(body).toContain("### Style Guide");
		expect(body).toContain("**`PR`** · Use a direct sentence");
		expect(body).not.toContain("### Conventions");
		expect(body).toContain("The comment must come before the commit");
		expect(body).toContain(
			"https://github.com/cloudflare/cloudflare-docs/pull/12",
		);
	});

	it("separates the finding header, explanation, and next finding", () => {
		const body = renderReview(
			input({
				active: [
					finding({ explanation: "first" }),
					finding({ id: "C-87654321", title: "Second", explanation: "two" }),
				],
			}),
		);
		expect(body).toContain(
			"**`src/example.ts:4`** · Handle errors\n\n  first\n\n- **`src/example.ts:4`** · Second",
		);
	});

	it("omits prose snippets from the visible review and agent prompt", () => {
		const body = renderReview(
			input({
				active: [
					finding({
						id: "S-12345678",
						specialist: "style",
						path: "src/example.mdx",
						snippet: "the figure below",
					}),
				],
			}),
		);
		expect(body).not.toContain("the figure below");
	});

	it("renders a long finding without truncation", () => {
		const explanation = "x".repeat(1_000);
		const body = renderReview(input({ active: [finding({ explanation })] }));
		expect(body).toContain(explanation);
	});

	it("renders unreviewed, resolved, dismissed, and unverified state", () => {
		const body = renderReview(
			input({
				active: [finding({ verified: false })],
				notReviewed: [{ path: "generated.ts", reason: "generated" }],
				resolved: [
					finding({
						id: "C-resolved",
						status: "resolved",
						statusReason: "fixed",
					}),
				],
				dismissed: [
					finding({
						id: "C-dismissed",
						status: "dismissed",
						statusReason: "not applicable",
					}),
				],
				judge: "failed",
			}),
		);
		expect(body).toContain("findings not verified");
		expect(body).toContain("Not reviewed (1)");
		expect(body).toContain("Resolved (1) · Dismissed (1)");
	});

	it("escapes prose injection while preserving inline code spans", () => {
		const body = renderReview(
			input({
				active: [
					finding({
						title: `${BOT_COMMENT_MARKER}</details><summary>bad</summary>`,
						explanation:
							"unterminated <!-- comment <Tabs> but `<Tabs>` remains code",
					}),
				],
			}),
		);
		expect(body.match(new RegExp(BOT_COMMENT_MARKER, "g"))).toHaveLength(1);
		expect(body).toContain(
			"&lt;/details&gt;&lt;summary&gt;bad&lt;/summary&gt;",
		);
		expect(body).toContain(
			"unterminated &lt;!-- comment &lt;Tabs&gt; but `<Tabs>` remains code",
		);
	});

	it("keeps multiline explanations inside their list item", () => {
		const body = renderReview(
			input({ active: [finding({ explanation: "first\n\nthird" })] }),
		);
		expect(body).toContain("  first\n  \n  third");
	});

	it("limits huge comments to 65,000 characters", () => {
		const huge = "x".repeat(10_000);
		const body = renderReview(
			input({
				active: Array.from({ length: 30 }, (_, index) =>
					finding({
						id: `C-${index}`,
						explanation: huge,
						snippet: huge,
					}),
				),
			}),
		);
		expect(body.length).toBeLessThanOrEqual(MAX_COMMENT_LENGTH);
	});
});

describe("transient renderers", () => {
	it("renders and parses pending and failure status", () => {
		expect(parseStatus(renderPending(SHA))).toBe("pending");
		expect(parseStatus(renderFailure(SHA))).toBe("failure");
		expect(renderPending(SHA)).toContain("## AI Review");
		expect(parseStatus("no metadata")).toBeNull();
	});

	it("words the pending note by review kind", () => {
		const short = SHA.slice(0, 7);
		const complete = renderReview(input());
		expect(renderPending(SHA)).toContain(
			`⏳ Review in progress for commit \`${short}\`.`,
		);
		expect(renderPending(SHA, complete)).toContain(
			`⏳ Reviewing new changes in commit \`${short}\`.`,
		);
		expect(renderPending(SHA, complete, { fullReview: true })).toContain(
			`⏳ Full review in progress for commit \`${short}\`.`,
		);
		expect(renderFailure(SHA)).toContain(
			`❌ Review failed; it will retry on the next push for commit \`${short}\`.`,
		);
	});

	it("preserves the original completed review across transient updates", () => {
		const complete = renderReview(input());
		const pending = renderPending(SHA, complete);
		const repeatedPending = renderPending(SHA, pending);
		const failure = renderFailure(SHA, repeatedPending);
		expect(failure).toContain("<!-- previous-review -->");
		expect(failure.match(/✅ Reviewed/g)).toHaveLength(1);
		expect(failure).not.toContain("<!-- status: complete -->");
		expect(failure).not.toContain("## Review\n\n✅ Reviewed\n\n## Review");
	});
});
