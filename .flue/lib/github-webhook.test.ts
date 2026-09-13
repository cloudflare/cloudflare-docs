import { describe, expect, it } from "vitest";
import {
	getIssueOrPullRequestNumber,
	getIssueOrPullRequestTitle,
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
