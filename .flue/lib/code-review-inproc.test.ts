import { describe, expect, it, vi } from "vitest";

// Mock modules that transitively import cloudflare:workers (sandbox/runtime
// bindings not needed for testing pure data-transformation functions).
vi.mock("../connectors/cloudflare-shell", () => ({
	getShellSandbox: vi.fn(),
	getDefaultWorkspace: vi.fn(),
}));
vi.mock("./github-repo-tools", () => ({ makeCodeReviewTools: vi.fn() }));
vi.mock("./github", () => ({ getRepoFileContent: vi.fn() }));

import {
	mergeCodeReviewResults,
	parseAddedLines,
	selectCodeReviewFiles,
} from "./code-review-inproc";
import type {
	CodeReviewFinding,
	CodeReviewResult,
} from "./code-review-results";

// ── parseAddedLines ────────────────────────────────────────────────────────────

describe("parseAddedLines", () => {
	it("returns empty array for empty patch", () => {
		expect(parseAddedLines("")).toEqual([]);
	});

	it("returns empty array for deletion-only patch", () => {
		const patch = `@@ -1,3 +1,0 @@
-line one
-line two
-line three`;
		expect(parseAddedLines(patch)).toEqual([]);
	});

	it("parses a simple addition", () => {
		const patch = `@@ -1,0 +1,2 @@
+first line
+second line`;
		expect(parseAddedLines(patch)).toEqual([
			{ line: 1, content: "first line" },
			{ line: 2, content: "second line" },
		]);
	});

	it("assigns correct line numbers with context lines", () => {
		const patch = `@@ -10,5 +10,6 @@
 context line
 context line
+new line here
 context line
 context line`;
		const added = parseAddedLines(patch);
		expect(added).toEqual([{ line: 12, content: "new line here" }]);
	});

	it("handles multiple hunks with correct line numbers", () => {
		const patch = `@@ -1,2 +1,3 @@
+added at top
 context
 context
@@ -20,2 +21,3 @@
 context
+added in middle
 context`;
		const added = parseAddedLines(patch);
		expect(added).toEqual([
			{ line: 1, content: "added at top" },
			{ line: 22, content: "added in middle" },
		]);
	});

	it("skips +++ and --- file header lines", () => {
		const patch = `--- a/src/foo.ts
+++ b/src/foo.ts
@@ -1,1 +1,2 @@
 existing
+new line`;
		const added = parseAddedLines(patch);
		expect(added).toEqual([{ line: 2, content: "new line" }]);
	});

	it("strips the leading + from added line content", () => {
		const patch = `@@ -1,0 +1,1 @@
+  indented content`;
		expect(parseAddedLines(patch)).toEqual([
			{ line: 1, content: "  indented content" },
		]);
	});

	it("does not advance line counter for deleted lines", () => {
		const patch = `@@ -1,3 +1,2 @@
 context
-deleted line
+added line`;
		expect(parseAddedLines(patch)).toEqual([
			{ line: 2, content: "added line" },
		]);
	});

	it("ignores no-newline-at-end-of-file marker", () => {
		const patch = `@@ -1,1 +1,2 @@
 context
+new line
\\ No newline at end of file`;
		expect(parseAddedLines(patch)).toEqual([{ line: 2, content: "new line" }]);
	});

	it("handles a realistic MDX diff", () => {
		const patch = `@@ -5,6 +5,10 @@
 import { Tabs } from "~/components";
 
+import { Details } from "~/components";
+
 ## Overview
 
+Use the Details component to collapse long sections.
+
 This page explains...`;
		const added = parseAddedLines(patch);
		// Hunk starts at new-file line 5. Two context lines advance to 7 before
		// the first addition, then two more context lines advance to 11 before
		// the second pair of additions.
		expect(added).toEqual([
			{ line: 7, content: `import { Details } from "~/components";` },
			{ line: 8, content: "" },
			{
				line: 11,
				content: "Use the Details component to collapse long sections.",
			},
			{ line: 12, content: "" },
		]);
	});
});

// ── selectCodeReviewFiles ──────────────────────────────────────────────────────

type PrFile = Parameters<typeof selectCodeReviewFiles>[0][number];

function makeFile(overrides: Partial<PrFile> = {}): PrFile {
	return {
		filename: "src/content/docs/workers/index.mdx",
		status: "modified",
		additions: 10,
		deletions: 2,
		changes: 12,
		patch: "@@ -1,1 +1,2 @@\n context\n+added",
		...overrides,
	};
}

