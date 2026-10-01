import {
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	getPullRequestFiles,
	getRepoFileContent,
	listPullRequestReviewComments,
	listPullRequestReviews,
	createIssueComment,
	updateIssueComment,
} from "../github";
import { abortRunAgents } from "./run-agents";
import {
	agentInstanceId,
	canPostStatusNotes,
	type AdmitResult,
	type PrepareSummary,
	RUN_ARTIFACTS,
	type RunCtx,
	type RunMeta,
} from "./run-context";
import {
	claimActiveRun,
	emptyState,
	getRunArtifact,
	isAutoReviewDisabled,
	isActiveRun,
	loadState,
	putRunArtifact,
	resetForFullReview,
	updateState,
} from "./state";
import type { ActiveRun, PatchFile } from "./types";
import { hash } from "./hash";
import { mdxCodeLines } from "./diff/code-lines";
import { classifyFile } from "./diff/filter";
import { buildReviewPlan } from "./diff/target";
import { relocateFindings } from "./diff/relocate";
import { eligibleComments } from "./diff/comments";
import { buildSpecialistMessage, readPatchArtifactName } from "./agent-input";
import { renderPending } from "./render";
import { findBotReviewComment } from "./bot-comment";

const AGENT_KEYS = ["code", "style", "conventions", "judge"] as const;
const MDX_READ_CONCURRENCY = 8;
/** Beyond this many MDX files, the rest fall back to hunk-only code detection. */
const MDX_READ_MAX_FILES = 300;

/**
 * Find code lines in each changed MDX file from its full head content. A
 * diff shows only a few lines around each edit, so an edit deep inside a
 * long code block does not show the fence that opens it.
 */
async function loadMdxCodeLines(
	token: string,
	files: PatchFile[],
	headSha: string,
): Promise<Record<string, number[]>> {
	const candidates = files
		.filter(
			(file) =>
				file.disposition === "reviewable" &&
				file.path.endsWith(".mdx") &&
				file.hunks.some((hunk) =>
					hunk.lines.some((line) => line.kind === "add"),
				),
		)
		.slice(0, MDX_READ_MAX_FILES);
	const result: Record<string, number[]> = {};
	let cursor = 0;
	await Promise.all(
		Array.from(
			{ length: Math.min(MDX_READ_CONCURRENCY, candidates.length) },
			async () => {
				while (cursor < candidates.length) {
					const file = candidates[cursor++];
					// A failed read falls back to hunk-only detection in the plan.
					const text = await Promise.resolve(
						getRepoFileContent(token, file.path, headSha),
					).catch(() => null);
					if (typeof text === "string") result[file.path] = mdxCodeLines(text);
				}
			},
		),
	);
	return result;
}

export async function admitRun(ctx: RunCtx): Promise<AdmitResult> {
	const token = await getInstallationToken(ctx.env as Record<string, string>);
	let pr;
	try {
		pr = await getPullRequest(token, ctx.params.number);
	} catch (error) {
		if (ctx.params.replay) return { proceed: false, reason: "not_found" };
		throw error;
	}
	if (ctx.params.replay) return { proceed: true };
	if (pr.state !== "open") return { proceed: false, reason: "closed" };
	if (pr.head.sha !== ctx.params.headSha)
		return { proceed: false, reason: "stale_head" };
	if (ctx.params.trigger === "auto" && pr.draft)
		return { proceed: false, reason: "draft" };
	if (
		ctx.params.trigger === "auto" &&
		(await isAutoReviewDisabled(ctx.env.DOCS_FLUE_BUCKET, ctx.params.number))
	)
		return { proceed: false, reason: "auto_review_disabled" };
	let superseded: ActiveRun | undefined;
	const updated = await updateState(
		ctx.env.DOCS_FLUE_BUCKET,
		ctx.params.number,
		(state) => {
			const base = ctx.params.fullReview ? resetForFullReview(state) : state;
			const claimed = claimActiveRun(base, {
				runId: ctx.runId,
				workflowInstanceId: ctx.runId,
				headSha: ctx.params.headSha,
				startedAt: new Date().toISOString(),
				agentIds: AGENT_KEYS.map((key) => agentInstanceId(ctx.runId, key)),
			});
			superseded = claimed.superseded;
			return claimed.state;
		},
	);
	if (!updated) return { proceed: false, reason: "state_conflict" };
	return {
		proceed: true,
		...(superseded && superseded.runId !== ctx.runId ? { superseded } : {}),
	};
}

export async function supersedeRun(ctx: RunCtx, old: ActiveRun): Promise<void> {
	try {
		const workflow = await ctx.env.REVIEW_ORCHESTRATOR.get(
			old.workflowInstanceId,
		);
		await workflow.terminate();
	} catch {
		// It may already be complete or unavailable.
	}
	try {
		await abortRunAgents(old.agentIds);
	} catch {
		// Cancellation is best-effort even if the agent adapter itself fails.
	}
}

