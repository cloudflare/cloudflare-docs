import { afterEach, describe, expect, it, vi } from "vitest";

import {
	TeamMembershipCheckError,
	getCommitSummary,
	getIssueComments,
	isGitHubTeamMember,
	listBranchActivity,
	listIssueEvents,
	listPullRequestReviewComments,
	listPullRequestReviews,
} from "./github";

const MEMBERSHIP_URL =
	"https://api.github.com/orgs/cloudflare/teams/content-engineering/memberships/alice";

describe("isGitHubTeamMember", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("returns true for an active membership (200)", async () => {
		const fetchMock = vi.fn(
			async () =>
				new Response(JSON.stringify({ state: "active" }), { status: 200 }),
		);
		vi.stubGlobal("fetch", fetchMock);
		await expect(
			isGitHubTeamMember(
				"org-token",
				"cloudflare",
				"content-engineering",
				"alice",
			),
		).resolves.toBe(true);
		expect(fetchMock).toHaveBeenCalledWith(
			MEMBERSHIP_URL,
			expect.objectContaining({
				headers: expect.objectContaining({
					Authorization: "Bearer org-token",
				}),
			}),
		);
	});

	it("returns false for a pending invitation, not a member yet (200)", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(
				async () =>
					new Response(JSON.stringify({ state: "pending" }), { status: 200 }),
			),
		);
		await expect(
			isGitHubTeamMember(
				"org-token",
				"cloudflare",
				"content-engineering",
				"alice",
			),
		).resolves.toBe(false);
	});

	it("returns false when the API reports no membership (404)", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(null, { status: 404 })),
		);
		await expect(
			isGitHubTeamMember(
				"org-token",
				"cloudflare",
				"content-engineering",
				"alice",
			),
		).resolves.toBe(false);
	});

	it("throws a retryable error on ambiguous responses (403)", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response("nope", { status: 403 })),
		);
		await expect(
			isGitHubTeamMember(
				"org-token",
				"cloudflare",
				"content-engineering",
				"alice",
			),
		).rejects.toThrow(TeamMembershipCheckError);
	});
});

describe("getIssueComments", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("paginates oldest-first comments", async () => {
		const older = {
			id: 1,
			body: "older",
			created_at: "2026-09-01T00:00:00Z",
			updated_at: "2026-09-01T00:00:00Z",
			user: { login: "author", type: "User" },
		};
		const newer = {
			...older,
			id: 2,
			body: "newer",
			created_at: "2026-09-02T00:00:00Z",
			updated_at: "2026-09-02T00:00:00Z",
		};
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify([older]), {
					status: 200,
					headers: {
						Link: '<https://api.github.com/repos/cloudflare/cloudflare-docs/issues/1/comments?page=2>; rel="next"',
					},
				}),
			)
			.mockResolvedValueOnce(
				new Response(JSON.stringify([newer]), { status: 200 }),
			);
		vi.stubGlobal("fetch", fetchMock);

		await expect(getIssueComments("token", 1)).resolves.toEqual([older, newer]);
		expect(fetchMock.mock.calls[0][0]).toBe(
			"https://api.github.com/repos/cloudflare/cloudflare-docs/issues/1/comments?per_page=100",
		);
		expect(fetchMock.mock.calls[1][0]).toBe(
			"https://api.github.com/repos/cloudflare/cloudflare-docs/issues/1/comments?page=2",
		);
	});
});

describe("pull request review lists", () => {
	afterEach(() => vi.unstubAllGlobals());

	it("paginates reviews and review comments", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify([{ id: 1, body: "review" }]), {
					status: 200,
					headers: {
						Link: '<https://example.test/reviews?page=2>; rel="next"',
					},
				}),
			)
			.mockResolvedValueOnce(
				new Response(JSON.stringify([{ id: 2, body: "review" }]), {
					status: 200,
				}),
			)
			.mockResolvedValueOnce(
				new Response(JSON.stringify([{ id: 3, body: "comment" }]), {
					status: 200,
				}),
			);
		vi.stubGlobal("fetch", fetchMock);
		expect(await listPullRequestReviews("token", 1)).toHaveLength(2);
		expect(await listPullRequestReviewComments("token", 1)).toHaveLength(1);
		expect(fetchMock.mock.calls[0][0]).toContain(
			"/pulls/1/reviews?per_page=100",
		);
		expect(fetchMock.mock.calls[2][0]).toContain(
			"/pulls/1/comments?per_page=100",
		);
	});
});

