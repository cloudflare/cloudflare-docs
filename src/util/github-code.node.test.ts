import { afterEach, describe, expect, test, vi } from "vitest";
import { fetchGitHubFile } from "./github-code";

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("fetchGitHubFile", () => {
	test("uses the code worker when it is available", async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response("example"));
		vi.stubGlobal("fetch", fetchMock);

		const response = await fetchGitHubFile(
			"cloudflare/agents",
			"commit",
			"file",
		);

		expect(await response.text()).toBe("example");
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith(
			"https://gh-code.developers.cloudflare.com/cloudflare/agents/commit/file",
		);
	});

	test("falls back to GitHub when the code worker is unreachable", async () => {
		const fetchMock = vi
			.fn()
			.mockRejectedValueOnce(new Error("fetch failed"))
			.mockResolvedValueOnce(new Response("example"));
		vi.stubGlobal("fetch", fetchMock);

		const response = await fetchGitHubFile(
			"cloudflare/agents",
			"commit",
			"file",
		);

		expect(await response.text()).toBe("example");
		expect(fetchMock).toHaveBeenNthCalledWith(
			2,
			"https://raw.githubusercontent.com/cloudflare/agents/commit/file",
		);
	});

	test("falls back to GitHub when the code worker returns an error", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(new Response(null, { status: 503 }))
			.mockResolvedValueOnce(new Response("example"));
		vi.stubGlobal("fetch", fetchMock);

		const response = await fetchGitHubFile(
			"cloudflare/agents",
			"commit",
			"file",
		);

		expect(await response.text()).toBe("example");
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});
});
