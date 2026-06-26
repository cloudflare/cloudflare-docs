/**
 * Code review orchestrator — dispatch phase only
 *
 * Performs the limit check, posts the placeholder, decides the diff mode,
 * writes context to R2, and admits both specialists fire-and-forget. It does
 * NOT wait for the specialists. The finalize-review workflow (admitted by
 * whichever specialist finishes last) handles reconciliation, rendering, and
 * posting.
 *
 * This change removes the 20-minute specialist poll that caused stuck reviews
 * when the orchestrator's Durable Object was interrupted mid-wait (#31562).
 *
 * Behavior is controlled by the DOCS_FLUE_REVIEW_MODE env var:
 *   "log"     — (default) does not mutate GitHub (no comment posting).
 *   "comment" — creates or updates the single bot review comment on the PR.
 *
 * POST /workflows/code-review-orchestrator
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import {
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	postComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "../lib/github";
import { getInternalHeaders } from "../lib/internal-auth";
import { admitWorkflow } from "../lib/poll-run";
import { toReviewSpecialistPrMeta } from "../lib/review-specialist";
import {
	BOT_COMMENT_MARKER,
	type DiffMode,
	extractReviewedHeadSha,
	getAutoReviewCount,
	isReviewLimitIgnored,
	partitionComments,
} from "../lib/code-review-state";
import {
	renderPendingComment,
	renderReviewLimitComment,
} from "../lib/code-review-render";
import { writeContext } from "../lib/finalize-rendezvous";

export const route: WorkflowRouteHandler = async (_c, next) => next();

interface CodeReviewOrchestratorPayload {
	eventType: "pull_request";
	number: number;
	/** When true, ignore previous review state and run a full diff review. */
	forceFullReview?: boolean;
	/** When true, skip the automatic review count limit check (codeowner commands). */
	bypassReviewLimit?: boolean;
	/** Comment ID that triggered /full-review — used to swap 👀 to 👍 when done. */
	triggerCommentId?: number;
	/** Reaction ID of the 👀 reaction to remove when review completes. */
	triggerEyesReactionId?: number | null;
	/**
	 * When set by a codeowner slash command (/fan-out-review or /holistic-review),
	 * overrides the size-based routing in the code-review specialist.
	 */
	forceReviewMode?: "fan-out" | "holistic";
}

