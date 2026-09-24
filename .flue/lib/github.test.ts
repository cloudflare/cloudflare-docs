import { afterEach, describe, expect, it, vi } from "vitest";

import {
	TeamMembershipCheckError,
	getIssueComments,
	isGitHubTeamMember,
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
