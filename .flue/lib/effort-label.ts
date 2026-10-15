import { addLabels, removeLabel } from "./github";

/** Effort labels: score the model's answers into points and a level. */

export const EFFORT_LEVELS = ["Low", "Medium", "High", "Very High"] as const;
export type EffortLevel = (typeof EFFORT_LEVELS)[number];

export const EFFORT_LABELS: Record<EffortLevel, string> = {
	Low: "effort:low",
	Medium: "effort:medium",
	High: "effort:high",
	"Very High": "effort:very-high",
};

export const EFFORT_LABEL_PREFIX = "effort:";

export const DECISIONS = [
	"Close as completed",
	"Confirm scope, then close",
	"Partial fix, narrow scope",
	"Review open PR",
	"Docs fix needed",
	"Needs owner or SME input",
	"Verify or reproduce",
	"Track as initiative",
] as const;
export type Decision = (typeof DECISIONS)[number];

export const ISSUE_TYPES = [
	"incorrect_info",
	"missing_content",
	"unclear",
	"broken_link_or_example",
	"product_bug_or_request",
	"other",
] as const;
export type IssueType = (typeof ISSUE_TYPES)[number];

export const REQUIREMENT_STATUSES = [
	"met",
	"partly_met",
	"not_met",
	"cant_tell",
] as const;
export type RequirementStatus = (typeof REQUIREMENT_STATUSES)[number];

export const OWNERS = ["docs", "product_team", "reporter"] as const;
export type Owner = (typeof OWNERS)[number];

/** What the model reports about an issue (validated in effort-assessment.ts). */
export interface EffortAssessment {
	decision: Decision;
	issue_type: IssueType;
	requirements: Array<{ text: string; status: RequirementStatus }>;
	owner: Owner;
	/** developers.cloudflare.com pages the fix would touch. */
	pages: string[];
	/** The model's own estimate: one weighted signal among the others. */
	effort_estimate: EffortLevel;
	reason: string;
}

/** Facts read from GitHub, not from the model. */
export interface EffortFacts {
	labels: string[];
	commentsCount: number;
	/** Product codeowner areas (CODEOWNERS pattern) for the pages involved. */
	codeownerAreas: string[];
}

export interface EffortReason {
	text: string;
	points: number;
}

export interface EffortScore {
	level: EffortLevel;
	score: number;
	reasons: EffortReason[];
}

/** Base work per decision: what the docs team does next. */
const DECISION_BASE: Record<Decision, EffortReason> = {
	"Close as completed": { points: 0, text: "Close with a comment" },
	"Confirm scope, then close": {
		points: 0,
		text: "Ask the reporter, then close",
	},
	"Review open PR": { points: 1, text: "Review an open PR" },
	"Partial fix, narrow scope": { points: 1, text: "Finish the remaining part" },
	"Docs fix needed": { points: 1, text: "Write a docs fix" },
	"Needs owner or SME input": {
		points: 1,
		text: "Write the fix once the SME answers",
	},
	"Verify or reproduce": { points: 3, text: "Reproduce the behavior first" },
	"Track as initiative": { points: 8, text: "Initiative-sized work" },
};

/** Decisions where the docs team writes (or finishes) the fix itself. */
const WRITES = new Set<Decision>([
	"Docs fix needed",
	"Partial fix, narrow scope",
	"Needs owner or SME input",
	"Verify or reproduce",
]);
/** Decisions that end in a docs PR, so codeowners review it. */
const NEEDS_REVIEW = new Set<Decision>([...WRITES, "Review open PR"]);

const ESTIMATE_POINTS: Record<EffortLevel, number> = {
	Low: 0,
	Medium: 0.75,
	High: 2,
	"Very High": 3.5,
};

/** Exclusive upper bounds on points. */
const LEVEL_THRESHOLDS: ReadonlyArray<[number, EffortLevel]> = [
	[2.5, "Low"],
	[5, "Medium"],
	[8, "High"],
];

const round = (n: number) => Math.round(n * 100) / 100;