export async function run({
	id: runId,
	payload,
	env,
	req,
}: FlueContext): Promise<Record<string, unknown>> {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, string & unknown>;

	const reviewMode =
		(typedEnv.DOCS_FLUE_REVIEW_MODE as string | undefined) ?? "log";
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;

	// ── Auto-review limit check ────────────────────────────────────────────────
	if (!input.bypassReviewLimit) {
		const [autoReviewCount, limitIgnored] = await Promise.all([
			getAutoReviewCount(bucket, input.number),
			isReviewLimitIgnored(bucket, input.number),
		]);
		if (autoReviewCount >= 2 && !limitIgnored) {
			console.log({
				message: `Auto-review limit reached: PR #${input.number} — ${autoReviewCount} reviews already run`,
				event: "code_review_orchestrator",
				number: input.number,
				runId,
				action: "auto_review_limit_reached",
			});

			if (reviewMode === "comment") {
				const token = await getInstallationToken(
					typedEnv as Record<string, string>,
				);
				const allComments = await getIssueComments(token, input.number);
				const botComment =
					allComments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ??
					null;
				const alreadyPaused = botComment?.body?.includes(
					"Automatic reviews for this PR are paused",
				);
				if (!alreadyPaused) {
					await postOrUpdateComment(
						token,
						input.number,
						botComment,
						renderReviewLimitComment(botComment?.body ?? undefined),
					);
				}
			}

			return {
				dispatched: false,
				reason: "auto_review_limit_reached",
			};
		}
	}

	const token = await getInstallationToken(typedEnv as Record<string, string>);

	// ── 1. Gather PR context ───────────────────────────────────────────────────
	const [allComments, pr] = await Promise.all([
		getIssueComments(token, input.number),
		getPullRequest(token, input.number),
	]);
	const { botComment, humanCommentsAfterBot } = partitionComments(allComments);
	const currentHeadSha = pr.head.sha;

	// forceFullReview: wipe all previous review JSONs so the reconciler starts fresh.
	if (input.forceFullReview) {
		const prPrefix = `diffs/pr-${input.number}/`;
		const existing = await bucket.list({ prefix: prPrefix });
		await Promise.all(
			existing.objects
				.filter((o) => o.key.match(/review-[0-9a-f]+\.json$/))
				.map((o) => bucket.delete(o.key)),
		);
	}

	const previousReviewedSha = input.forceFullReview
		? null
		: extractReviewedHeadSha(botComment?.body ?? null);

	const diffMode: DiffMode =
		!input.forceFullReview &&
		previousReviewedSha &&
		previousReviewedSha !== currentHeadSha
			? {
					type: "incremental",
					fromSha: previousReviewedSha,
					toSha: currentHeadSha,
				}
			: { type: "full" };

	// ── 2. Post the placeholder ────────────────────────────────────────────────
	if (reviewMode === "comment") {
		await postOrUpdateComment(
			token,
			input.number,
			botComment,
			renderPendingComment(
				currentHeadSha,
				botComment !== null,
				input.forceFullReview,
				botComment?.body ?? undefined,
			),
		);
	}

	// ── 3. Write context to R2 ─────────────────────────────────────────────────
	// dispatchId = this run's id, scoping the rendezvous so concurrent
	// dispatches on the same head SHA don't collide.
	const baseUrl = new URL(req!.url).origin;

	await writeContext(bucket, {
		prNumber: input.number,
		headSha: currentHeadSha,
		dispatchId: runId,
		baseUrl,
		diffMode,
		forceFullReview: input.forceFullReview ?? false,
		bypassReviewLimit: input.bypassReviewLimit ?? false,
		reviewMode,
		previousReviewedSha,
		triggerCommentId: input.triggerCommentId,
		triggerEyesReactionId: input.triggerEyesReactionId,
		humanComments: humanCommentsAfterBot.map((c) => ({
			author: c.user?.login ?? "unknown",
			created_at: c.created_at,
			body: c.body ?? "",
		})),
	});

	// ── 4. Admit both specialists fire-and-forget ──────────────────────────────
	const internalHeaders = getInternalHeaders(
		typedEnv as Record<string, string>,
	);
	const specialistBody = {
		eventType: "pull_request" as const,
		number: input.number,
		headSha: currentHeadSha,
		diffMode,
		pr: toReviewSpecialistPrMeta(pr),
		dispatchId: runId,
		baseUrl,
		...(input.forceReviewMode
			? { forceReviewMode: input.forceReviewMode }
			: {}),
	};

	type AdmitOutcome =
		| { ok: true; runId: string }
		| { ok: false; reason: string };
	const admitSpecialist = async (pathname: string): Promise<AdmitOutcome> => {
		try {
			const id = await admitWorkflow({
				baseUrl,
				pathname,
				headers: internalHeaders,
				body: specialistBody,
			});
			return { ok: true, runId: id };
		} catch (err) {
			return {
				ok: false,
				reason: err instanceof Error ? err.message : String(err),
			};
		}
	};

	const [codeAdmit, styleAdmit] = await Promise.all([
		admitSpecialist("/workflows/code-review-specialist"),
		admitSpecialist("/workflows/style-guide-specialist"),
	]);

	console.log({
		message: `Review dispatch: PR #${input.number} — specialists admitted (${diffMode.type} diff)`,
		event: "code_review_orchestrator",
		number: input.number,
		diffMode: diffMode.type,
		codeRunId: codeAdmit.ok ? codeAdmit.runId : null,
		styleRunId: styleAdmit.ok ? styleAdmit.runId : null,
		codeAdmitOk: codeAdmit.ok,
		styleAdmitOk: styleAdmit.ok,
		runId,
		action: "specialists_dispatched",
	});

	if (!codeAdmit.ok) {
		console.log({
			message: `Code-review specialist admit failed: PR #${input.number} — ${(codeAdmit as { ok: false; reason: string }).reason}`,
			event: "code_review_orchestrator",
			number: input.number,
			error: (codeAdmit as { ok: false; reason: string }).reason,
			runId,
			action: "code_admit_failed",
		});
	}
	if (!styleAdmit.ok) {
		console.log({
			message: `Style-guide specialist admit failed: PR #${input.number} — ${(styleAdmit as { ok: false; reason: string }).reason}`,
			event: "code_review_orchestrator",
			number: input.number,
			error: (styleAdmit as { ok: false; reason: string }).reason,
			runId,
			action: "style_admit_failed",
		});
	}

	return {
		dispatched: true,
		headSha: currentHeadSha,
		diffMode: diffMode.type,
		codeAdmitOk: codeAdmit.ok,
		styleAdmitOk: styleAdmit.ok,
	};
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function parsePayload(payload: unknown): CodeReviewOrchestratorPayload {
	const input = payload as Partial<CodeReviewOrchestratorPayload>;
	if (input.eventType !== "pull_request" || typeof input.number !== "number") {
		throw new Error(
			'[flue] code-review-orchestrator requires payload { eventType: "pull_request", number: number }.',
		);
	}
	return {
		eventType: input.eventType,
		number: input.number,
		forceFullReview: input.forceFullReview === true,
		bypassReviewLimit: input.bypassReviewLimit === true,
		triggerCommentId:
			typeof input.triggerCommentId === "number"
				? input.triggerCommentId
				: undefined,
		triggerEyesReactionId:
			typeof input.triggerEyesReactionId === "number"
				? input.triggerEyesReactionId
				: null,
		forceReviewMode:
			input.forceReviewMode === "fan-out" ||
			input.forceReviewMode === "holistic"
				? input.forceReviewMode
				: undefined,
	};
}

async function postOrUpdateComment(
	token: string,
	prNumber: number,
	existingBotComment: GitHubIssueComment | null,
	body: string,
): Promise<void> {
	if (existingBotComment) {
		await updateIssueComment(token, existingBotComment.id, body);
	} else {
		await postComment(token, prNumber, body);
	}
}
