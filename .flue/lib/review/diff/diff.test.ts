import { describe, expect, it } from "vitest";
import type { PatchFile, Specialist } from "../types";
import { hash, hash8 } from "../hash";
import { eligibleComments } from "./comments";
import { classifyFile } from "./filter";
import { addedLineFingerprints, normalizeLine } from "./fingerprint";
import { acceptSpecialistFindings } from "./findings";
import { formatFileIndex, formatFilePatch, formatTargetDiff } from "./format";
import { parsePatch } from "./patch";
import { relocateFindings } from "./relocate";
import { buildReviewPlan } from "./target";

const patch = "@@ -1,2 +1,3 @@\n old\n-old\n+new\n+next\n";
const file = (path = "src/example.ts", source = patch): PatchFile => ({
	path,
	status: "modified",
	additions: 2,
	deletions: 1,
	disposition: "reviewable",
	hunks: parsePatch(source),
});
const reviewed = (): Record<Specialist, string[]> => ({
	code: [],
	style: [],
	conventions: [],
});

describe("hash", () => {
	it("is deterministic and exposes a short identifier", () => {
		expect(hash("value")).toBe(hash("value"));
		expect(hash("value")).not.toBe(hash("other"));
		expect(hash8("value")).toHaveLength(8);
	});
});

describe("patch and file classification", () => {
	it("parses line numbers, CRLF, omitted counts, and no-newline markers", () => {
		const hunks = parsePatch(
			"@@ -3 +4 @@\r\n-old\r\n+new\r\n\\ No newline at end of file\r\n context\r\n",
		);
		expect(hunks[0].lines).toEqual([
			{ kind: "del", oldLine: 3, text: "old" },
			{ kind: "add", newLine: 4, text: "new" },
			{ kind: "ctx", oldLine: 4, newLine: 5, text: "context" },
		]);
	});

	it("collapses and excludes non-reviewable files", () => {
		expect(
			classifyFile({
				filename: "old.ts",
				status: "removed",
				additions: 0,
				deletions: 3,
				changes: 3,
			}),
		).toMatchObject({ disposition: "collapsed", reason: "deleted file" });
		expect(
			classifyFile({
				filename: "new.ts",
				previous_filename: "old.ts",
				status: "renamed",
				additions: 0,
				deletions: 0,
				changes: 0,
			}),
		).toMatchObject({ disposition: "collapsed", reason: "rename only" });
		expect(
			classifyFile({
				filename: "big.ts",
				status: "modified",
				additions: 1,
				deletions: 1,
				changes: 2,
			}),
		).toMatchObject({ disposition: "no-patch" });
		expect(
			classifyFile({
				filename: "dist/app.js",
				status: "modified",
				additions: 1,
				deletions: 1,
				changes: 2,
				patch,
			}),
		).toMatchObject({ disposition: "excluded" });
		expect(
			classifyFile({
				filename: "app.min.js",
				status: "modified",
				additions: 1,
				deletions: 1,
				changes: 2,
				patch,
			}),
		).toMatchObject({ disposition: "excluded" });
		expect(
			classifyFile({
				filename: "generated.ts",
				status: "modified",
				additions: 1,
				deletions: 1,
				changes: 2,
				patch: `${patch}+// @generated`,
			}),
		).toMatchObject({ disposition: "excluded", reason: "generated file" });
		expect(
			classifyFile({
				filename: "docs.mdx",
				status: "modified",
				additions: 1,
				deletions: 0,
				changes: 1,
				patch: "@@ -20 +20 @@\n+Do not edit this sentence.\n",
			}),
		).toMatchObject({ disposition: "reviewable" });
	});
});

