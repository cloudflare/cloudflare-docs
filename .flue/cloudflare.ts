import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import { agentStep, type AgentStepResult } from "./lib/agents/agent-step";
import {
	JUDGE_DURABILITY,
	SPECIALIST_DURABILITY,
} from "./lib/agents/durability";
import { getRunArtifact } from "./lib/review/state";
import { REVIEW_AGENTS } from "./lib/review/run-agents";
import {
	admitRun,
	postPlaceholder,
	prepareRun,
	supersedeRun,
} from "./lib/review/run-start";
import {
	acceptSpecialist,
	buildRunSummary,
	cleanupRun,
	failRun,
	finalizeRun,
	prepareJudge,
	publishRun,
} from "./lib/review/run-finish";
import {
	agentInstanceId,
	reviewMode,
	RUN_ARTIFACTS,
	type ReviewRunEnv,
	type RunCtx,
	type SpecialistSummaries,
	type RunMeta,
} from "./lib/review/run-context";
import { shouldDebounce, type ReviewWorkflowParams } from "./lib/review/start";
import {
	JudgeResultSchema,
	SpecialistResultSchema,
	type JudgeResult,
	type Specialist,
} from "./lib/review/types";
import { CODE_REVIEW_DATA } from "./agents/code-reviewer";
import { STYLE_GUIDE_REVIEW_DATA } from "./agents/style-guide-reviewer";
import { CONVENTIONS_REVIEW_DATA } from "./agents/conventions-reviewer";
import { REVIEW_JUDGE_DATA } from "./agents/review-judge";
import {
	isRetryableRecommendationError,
	processRecommendationEvent,
	type RecommendationEnv,
} from "./lib/run-reviewer-recommendations";
import { runDraftStaleSweep } from "./lib/draft-stale";
import { runChangelogDateSweep } from "./lib/changelog-date-check";
import { getInstallationToken } from "./lib/github";

const STEP = {
	retries: { limit: 2, delay: "5 seconds", backoff: "exponential" },
	timeout: "10 minutes",
} as const;
const SPECIALIST_DATA_NAMES: Record<Specialist, string> = {
	code: CODE_REVIEW_DATA,
	style: STYLE_GUIDE_REVIEW_DATA,
	conventions: CONVENTIONS_REVIEW_DATA,
};

function judgeStatus(
	judge: AgentStepResult<JudgeResult> | null,
): "ok" | "failed" | "skipped" {
	if (!judge) return "skipped";
	return judge.ok ? "ok" : "failed";
}

export class ReviewOrchestrator extends WorkflowEntrypoint<
	ReviewRunEnv,
	ReviewWorkflowParams
