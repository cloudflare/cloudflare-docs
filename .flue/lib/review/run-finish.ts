import type { AgentStepResult } from "../agents/agent-step";
import {
	addReactionToComment,
	createIssueComment,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	removeReactionFromComment,
	updateIssueComment,
} from "../github";
import { buildJudgeMessage } from "./agent-input";
import { formatFileIndex, formatTargetDiff } from "./diff/format";
import { acceptSpecialistFindings } from "./diff/findings";
import {
	applyJudgement,
	buildCommitInput,
	buildRenderInput,
	selectJudgeWork,
} from "./pipeline";
import { renderFailure, renderReview } from "./render";
import { findBotReviewComment } from "./bot-comment";
import {
	commitRun,
	deleteRunArtifacts,
	getRunArtifact,
	loadState,
	releaseActiveRun,
	updateState,
	putRunArtifact,
} from "./state";
import {
	RUN_ARTIFACTS,
	canPostStatusNotes,
	type JudgePrepSummary,
	type PublishResult,
	type RunCtx,
	type SpecialistSummaries,
	type RunMeta,
	type FinalizeSummary,
} from "./run-context";
import type {
	EligibleComment,
	Finding,
	JudgeResult,
	PatchFile,
	ReviewPlan,
	Specialist,
	SpecialistResult,
	SpecialistRunSummary,
	TrackedFinding,
	ReviewRunSummary,
	RenderInput,
} from "./types";

export const MAX_JUDGE_TOUCHED = 50;

async function artifact<T>(ctx: RunCtx, name: string): Promise<T> {
	const value = await getRunArtifact<T>(
		ctx.env.DOCS_FLUE_BUCKET,
		ctx.params.number,
		ctx.runId,
		name,
	);
	if (value === null) throw new Error(`Missing run artifact: ${name}`);
	return value;
}

export async function acceptSpecialist(
	ctx: RunCtx,
	specialist: Specialist,
	result: AgentStepResult<SpecialistResult>,
): Promise<SpecialistRunSummary> {
	if (!result.ok) {
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			ctx.params.number,
			ctx.runId,
			RUN_ARTIFACTS.findings(specialist),
			[],
		);
		return { ok: false, accepted: 0, droppedOffTarget: 0, error: result.error };
	}
	const [plan, meta] = await Promise.all([
		artifact<ReviewPlan>(ctx, RUN_ARTIFACTS.plan),
		artifact<RunMeta>(ctx, RUN_ARTIFACTS.meta),
	]);
	const accepted = acceptSpecialistFindings(
		specialist,
		result.value.findings,
		plan,
		meta.pr.headSha,
	);
	await putRunArtifact(
		ctx.env.DOCS_FLUE_BUCKET,
		ctx.params.number,
		ctx.runId,
		RUN_ARTIFACTS.findings(specialist),
		accepted.accepted,
	);
	return {
		ok: true,
		accepted: accepted.accepted.length,
		droppedOffTarget: accepted.droppedOffTarget,
	};
}

export async function prepareJudge(
	ctx: RunCtx,
	summaries: SpecialistSummaries,
): Promise<JudgePrepSummary> {
	const [plan, meta, prior, relocated, comments, files] = await Promise.all([
		artifact<ReviewPlan>(ctx, RUN_ARTIFACTS.plan),
		artifact<RunMeta>(ctx, RUN_ARTIFACTS.meta),
		artifact<TrackedFinding[]>(ctx, RUN_ARTIFACTS.prior),
		artifact<{ untouched: TrackedFinding[]; touched: TrackedFinding[] }>(
			ctx,
			RUN_ARTIFACTS.relocated,
		),
		artifact<EligibleComment[]>(ctx, RUN_ARTIFACTS.comments),
		artifact<PatchFile[]>(ctx, RUN_ARTIFACTS.patchFiles),
	]);
	const specialists = Object.keys(plan.targets) as Specialist[];
	const failedSpecialists = specialists.filter(
		(specialist) => !summaries[specialist]?.ok,
	);
	const findings = (
		await Promise.all(
			specialists.map((specialist) =>
				artifact<Finding[]>(ctx, RUN_ARTIFACTS.findings(specialist)),
			),
		)
	).flat();
	const work = selectJudgeWork({
		prior,
		relocated,
		newFindings: findings,
		newComments: comments,
		maxTouched: MAX_JUDGE_TOUCHED,
		failedSpecialists,
	});
	await putRunArtifact(
		ctx.env.DOCS_FLUE_BUCKET,
		ctx.params.number,
		ctx.runId,
		RUN_ARTIFACTS.judgeWork,
		work,
	);
	if (work.judgeNeeded) {
		const target = {
			specialist: "code" as const,
			files: [
				...new Set(
					Object.values(plan.targets).flatMap((item) => item?.files ?? []),
				),
			],
			lines: Object.assign(
				{},
				...Object.values(plan.targets).map((item) => item?.lines ?? {}),
			),
			fingerprints: {},
			estimatedTokens: 0,
		};
		const content =
			plan.tier === "inline"
				? formatTargetDiff(files, target)
				: formatFileIndex(files, plan);
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			ctx.params.number,
			ctx.runId,
			RUN_ARTIFACTS.message("judge"),
			buildJudgeMessage({
				pr: meta.pr,
				newFindings: work.newFindings,
				touched: work.touched.map((finding) => ({ finding })),
				dismissed: work.dismissedContext,
				comments,
				targetDiffOrIndex: {
					kind: plan.tier === "inline" ? "target_diff" : "file_index",
					content,
				},
			}),
		);
	}
	return {
		judgeNeeded: work.judgeNeeded,
		newFindings: work.newFindings.length,
		touched: work.touched.length,
		suppressedDismissed: work.suppressedDismissed,
	};
}