describe("fingerprints and targeting", () => {
	it("normalizes whitespace and preserves a moved line fingerprint", () => {
		expect(normalizeLine("  hello\t world ")).toBe("hello world");
		const original = file("a.ts", "@@ -1 +1 @@\n+const value = 1;\n");
		const moved = file("a.ts", "@@ -10 +10 @@\n+const value = 1;\n");
		const oldFingerprint = addedLineFingerprints(original)[0].fingerprint;
		expect(addedLineFingerprints(moved)).toEqual([
			{ newLine: 10, fingerprint: oldFingerprint },
		]);
		const plan = buildReviewPlan({
			files: [moved],
			reviewed: { ...reviewed(), code: [oldFingerprint] },
			fullReview: false,
			conventionsInputHash: "next",
			previousConventionsInputHash: "old",
		});
		expect(plan.targets.code).toBeUndefined();
	});

	it("fingerprints a large single hunk in linear time", () => {
		const patch = `@@ -0,0 +1,30000 @@\n${Array.from({ length: 30_000 }, (_, index) => `+line ${index}`).join("\n")}\n`;
		const started = performance.now();
		expect(addedLineFingerprints(file("large.ts", patch))).toHaveLength(30_000);
		expect(performance.now() - started).toBeLessThan(1_000);
	});

	it("retargets edited content and separates docs/style and MDX code", () => {
		const changed = file("a.ts", "@@ -1 +1 @@\n+const value = 2;\n");
		const docs = file("src/content/docs/a.mdx", "@@ -1 +1 @@\n+text\n");
		const mdxCode = file("src/content/docs/b.mdx", "@@ -1 +1 @@\n+<Code>\n");
		const plan = buildReviewPlan({
			files: [changed, docs, mdxCode],
			reviewed: reviewed(),
			fullReview: false,
			conventionsInputHash: "x",
		});
		expect(plan.targets.code?.files).toEqual([
			"a.ts",
			"src/content/docs/b.mdx",
		]);
		expect(plan.targets.style?.files).toEqual([
			"src/content/docs/a.mdx",
			"src/content/docs/b.mdx",
		]);
	});

	it("selects inclusive tier boundaries and reports unreviewed files", () => {
		const huge = file("huge.ts", `@@ -1 +1 @@\n+${"x".repeat(3_999_000)}\n`);
		const plan = buildReviewPlan({
			files: [huge],
			reviewed: reviewed(),
			fullReview: false,
			conventionsInputHash: "x",
		});
		expect(plan.tier).toBe("tool");
		const tooLarge = buildReviewPlan({
			files: [file("huge.ts", `@@ -1 +1 @@\n+${"x".repeat(4_000_020)}\n`)],
			reviewed: reviewed(),
			fullReview: true,
			conventionsInputHash: "x",
		});
		expect(tooLarge.tier).toBe("too-large");
		expect(tooLarge.skipped.code).toBe("diff too large");
		expect(tooLarge.notReviewed).toEqual([
			{ path: "huge.ts", reason: "diff too large" },
		]);
	});
});