export function levelFor(score: number): EffortLevel {
	for (const [max, level] of LEVEL_THRESHOLDS) {
		if (score < max) return level;
	}
	return "Very High";
}

/** Score an assessment into points and a level. Pure. */
export function scoreEffort(
	a: EffortAssessment,
	facts: EffortFacts,
): EffortScore {
	const reasons: EffortReason[] = [{ ...DECISION_BASE[a.decision] }];
	const add = (points: number, text: string) => {
		if (points !== 0) reasons.push({ points: round(points), text });
	};

	// 1. The work itself
	const count = (status: RequirementStatus) =>
		a.requirements.filter((r) => r.status === status).length;
	if (WRITES.has(a.decision)) {
		add(count("not_met"), `${count("not_met")} requirement(s) not met`);
		add(count("partly_met") * 0.5, `${count("partly_met")} partly met`);
		add(count("cant_tell") * 0.25, `${count("cant_tell")} not checked`);
		if (a.issue_type === "missing_content")
			add(1.5, "Missing content (new writing)");
		if (a.issue_type === "broken_link_or_example")
			add(-0.25, "Broken link or example (targeted fix)");
		const pages = new Set(a.pages).size;
		if (pages > 1)
			add(Math.min(2, (pages - 1) * 0.75), `${pages} pages involved`);
	} else if (a.decision === "Review open PR") {
		const open = a.requirements.length - count("met");
		add(open * 0.5, `${open} requirement(s) the PR must cover`);
	}

	// 2. Coordination
	if (a.owner === "product_team") add(2, "Waiting on the product team");
	if (a.owner === "reporter") add(1, "Waiting on the reporter");
	const areas = [...new Set(facts.codeownerAreas)];
	if (NEEDS_REVIEW.has(a.decision) && areas.length > 0) {
		add(0.5, `Codeowners review (${areas[0]})`);
		if (areas.length > 1)
			add(Math.min(2, areas.length - 1), `${areas.length} codeowner areas`);
	}
	if (facts.commentsCount >= 10)
		add(0.5, `Long thread (${facts.commentsCount} comments)`);

	// 3. Hints. effort:* labels are never an input, so labels cannot feed back.
	const labels = facts.labels.map((l) => l.toLowerCase());
	if (labels.includes("quick-fix")) add(-1.5, "Labeled quick-fix");
	if (labels.includes("content:new") && WRITES.has(a.decision))
		add(1.5, "Labeled content:new");
	reasons.push({
		points: ESTIMATE_POINTS[a.effort_estimate],
		text: `Model estimate: ${a.effort_estimate}`,
	});

	const score = round(
		Math.max(
			0,
			reasons.reduce((sum, r) => sum + r.points, 0),
		),
	);
	return { level: levelFor(score), score, reasons };
}

export const isEffortLabel = (name: string) =>
	name.toLowerCase().startsWith(EFFORT_LABEL_PREFIX);

/** Add the target label if missing and remove every other effort label. */
export function planEffortLabelChanges(
	currentLabels: string[],
	target: string,
): { add: string | null; remove: string[] } {
	return {
		add: currentLabels.includes(target) ? null : target,
		remove: currentLabels.filter(
			(name) => name !== target && isEffortLabel(name),
		),
	};
}

/**
 * Make the issue carry exactly one effort label, adding and removing one label
 * at a time so other labels are untouched. Idempotent. Throws on API failure.
 */
export async function reconcileEffortLabel(
	token: string,
	number: number,
	currentLabels: string[],
	level: EffortLevel,
	options: { dryRun?: boolean } = {},
): Promise<{
	target: string;
	added: boolean;
	removed: string[];
	dryRun: boolean;
}> {
	const target = EFFORT_LABELS[level];
	const plan = planEffortLabelChanges(currentLabels, target);
	const dryRun = options.dryRun === true;
	if (!dryRun) {
		if (plan.add) await addLabels(token, number, [plan.add]);
		for (const name of plan.remove) await removeLabel(token, number, name);
	}
	return { target, added: plan.add !== null, removed: plan.remove, dryRun };
}
