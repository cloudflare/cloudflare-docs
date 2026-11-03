import { describe, expect, it } from "vitest";
import type {
	Finding,
	JudgeResult,
	Specialist,
	SpecialistFinding,
	TrackedFinding,
} from "./types";
import { classifyFile } from "./diff/filter";
import { acceptSpecialistFindings } from "./diff/findings";
import { relocateFindings } from "./diff/relocate";
import { buildReviewPlan } from "./diff/target";
import {
	applyJudgement,
	buildCommitInput,
	buildRenderInput,
	selectJudgeWork,
} from "./pipeline";
import { MAX_COMMENT_LENGTH, renderReview } from "./render";
import {
	claimActiveRun,
	commitRun,
	emptyState,
	resetForFullReview,
} from "./state";

const sections = (failed: Partial<Record<Specialist, boolean>> = {}) => ({
	code: { ran: !failed.code, failed: !!failed.code },
	style: { ran: !failed.style, failed: !!failed.style },
	conventions: { ran: !failed.conventions, failed: !!failed.conventions },
});
const raw = (path: string, line: number, title: string): SpecialistFinding => ({
	path,
	line,
	title,
	explanation: `${title} explanation`,
});
const files = (patches: Record<string, string>) =>
	Object.entries(patches).map(([filename, patch]) =>
		classifyFile({
			filename,
			status: "modified",
			additions: patch.split("\n").filter((line) => line.startsWith("+"))
				.length,
			deletions: patch.split("\n").filter((line) => line.startsWith("-"))
				.length,
			changes: 1,
			patch,
		}),
	);
const plan = (
	patches: Record<string, string>,
	reviewed = { code: [], style: [], conventions: [] } as Record<
		Specialist,
		string[]
	>,
	fullReview = false,
	previousConventionsInputHash?: string,
) =>
	buildReviewPlan({
		files: files(patches),
		reviewed,
		fullReview,
		conventionsInputHash: "metadata",
		previousConventionsInputHash,
	});
const judge = (
	newFindings: Finding[],
	touched: TrackedFinding[],
	result: JudgeResult | null,
) =>
	applyJudgement({
		newFindings,
		touched,
		carried: [],
		dismissed: [],
		judge: result,
		headSha: "head",
	});

