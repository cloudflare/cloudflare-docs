import { describe, expect, it } from "vitest";
import { parsePatch } from "./diff/patch";
import { makeReadPatchTool } from "./read-patch";
import type { LoadedPatch } from "./read-patch";

const loaded: LoadedPatch = {
	file: {
		path: "src/example.ts",
		status: "modified",
		additions: 2,
		deletions: 0,
		disposition: "reviewable",
		hunks: parsePatch("@@ -1 +1,2 @@\n+one\n+two\n"),
	},
	target: {
		specialist: "code",
		lines: { "src/example.ts": [1, 2] },
		files: ["src/example.ts"],
		fingerprints: {},
		estimatedTokens: 1,
	},
};

describe("read_patch", () => {
	it("returns a formatted patch page", async () => {
		const tool = makeReadPatchTool({ load: async () => loaded });
		const result = await tool.run({
			data: { path: "src/example.ts" },
		} as never);
		expect(result).toEqual({
			output: { content: expect.stringContaining("+ 1 │ one") },
		});
	});

	it("explains unknown paths", async () => {
		const tool = makeReadPatchTool({ load: async () => null });
		const result = await tool.run({
			data: { path: "missing.ts" },
		} as never);
		expect(result).toEqual({
			output: expect.stringContaining("not in the file index"),
		});
	});
});