export async function finalizeRun(
	ctx: RunCtx,
	judge: AgentStepResult<JudgeResult> | null,
	summaries: SpecialistSummaries,
): Promise<FinalizeSummary> {
	const [plan, meta, work] = await Promise.all([
		artifact<ReviewPlan>(ctx, RUN_ARTIFACTS.plan),
		artifact<RunMeta>(ctx, RUN_ARTIFACTS.meta),
		artifact<ReturnType<typeof selectJudgeWork>>(ctx, RUN_ARTIFACTS.judgeWork),
	]);
	const result = applyJudgement({
		newFindings: work.newFindings,
		touched: work.touched,
		carried: work.carried,
		dismissed: work.dismissedContext,
		judge: judge?.ok ? judge.value : null,
		headSha: meta.pr.headSha,
	});
	const section = (specialist: Specialist) => ({
		ran: !!plan.targets[specialist],
		failed: !!plan.targets[specialist] && !summaries[specialist]?.ok,
		skippedReason: plan.skipped[specialist],
	});
	const sections: RenderInput["sections"] = {
		code: section("code"),
		style: section("style"),
		conventions: section("conventions"),
	};
	const renderInput = buildRenderInput({
		pr: meta.pr.number,
		headSha: meta.pr.headSha,
		fullReview: plan.fullReview,
		tier: plan.tier,
		sections,
		active: result.active,
		resolvedNow: result.resolvedNow,
		dismissedAll: result.dismissedAll,
		notReviewed: plan.notReviewed,
		judge: judge === null ? "skipped" : judge.ok ? "ok" : "failed",
	});
	const markdown = renderReview(renderInput);
	await Promise.all([
		putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			ctx.params.number,
			ctx.runId,
			RUN_ARTIFACTS.renderInput,
			renderInput,
		),
		putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			ctx.params.number,
			ctx.runId,
			RUN_ARTIFACTS.comment,
			{ markdown },
		),
	]);
	let committed = true;
	if (!ctx.params.replay) {
		const state = await updateState(
			ctx.env.DOCS_FLUE_BUCKET,
			ctx.params.number,
			(current) =>
				commitRun(
					current,
					buildCommitInput({
						runId: ctx.runId,
						headSha: meta.pr.headSha,
						completedAt: new Date().toISOString(),
						successfulSpecialists: (
							Object.keys(summaries) as Specialist[]
						).filter((specialist) => summaries[specialist]?.ok),
						plan,
						active: result.active,
						dismissed: result.dismissedAll,
						conventionsSucceeded: !!summaries.conventions?.ok,
						commentsSeenThrough: meta.commentsSeenThrough,
						commentId: meta.commentId,
					}),
				).state,
		);
		committed = state?.lastCompleted?.runId === ctx.runId;
	}
	return {
		committed,
		findings: {
			active: result.active.length,
			resolved: result.resolvedNow.length,
			dismissed: result.dismissedAll.length,
			newKept: work.newFindings.length - result.dropped.length,
			newDropped: result.dropped.length,
		},
	};
}

/**
 * Log mode prints the comment; comment mode writes the singleton PR comment.
 * Replays publish the same way but never commit state, so they skip the
 * supersession check and do not persist the comment ID.
 */
