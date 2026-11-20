import { describe, expect, test } from "vitest";

import { compareWarpVersions } from "./warp-version";

describe("compareWarpVersions", () => {
	test("orders a backport below newer minor releases shipped before it", () => {
		const versions = [
			"2026.7.1376.0",
			"2026.8.2100.0",
			"2026.7.1384.0",
			"2026.8.2115.0",
			"2026.8.2110.0",
		];
		expect(versions.sort((a, b) => compareWarpVersions(b, a))).toEqual([
			"2026.8.2115.0",
			"2026.8.2110.0",
			"2026.8.2100.0",
			"2026.7.1384.0",
			"2026.7.1376.0",
		]);
	});

	test("compares parts numerically, not as strings", () => {
		expect(compareWarpVersions("2026.10.1.0", "2026.9.1.0")).toBeGreaterThan(0);
		expect(compareWarpVersions("2026.8.999.0", "2026.8.1000.0")).toBeLessThan(
			0,
		);
	});

	test("compares the fourth part", () => {
		expect(compareWarpVersions("2026.3.566.1", "2026.3.566.0")).toBeGreaterThan(
			0,
		);
	});

	test("treats missing trailing parts as zero", () => {
		expect(compareWarpVersions("2026.3.566", "2026.3.566.0")).toBe(0);
		expect(compareWarpVersions("2026.3.566", "2026.3.566.1")).toBeLessThan(0);
	});

	test("returns zero for equal versions", () => {
		expect(compareWarpVersions("2026.7.1384.0", "2026.7.1384.0")).toBe(0);
	});
});
