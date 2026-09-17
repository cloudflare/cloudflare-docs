import { afterEach, describe, expect, it, vi } from "vitest";

import {
	TeamMembershipCheckError,
	getIssueComments,
	isGitHubTeamMember,
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

	it("paginates newest-first responses and returns oldest-first comments", async () => {
		const newer = {
			id: 2,
			body: "newer",
			created_at: "2026-09-02T00:00:00Z",
			updated_at: "2026-09-02T00:00:00Z",
			user: { login: "author", type: "User" },
		};
		const older = {
			...newer,
			id: 1,
			body: "older",
			created_at: "2026-09-01T00:00:00Z",
		};
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify([newer]), {
					status: 200,
					headers: {
						Link: '<https://api.github.com/repos/cloudflare/cloudflare-docs/issues/1/comments?page=2>; rel="next"',
					},
				}),
			)
			.mockResolvedValueOnce(
				new Response(JSON.stringify([older]), { status: 200 }),
			);
		vi.stubGlobal("fetch", fetchMock);

		await expect(getIssueComments("token", 1)).resolves.toEqual([older, newer]);
	});
});
