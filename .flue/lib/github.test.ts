import { afterEach, describe, expect, it, vi } from "vitest";

import { TeamMembershipCheckError, isGitHubTeamMember } from "./github";

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
