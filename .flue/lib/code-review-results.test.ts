import { describe, expect, it } from "vitest";
import { assignCodeReviewFindingIds } from "./code-review-results";
import { assignFindingIds } from "./style-guide-results";

// ── assignCodeReviewFindingIds ─────────────────────────────────────────────────

describe("assignCodeReviewFindingIds", () => {
	it("returns empty array for empty input", async () => {
		expect(await assignCodeReviewFindingIds([])).toEqual([]);
	});

	it("assigns a CR- prefixed ID to each finding", async () => {
		const findings = await assignCodeReviewFindingIds([
			{
				severity: "warning",
				path: "src/foo.ts",
				rule: "No floating promises",
				evidence: "Unhandled promise",
				suggestion: "Add await or void",
			},
		]);
		expect(findings[0].id).toMatch(/^CR-[0-9a-f]{12}$/);
	});

	it("produces stable IDs for the same input", async () => {
		const finding = {
			severity: "critical" as const,
			path: "src/lib/github.ts",
			rule: "Unescaped brace",
			evidence: "{ in MDX prose",
			suggestion: "Wrap in backticks",
		};
		const [a] = await assignCodeReviewFindingIds([finding]);
		const [b] = await assignCodeReviewFindingIds([finding]);
		expect(a.id).toBe(b.id);
	});

	it("produces different IDs for different rule/path/evidence", async () => {
		const base = {
			severity: "warning" as const,
			path: "src/foo.ts",
			rule: "Rule A",
			evidence: "evidence A",
			suggestion: "fix A",
		};
		const [a] = await assignCodeReviewFindingIds([base]);
		const [b] = await assignCodeReviewFindingIds([{ ...base, rule: "Rule B" }]);
		const [c] = await assignCodeReviewFindingIds([
			{ ...base, path: "src/bar.ts" },
		]);
		expect(a.id).not.toBe(b.id);
		expect(a.id).not.toBe(c.id);
		expect(b.id).not.toBe(c.id);
	});

	it("ID is stable regardless of line number", async () => {
		const base = {
			severity: "suggestion" as const,
			path: "src/foo.ts",
			rule: "Missing alt text",
			evidence: "img without alt",
			suggestion: "Add alt attribute",
		};
		const [withLine] = await assignCodeReviewFindingIds([
			{ ...base, line: 10 },
		]);
		const [withDifferentLine] = await assignCodeReviewFindingIds([
			{ ...base, line: 99 },
		]);
		const [withNoLine] = await assignCodeReviewFindingIds([base]);
		expect(withLine.id).toBe(withDifferentLine.id);
		expect(withLine.id).toBe(withNoLine.id);
	});

	it("trims evidence whitespace for stable IDs", async () => {
		const base = {
			severity: "warning" as const,
			path: "src/foo.ts",
			rule: "Bad import",
			suggestion: "Fix it",
		};
		const [a] = await assignCodeReviewFindingIds([
			{ ...base, evidence: "  missing module  " },
		]);
		const [b] = await assignCodeReviewFindingIds([
			{ ...base, evidence: "missing module" },
		]);
		expect(a.id).toBe(b.id);
	});

	it("preserves all finding fields on the output", async () => {
		const finding = {
			severity: "critical" as const,
			path: "src/lib/foo.ts",
			line: 42,
			rule: "Dangerous eval",
			evidence: "eval() called",
			suggestion: "Remove eval",
		};
		const [result] = await assignCodeReviewFindingIds([finding]);
		expect(result).toMatchObject(finding);
		expect(typeof result.id).toBe("string");
	});
});

// ── assignFindingIds (style guide) ─────────────────────────────────────────────

describe("assignFindingIds", () => {
	it("returns empty array for empty input", async () => {
		expect(await assignFindingIds([])).toEqual([]);
	});

	it("assigns an SG- prefixed ID to each finding", async () => {
		const [result] = await assignFindingIds([
			{
				severity: "warning",
				path: "src/content/docs/workers/index.mdx",
				rule: "No $ in terminal commands",
				evidence: "$ pnpm install",
				suggestion: "Remove the $ prefix",
			},
		]);
		expect(result.id).toMatch(/^SG-[0-9a-f]{12}$/);
	});

	it("SG IDs are stable for the same input", async () => {
		const finding = {
			severity: "suggestion" as const,
			path: "src/content/docs/workers/index.mdx",
			rule: "Oxford comma",
			evidence: "a, b and c",
			suggestion: "Use a, b, and c",
		};
		const [a] = await assignFindingIds([finding]);
		const [b] = await assignFindingIds([finding]);
		expect(a.id).toBe(b.id);
	});

	it("SG IDs differ from CR IDs for the same content", async () => {
		const content = {
			severity: "warning" as const,
			path: "src/foo.ts",
			rule: "Same rule",
			evidence: "Same evidence",
			suggestion: "Same suggestion",
		};
		const [sg] = await assignFindingIds([content]);
		const [cr] = await assignCodeReviewFindingIds([content]);
		// Different prefix alone is sufficient, but the hash may also differ
		expect(sg.id.startsWith("SG-")).toBe(true);
		expect(cr.id.startsWith("CR-")).toBe(true);
	});
});
