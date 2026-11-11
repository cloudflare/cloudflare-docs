import { describe, expect, it } from "vitest";
import {
	applyJudgement,
	buildCommitInput,
	buildRenderInput,
	selectJudgeWork,
} from "./pipeline";
import type { Finding, ReviewPlan, TrackedFinding } from "./types";

const finding = (
	id: string,
	specialist: Finding["specialist"] = "code",
	line = 1,
): Finding => ({
	id,
	specialist,
	path: "a.ts",
	line,
	title: id,
	explanation: "old",
	firstSeenSha: "first",
	lastSeenSha: "old",
});
const tracked = (
	id: string,
	specialist: Finding["specialist"] = "code",
): TrackedFinding => ({ ...finding(id, specialist), status: "active" });
const plan: ReviewPlan = {
	tier: "inline",
	fullReview: false,
	targets: {
		code: {
			specialist: "code",
			files: ["a.ts"],
			lines: { "a.ts": [1] },
			fingerprints: { "a.ts:1": "fp" },
			estimatedTokens: 1,
		},
		conventions: {
			specialist: "conventions",
			files: [],
			lines: {},
			fingerprints: {},
			estimatedTokens: 0,
		},
	},
	skipped: {},
	notReviewed: [],
	totalEstimatedTokens: 1,
	conventionsInputHash: "hash",
};
const work = (overrides: Partial<Parameters<typeof selectJudgeWork>[0]> = {}) =>
	selectJudgeWork({
		prior: [],
		relocated: { untouched: [], touched: [] },
		newFindings: [],
		newComments: [],
		maxTouched: 10,
		failedSpecialists: [],
		...overrides,
	});