> {
	async run(
		event: Readonly<WorkflowEvent<ReviewWorkflowParams>>,
		step: WorkflowStep,
	) {
		const ctx: RunCtx = {
			env: this.env,
			params: event.payload,
			runId: event.instanceId,
			mode: reviewMode(this.env),
		};
		const startedAt = event.timestamp.toISOString();
		const base = {
			pr: ctx.params.number,
			headSha: ctx.params.headSha,
			runId: ctx.runId,
			startedAt,
		};
		const configuredDebounce = Number(
			this.env.DOCS_FLUE_REVIEW_DEBOUNCE_SECONDS,
		);
		const debounceSeconds =
			Number.isFinite(configuredDebounce) && configuredDebounce >= 0
				? configuredDebounce
				: 120;
		try {
			if (
				shouldDebounce(ctx.params) &&
				!ctx.params.replay &&
				debounceSeconds > 0
			) {
				await step.sleep("debounce", `${debounceSeconds} seconds`);
			}
			const admit = await step.do("admit", STEP, () => admitRun(ctx));
			if (!admit.proceed)
				return buildRunSummary({
					...base,
					reason: admit.reason,
					finishedAt: new Date().toISOString(),
				});
			if (admit.superseded)
				await step.do("supersede", STEP, () =>
					supersedeRun(ctx, admit.superseded!),
				);
			const prepared = await step.do("prepare", STEP, () => prepareRun(ctx));
			await step.do("placeholder", STEP, () =>
				postPlaceholder(ctx, prepared.fullReview),
			);
			const meta = await getRunArtifact<RunMeta>(
				ctx.env.DOCS_FLUE_BUCKET,
				ctx.params.number,
				ctx.runId,
				RUN_ARTIFACTS.meta,
			);
			if (!meta) throw new Error("Missing run metadata");
			const summaries: SpecialistSummaries = {};
			await Promise.all(
				prepared.specialists.map(async (specialist) => {
					const message = await getRunArtifact<string>(
						ctx.env.DOCS_FLUE_BUCKET,
						ctx.params.number,
						ctx.runId,
						RUN_ARTIFACTS.message(specialist),
					);
					if (!message) throw new Error(`Missing ${specialist} message`);
					const result = await agentStep(step, {
						name: specialist,
						agent: REVIEW_AGENTS[specialist],
						id: agentInstanceId(ctx.runId, specialist),
						message,
						initialData: {
							runId: ctx.runId,
							pr: ctx.params.number,
							headSha: meta.pr.headSha,
							baseSha: meta.pr.baseSha,
							specialist,
							tier: prepared.tier,
						},
						dataName: SPECIALIST_DATA_NAMES[specialist],
						schema: SpecialistResultSchema,
						readTimeoutMs: SPECIALIST_DURABILITY.timeoutMs,
					});
					summaries[specialist] = await step.do(
						`${specialist}:accept`,
						STEP,
						() => acceptSpecialist(ctx, specialist, result),
					);
				}),
			);
			const judgePrep = await step.do("judge-prep", STEP, () =>
				prepareJudge(ctx, summaries),
			);
			let judge: AgentStepResult<JudgeResult> | null = null;
			if (judgePrep.judgeNeeded) {
				const message = await getRunArtifact<string>(
					ctx.env.DOCS_FLUE_BUCKET,
					ctx.params.number,
					ctx.runId,
					RUN_ARTIFACTS.message("judge"),
				);
				if (!message) throw new Error("Missing judge message");
				judge = await agentStep(step, {
					name: "judge",
					agent: REVIEW_AGENTS.judge,
					id: agentInstanceId(ctx.runId, "judge"),
					message,
					initialData: {
						runId: ctx.runId,
						pr: ctx.params.number,
						headSha: meta.pr.headSha,
						baseSha: meta.pr.baseSha,
						specialist: "judge",
						tier: prepared.tier,
					},
					dataName: REVIEW_JUDGE_DATA,
					schema: JudgeResultSchema,
					readTimeoutMs: JUDGE_DURABILITY.timeoutMs,
				});
			}
			const finalized = await step.do("finalize", STEP, () =>
				finalizeRun(ctx, judge, summaries),
			);
			const reviewed = {
				...base,
				tier: prepared.tier,
				fullReview: prepared.fullReview,
				specialists: summaries,
				judge: judgeStatus(judge),
				notReviewed: prepared.notReviewed,
				finalize: finalized,
				replay: ctx.params.replay,
			};
			if (!finalized.committed && !ctx.params.replay) {
				await step.do("cleanup", STEP, () => cleanupRun(ctx));
				return buildRunSummary({
					...reviewed,
					finishedAt: new Date().toISOString(),
				});
			}
			const published = await step.do("publish", STEP, () => publishRun(ctx));
			await step.do("cleanup", STEP, () => cleanupRun(ctx));
			return buildRunSummary({
				...reviewed,
				publish: published,
				...(ctx.params.replay
					? { commentArtifact: RUN_ARTIFACTS.comment }
					: {}),
				finishedAt: new Date().toISOString(),
			});
		} catch (error) {
			await step.do("fail", STEP, () =>
				failRun(ctx, error instanceof Error ? error.message : String(error)),
			);
			return buildRunSummary({
				...base,
				failed: true,
				reason: error instanceof Error ? error.message : String(error),
				finishedAt: new Date().toISOString(),
			});
		}
	}
}

export { DependabotReviewWorkflow } from "./orchestrators/dependabot-review-workflow";
export { RebaseWorkflow } from "./orchestrators/rebase-workflow";
export { IngestWorkflow } from "./orchestrators/ingest-workflow";
export { CommentSpamWorkflow } from "./orchestrators/comment-spam-workflow";

export default {
	async scheduled(_controller: ScheduledController, env: RecommendationEnv) {
		const token = await getInstallationToken(env as Record<string, string>);
		await runChangelogDateSweep(token);
		await runDraftStaleSweep(token, env.DOCS_FLUE_BUCKET);
	},
	async queue(batch: MessageBatch<unknown>, env: RecommendationEnv) {
		for (const message of batch.messages) {
			try {
				await processRecommendationEvent(message.body, env);
				message.ack();
			} catch (error) {
				if (isRetryableRecommendationError(error)) message.retry();
				else message.ack();
			}
		}
	},
};
