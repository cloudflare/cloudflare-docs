import { describe, expect, it } from "vitest";
import {
	getIssueOrPullRequestLabel,
	getIssueOrPullRequestNumber,
	getIssueOrPullRequestTitle,
	getIssueOrPullRequestUrl,
	truncateLogValue,
} from "./github-webhook";

// ── getIssueOrPullRequestNumber ────────────────────────────────────────────────

describe("getIssueOrPullRequestNumber", () => {
	it("extracts number from issues event", () => {
		expect(
			getIssueOrPullRequestNumber("issues", { issue: { number: 42 } }),
		).toBe(42);
	});

	it("extracts number from issue_comment event", () => {
		expect(
			getIssueOrPullRequestNumber("issue_comment", { issue: { number: 7 } }),
		).toBe(7);
	});

	it("extracts number from pull_request event", () => {
		expect(
			getIssueOrPullRequestNumber("pull_request", {
				pull_request: { number: 99 },
			}),
		).toBe(99);
	});

	it("returns undefined for unknown event type", () => {
		expect(getIssueOrPullRequestNumber("push", { number: 1 })).toBeUndefined();
	});

	it("returns undefined when payload is missing the nested object", () => {
		expect(getIssueOrPullRequestNumber("issues", {})).toBeUndefined();
	});
});

// ── getIssueOrPullRequestUrl ───────────────────────────────────────────────────

describe("getIssueOrPullRequestUrl", () => {
	it("extracts html_url from issues event", () => {
		expect(
			getIssueOrPullRequestUrl(
				"issues",
				{
					issue: { html_url: "https://github.com/org/repo/issues/1" },
				},
				1,
			),
		).toBe("https://github.com/org/repo/issues/1");
	});

	it("falls back to constructed URL for issues when html_url absent", () => {
		expect(getIssueOrPullRequestUrl("issues", {}, 5)).toBe(
			"https://github.com/cloudflare/cloudflare-docs/issues/5",
		);
	});

	it("extracts html_url from pull_request event", () => {
		expect(
			getIssueOrPullRequestUrl(
				"pull_request",
				{
					pull_request: { html_url: "https://github.com/org/repo/pull/2" },
				},
				2,
			),
		).toBe("https://github.com/org/repo/pull/2");
	});

	it("falls back to constructed URL for PRs when html_url absent", () => {
		expect(getIssueOrPullRequestUrl("pull_request", {}, 10)).toBe(
			"https://github.com/cloudflare/cloudflare-docs/pull/10",
		);
	});

	it("returns undefined for unknown event type", () => {
		expect(getIssueOrPullRequestUrl("push", {}, 1)).toBeUndefined();
	});
});

// ── getIssueOrPullRequestLabel ─────────────────────────────────────────────────

describe("getIssueOrPullRequestLabel", () => {
	it("returns 'PR' for pull_request", () => {
		expect(getIssueOrPullRequestLabel("pull_request")).toBe("PR");
	});

	it("returns 'Issue' for issues", () => {
		expect(getIssueOrPullRequestLabel("issues")).toBe("Issue");
	});

	it("returns 'PR' for issue_comment", () => {
		expect(getIssueOrPullRequestLabel("issue_comment")).toBe("PR");
	});

	it("returns generic label for unknown event type", () => {
		expect(getIssueOrPullRequestLabel("push")).toBe("GitHub webhook");
	});
});

// ── getIssueOrPullRequestTitle ─────────────────────────────────────────────────

describe("getIssueOrPullRequestTitle", () => {
	it("extracts title from issues event", () => {
		expect(
			getIssueOrPullRequestTitle("issues", { issue: { title: "Bug report" } }),
		).toBe("Bug report");
	});

	it("extracts title from issue_comment event", () => {
		expect(
			getIssueOrPullRequestTitle("issue_comment", {
				issue: { title: "Some issue" },
			}),
		).toBe("Some issue");
	});

	it("extracts title from pull_request event", () => {
		expect(
			getIssueOrPullRequestTitle("pull_request", {
				pull_request: { title: "[Workers] Add KV docs" },
			}),
		).toBe("[Workers] Add KV docs");
	});

	it("returns undefined for unknown event type", () => {
		expect(getIssueOrPullRequestTitle("push", {})).toBeUndefined();
	});
});

// ── truncateLogValue ───────────────────────────────────────────────────────────

describe("truncateLogValue", () => {
	it("returns short strings unchanged", () => {
		expect(truncateLogValue("hello")).toBe("hello");
	});

	it("returns strings of exactly 100 chars unchanged", () => {
		const s = "a".repeat(100);
		expect(truncateLogValue(s)).toBe(s);
	});

	it("truncates strings longer than 100 chars with ellipsis", () => {
		const s = "a".repeat(101);
		const result = truncateLogValue(s);
		expect(result).toHaveLength(100);
		expect(result.endsWith("...")).toBe(true);
	});

	it("truncates to 97 chars + '...' for long strings", () => {
		const s = "x".repeat(200);
		expect(truncateLogValue(s)).toBe("x".repeat(97) + "...");
	});
});
