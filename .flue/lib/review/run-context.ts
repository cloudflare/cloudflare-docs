import type { ReviewWorkflowParams } from "./start";
import type {
	ActiveRun,
	ReviewRunSummary,
	ReviewTier,
	Specialist,
	SpecialistRunSummary,
} from "./types";

/**
 * Shared contract between the review Workflow wiring (cloudflare.ts) and the
 * step functions in run-start.ts / run-finish.ts. Step functions take a
 * RunCtx, do their own I/O (GitHub, R2), and return only small JSON values:
 * Workflow step results must stay far below 1 MiB, so anything large moves
 * between steps as a run artifact.
 */

export type ReviewMode = "log" | "comment";

export interface ReviewRunEnv {
	DOCS_FLUE_BUCKET: R2Bucket;
	DOCS_FLUE_REVIEW_MODE?: string;
	DOCS_FLUE_REVIEW_DEBOUNCE_SECONDS?: string;
	REVIEW_ORCHESTRATOR: Workflow<ReviewWorkflowParams>;
	/** GitHub App credentials and other string vars. */
	[key: string]: unknown;
}

export interface RunCtx {
	env: ReviewRunEnv;
	params: ReviewWorkflowParams;
	/** Workflow instance id; also the run artifact namespace. */
	runId: string;
	mode: ReviewMode;
}

export function reviewMode(env: ReviewRunEnv): ReviewMode {
	return env.DOCS_FLUE_REVIEW_MODE === "comment" ? "comment" : "log";
}

/** Whether a run writes the in-progress and failure notes to the PR comment. */
export function canPostStatusNotes(ctx: RunCtx): boolean {
	return ctx.mode === "comment";
}

export type AgentKey = Specialist | "judge";

/** Durable agent instance id for one run. */
export function agentInstanceId(runId: string, key: AgentKey): string {
	return `${runId}:${key}`;
}

/**
 * Run artifact names, stored as JSON via putRunArtifact/getRunArtifact.
 * read_patch file artifacts use readPatchArtifactName(path) from agent-input.ts.
 */
export const RUN_ARTIFACTS = {
	/** RunMeta */
	meta: "meta.json",
	/** ReviewPlan */
	plan: "plan.json",
	/** PatchFile[] (all classified files, including non-reviewable) */
	patchFiles: "patch-files.json",
	/** TrackedFinding[]: state findings (active + dismissed) at prepare time */
	prior: "prior.json",
	/** { untouched: TrackedFinding[]; touched: TrackedFinding[] } */
	relocated: "relocated.json",
	/** EligibleComment[] newer than state.commentsSeenThrough */
	comments: "comments.json",
	/** string: buildSpecialistMessage / buildJudgeMessage output */
	message: (key: AgentKey) => `messages/${key}.json`,
	/** Finding[] accepted by acceptSpecialistFindings */
	findings: (specialist: Specialist) => `findings/${specialist}.json`,
	/** Return value of selectJudgeWork */
	judgeWork: "judge-work.json",
	/** RenderInput */
	renderInput: "render-input.json",
	/** { markdown: string }: rendered comment (always written; replays keep it) */
	comment: "comment.json",
} as const;

/** Written by prepare; read by later steps. */
export interface RunMeta {
	pr: {
		number: number;
		title: string;
		body: string;
		author: string;
		baseRef: string;
		baseSha: string;
		headSha: string;
	};
	/** Latest createdAt among all eligible comments seen (for commitRun). */
	commentsSeenThrough?: string;
	/** Bot comment id known at prepare time (state.commentId or marker search). */
	commentId?: number;
	startedAt: string;
}

// ---------------------------------------------------------------------------
// Step results (small, JSON-serializable)
// ---------------------------------------------------------------------------

export interface AdmitResult {
	proceed: boolean;
	/** Why the run stopped: "closed" | "superseded" | "draft" | "auto_review_disabled" | ... */
	reason?: string;
	/** Older active run to terminate/abort (never set for replays). */
	superseded?: ActiveRun;
}

export interface PrepareSummary {
	tier: ReviewTier;
	/** Specialists with a target this run, in dispatch order. */
	specialists: Specialist[];
	files: number;
	reviewable: number;
	notReviewed: number;
	newComments: number;
	fullReview: boolean;
}

export interface JudgePrepSummary {
	judgeNeeded: boolean;
	newFindings: number;
	touched: number;
	suppressedDismissed: number;
}

export interface FinalizeSummary {
	/** False when the run lost ownership (superseded) before committing. */
	committed: boolean;
	findings: NonNullable<ReviewRunSummary["findings"]>;
}

export interface PublishResult {
	published: boolean;
	reason?: string;
}

export type SpecialistSummaries = Partial<
	Record<Specialist, SpecialistRunSummary>
>;
