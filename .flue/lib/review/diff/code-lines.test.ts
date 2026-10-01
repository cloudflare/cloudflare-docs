import { describe, expect, it } from "vitest";
import { hunkCodeLines, mdxCodeLines } from "./code-lines";
import { parsePatch } from "./patch";
import type { PatchFile } from "../types";

const lines = (...text: string[]) => mdxCodeLines(text.join("\n"));

describe("mdx code lines", () => {
	it("includes fenced blocks and their fences", () => {
		expect(
			lines("Intro.", "", "```ts", "const a = 1;", "```", "", "Outro."),
		).toEqual([3, 4, 5]);
	});

	it("closes a fence only with a matching marker of at least equal length", () => {
		expect(
			lines(
				"````md",
				"```ts",
				"inner",
				"```",
				"````",
				"~~~",
				"```",
				"~~~",
				"prose",
			),
		).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
	});

	it("handles fences indented inside list items", () => {
		expect(
			lines("1. Run:", "", "   ```sh", "   npm test", "   ```", "2. Done."),
		).toEqual([3, 4, 5]);
	});

	it("includes wrapper components up to their closing tag", () => {
		expect(
			lines(
				"Prose.",
				"<TypeScriptExample>",
				"",
				"```ts",
				"export default {};",
				"```",
				"",
				"</TypeScriptExample>",
				"More prose.",
			),
		).toEqual([2, 3, 4, 5, 6, 7, 8]);
	});

	it("ends self-closing components at the closing bracket", () => {
		expect(
			lines(
				"<APIRequest",
				'  path="/zones"',
				'  method="GET"',
				"/>",
				"Prose.",
				'<PackageManagers pkg="wrangler" />',
				"Prose.",
			),
		).toEqual([1, 2, 3, 4, 6]);
	});

	it("ignores component names in inline code", () => {
		expect(lines("Use the `<TypeScriptExample>` component.", "Prose.")).toEqual(
			[],
		);
	});
});

describe("hunk code lines", () => {
	it("scans each hunk's new-file lines", () => {
		const file: PatchFile = {
			path: "a.mdx",
			status: "modified",
			additions: 2,
			deletions: 1,
			disposition: "reviewable",
			hunks: parsePatch(
				"@@ -1,3 +1,4 @@\n Prose.\n-old\n+```js\n+code();\n+```\n",
			),
		};
		expect(hunkCodeLines(file)).toEqual([2, 3, 4]);
	});
});
