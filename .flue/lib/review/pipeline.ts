import type {
	EligibleComment,
	Finding,
	JudgeResult,
	RenderInput,
	ReviewPlan,
	Specialist,
	TrackedFinding,
} from "./types";
import type { CommitRunInput } from "./state";
import { normalizeTitle } from "./diff/findings";

type Relocated = { untouched: TrackedFinding[]; touched: TrackedFinding[] };

export function selectJudgeWork(input: {
	prior: TrackedFinding[];
	relocated: Relocated;
	newFindings: Finding[];
	newComments: EligibleComment[];
	maxTouched: number;
	failedSpecialists: Specialist[];
}) {
	const failed = new Set(input.failedSpecialists);
	const dismissedContext = input.prior.filter(
		(finding) => finding.status === "dismissed",
	);
	const dismissedIds = new Set(dismissedContext.map((finding) => finding.id));
	const source = [
		...input.relocated.untouched,
		...input.relocated.touched,
	].filter((finding) => finding.status === "active");
	const active = new Map(source.map((finding) => [finding.id, finding]));
	const touchedIds = new Set(
		input.relocated.touched
			.filter((finding) => finding.status === "active")
			.map((finding) => finding.id),
	);
	const touchedActive = input.relocated.touched.filter(
		(finding) => finding.status === "active",
	);
	const absorbedTouchedIds = new Set<string>();
	const newFindings: Finding[] = [];
	const reRaisedIds = new Set<string>();
	let suppressedDismissed = 0;
	for (const finding of input.newFindings) {
		if (newFindings.some((item) => item.id === finding.id)) continue;
		if (dismissedIds.has(finding.id)) {
			suppressedDismissed++;
			continue;
		}
		const prior = active.get(finding.id);
		if (prior) {
			active.set(finding.id, {
				...prior,
				...finding,
				firstSeenSha: prior.firstSeenSha,
				status: "active",
				verified: prior.verified,
			});
			touchedIds.delete(finding.id);
			reRaisedIds.add(finding.id);
			continue;
		}
		const reRaised = touchedActive.find(
			(candidate) =>
				!absorbedTouchedIds.has(candidate.id) &&
				candidate.specialist === finding.specialist &&
				candidate.path === finding.path &&
				candidate.line === finding.line &&
				normalizeTitle(candidate.title) === normalizeTitle(finding.title),
		);
		if (reRaised) {
			absorbedTouchedIds.add(reRaised.id);
			active.set(reRaised.id, {
				...reRaised,
				...finding,
				id: reRaised.id,
				firstSeenSha: reRaised.firstSeenSha,
				status: "active",
				verified: reRaised.verified,
			});
			touchedIds.delete(reRaised.id);
			reRaisedIds.add(reRaised.id);
			continue;
		}
		newFindings.push(finding);
	}
	const eligibleUntouched = input.relocated.untouched.filter(
		(finding) =>
			finding.status === "active" &&
			!failed.has(finding.specialist) &&
			!touchedIds.has(finding.id),
	);
	const promoted = eligibleUntouched.filter((finding) =>
		input.newComments.some(
			(comment) =>
				comment.body.includes(finding.id) ||
				(!!finding.path && comment.body.includes(finding.path)),
		),
	);
	const fallback =
		input.newComments.length && promoted.length === 0
			? eligibleUntouched
			: promoted;
	const candidates = [...active.values()].filter(
		(finding) =>
			!failed.has(finding.specialist) &&
			!reRaisedIds.has(finding.id) &&
			(touchedIds.has(finding.id) ||
				fallback.some((item) => item.id === finding.id)),
	);
	const touched = candidates.slice(0, input.maxTouched);
	const selectedIds = new Set(touched.map((finding) => finding.id));
	return {
		judgeNeeded: newFindings.length > 0 || touched.length > 0,
		touched,
		carried: [...active.values()].filter(
			(finding) => !selectedIds.has(finding.id),
		),
		dismissedContext,
		newFindings,
		suppressedDismissed,
	};
}

export function applyJudgement(input: {
	newFindings: Finding[];
	touched: TrackedFinding[];
	carried: TrackedFinding[];
	dismissed: TrackedFinding[];
	judge: JudgeResult | null;
	headSha: string;
}) {
	const newDecisions = new Map(
		input.judge?.new_findings.map((item) => [item.id, item]) ?? [],
	);
	const priorDecisions = new Map(
		input.judge?.prior_findings.map((item) => [item.id, item]) ?? [],
	);
	const active: TrackedFinding[] = [];
	const resolvedNow: TrackedFinding[] = [];
	const dismissedAll = [...input.dismissed];
	const dropped: Finding[] = [];
	const used = new Set(dismissedAll.map((finding) => finding.id));
	for (const finding of input.carried) {
		if (used.has(finding.id)) continue;
		used.add(finding.id);
		active.push({ ...finding, lastSeenSha: input.headSha });
	}
	for (const finding of input.newFindings) {
		if (used.has(finding.id)) continue;
		const decision = newDecisions.get(finding.id);
		if (decision?.decision === "drop") {
			dropped.push(finding);
			continue;
		}
		used.add(finding.id);
		active.push({
			...finding,
			status: "active",
			verified: decision?.decision === "keep",
			statusReason: decision?.reason,
			lastSeenSha: input.headSha,
		});
	}
	for (const finding of input.touched) {
		if (used.has(finding.id)) continue;
		used.add(finding.id);
		const decision = priorDecisions.get(finding.id);
		if (decision?.decision === "resolved")
			resolvedNow.push({
				...finding,
				status: "resolved",
				statusReason: decision.reason,
			});
		else if (decision?.decision === "dismissed")
			dismissedAll.push({
				...finding,
				status: "dismissed",
				statusReason: decision.reason,
			});
		else
			active.push({
				...finding,
				status: "active",
				lastSeenSha: input.headSha,
				verified: finding.verified,
			});
	}
	return {
		active,
		resolvedNow,
		dismissedAll,
		dropped,
		verified: !!input.judge,
	};
}

export function buildRenderInput(
	input: Omit<RenderInput, "active" | "resolved" | "dismissed"> & {
		active: TrackedFinding[];
		resolvedNow: TrackedFinding[];
		dismissedAll: TrackedFinding[];
	},
): RenderInput {
	const { resolvedNow, dismissedAll, ...renderInput } = input;
	return {
		...renderInput,
		resolved: resolvedNow,
		dismissed: dismissedAll,
	};
}

export function buildCommitInput(
	input: Omit<
		CommitRunInput,
		"reviewedFingerprints" | "findings" | "conventionsInputHash"
	> & {
		runId: string;
		plan: ReviewPlan;
		active: TrackedFinding[];
		dismissed: TrackedFinding[];
		conventionsSucceeded: boolean;
	},
): CommitRunInput {
	return {
		runId: input.runId,
		headSha: input.headSha,
		completedAt: input.completedAt,
		successfulSpecialists: input.successfulSpecialists,
		reviewedFingerprints: Object.fromEntries(
			input.successfulSpecialists.map((specialist) => [
				specialist,
				Object.values(input.plan.targets[specialist]?.fingerprints ?? {}),
			]),
		),
		findings: [...input.active, ...input.dismissed],
		conventionsInputHash: input.conventionsSucceeded
			? input.plan.conventionsInputHash
			: undefined,
		commentsSeenThrough: input.commentsSeenThrough,
		commentId: input.commentId,
	};
}
