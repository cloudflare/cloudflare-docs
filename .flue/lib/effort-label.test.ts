import { describe, expect, it, vi } from "vitest";

const gh = vi.hoisted(() => ({
	addLabels: vi.fn().mockResolvedValue(undefined),
	removeLabel: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./github", () => gh);

import {
	levelFor,
	planEffortLabelChanges,
	reconcileEffortLabel,
	scoreEffort,
	type EffortAssessment,
	type EffortFacts,
} from "./effort-label";

const facts = (over: Partial<EffortFacts> = {}): EffortFacts => ({
	labels: [],
	commentsCount: 0,
	codeownerAreas: [],
	...over,
});

const assessment = (
	over: Partial<EffortAssessment> = {},
): EffortAssessment => ({
	decision: "Docs fix needed",
	issue_type: "incorrect_info",
	requirements: [],
	owner: "docs",
	pages: [],
	effort_estimate: "Low",
	reason: "r",
	...over,
});

describe("levelFor", () => {
	it.each([
		[0, "Low"],
		[2.49, "Low"],
		[2.5, "Medium"],
		[4.99, "Medium"],
		[5, "High"],
		[7.99, "High"],
		[8, "Very High"],
		[20, "Very High"],
	])("%s points → %s", (score, level) => {
		expect(levelFor(score)).toBe(level);
	});
});

describe("scoreEffort", () => {
	it("scores a plain close as Low with zero points", () => {
		const s = scoreEffort(
			assessment({ decision: "Close as completed" }),
			facts(),
		);
		expect(s).toMatchObject({ level: "Low", score: 0 });
	});

	it("matches the dashboard's Help page example (Docs fix → High, SME → Very High)", () => {
		const base = assessment({
			requirements: [
				{ text: "a", status: "not_met" },
				{ text: "b", status: "not_met" },
			],
			issue_type: "missing_content",
		});
		const f = facts({
			codeownerAreas: ["/src/content/docs/workers/", "/src/content/docs/d1/"],
		});
		expect(scoreEffort(base, f)).toMatchObject({ level: "High", score: 6 });
		expect(
			scoreEffort(
				{
					...base,
					decision: "Needs owner or SME input",
					owner: "product_team",
				},
				f,
			),
		).toMatchObject({ level: "Very High", score: 8 });
	});

	it("counts requirements only for writing decisions", () => {
		const reqs = [{ text: "a", status: "not_met" as const }];
		expect(scoreEffort(assessment({ requirements: reqs }), facts()).score).toBe(
			2,
		);
		expect(
			scoreEffort(
				assessment({
					decision: "Confirm scope, then close",
					requirements: reqs,
				}),
				facts(),
			).score,
		).toBe(0);
	});

	it("scores Review open PR by requirements the PR must cover", () => {
		const s = scoreEffort(
			assessment({
				decision: "Review open PR",
				requirements: [
					{ text: "a", status: "met" },
					{ text: "b", status: "not_met" },
					{ text: "c", status: "cant_tell" },
				],
			}),
			facts(),
		);
		expect(s.score).toBe(2);
	});

	it("adds extra pages, capped at +2", () => {
		const pages = ["/a/", "/b/", "/c/", "/d/", "/e/", "/a/"];
		const s = scoreEffort(assessment({ pages }), facts());
		expect(s.reasons).toContainEqual({ points: 2, text: "5 pages involved" });
	});

	it("applies coordination, thread length and team labels", () => {
		const s = scoreEffort(
			assessment({ owner: "reporter" }),
			facts({ commentsCount: 12, labels: ["Quick-Fix"] }),
		);
		// 1 base + 1 reporter + 0.5 thread − 1.5 quick-fix = 1
		expect(s.score).toBe(1);
	});

	it("ignores effort:* labels so labeling never feeds back", () => {
		const a = assessment();
		expect(scoreEffort(a, facts({ labels: ["effort:very-high"] }))).toEqual(
			scoreEffort(a, facts()),
		);
	});

	it("never goes below zero", () => {
		const s = scoreEffort(
			assessment({ decision: "Close as completed" }),
			facts({ labels: ["quick-fix"] }),
		);
		expect(s.score).toBe(0);
	});

	it("weights the model estimate as one signal", () => {
		expect(
			scoreEffort(assessment({ effort_estimate: "Very High" }), facts()).score,
		).toBe(4.5);
	});
});

describe("planEffortLabelChanges", () => {
	it("adds the target and removes other effort labels only", () => {
		expect(
			planEffortLabelChanges(
				["effort:low", "product:workers", "size/s"],
				"effort:high",
			),
		).toEqual({ add: "effort:high", remove: ["effort:low"] });
	});

	it("is a no-op when already correct", () => {
		expect(
			planEffortLabelChanges(["effort:high", "stale"], "effort:high"),
		).toEqual({
			add: null,
			remove: [],
		});
	});
});

describe("reconcileEffortLabel", () => {
	it("adds and removes one label at a time", async () => {
		gh.addLabels.mockClear();
		gh.removeLabel.mockClear();
		const r = await reconcileEffortLabel(
			"t",
			5,
			["effort:low", "effort:medium"],
			"High",
		);
		expect(r).toEqual({
			target: "effort:high",
			added: true,
			removed: ["effort:low", "effort:medium"],
			dryRun: false,
		});
		expect(gh.addLabels).toHaveBeenCalledWith("t", 5, ["effort:high"]);
		expect(gh.removeLabel).toHaveBeenCalledTimes(2);
	});

	it("writes nothing in a dry run", async () => {
		gh.addLabels.mockClear();
		gh.removeLabel.mockClear();
		const r = await reconcileEffortLabel("t", 5, ["effort:low"], "Medium", {
			dryRun: true,
		});
		expect(r).toMatchObject({
			added: true,
			removed: ["effort:low"],
			dryRun: true,
		});
		expect(gh.addLabels).not.toHaveBeenCalled();
		expect(gh.removeLabel).not.toHaveBeenCalled();
	});
});
