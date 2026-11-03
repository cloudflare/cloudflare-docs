import { describe, expect, test } from "vitest";
import { getWorkerPreviewName } from "./worker-preview-name";

describe("getWorkerPreviewName", () => {
	test("prefixes and slugifies", () => {
		expect(getWorkerPreviewName("docs/Agents_Models")).toBe(
			"gh-docs-agents-models",
		);
	});

	test("strips diacritics", () => {
		expect(getWorkerPreviewName("café-fix")).toBe("gh-cafe-fix");
	});

	test("distinct branches get distinct names", () => {
		expect(getWorkerPreviewName("gh-foo")).toBe("gh-gh-foo");
		expect(getWorkerPreviewName("gh-foo")).not.toBe(
			getWorkerPreviewName("foo"),
		);
	});

	test("fits in one DNS label", () => {
		const name = getWorkerPreviewName(`feature/${"a".repeat(100)}`);
		expect(name.length).toBeLessThanOrEqual(63);
		expect(name.endsWith("-")).toBe(false);
	});

	test("trims trailing dash after truncation", () => {
		const name = getWorkerPreviewName(`${"a".repeat(59)}/b`);
		expect(name).toBe(`gh-${"a".repeat(59)}`);
	});
});
