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

describe("classifyWebhook — changelog date check", () => {
	it.each(["opened", "reopened", "synchronize", "ready_for_review", "closed"])(
		"marks %s as a changelog date event",
		(action) => {
			const c = classifyWebhook("pull_request", {
				action,
				pull_request: { number: 40, user: { login: "octocat" } },
			});
			expect(c.isChangelogDateEvent).toBe(true);
			expect(isActionable(c)).toBe(true);
		},
	);

	it("ignores non-changelog-date PR actions", () => {
		const c = classifyWebhook("pull_request", {
			action: "labeled",
			pull_request: { number: 41, user: { login: "octocat" } },
		});
		expect(c.isChangelogDateEvent).toBe(false);
	});

	it("excludes Dependabot PRs", () => {
		const c = classifyWebhook("pull_request", {
			action: "synchronize",
			pull_request: { number: 42, user: { login: "dependabot[bot]" } },
		});
		expect(c.isChangelogDateEvent).toBe(false);
	});

	it("ignores issue events", () => {
		const c = classifyWebhook("issues", {
			action: "opened",
			issue: { number: 43 },
		});
		expect(c.isChangelogDateEvent).toBe(false);
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
		["/disable-auto-review", "disable-auto-review"],
		["/draft-never-stale", "draft-never-stale"],
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

	it("routes non-command comments to the comment spam gate", () => {
		const c = classifyWebhook("issue_comment", base("thanks!"));
		expect(c.command).toBeNull();
		expect(c.isCommentSpamEvent).toBe(true);
		expect(isActionable(c)).toBe(true);
	});

	it("ignores the removed review-limit command", () => {
		expect(
			classifyWebhook("issue_comment", base("/ignore-review-limit")).command,
		).toBeNull();
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

describe("classifyWebhook — comment spam gate", () => {
	const comment = (overrides: Record<string, unknown> = {}) => ({
		action: "created",
		issue: { number: 70, user: { login: "pr-author" } },
		comment: {
			id: 900,
			body: "spam message",
			user: { login: "random-user" },
			author_association: "NONE",
		},
		sender: { login: "random-user" },
		...overrides,
	});

	it("gates a plain comment on a PR", () => {
		const c = classifyWebhook(
			"issue_comment",
			comment({
				issue: { number: 70, pull_request: {}, user: { login: "pr-author" } },
			}),
		);
		expect(c.isCommentSpamEvent).toBe(true);
		expect(c.commentIsOnPullRequest).toBe(true);
		expect(c.number).toBe(70);
		expect(isActionable(c)).toBe(true);
	});

	it("gates a plain comment on an issue", () => {
		const c = classifyWebhook("issue_comment", comment());
		expect(c.isCommentSpamEvent).toBe(true);
		expect(c.commentIsOnPullRequest).toBe(false);
		expect(isActionable(c)).toBe(true);
	});

	it.each(["OWNER", "MEMBER", "COLLABORATOR"])(
		"exempts write-access authors (%s)",
		(association) => {
			const c = classifyWebhook(
				"issue_comment",
				comment({
					comment: {
						id: 900,
						body: "LGTM, merging",
						user: { login: "maintainer" },
						author_association: association,
					},
				}),
			);
			expect(c.isCommentSpamEvent).toBe(false);
			expect(isActionable(c)).toBe(false);
		},
	);

	it("exempts bot authors", () => {
		const c = classifyWebhook(
			"issue_comment",
			comment({
				comment: {
					id: 900,
					body: "This branch has conflicts",
					user: { login: "cloudflare-docs-bot[bot]" },
					author_association: "NONE",
				},
			}),
		);
		expect(c.isCommentSpamEvent).toBe(false);
		expect(isActionable(c)).toBe(false);
	});

	it("exempts the item author commenting on their own item", () => {
		const c = classifyWebhook(
			"issue_comment",
			comment({
				comment: {
					id: 900,
					body: "pushed a fix for the typo",
					user: { login: "pr-author" },
					author_association: "CONTRIBUTOR",
				},
			}),
		);
		expect(c.isCommentSpamEvent).toBe(false);
		expect(isActionable(c)).toBe(false);
	});

	it("routes slash commands to command handling, not the spam gate", () => {
		const c = classifyWebhook(
			"issue_comment",
			comment({
				comment: {
					id: 900,
					body: "/review",
					user: { login: "random-user" },
					author_association: "NONE",
				},
				issue: { number: 70, pull_request: {}, user: { login: "pr-author" } },
			}),
		);
		expect(c.command).toBe("review");
		expect(c.isCommentSpamEvent).toBe(false);
	});

	it("ignores edited and deleted comment actions", () => {
		for (const action of ["edited", "deleted"]) {
			const c = classifyWebhook("issue_comment", comment({ action }));
			expect(c.isCommentSpamEvent).toBe(false);
			expect(isActionable(c)).toBe(false);
		}
	});
});
