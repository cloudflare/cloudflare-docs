import { describe, expect, test } from "vitest";
import { formatBytes } from "./helpers";

describe("formatBytes", () => {
	test("defaults to two decimal places when decimals is undefined", () => {
		expect(formatBytes(1536)).toBe("1.5 KB");
	});

	test("respects a zero-decimal override", () => {
		expect(formatBytes(1536, 0)).toBe("2 KB");
	});

	test("clamps negative decimals to zero", () => {
		expect(formatBytes(1536, -3)).toBe("2 KB");
	});

	test("truncates fractional decimals", () => {
		expect(formatBytes(1536, 1.9)).toBe("1.5 KB");
	});

	test("defaults to two decimals when decimals is NaN", () => {
		expect(formatBytes(1536, Number.NaN)).toBe("1.5 KB");
	});
});
