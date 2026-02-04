import { describe, expect, test } from "vitest";
import { formatBytes } from "./helpers";

describe("formatBytes", () => {
	test("defaults to two decimal places when decimals is undefined", () => {
		expect(formatBytes(1536)).toBe("1.5 KB");
	});

	test("respects a zero-decimal override", () => {
		expect(formatBytes(1536, 0)).toBe("2 KB");
	});
});