describe("offline review flow", () => {
	it("records and renders accepted findings from the first run", () => {
		const patches = {
			"src/example.ts": "@@ -0,0 +1 @@\n+doThing()\n",
			"src/content/docs/x.mdx": "@@ -0,0 +1 @@\n+Use https://example.com\n",
		};
		const reviewPlan = plan(patches);
		const code = acceptSpecialistFindings(
			"code",
			[raw("src/example.ts", 1, "Unhandled promise")],
			reviewPlan,
			"A",
		).accepted;
		const style = acceptSpecialistFindings(
			"style",
			[raw("src/content/docs/x.mdx", 1, "Full URL")],
			reviewPlan,
			"A",
		).accepted;
		const result = judge([...code, ...style], [], {
			new_findings: [...code, ...style].map((finding) => ({
				id: finding.id,
				decision: "keep",
				reason: "valid",
			})),
			prior_findings: [],
		});
		const body = renderReview(
			buildRenderInput({
				pr: 1,
				headSha: "A",
				fullReview: false,
				tier: reviewPlan.tier,
				sections: sections(),
				active: result.active,
				resolvedNow: result.resolvedNow,
				dismissedAll: result.dismissedAll,
				notReviewed: [],
				judge: "ok",
			}),
		);
		let state = claimActiveRun(emptyState(1), {
			runId: "one",
			workflowInstanceId: "one",
			headSha: "A",
			startedAt: "now",
			agentIds: [],
		}).state;
		state = commitRun(
			state,
			buildCommitInput({
				runId: "one",
				headSha: "A",
				completedAt: "now",
				successfulSpecialists: ["code", "style", "conventions"],
				plan: reviewPlan,
				active: result.active,
				dismissed: result.dismissedAll,
				conventionsSucceeded: true,
			}),
		).state;
		expect(body).toContain("### Code Review");
		expect(body).toContain("### Style Guide");
		expect(state.findings).toHaveLength(2);
		expect(state.reviewed.code.length).toBeGreaterThan(0);
	});

	it("resolves touched code while carrying untouched style and adding style", () => {
		const prior: TrackedFinding[] = [
			{
				...acceptSpecialistFindings(
					"code",
					[raw("src/example.ts", 1, "Bug")],
					plan({ "src/example.ts": "@@ -0,0 +1 @@\n+bad()\n" }),
					"A",
				).accepted[0],
				status: "active",
			},
			{
				...acceptSpecialistFindings(
					"style",
					[raw("src/content/docs/x.mdx", 1, "Style")],
					plan({ "src/content/docs/x.mdx": "@@ -0,0 +1 @@\n+bad prose\n" }),
					"A",
				).accepted[0],
				status: "active",
			},
		];
		const reviewPlan = plan({
			"src/example.ts": "@@ -1 +1 @@\n-bad()\n+fixed()\n",
			"src/content/docs/new.mdx": "@@ -0,0 +1 @@\n+new prose\n",
		});
		const relocated = relocateFindings(
			prior,
			files({
				"src/example.ts": "@@ -1 +1 @@\n-bad()\n+fixed()\n",
				"src/content/docs/new.mdx": "@@ -0,0 +1 @@\n+new prose\n",
			}),
			reviewPlan,
		);
		const fresh = acceptSpecialistFindings(
			"style",
			[raw("src/content/docs/new.mdx", 1, "New style")],
			reviewPlan,
			"B",
		).accepted;
		const work = selectJudgeWork({
			prior,
			relocated,
			newFindings: fresh,
			newComments: [],
			maxTouched: 10,
			failedSpecialists: [],
		});
		const result = applyJudgement({
			...work,
			dismissed: work.dismissedContext,
			judge: {
				new_findings: [{ id: fresh[0].id, decision: "keep", reason: "valid" }],
				prior_findings: [
					{ id: prior[0].id, decision: "resolved", reason: "fixed" },
				],
			},
			headSha: "B",
		});
		expect(work.touched.map((finding) => finding.id)).toContain(prior[0].id);
		expect(result.active.map((finding) => finding.id)).toContain(prior[1].id);
		expect(result.resolvedNow).toHaveLength(1);
		expect(result.active).toContainEqual(
			expect.objectContaining({ id: fresh[0].id }),
		);
	});

	it("promotes an author dismissal and suppresses a later re-raise", () => {
		const finding: TrackedFinding = {
			...acceptSpecialistFindings(
				"style",
				[raw("src/content/docs/x.mdx", 1, "Style")],
				plan({ "src/content/docs/x.mdx": "@@ -0,0 +1 @@\n+text\n" }),
				"A",
			).accepted[0],
			status: "active",
		};
		const work = selectJudgeWork({
			prior: [finding],
			relocated: { untouched: [finding], touched: [] },
			newFindings: [],
			newComments: [
				{
					id: 1,
					kind: "issue",
					author: "author",
					role: "author",
					createdAt: "now",
					body: `${finding.id} is intentional`,
				},
			],
			maxTouched: 10,
			failedSpecialists: [],
		});
		const dismissed = applyJudgement({
			...work,
			dismissed: work.dismissedContext,
			judge: {
				new_findings: [],
				prior_findings: [
					{ id: finding.id, decision: "dismissed", reason: "author rationale" },
				],
			},
			headSha: "B",
		}).dismissedAll;
		const reraised = selectJudgeWork({
			prior: dismissed,
			relocated: { untouched: dismissed, touched: [] },
			newFindings: [{ ...finding, firstSeenSha: "C", lastSeenSha: "C" }],
			newComments: [],
			maxTouched: 10,
			failedSpecialists: [],
		});
		expect(dismissed[0].status).toBe("dismissed");
		expect(reraised.newFindings).toHaveLength(0);
	});

	it("full review preserves firstSeenSha without duplicates", () => {
		const first = acceptSpecialistFindings(
			"code",
			[raw("src/example.ts", 1, "Bug")],
			plan({ "src/example.ts": "@@ -0,0 +1 @@\n+bug()\n" }),
			"A",
		).accepted[0];
		const fullPlan = plan(
			{ "src/example.ts": "@@ -0,0 +1 @@\n+bug()\n" },
			undefined,
			true,
		);
		const again = acceptSpecialistFindings(
			"code",
			[raw("src/example.ts", 1, "Bug")],
			fullPlan,
			"B",
		).accepted[0];
		const work = selectJudgeWork({
			prior: [{ ...first, status: "active" }],
			relocated: { untouched: [{ ...first, status: "active" }], touched: [] },
			newFindings: [again],
			newComments: [],
			maxTouched: 10,
			failedSpecialists: [],
		});
		expect(
			resetForFullReview({
				...emptyState(1),
				findings: [{ ...first, status: "active" }],
				conventionsInputHash: "x",
			}).findings,
		).toEqual([{ ...first, status: "active" }]);
		expect(work.newFindings).toHaveLength(0);
		expect(work.carried[0].firstSeenSha).toBe("A");
	});

	it("keeps unverified new findings and touched findings active when judge fails", () => {
		const newFinding = acceptSpecialistFindings(
			"code",
			[raw("src/x.ts", 1, "Bug")],
			plan({ "src/x.ts": "@@ -0,0 +1 @@\n+bug()\n" }),
			"B",
		).accepted[0];
		const touched: TrackedFinding = {
			...newFinding,
			id: "C-old",
			status: "active",
			verified: true,
		};
		const result = applyJudgement({
			newFindings: [newFinding],
			touched: [touched],
			carried: [],
			dismissed: [],
			judge: null,
			headSha: "B",
		});
		expect(result.active).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ id: newFinding.id, verified: false }),
				expect.objectContaining({ id: "C-old", verified: true }),
			]),
		);
	});

	it("carries failed specialist findings without recording its fingerprints", () => {
		const reviewPlan = plan({ "src/x.ts": "@@ -0,0 +1 @@\n+bug()\n" });
		const prior: TrackedFinding = {
			...acceptSpecialistFindings(
				"code",
				[raw("src/x.ts", 1, "Bug")],
				reviewPlan,
				"A",
			).accepted[0],
			status: "active",
		};
		const input = buildCommitInput({
			runId: "two",
			headSha: "B",
			completedAt: "now",
			successfulSpecialists: ["style"],
			plan: reviewPlan,
			active: [prior],
			dismissed: [],
			conventionsSucceeded: false,
		});
		const body = renderReview(
			buildRenderInput({
				pr: 1,
				headSha: "B",
				fullReview: false,
				tier: reviewPlan.tier,
				sections: sections({ code: true }),
				active: [prior],
				resolvedNow: [],
				dismissedAll: [],
				notReviewed: [],
				judge: "skipped",
			}),
		);
		expect(input.reviewedFingerprints.code).toBeUndefined();
		expect(body).toContain("code review failed");
	});

	it("skips unchanged conventions and relocates non-adjacent moved lines", () => {
		const oldPlan = plan({
			"src/content/docs/x.mdx": "@@ -0,0 +1,3 @@\n+keep\n+same text\n+tail\n",
		});
		const finding: TrackedFinding = {
			...acceptSpecialistFindings(
				"style",
				[raw("src/content/docs/x.mdx", 2, "Style")],
				oldPlan,
				"A",
			).accepted[0],
			status: "active",
		};
		const reviewPlan = plan(
			{
				"src/content/docs/x.mdx":
					"@@ -0,0 +1,4 @@\n+intro\n+keep\n+same text\n+tail\n",
			},
			undefined,
			false,
			"metadata",
		);
		const relocated = relocateFindings(
			[finding],
			files({
				"src/content/docs/x.mdx":
					"@@ -0,0 +1,4 @@\n+intro\n+keep\n+same text\n+tail\n",
			}),
			reviewPlan,
		);
		expect(reviewPlan.skipped.conventions).toBe("PR metadata unchanged");
		expect(relocated.untouched[0]).toMatchObject({
			path: "src/content/docs/x.mdx",
			line: 3,
		});
	});

	it("marks a finding touched when an adjacent line changes", () => {
		const oldPlan = plan({
			"src/content/docs/x.mdx": "@@ -0,0 +1,2 @@\n+same text\n+tail\n",
		});
		const finding: TrackedFinding = {
			...acceptSpecialistFindings(
				"style",
				[raw("src/content/docs/x.mdx", 1, "Style")],
				oldPlan,
				"A",
			).accepted[0],
			status: "active",
		};
		const reviewPlan = plan({
			"src/content/docs/x.mdx":
				"@@ -0,0 +1,3 @@\n+same text\n+adjacent\n+tail\n",
		});
		const relocated = relocateFindings(
			[finding],
			files({
				"src/content/docs/x.mdx":
					"@@ -0,0 +1,3 @@\n+same text\n+adjacent\n+tail\n",
			}),
			reviewPlan,
		);
		expect(relocated.touched).toEqual([finding]);
	});

	it("keeps a 300-finding comment under the GitHub limit", () => {
		const active = Array.from({ length: 300 }, (_, index): TrackedFinding => ({
			id: `C-${index}`,
			specialist: "code",
			path: "src/x.ts",
			line: index + 1,
			title: "Long finding",
			explanation: "x".repeat(2_000),
			firstSeenSha: "A",
			lastSeenSha: "A",
			status: "active",
		}));
		const body = renderReview({
			pr: 1,
			headSha: "A",
			fullReview: false,
			tier: "inline",
			sections: sections(),
			active,
			resolved: [],
			dismissed: [],
			notReviewed: [],
			judge: "ok",
		});
		expect(body.length).toBeLessThanOrEqual(MAX_COMMENT_LENGTH);
	});
});
