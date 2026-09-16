import { describe, expect, it, vi } from "vitest";

import { isGitHubTeamMember } from "./github";

describe("isGitHubTeamMember", () => {
	it("returns true when the API reports membership (200)", async () => {
		const fetchMock = vi.fn(async () => new Response(null, { status: 200 }));
		vi.stubGlobal("fetch", fetchMock);
		try {
			await expect(
				isGitHubTeamMember(
					"org-token",
					"cloudflare",
					"content-engineering",
					"alice",
				),
			).resolves.toBe(true);
		} finally {
			vi.unstubAllGlobals();
		}
		expect(fetchMock).toHaveBeenCalledWith(
			"https://api.github.com/orgs/cloudflare/teams/content-engineering/memberships/alice",
			expect.objectContaining({
				headers: expect.objectContaining({
					Authorization: "Bearer org-token",
				}),
			}),
		);
	});

	it("returns false when the API reports no membership (404)", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(null, { status: 404 })),
		);
		try {
			await expect(
				isGitHubTeamMember(
					"org-token",
					"cloudflare",
					"content-engineering",
					"bob",
				),
			).resolves.toBe(false);
		} finally {
			vi.unstubAllGlobals();
		}
	});

	it("throws on ambiguous responses (403) so callers fail closed", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response("nope", { status: 403 })),
		);
		try {
			await expect(
				isGitHubTeamMember(
					"org-token",
					"cloudflare",
					"content-engineering",
					"carol",
				),
			).rejects.toThrow(/HTTP 403/);
		} finally {
			vi.unstubAllGlobals();
		}
	});
});
