import { describe, expect, it } from "vitest";
import { classifyFile } from "./filter";
import { addedLineFingerprints } from "./fingerprint";
import { relocateFindings } from "./relocate";
import { buildReviewPlan } from "./target";
import type { Specialist, TrackedFinding } from "../types";

const reviewed: Record<Specialist, string[]> = {
	code: [],
	style: [],
	conventions: [],
};

function file(path: string, patch: string) {
	return classifyFile({
		filename: path,
		status: "modified",
		additions: 1,
		deletions: 1,
		changes: 2,
		patch,
	});
}

function finding(
	path: string,
	fingerprint: string,
	specialist: Specialist = "code",
): TrackedFinding {
	return {
		id: "C-old",
		specialist,
		path,
		line: 1,
		title: "Title",
		explanation: "Explanation",
		fingerprint,
		firstSeenSha: "first",
		lastSeenSha: "last",
		status: "active",
	};
}

describe("relocateFindings full review", () => {
	const previous = file("src/example.ts", "@@ -1 +1 @@\n+problem()\n");
	const current = file("src/example.ts", "@@ -1 +20 @@\n+problem()\n");
	const fingerprint = addedLineFingerprints(previous)[0].fingerprint;

	it("sends a located active finding to touched with its new line", () => {
		const plan = buildReviewPlan({
			files: [current],
			reviewed,
			fullReview: true,
			conventionsInputHash: "changed",
		});
		const result = relocateFindings(
			[finding("src/example.ts", fingerprint)],
			[current],
			plan,
		);
		expect(result.untouched).toEqual([]);
		expect(result.touched).toEqual([
			expect.objectContaining({ line: 20, firstSeenSha: "first" }),
		]);
	});

	it("keeps a located finding untouched when its specialist has no target", () => {
		const plan = buildReviewPlan({
			files: [current],
			reviewed,
			fullReview: true,
			conventionsInputHash: "changed",
		});
		const result = relocateFindings(
			[finding("src/example.ts", fingerprint, "style")],
			[current],
			plan,
		);
		expect(result.touched).toEqual([]);
		expect(result.untouched).toEqual([expect.objectContaining({ line: 20 })]);
	});

	it("keeps located findings untouched during incremental reviews", () => {
		const plan = buildReviewPlan({
			files: [current],
			reviewed,
			fullReview: false,
			conventionsInputHash: "changed",
		});
		const result = relocateFindings(
			[finding("src/example.ts", fingerprint)],
			[current],
			plan,
		);
		expect(result.touched).toEqual([]);
		expect(result.untouched).toEqual([expect.objectContaining({ line: 20 })]);
	});
});