export async function publishRun(ctx: RunCtx): Promise<PublishResult> {
	const replay = ctx.params.replay === true;
	const comment = await artifact<{ markdown: string }>(
		ctx,
		RUN_ARTIFACTS.comment,
	);
	if (ctx.mode === "log") {
		console.log(comment.markdown);
		if (ctx.params.commentId && ctx.params.eyesReactionId) {
			try {
				const token = await getInstallationToken(
					ctx.env as Record<string, string>,
				);
				await removeReactionFromComment(
					token,
					ctx.params.commentId,
					ctx.params.eyesReactionId,
				);
				await addReactionToComment(token, ctx.params.commentId, "+1");
			} catch {
				// Reactions are cosmetic and must not fail publishing.
			}
		}
		return { published: false, reason: "log" };
	}
	const [meta, state] = await Promise.all([
		artifact<RunMeta>(ctx, RUN_ARTIFACTS.meta),
		replay ? undefined : loadState(ctx.env.DOCS_FLUE_BUCKET, ctx.params.number),
	]);
	if (state && state.state.lastCompleted?.runId !== ctx.runId)
		return { published: false, reason: "superseded" };
	const token = await getInstallationToken(ctx.env as Record<string, string>);
	const pr = await getPullRequest(token, ctx.params.number);
	if (pr.head.sha !== meta.pr.headSha)
		return { published: false, reason: "head_changed" };
	const comments = await getIssueComments(token, ctx.params.number);
	const commentId = findBotReviewComment(
		comments,
		meta.commentId ?? state?.state.commentId,
	)?.id;
	const persistedCommentId =
		commentId ??
		(await createIssueComment(token, ctx.params.number, comment.markdown));
	if (commentId) await updateIssueComment(token, commentId, comment.markdown);
	// The next tracked run finds a replay's comment by its marker.
	if (!replay)
		await updateState(
			ctx.env.DOCS_FLUE_BUCKET,
			ctx.params.number,
			(current) => ({ ...current, commentId: persistedCommentId }),
		);
	if (ctx.params.commentId && ctx.params.eyesReactionId) {
		try {
			await removeReactionFromComment(
				token,
				ctx.params.commentId,
				ctx.params.eyesReactionId,
			);
			await addReactionToComment(token, ctx.params.commentId, "+1");
		} catch {
			// Reactions are cosmetic and must not fail publishing.
		}
	}
	return { published: true };
}

/**
 * Release the run's claim and replace its in-progress note with a failure
 * note. Replays own no claim, but still replace the note they posted.
 */
export async function failRun(ctx: RunCtx, _error: string): Promise<void> {
	try {
		let stateCommentId: number | undefined;
		if (!ctx.params.replay) {
			const loaded = await loadState(
				ctx.env.DOCS_FLUE_BUCKET,
				ctx.params.number,
			);
			if (loaded.state.activeRun?.runId !== ctx.runId) return;
			await updateState(ctx.env.DOCS_FLUE_BUCKET, ctx.params.number, (state) =>
				releaseActiveRun(state, ctx.runId),
			);
			stateCommentId = loaded.state.commentId;
		}
		if (!canPostStatusNotes(ctx)) return;
		const [meta, token] = await Promise.all([
			artifact<RunMeta>(ctx, RUN_ARTIFACTS.meta),
			getInstallationToken(ctx.env as Record<string, string>),
		]);
		const comments = await getIssueComments(token, ctx.params.number);
		const existing = findBotReviewComment(
			comments,
			meta.commentId ?? stateCommentId,
		);
		if (existing) {
			await updateIssueComment(
				token,
				existing.id,
				renderFailure(meta.pr.headSha, existing.body ?? undefined),
			);
		}
	} catch {
		/* failure handling must not throw */
	}
}

export async function cleanupRun(ctx: RunCtx): Promise<void> {
	if (!ctx.params.replay)
		await deleteRunArtifacts(
			ctx.env.DOCS_FLUE_BUCKET,
			ctx.params.number,
			ctx.runId,
		);
}

function runOutcome(input: {
	failed?: boolean;
	finalize?: FinalizeSummary;
	publish?: PublishResult;
}): ReviewRunSummary["outcome"] {
	if (input.failed) return "failed";
	if (input.publish?.published) return "published";
	if (input.publish?.reason === "log") return "logged";
	if (
		input.publish?.reason === "superseded" ||
		input.finalize?.committed === false
	)
		return "superseded";
	return "skipped";
}

export function buildRunSummary(
	input: Omit<ReviewRunSummary, "outcome" | "finishedAt" | "startedAt"> & {
		startedAt?: string;
		finishedAt: string;
		finalize?: FinalizeSummary;
		publish?: PublishResult;
		failed?: boolean;
	},
): ReviewRunSummary {
	const outcome = runOutcome(input);
	const { finalize, publish, failed, ...summary } = input;
	return {
		...summary,
		// Explains why a finished review was not published, such as head_changed.
		reason:
			summary.reason ?? (outcome === "skipped" ? publish?.reason : undefined),
		startedAt: summary.startedAt ?? summary.finishedAt,
		outcome,
		findings: finalize?.findings ?? summary.findings,
	};
}
