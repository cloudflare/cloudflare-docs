import { describe, expect, test } from "vitest";
import { previewName } from "./preview-name";

describe("previewName", () => {
	test("prefixes and slugifies", () => {
		expect(previewName("docs/Agents_Models")).toBe("gh-docs-agents-models");
	});

	test("strips diacritics", () => {
		expect(previewName("café-fix")).toBe("gh-cafe-fix");
	});

	test("does not double the prefix", () => {
		expect(previewName("gh-foo")).toBe(previewName("foo"));
	});

	test("fits in one DNS label", () => {
		const name = previewName(`feature/${"a".repeat(100)}`);
		expect(name.length).toBeLessThanOrEqual(63);
		expect(name.endsWith("-")).toBe(false);
	});

	test("trims trailing dash after truncation", () => {
		const name = previewName(`${"a".repeat(59)}/b`);
		expect(name).toBe(`gh-${"a".repeat(59)}`);
	});
});