describe("selectCodeReviewFiles", () => {
	it("returns empty array for no files", () => {
		expect(selectCodeReviewFiles([])).toEqual([]);
	});

	it("excludes removed files", () => {
		const files = [makeFile({ status: "removed", additions: 0 })];
		expect(selectCodeReviewFiles(files)).toEqual([]);
	});

	it("excludes files with zero additions", () => {
		const files = [makeFile({ additions: 0 })];
		expect(selectCodeReviewFiles(files)).toEqual([]);
	});

	it("excludes files with no patch", () => {
		const files = [makeFile({ patch: undefined })];
		expect(selectCodeReviewFiles(files)).toEqual([]);
	});

	it("excludes lockfiles by name", () => {
		for (const name of [
			"pnpm-lock.yaml",
			"package-lock.json",
			"yarn.lock",
			"bun.lock",
			"Cargo.lock",
		]) {
			expect(selectCodeReviewFiles([makeFile({ filename: name })])).toEqual([]);
		}
	});

	it("excludes files in dist/, skills/, node_modules/, .wrangler/", () => {
		for (const prefix of [
			"dist/index.js",
			"skills/my-skill/SKILL.md",
			"node_modules/foo/index.js",
			".flue/.wrangler/state/foo.db",
		]) {
			expect(selectCodeReviewFiles([makeFile({ filename: prefix })])).toEqual(
				[],
			);
		}
	});

	it("excludes binary and image file types", () => {
		for (const ext of [
			"png",
			"jpg",
			"jpeg",
			"gif",
			"svg",
			"webp",
			"woff2",
			"wasm",
		]) {
			expect(
				selectCodeReviewFiles([
					makeFile({ filename: `src/assets/image.${ext}` }),
				]),
			).toEqual([]);
		}
	});

	it("excludes files under src/assets/", () => {
		expect(
			selectCodeReviewFiles([
				makeFile({ filename: "src/assets/images/hero.png" }),
			]),
		).toEqual([]);
	});

	it("sorts by additions descending", () => {
		const files = [
			makeFile({ filename: "a.ts", additions: 5 }),
			makeFile({ filename: "b.ts", additions: 20 }),
			makeFile({ filename: "c.ts", additions: 1 }),
		];
		const result = selectCodeReviewFiles(files);
		expect(result.map((f) => f.filename)).toEqual(["b.ts", "a.ts", "c.ts"]);
	});

	it("caps at maxFiles (default 20)", () => {
		const files = Array.from({ length: 25 }, (_, i) =>
			makeFile({ filename: `file-${i}.ts`, additions: i + 1 }),
		);
		expect(selectCodeReviewFiles(files)).toHaveLength(20);
	});

	it("respects custom maxFiles", () => {
		const files = Array.from({ length: 10 }, (_, i) =>
			makeFile({ filename: `file-${i}.ts`, additions: i + 1 }),
		);
		expect(selectCodeReviewFiles(files, 3)).toHaveLength(3);
	});

	it("includes normal source and MDX files", () => {
		const files = [
			makeFile({ filename: "src/content/docs/workers/index.mdx" }),
			makeFile({ filename: ".flue/lib/github.ts" }),
			makeFile({ filename: "src/components/Foo.astro" }),
		];
		expect(selectCodeReviewFiles(files)).toHaveLength(3);
	});
});

// ── mergeCodeReviewResults ─────────────────────────────────────────────────────

function makeResult(
	findings: CodeReviewFinding[],
	reviewedFiles: string[],
): CodeReviewResult {
	return {
		findings,
		summary: "placeholder",
		reviewedFiles,
	};
}

function makeFinding(
	overrides: Partial<CodeReviewFinding> = {},
): CodeReviewFinding {
	return {
		id: "CR-abc123",
		severity: "warning",
		path: "src/content/docs/workers/index.mdx",
		rule: "Test rule",
		evidence: "Test evidence",
		suggestion: "Test suggestion",
		...overrides,
	};
}

describe("mergeCodeReviewResults", () => {
	it("returns empty result for empty input", () => {
		const result = mergeCodeReviewResults([]);
		expect(result.findings).toEqual([]);
		expect(result.reviewedFiles).toEqual([]);
		expect(result.summary).toBe("No code review issues found.");
	});

	it("passes through a single result", () => {
		const finding = makeFinding({ id: "CR-001" });
		const result = mergeCodeReviewResults([
			makeResult([finding], ["src/foo.ts"]),
		]);
		expect(result.findings).toEqual([finding]);
		expect(result.reviewedFiles).toEqual(["src/foo.ts"]);
	});

	it("deduplicates findings by ID across results", () => {
		const finding = makeFinding({ id: "CR-dup" });
		const result = mergeCodeReviewResults([
			makeResult([finding], ["a.ts"]),
			makeResult([finding], ["b.ts"]),
		]);
		expect(result.findings).toHaveLength(1);
	});

	it("last write wins for duplicate IDs", () => {
		const v1 = makeFinding({ id: "CR-001", rule: "First" });
		const v2 = makeFinding({ id: "CR-001", rule: "Second" });
		const result = mergeCodeReviewResults([
			makeResult([v1], ["a.ts"]),
			makeResult([v2], ["b.ts"]),
		]);
		expect(result.findings[0].rule).toBe("Second");
	});

	it("deduplicates reviewed files", () => {
		const result = mergeCodeReviewResults([
			makeResult([], ["shared.ts", "a.ts"]),
			makeResult([], ["shared.ts", "b.ts"]),
		]);
		expect(result.reviewedFiles).toHaveLength(3);
		expect(result.reviewedFiles).toContain("shared.ts");
	});

	it("produces correct summary with counts", () => {
		const result = mergeCodeReviewResults([
			makeResult(
				[
					makeFinding({ id: "CR-001", severity: "critical" }),
					makeFinding({ id: "CR-002", severity: "warning" }),
					makeFinding({ id: "CR-003", severity: "warning" }),
					makeFinding({ id: "CR-004", severity: "suggestion" }),
				],
				["a.ts"],
			),
		]);
		expect(result.summary).toBe(
			"1 critical, 2 warning(s), and 1 suggestion(s) found across 1 file(s).",
		);
	});

	it("summary says no issues found when findings empty", () => {
		const result = mergeCodeReviewResults([makeResult([], ["a.ts"])]);
		expect(result.summary).toBe("No code review issues found.");
	});
});
