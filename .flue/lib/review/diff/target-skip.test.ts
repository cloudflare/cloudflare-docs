import { describe, expect, it } from "vitest";
import { classifyFile } from "./filter";
import { addedLineFingerprints } from "./fingerprint";
import { buildReviewPlan } from "./target";

const DOCS_PATH = "src/content/docs/workers/index.mdx";
const CODE_PATH = "worker/index.ts";

function file(path: string, patch: string) {
	return classifyFile({
		filename: path,
		status: "modified",
		additions: 1,
		deletions: 0,
		changes: 1,
		patch,
	});
}

function plan(
	files: ReturnType<typeof file>[],
	fullReview: boolean,
	reviewed = { code: [] as string[], style: [] as string[] },
	mdxCodeLines?: Record<string, number[]>,
) {
	return buildReviewPlan({
		files,
		reviewed: { ...reviewed, conventions: [] },
		fullReview,
		conventionsInputHash: "hash",
		mdxCodeLines,
	});
}

describe("MDX code routing", () => {
	const mdx = file(
		DOCS_PATH,
		"@@ -1,2 +1,4 @@\n context\n+Prose line.\n+const inside = true;\n context\n",
	);
	const code = file(CODE_PATH, "@@ -1 +1,2 @@\n a\n+b;\n");

	it("targets only head-file code lines in MDX and every line elsewhere", () => {
		const result = plan([mdx, code], true, undefined, { [DOCS_PATH]: [3] });
		expect(result.targets.code?.lines).toEqual({
			[DOCS_PATH]: [3],
			[CODE_PATH]: [2],
		});
		expect(result.targets.style?.lines).toEqual({ [DOCS_PATH]: [2, 3] });
	});

	it("falls back to hunk scanning without head-file code lines", () => {
		const result = plan([mdx], true);
		expect(result.targets.code).toBeUndefined();
		expect(result.skipped.code).toBe("no code changes to review");
	});
});

describe("specialist skip reasons", () => {
	it("says the PR has no such changes when no file is eligible", () => {
		const docs = file(DOCS_PATH, "@@ -1 +1,2 @@\n context\n+Plain prose.\n");
		const code = file(CODE_PATH, "@@ -1 +1,2 @@\n a\n+b;\n");
		expect(plan([docs], true).skipped.code).toBe("no code changes to review");
		expect(plan([code], false).skipped.style).toBe(
			"no docs content changes to review",
		);
	});

	it("says nothing is new when eligible lines were already reviewed", () => {
		const code = file(CODE_PATH, "@@ -1 +1,2 @@\n a\n+b;\n");
		const docs = file(DOCS_PATH, "@@ -1 +1,2 @@\n context\n+Plain prose.\n");
		const reviewed = {
			code: addedLineFingerprints(code).map((line) => line.fingerprint),
			style: addedLineFingerprints(docs).map((line) => line.fingerprint),
		};
		const incremental = plan([code, docs], false, reviewed);
		expect(incremental.skipped.code).toBe(
			"no new code changes since the last review",
		);
		expect(incremental.skipped.style).toBe(
			"no new docs content changes since the last review",
		);
		const full = plan([code, docs], true, reviewed);
		expect(full.targets.code).toBeDefined();
		expect(full.targets.style).toBeDefined();
	});
});