describe("review pipeline reducers", () => {
	it("keeps all new findings unverified when the judge fails", () => {
		expect(
			applyJudgement({
				newFindings: [finding("C-new")],
				touched: [tracked("C-old")],
				carried: [],
				dismissed: [],
				judge: null,
				headSha: "head",
			}).active,
		).toMatchObject([
			{ id: "C-new", verified: false },
			{ id: "C-old", verified: undefined },
		]);
	});
	it("applies partial judge decisions", () => {
		const result = applyJudgement({
			newFindings: [finding("C-keep"), finding("C-drop"), finding("C-missing")],
			touched: [
				tracked("C-resolved"),
				tracked("C-dismissed"),
				tracked("C-active"),
			],
			carried: [],
			dismissed: [],
			judge: {
				new_findings: [
					{ id: "C-keep", decision: "keep", reason: "yes" },
					{ id: "C-drop", decision: "drop", reason: "no" },
				],
				prior_findings: [
					{ id: "C-resolved", decision: "resolved", reason: "fixed" },
					{ id: "C-dismissed", decision: "dismissed", reason: "accepted" },
				],
			},
			headSha: "head",
		});
		expect(result.active.map((item) => item.id)).toEqual([
			"C-keep",
			"C-missing",
			"C-active",
		]);
		expect(result.resolvedNow.map((item) => item.id)).toEqual(["C-resolved"]);
		expect(result.dismissedAll.map((item) => item.id)).toEqual(["C-dismissed"]);
	});
	it("ignores judge ids that were not inputs", () => {
		expect(
			applyJudgement({
				newFindings: [],
				touched: [],
				carried: [],
				dismissed: [],
				judge: {
					new_findings: [{ id: "other", decision: "keep", reason: "x" }],
					prior_findings: [{ id: "other", decision: "resolved", reason: "x" }],
				},
				headSha: "head",
			}).active,
		).toEqual([]);
	});
	it("carries touched overflow", () => {
		const items = [tracked("C-1"), tracked("C-2"), tracked("C-3")];
		const result = work({
			prior: items,
			relocated: { untouched: [], touched: items },
			maxTouched: 1,
		});
		expect(result.touched.map((item) => item.id)).toEqual(["C-1"]);
		expect(result.carried.map((item) => item.id)).toEqual(["C-2", "C-3"]);
	});
	it("keeps dismissed relocated findings out of active work", () => {
		const dismissed = {
			...tracked("C-dismissed"),
			status: "dismissed" as const,
		};
		const result = work({
			prior: [dismissed],
			relocated: { untouched: [], touched: [dismissed] },
		});
		expect(result.touched).toEqual([]);
		expect(result.carried).toEqual([]);
		expect(result.dismissedContext).toEqual([dismissed]);
	});
	it("suppresses a new finding already dismissed", () => {
		const dismissed = { ...tracked("C-old"), status: "dismissed" as const };
		const result = work({
			prior: [dismissed],
			newFindings: [finding("C-old")],
		});
		expect(result.newFindings).toEqual([]);
		expect(result.suppressedDismissed).toBe(1);
	});
	it("merges a re-raised carried finding", () => {
		const old = tracked("C-old");
		const fresh = { ...finding("C-old", "code", 9), explanation: "new" };
		const result = work({
			prior: [old],
			relocated: { untouched: [old], touched: [] },
			newFindings: [fresh],
		});
		expect(result.carried).toMatchObject([
			{ firstSeenSha: "first", line: 9, explanation: "new" },
		]);
	});
	it("moves a re-raised touched finding to carry", () => {
		const old = tracked("C-old");
		const result = work({
			prior: [old],
			relocated: { untouched: [], touched: [old] },
			newFindings: [finding("C-old")],
		});
		expect(result.touched).toEqual([]);
		expect(result.carried).toHaveLength(1);
	});
	it("keeps only the first duplicate new finding", () => {
		expect(
			work({
				newFindings: [finding("C-new", "code", 1), finding("C-new", "code", 2)],
			}).newFindings[0].line,
		).toBe(1);
	});
	it("carries failed specialist findings", () => {
		const style = tracked("S-old", "style");
		const result = work({
			prior: [style],
			relocated: { untouched: [style], touched: [style] },
			failedSpecialists: ["style"],
		});
		expect(result.touched).toEqual([]);
		expect(result.carried).toEqual([style]);
	});
	it("promotes findings from comments by id, path, and fallback", () => {
		const one = tracked("C-one");
		const two = { ...tracked("C-two"), path: "b.ts" };
		expect(
			work({
				prior: [one, two],
				relocated: { untouched: [one, two], touched: [] },
				newComments: [
					{
						id: 1,
						kind: "issue",
						author: "a",
						role: "author",
						createdAt: "now",
						body: "C-one",
					},
				],
			}).touched,
		).toEqual([one]);
		expect(
			work({
				prior: [one, two],
				relocated: { untouched: [one, two], touched: [] },
				newComments: [
					{
						id: 1,
						kind: "issue",
						author: "a",
						role: "author",
						createdAt: "now",
						body: "b.ts",
					},
				],
			}).touched,
		).toEqual([two]);
		expect(
			work({
				prior: [one],
				relocated: { untouched: [one], touched: [] },
				newComments: [
					{
						id: 1,
						kind: "issue",
						author: "a",
						role: "author",
						createdAt: "now",
						body: "general",
					},
				],
			}).touched,
		).toEqual([one]);
		expect(
			work({ prior: [one], relocated: { untouched: [one], touched: [] } })
				.touched,
		).toEqual([]);
	});
	it("does not require a judge without new or touched findings", () =>
		expect(work().judgeNeeded).toBe(false));
	it("keeps judgement output ids unique", () => {
		const result = applyJudgement({
			newFindings: [finding("C-id")],
			touched: [tracked("C-id")],
			carried: [tracked("C-id")],
			dismissed: [],
			judge: null,
			headSha: "head",
		});
		const ids = [
			...result.active,
			...result.resolvedNow,
			...result.dismissedAll,
		].map((item) => item.id);
		expect(new Set(ids).size).toBe(ids.length);
	});
	it("builds exact render and commit inputs", () => {
		const render = buildRenderInput({
			pr: 1,
			headSha: "head",
			fullReview: false,
			tier: "inline",
			sections: {
				code: { ran: true, failed: false },
				style: { ran: false, failed: false },
				conventions: { ran: false, failed: false },
			},
			active: [],
			resolvedNow: [],
			dismissedAll: [],
			notReviewed: [],
			judge: "ok",
		});
		expect(Object.keys(render).sort()).toEqual([
			"active",
			"dismissed",
			"fullReview",
			"headSha",
			"judge",
			"notReviewed",
			"pr",
			"resolved",
			"sections",
			"tier",
		]);
		const commit = buildCommitInput({
			runId: "run",
			headSha: "head",
			completedAt: "now",
			successfulSpecialists: ["code"],
			plan,
			active: [tracked("C-active")],
			dismissed: [{ ...tracked("C-dismissed"), status: "dismissed" }],
			conventionsSucceeded: false,
		});
		expect(commit).toMatchObject({
			reviewedFingerprints: { code: ["fp"] },
			findings: [{ id: "C-active" }, { id: "C-dismissed" }],
			conventionsInputHash: undefined,
		});
		expect(
			buildCommitInput({
				runId: "run",
				headSha: "head",
				completedAt: "now",
				successfulSpecialists: ["conventions"],
				plan,
				active: [],
				dismissed: [],
				conventionsSucceeded: true,
			}).conventionsInputHash,
		).toBe("hash");
	});
});