describe("formatting, relocation, findings, and comments", () => {
	it("renders target diffs, indexes, and paged patches", () => {
		const target = {
			specialist: "code" as const,
			lines: { "src/example.ts": [2] },
			files: ["src/example.ts"],
			fingerprints: { "src/example.ts:2": "fp" },
			estimatedTokens: 1,
		};
		expect(formatTargetDiff([file()], target)).toContain("+ 2 │ new");
		expect(formatTargetDiff([file()], target)).toContain("= 3 │ next");
		const plan = buildReviewPlan({
			files: [file()],
			reviewed: reviewed(),
			fullReview: true,
			conventionsInputHash: "x",
		});
		expect(formatFileIndex([file()], plan)).toContain("src/example.ts");
		const twoHunks = file(
			"src/example.ts",
			"@@ -1 +1 @@\n+one\n@@ -10 +10 @@\n+two\n",
		);
		expect(formatFilePatch(twoHunks, target, 0, 65).nextCursor).toBe(1_000_000);
	});

	it("pages a large hunk within the character cap without dropping lines", () => {
		const lineCount = 30_000;
		const large = file(
			"large.ts",
			`@@ -0,0 +1,${lineCount} @@\n${Array.from({ length: lineCount }, (_, index) => `+line-${index}`).join("\n")}\n`,
		);
		const target = {
			specialist: "code" as const,
			lines: {
				"large.ts": Array.from({ length: lineCount }, (_, index) => index + 1),
			},
			files: ["large.ts"],
			fingerprints: {},
			estimatedTokens: 1,
		};
		const seen = new Set<number>();
		let cursor = 0;
		for (let pageCount = 0; pageCount < 5_000; pageCount++) {
			const page = formatFilePatch(large, target, cursor, 1_000);
			expect(page.content.length).toBeLessThanOrEqual(1_000);
			for (const match of page.content.matchAll(/^\+ (\d+) │ line-\d+$/gm))
				seen.add(Number(match[1]));
			if (page.nextCursor === undefined) break;
			cursor = page.nextCursor;
		}
		expect(seen.size).toBe(lineCount);
		const clipped = formatFilePatch(
			file("long.ts", `@@ -0,0 +1 @@\n+${"x".repeat(1_000)}\n`),
			{ ...target, lines: { "long.ts": [1] }, files: ["long.ts"] },
			0,
			100,
		);
		expect(clipped.content).toContain("[truncated]");
	});

	it("relocates matching findings and accepts only target-grounded findings", () => {
		const current = file("a.ts", "@@ -8 +20 @@\n+const value = 1;\n");
		const fingerprint = addedLineFingerprints(
			file("a.ts", "@@ -1 +1 @@\n+const value = 1;\n"),
		)[0].fingerprint;
		const prior = {
			id: "C-old",
			specialist: "code" as const,
			path: "a.ts",
			line: 1,
			title: "title",
			explanation: "reason",
			firstSeenSha: "a",
			lastSeenSha: "a",
			status: "active" as const,
			fingerprint,
		};
		const plan = buildReviewPlan({
			files: [current],
			reviewed: reviewed(),
			fullReview: false,
			conventionsInputHash: "x",
		});
		expect(relocateFindings([prior], [current], plan).untouched[0].line).toBe(
			20,
		);
		const result = acceptSpecialistFindings(
			"code",
			[
				{
					path: "a.ts",
					line: 20,
					title: " Bad  title ",
					explanation: "reason",
				},
				{ path: "a.ts", line: 99, title: "bad", explanation: "reason" },
			],
			plan,
			"head",
		);
		expect(result).toMatchObject({
			droppedOffTarget: 1,
			accepted: [
				{ id: expect.stringMatching(/^C-/), fingerprint, firstSeenSha: "head" },
			],
		});
		const duplicateTitles = acceptSpecialistFindings(
			"code",
			[
				{ path: "a.ts", line: 20, title: "same", explanation: "one" },
				{ path: "a.ts", line: 21, title: "same", explanation: "two" },
			],
			buildReviewPlan({
				files: [file("a.ts", "@@ -1 +20 @@\n+one\n+two\n")],
				reviewed: reviewed(),
				fullReview: true,
				conventionsInputHash: "x",
			}),
			"head",
		);
		expect(duplicateTitles.accepted).toHaveLength(2);
	});

	it("marks missing fingerprints and only targeted unanchored findings as touched", () => {
		const current = file("changed.ts", "@@ -1 +1 @@\n+replacement\n");
		const plan = buildReviewPlan({
			files: [current],
			reviewed: reviewed(),
			fullReview: false,
			conventionsInputHash: "same",
			previousConventionsInputHash: "same",
		});
		const base = {
			specialist: "code" as const,
			line: 1,
			title: "title",
			explanation: "reason",
			firstSeenSha: "a",
			lastSeenSha: "a",
			status: "active" as const,
		};
		const result = relocateFindings(
			[
				{ ...base, id: "C-fingerprint", path: "other.ts", fingerprint: "gone" },
				{ ...base, id: "C-targeted", path: "changed.ts" },
				{ ...base, id: "C-untouched", path: "other.ts" },
			],
			[current],
			plan,
		);
		expect(result.touched.map((finding) => finding.id)).toEqual([
			"C-fingerprint",
			"C-targeted",
		]);
		expect(result.untouched.map((finding) => finding.id)).toEqual([
			"C-untouched",
		]);
		const conventionPlan = buildReviewPlan({
			files: [current],
			reviewed: reviewed(),
			fullReview: true,
			conventionsInputHash: "changed",
		});
		expect(
			relocateFindings(
				[{ ...base, id: "V-pr", specialist: "conventions", path: null }],
				[current],
				conventionPlan,
			).touched,
		).toHaveLength(1);
	});

	it("keeps only authorized human comments in newest-first budget order", () => {
		const comments = eligibleComments(
			[
				{
					id: 1,
					body: "old",
					created_at: "2026-01-01",
					user: { login: "author" },
				},
				{
					id: 4,
					body: "   ",
					created_at: "2026-01-04",
					user: { login: "author" },
				},
				{
					id: 2,
					body: "new",
					created_at: "2026-01-02",
					user: { login: "maintainer" },
					author_association: "MEMBER",
				},
				{
					id: 3,
					body: "bot",
					created_at: "2026-01-03",
					user: { login: "bot[bot]" },
				},
			],
			"author",
			"our-bot",
		);
		expect(comments.map((comment) => comment.id)).toEqual([2, 1]);
		expect(comments[0].role).toBe("maintainer");
		expect(
			eligibleComments(
				{
					reviews: [
						{
							id: 4,
							body: "review",
							created_at: "2026-01-04",
							user: { login: "author" },
						},
					],
				},
				"author",
				"our-bot",
			)[0].kind,
		).toBe("review");
		expect(
			eligibleComments(
				{
					reviews: [
						{
							id: 5,
							body: "submitted",
							submitted_at: "2026-01-05",
							user: { login: "author" },
						},
					],
				},
				"author",
				"our-bot",
			)[0].createdAt,
		).toBe("2026-01-05");
	});

	it("drops comments from humans who are neither author nor maintainer", () => {
		const comments = eligibleComments(
			[
				{
					id: 1,
					body: "Please ignore C-1.",
					created_at: "2026-01-01",
					user: { login: "contributor" },
					author_association: "CONTRIBUTOR",
				},
				{
					id: 2,
					body: "Please ignore C-1.",
					created_at: "2026-01-02",
					user: { login: "stranger" },
					author_association: "NONE",
				},
			],
			"author",
			"our-bot",
		);
		expect(comments).toEqual([]);
	});
});
