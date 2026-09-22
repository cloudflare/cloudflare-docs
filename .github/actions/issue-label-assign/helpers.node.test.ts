import { describe, expect, it, vi } from "vitest";
import {
	extractDeveloperDocsPaths,
	removeStaleProductLabels,
	shouldSkipEditedEvent,
} from "./helpers";

describe("issue label assignment helpers", () => {
	it("strips trailing prose punctuation from developer docs paths", () => {
		expect(
			extractDeveloperDocsPaths(
				"https://developers.cloudflare.com/r2/. https://developers.cloudflare.com/workers/, https://developers.cloudflare.com/d1/; https://developers.cloudflare.com/kv/: https://developers.cloudflare.com/images/! https://developers.cloudflare.com/stream/?",
			),
		).toEqual(["/r2/", "/workers/", "/d1/", "/kv/", "/images/", "/stream/"]);
	});

	it("ignores developer docs links without a path", () => {
		expect(
			extractDeveloperDocsPaths(
				"https://developers.cloudflare.com https://developers.cloudflare.com. https://developers.cloudflare.com/ https://developers.cloudflare.com/// https://developers.cloudflare.com/workers/",
			),
		).toEqual(["/workers/"]);
	});

	it("only skips edited events without a body change", () => {
		expect(shouldSkipEditedEvent("edited", undefined)).toBe(true);
		expect(shouldSkipEditedEvent("edited", { body: { from: "old" } })).toBe(
			false,
		);
		expect(shouldSkipEditedEvent("opened", undefined)).toBe(false);
	});

	it("preserves current product labels when no new labels are recognized", async () => {
		const removeLabel = vi.fn();

		await removeStaleProductLabels(["product:access"], new Set(), removeLabel);

		expect(removeLabel).not.toHaveBeenCalled();
	});

	it("ignores stale-label 404s and continues removing labels", async () => {
		const removeLabel = vi
			.fn()
			.mockRejectedValueOnce({ status: 404 })
			.mockResolvedValueOnce(undefined);

		await removeStaleProductLabels(
			["product:access", "product:gateway"],
			new Set(["product:casb"]),
			removeLabel,
		);

		expect(removeLabel).toHaveBeenCalledTimes(2);
	});

	it("rethrows non-404 label removal failures", async () => {
		const error = { status: 500 };

		await expect(
			removeStaleProductLabels(
				["product:access"],
				new Set(["product:casb"]),
				vi.fn().mockRejectedValue(error),
			),
		).rejects.toBe(error);
	});
});
