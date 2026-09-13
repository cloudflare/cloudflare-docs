import { describe, expect, it } from "vitest";
import {
	appendReport,
	applyReconciliation,
	COMMENT_LIMIT,
	identifyFindings,
	renderFinding,
	type Finding,
	type ReviewJob,
	type ReviewUnit,
} from "./review-domain";

const job: ReviewJob = {
	number: 1,
	runId: "run",
	headSha: "a".repeat(40),
	baseSha: "b".repeat(40),
	baseRef: "production",
	title: "Title",
	body: "",
	author: "author",
	moderate: false,
};
const finding: Finding = {
	id: "existing",
	category: "code",
	severity: "warning",
	path: "file.ts",
	line: 4,
	rule: "Missing await",
	evidence: "Promise is discarded",
	suggestion: "Await it",
};
const unit: ReviewUnit = {
	index: 0,
	filename: "file.ts",
	status: "M",
	style: false,
	patch: "",
	headLines: [4],
	baseLines: [3],
};

describe("bounded review contracts", () => {
	it("only accepts findings on supplied changed lines and paths", async () => {
		const results = await identifyFindings(
			[
				finding,
				{ ...finding, line: 5 },
				{ ...finding, path: "other.ts" },
				{ ...finding, category: "style" },
			],
			unit,
		);
		expect(results).toHaveLength(1);
	});
	it("deduplicates identical issues before reconciliation", async () => {
		expect(await identifyFindings([finding, finding], unit)).toHaveLength(1);
	});
	it("accepts deletion findings on the comparison base", async () => {
		expect(
			await identifyFindings([{ ...finding, side: "base", line: 3 }], unit),
		).toHaveLength(1);
		expect(
			await identifyFindings([{ ...finding, side: "base", line: 4 }], unit),
		).toHaveLength(0);
	});
	it("keeps IDs stable when lines move", async () => {
		const [before] = await identifyFindings([finding], unit);
		const [after] = await identifyFindings([{ ...finding, line: 20 }], {
			...unit,
			headLines: [20],
		});
		expect(after.id).toBe(before.id);
	});
	it("does not treat absent unchanged findings as fixed", () => {
		expect(
			applyReconciliation(
				[finding],
				[{ id: finding.id, status: "resolved", reason: "Not in diff" }],
				[],
				false,
			)[0].status,
		).toBe("active");
	});
	it("accepts a verified fix on a changed path", () => {
		expect(
			applyReconciliation(
				[finding],
				[{ id: finding.id, status: "resolved", reason: "Now awaited" }],
				["file.ts"],
				false,
			),
		).toEqual([]);
	});
	it("never silently revokes a dismissal, even after a proposed resolution", () => {
		const ignored = {
			...finding,
			status: "ignored" as const,
			reviewerNote: "Intentional",
		};
		for (const status of ["active", "resolved"] as const)
			expect(
				applyReconciliation(
					[ignored],
					[{ id: finding.id, status, reason: "Changed" }],
					["file.ts"],
					false,
				),
			).toEqual([ignored]);
	});
	it("requires an explicit reopening of a dismissed finding", () => {
		expect(
			applyReconciliation(
				[{ ...finding, status: "ignored" }],
				[
					{
						id: finding.id,
						status: "active",
						reason: "Author reopened",
						reopened: true,
					},
				],
				[],
				false,
			)[0].status,
		).toBe("active");
	});
	it("rejects missing or duplicate reconciliation decisions", () => {
		expect(() => applyReconciliation([finding], [], [], false)).toThrow();
		const decision = { id: finding.id, status: "active" as const, reason: "" };
		expect(() =>
			applyReconciliation([finding], [decision, decision], [], false),
		).toThrow();
	});
	it("pins carried findings to their original commit", () => {
		const rendered = renderFinding(
			{ ...finding, commitSha: "c".repeat(40) },
			job,
			job.baseSha,
		);
		expect(rendered).toContain("/blob/" + "c".repeat(40) + "/file.ts#L4");
	});
	it("escapes mentions and HTML in model-generated feedback", () => {
		const rendered = renderFinding(
			{ ...finding, evidence: "@everyone <script>bad()</script>" },
			job,
			job.baseSha,
		);
		expect(rendered).not.toContain("@everyone");
		expect(rendered).not.toContain("<script>");
	});
	it("never drops overflow or splits a finding", () => {
		const first = "a".repeat(COMMENT_LIMIT - 2);
		expect(appendReport(first, "next finding")).toEqual({
			flush: first,
			buffer: "next finding",
		});
		expect(() => appendReport("", "a".repeat(COMMENT_LIMIT + 1))).toThrow();
	});
});