describe("listIssueEvents", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("paginates through the Link header", async () => {
		const first = {
			id: 1,
			event: "assigned",
			created_at: "2026-09-01T00:00:00Z",
			actor: { login: "alice" },
		};
		const second = {
			id: 2,
			event: "closed",
			created_at: "2026-09-02T00:00:00Z",
			actor: null,
		};
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify([first]), {
					status: 200,
					headers: {
						Link: '<https://api.github.com/repos/cloudflare/cloudflare-docs/issues/7/events?page=2>; rel="next"',
					},
				}),
			)
			.mockResolvedValueOnce(
				new Response(JSON.stringify([second]), { status: 200 }),
			);
		vi.stubGlobal("fetch", fetchMock);

		await expect(listIssueEvents("token", 7)).resolves.toEqual([first, second]);
		expect(fetchMock.mock.calls[1][0]).toBe(
			"https://api.github.com/repos/cloudflare/cloudflare-docs/issues/7/events?page=2",
		);
	});

	it("uses the exact first URL", async () => {
		const fetchMock = vi.fn<(input: string) => Promise<Response>>(
			async () => new Response(JSON.stringify([]), { status: 200 }),
		);
		vi.stubGlobal("fetch", fetchMock);

		await listIssueEvents("token", 7);
		expect(fetchMock.mock.calls[0][0]).toBe(
			"https://api.github.com/repos/cloudflare/cloudflare-docs/issues/7/events?per_page=100",
		);
	});
});

describe("listBranchActivity", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("builds the exact URL for a branch containing a slash", async () => {
		const fetchMock = vi.fn<(input: string) => Promise<Response>>(
			async () => new Response(JSON.stringify([]), { status: 200 }),
		);
		vi.stubGlobal("fetch", fetchMock);

		await expect(
			listBranchActivity("token", "user/fix-thing"),
		).resolves.toEqual([]);
		expect(fetchMock.mock.calls[0][0]).toBe(
			"https://api.github.com/repos/cloudflare/cloudflare-docs/activity?ref=refs%2Fheads%2Fuser%2Ffix-thing&direction=desc&per_page=100",
		);
	});

	it("builds the exact URL for a branch containing #", async () => {
		const fetchMock = vi.fn<(input: string) => Promise<Response>>(
			async () => new Response(JSON.stringify([]), { status: 200 }),
		);
		vi.stubGlobal("fetch", fetchMock);

		await listBranchActivity("token", "fix#1");
		expect(fetchMock.mock.calls[0][0]).toBe(
			"https://api.github.com/repos/cloudflare/cloudflare-docs/activity?ref=refs%2Fheads%2Ffix%231&direction=desc&per_page=100",
		);
	});

	it("returns the parsed activity array", async () => {
		const activity = [
			{
				id: 1,
				activity_type: "push",
				timestamp: "2026-09-01T00:00:00Z",
				actor: { login: "alice" },
			},
		];
		vi.stubGlobal(
			"fetch",
			vi.fn(
				async () => new Response(JSON.stringify(activity), { status: 200 }),
			),
		);

		await expect(listBranchActivity("token", "main")).resolves.toEqual(
			activity,
		);
	});

	it("throws an error including the status on a 403", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response("rate limited", { status: 403 })),
		);

		await expect(listBranchActivity("token", "main")).rejects.toThrow(/403/);
	});
});

describe("getCommitSummary", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("maps the committer date and the author login and type", async () => {
		const commit = {
			commit: { committer: { date: "2026-09-01T12:00:00Z" } },
			author: { login: "alice", type: "User" },
		};
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(JSON.stringify(commit), { status: 200 })),
		);

		await expect(getCommitSummary("token", "abc123")).resolves.toEqual({
			committedAt: "2026-09-01T12:00:00Z",
			author: { login: "alice", type: "User" },
		});
	});

	it("returns author null when the API author is null", async () => {
		const commit = {
			commit: { committer: { date: "2026-09-01T12:00:00Z" } },
			author: null,
		};
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(JSON.stringify(commit), { status: 200 })),
		);

		await expect(getCommitSummary("token", "abc123")).resolves.toEqual({
			committedAt: "2026-09-01T12:00:00Z",
			author: null,
		});
	});

	it("throws on a 404", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response("not found", { status: 404 })),
		);

		await expect(getCommitSummary("token", "abc123")).rejects.toThrow(/404/);
	});

	it("throws when the commit has no committer date", async () => {
		const commit = { commit: { committer: {} }, author: null };
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(JSON.stringify(commit), { status: 200 })),
		);

		await expect(getCommitSummary("token", "abc123")).rejects.toThrow(
			/no committer date/,
		);
	});
});
