import { describe, expect, it } from "vitest";
import { classifyWebhook, isActionable } from "./webhook-classify";

describe("classifyWebhook — code review + spam filter", () => {
	it("classifies a normal opened PR as spam-filter + code-review", () => {
		const c = classifyWebhook("pull_request", {
			action: "opened",
			pull_request: { number: 10, user: { login: "octocat" }, draft: false },
			sender: { login: "octocat" },
		});
		expect(c.number).toBe(10);
		expect(c.isDependabotPr).toBe(false);
		expect(c.isSpamFilterEvent).toBe(true);
		expect(c.isCodeReviewEvent).toBe(true);
		expect(c.isDependabotReviewEvent).toBe(false);
		expect(c.isDraft).toBe(false);
		expect(c.command).toBeNull();
		expect(isActionable(c)).toBe(true);
	});

	it("flags a draft PR", () => {
		const c = classifyWebhook("pull_request", {
			action: "opened",
			pull_request: { number: 11, user: { login: "octocat" }, draft: true },
		});
		expect(c.isDraft).toBe(true);
		expect(c.isCodeReviewEvent).toBe(true);
	});

	it("treats an opened issue as spam-filter only (not code review)", () => {
		const c = classifyWebhook("issues", {
			action: "opened",
			issue: { number: 5 },
		});
		expect(c.isSpamFilterEvent).toBe(true);
		expect(c.isCodeReviewEvent).toBe(false);
	});

	it("runs code review on ready_for_review", () => {
		const c = classifyWebhook("pull_request", {
			action: "ready_for_review",
			pull_request: { number: 12, user: { login: "octocat" } },
		});
		expect(c.isSpamFilterEvent).toBe(true);
		expect(c.isCodeReviewEvent).toBe(true);
	});

	it("ignores unrelated PR actions", () => {
		const c = classifyWebhook("pull_request", {
			action: "labeled",
			pull_request: { number: 13, user: { login: "octocat" } },
		});
		expect(c.isSpamFilterEvent).toBe(false);
		expect(c.isCodeReviewEvent).toBe(false);
		expect(isActionable(c)).toBe(false);
	});
});

describe("classifyWebhook — Dependabot", () => {
	it("routes a Dependabot PR to the dependabot review path", () => {
		const c = classifyWebhook("pull_request", {
			action: "opened",
			pull_request: { number: 20, user: { login: "dependabot[bot]" } },
		});
		expect(c.isDependabotPr).toBe(true);
		expect(c.isDependabotReviewEvent).toBe(true);
		expect(c.isSpamFilterEvent).toBe(false);
		expect(c.isCodeReviewEvent).toBe(false);
		expect(isActionable(c)).toBe(true);
	});
});

describe("classifyWebhook — slash commands", () => {
	const base = (commentBody: string) => ({
		action: "created",
		issue: { number: 30, pull_request: {}, user: { login: "author" } },
		comment: { id: 555, body: commentBody },
		sender: { login: "maintainer" },
	});

	it.each([
		["/review", "review"],
		["/full-review", "full-review"],
		["/ignore-review-limit", "ignore-review-limit"],
		["/disable-auto-review", "disable-auto-review"],
		["/rebase", "rebase"],
	])("recognizes %s", (body, expected) => {
		const c = classifyWebhook("issue_comment", base(body));
		expect(c.command).toBe(expected);
		expect(c.commentId).toBe(555);
		expect(c.commentPrAuthorLogin).toBe("author");
		expect(c.senderLogin).toBe("maintainer");
		expect(isActionable(c)).toBe(true);
	});

	it("trims surrounding whitespace", () => {
		const c = classifyWebhook("issue_comment", base("  /review \n"));
		expect(c.command).toBe("review");
	});

	it("ignores non-command comments", () => {
		const c = classifyWebhook("issue_comment", base("thanks!"));
		expect(c.command).toBeNull();
		expect(isActionable(c)).toBe(false);
	});

	it("ignores commands on issues (not PRs)", () => {
		const c = classifyWebhook("issue_comment", {
			action: "created",
			issue: { number: 31, user: { login: "author" } },
			comment: { id: 1, body: "/review" },
		});
		expect(c.command).toBeNull();
	});
});
