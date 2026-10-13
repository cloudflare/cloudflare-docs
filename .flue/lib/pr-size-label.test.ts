import { afterEach, describe, expect, it, vi } from "vitest";
import type { GitHubPullRequest } from "./github";
import {
	planSizeLabelChanges,
	reconcileSizeLabel,
	sizeLabelFor,
} from "./pr-size-label";

afterEach(() => vi.unstubAllGlobals());

describe("sizeLabelFor", () => {
	it.each([
		[0, "size/xs"],
		[9, "size/xs"],
		[10, "size/s"],
		[99, "size/s"],
		[100, "size/m"],
		[499, "size/m"],
		[500, "size/l"],
		[999, "size/l"],
		[1000, "size/xl"],
		[50000, "size/xl"],
	])("%i changes -> %s", (total, label) => {
		expect(sizeLabelFor(total)).toBe(label);
	});
});

describe("planSizeLabelChanges", () => {
	it("is a no-op when only the target is present", () => {
		expect(planSizeLabelChanges(["size/s", "product:x"], "size/s")).toEqual({
			add: null,
			remove: [],
		});
	});

	it("removes every stale size label and keeps other labels", () => {
		expect(
			planSizeLabelChanges(
				["size/xs", "size/s", "product:x", "size/m"],
				"size/l",
			),
		).toEqual({ add: "size/l", remove: ["size/xs", "size/s", "size/m"] });
	});

	it("removes duplicates when the target is already present", () => {
		expect(planSizeLabelChanges(["size/s", "size/l"], "size/l")).toEqual({
			add: null,
			remove: ["size/s"],
		});
	});
});

function pr(labels: string[], additions: number, deletions: number) {
	return {
		number: 7,
		additions,
		deletions,
		labels: labels.map((name) => ({ name })),
	} as unknown as GitHubPullRequest;
}

describe("reconcileSizeLabel", () => {
	it("adds the new label and deletes the old one", async () => {
		const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
		vi.stubGlobal("fetch", fetchMock);

		const result = await reconcileSizeLabel("t", pr(["size/s"], 400, 200));

		expect(result).toEqual({
			target: "size/l",
			added: true,
			removed: ["size/s"],
		});
		const calls = fetchMock.mock.calls as unknown as [string, RequestInit][];
		expect(calls.map(([url, init]) => `${init.method} ${url}`)).toEqual([
			"POST https://api.github.com/repos/cloudflare/cloudflare-docs/issues/7/labels",
			"DELETE https://api.github.com/repos/cloudflare/cloudflare-docs/issues/7/labels/size%2Fs",
		]);
		expect(calls[0][1].body).toBe(JSON.stringify({ labels: ["size/l"] }));
	});

	it("makes no API calls when already correct", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		await reconcileSizeLabel("t", pr(["size/xs"], 3, 2));
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("tolerates a 404 on remove", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async (_u: string, init: RequestInit) =>
				init.method === "DELETE"
					? new Response("", { status: 404 })
					: new Response("{}", { status: 200 }),
			),
		);
		await expect(
			reconcileSizeLabel("t", pr(["size/s"], 500, 0)),
		).resolves.toMatchObject({ target: "size/l" });
	});

	it("throws on other remove failures", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response("boom", { status: 500 })),
		);
		await expect(reconcileSizeLabel("t", pr(["size/s"], 1, 1))).rejects.toThrow(
			/HTTP 500/,
		);
	});
});