export async function prepareRun(ctx: RunCtx): Promise<PrepareSummary> {
	const token = await getInstallationToken(ctx.env as Record<string, string>);
	const [pr, rawFiles, issues, reviews, reviewComments] = await Promise.all([
		getPullRequest(token, ctx.params.number),
		getPullRequestFiles(token, ctx.params.number),
		getIssueComments(token, ctx.params.number),
		listPullRequestReviews(token, ctx.params.number),
		listPullRequestReviewComments(token, ctx.params.number),
	]);
	const files = rawFiles.map(classifyFile);
	const state = ctx.params.replay
		? emptyState(ctx.params.number)
		: (await loadState(ctx.env.DOCS_FLUE_BUCKET, ctx.params.number)).state;
	const conventionsInputHash = hash(
		[pr.title, pr.body ?? "", ...files.map((file) => file.path).sort()].join(
			"|",
		),
	);
	const plan = buildReviewPlan({
		files,
		reviewed: state.reviewed,
		fullReview: ctx.params.fullReview || ctx.params.replay === true,
		conventionsInputHash,
		previousConventionsInputHash: state.conventionsInputHash,
		mdxCodeLines: await loadMdxCodeLines(token, files, pr.head.sha),
	});
	const relocated = relocateFindings(state.findings, files, plan);
	const comments = eligibleComments(
		{
			issues,
			reviews: reviews.map(({ submitted_at, ...review }) => ({
				...review,
				submitted_at: submitted_at ?? undefined,
			})),
			reviewComments: reviewComments.map(({ line, ...comment }) => ({
				...comment,
				line: line ?? undefined,
			})),
		},
		pr.user?.login ?? "",
		// eligibleComments excludes every `[bot]` login, so the exact bot login is irrelevant.
		"cloudflare-docs-bot[bot]",
		ctx.params.replay ? undefined : state.commentsSeenThrough,
	);
	const meta: RunMeta = {
		pr: {
			number: pr.number,
			title: pr.title,
			body: pr.body ?? "",
			author: pr.user?.login ?? "",
			baseRef: pr.base.ref,
			baseSha: pr.base.sha,
			headSha: pr.head.sha,
		},
		commentsSeenThrough: comments[0]?.createdAt,
		commentId: state.commentId,
		startedAt: new Date().toISOString(),
	};
	const put = (name: string, value: unknown) =>
		putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			ctx.params.number,
			ctx.runId,
			name,
			value,
		);
	const [repoAgentsMd, prTemplate] = await Promise.all([
		Promise.resolve(getRepoFileContent(token, "AGENTS.md", pr.base.sha)).catch(
			() => null,
		),
		Promise.resolve(
			getRepoFileContent(
				token,
				".github/pull_request_template.md",
				pr.base.sha,
			),
		).catch(() => null),
	]);
	const messages = Object.keys(plan.targets).map((key) =>
		put(
			RUN_ARTIFACTS.message(key as keyof typeof plan.targets),
			buildSpecialistMessage({
				specialist: key as keyof typeof plan.targets,
				pr: meta.pr,
				plan,
				files,
				repoAgentsMd: key === "code" ? (repoAgentsMd ?? undefined) : undefined,
				prTemplate:
					key === "conventions" ? (prTemplate ?? undefined) : undefined,
			}),
		),
	);
	const readPatches = files
		.filter((file) => file.disposition === "reviewable")
		.map((file) =>
			put(readPatchArtifactName(file.path), {
				file,
				targetLines: Object.fromEntries(
					Object.entries(plan.targets).map(([key, target]) => [
						key,
						target?.lines[file.path] ?? [],
					]),
				),
			}),
		);
	await Promise.all([
		put(RUN_ARTIFACTS.meta, meta),
		put(RUN_ARTIFACTS.plan, plan),
		put(RUN_ARTIFACTS.patchFiles, files),
		put(RUN_ARTIFACTS.prior, state.findings),
		put(RUN_ARTIFACTS.relocated, relocated),
		put(RUN_ARTIFACTS.comments, comments),
		...messages,
		...readPatches,
	]);
	return {
		tier: plan.tier,
		specialists: Object.keys(plan.targets) as PrepareSummary["specialists"],
		files: files.length,
		reviewable: files.filter((file) => file.disposition === "reviewable")
			.length,
		notReviewed: plan.notReviewed.length,
		newComments: comments.length,
		fullReview: plan.fullReview,
	};
}

export async function postPlaceholder(
	ctx: RunCtx,
	fullReview: boolean,
): Promise<void> {
	if (!canPostStatusNotes(ctx)) return;
	const meta = await getRunArtifact<RunMeta>(
		ctx.env.DOCS_FLUE_BUCKET,
		ctx.params.number,
		ctx.runId,
		RUN_ARTIFACTS.meta,
	);
	if (!meta) throw new Error("Missing run metadata");
	const token = await getInstallationToken(ctx.env as Record<string, string>);
	const existing = findBotReviewComment(
		await getIssueComments(token, ctx.params.number),
		meta.commentId,
	);
	const body = renderPending(meta.pr.headSha, existing?.body ?? undefined, {
		fullReview,
	});
	let commentId = existing?.id;
	if (commentId) await updateIssueComment(token, commentId, body);
	else commentId = await createIssueComment(token, ctx.params.number, body);
	if (!commentId)
		throw new Error("Could not locate created placeholder comment");
	await putRunArtifact(
		ctx.env.DOCS_FLUE_BUCKET,
		ctx.params.number,
		ctx.runId,
		RUN_ARTIFACTS.meta,
		{ ...meta, commentId },
	);
	// Replays own no review state; the run artifact carries the ID to publish.
	if (ctx.params.replay) return;
	await updateState(ctx.env.DOCS_FLUE_BUCKET, ctx.params.number, (state) =>
		isActiveRun(state, ctx.runId) ? { ...state, commentId } : state,
	);
}

export { emptyState };
