/**
 * Code review orchestrator — dispatch phase only
 *
 * Performs the limit check, posts the placeholder, decides the diff mode,
 * writes context to R2, and admits all three specialists fire-and-forget. It
 * does NOT wait for the specialists. The finalize-review workflow (admitted
 * by whichever specialist finishes last via the R2 rendezvous lock) handles
 * reconciliation, rendering, and posting.
 *
 * Specialist streams: code, style, conventions.
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
} from "../lib/github";
import { getInternalHeaders } from "../lib/internal-auth";
import { admitWorkflow } from "../lib/poll-run";
import { toReviewSpecialistPrMeta } from "../lib/review-specialist";
import {
	BOT_COMMENT_MARKER,
	type DiffMode,
	extractReviewedHeadSha,
	getAutoReviewCount,
	isAutoReviewDisabled,
	isReviewLimitIgnored,
	partitionComments,
} from "../lib/code-review-state";
import {
	postOrUpdateComment,
	renderPendingComment,
	renderReviewLimitComment,
} from "../lib/code-review-render";
import {
	EXPECTED_STREAMS,
	writeContext,
	writeStreamResult,
	degradedCodeResult,
	degradedStyleResult,
	degradedConventionsResult,
	tryClaimFinalize,
} from "../lib/finalize-rendezvous";

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

	// ── Auto-review disabled check ────────────────────────────────────────────
	// If a codeowner has run /disable-auto-review, suppress push-triggered
	// reviews. Codeowner slash commands (bypassReviewLimit=true) still work.
	if (!input.bypassReviewLimit) {
		const disabled = await isAutoReviewDisabled(bucket, input.number);
		if (disabled) {
			console.log({
				message: `Auto-review suppressed: PR #${input.number} — auto-review is disabled`,
				event: "code_review_orchestrator",
				number: input.number,
				runId,
				action: "auto_review_disabled",
			});
			return { dispatched: false, reason: "auto_review_disabled" };
		}
	}

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

	// ── 2. Derive baseUrl (needed for R2 context + specialist payloads) ──────────
	// Validate req before posting the placeholder so we never leave a stale
	// "review pending" comment if the request context is unexpectedly absent.
	if (!req) {
		throw new Error(
			"[flue] code-review-orchestrator: missing request context — cannot derive baseUrl",
		);
	}
	const baseUrl = new URL(req.url).origin;

	// ── 3. Post the placeholder ────────────────────────────────────────────────
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

	// ── 4. Write context to R2 ─────────────────────────────────────────────────
	// dispatchId = this run's id, scoping the rendezvous so concurrent
	// dispatches on the same head SHA don't collide.

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
		expectedStreams: [...EXPECTED_STREAMS],
	});

	// ── 5. Write crash-protection placeholders for all three streams ──────────
	// Written BEFORE the specialists are admitted so a key always exists even
	// if a specialist DO is evicted immediately after admission. Placeholders
	// have final:false so tryClaimFinalize ignores them — finalize only runs
	// once each specialist writes its own final:true result.
	await Promise.all([
		writeStreamResult(bucket, input.number, currentHeadSha, runId, "code", {
			ok: false,
			result: degradedCodeResult(),
			final: false,
		}),
		writeStreamResult(bucket, input.number, currentHeadSha, runId, "style", {
			ok: false,
			result: degradedStyleResult(),
			final: false,
		}),
		writeStreamResult(
			bucket,
			input.number,
			currentHeadSha,
			runId,
			"conventions",
			{
				ok: false,
				result: degradedConventionsResult(),
				final: false,
			},
		),
	]);

	// ── 6. Admit all three specialists fire-and-forget ─────────────────────────
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
		expectedStreams: [...EXPECTED_STREAMS],
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

	const [codeAdmit, styleAdmit, conventionsAdmit] = await Promise.all([
		admitSpecialist("/workflows/code-review-specialist"),
		admitSpecialist("/workflows/style-guide-specialist"),
		admitSpecialist("/workflows/conventions-specialist"),
	]);

	console.log({
		message: `Review dispatch: PR #${input.number} — specialists admitted (${diffMode.type} diff)`,
		event: "code_review_orchestrator",
		number: input.number,
		diffMode: diffMode.type,
		codeRunId: codeAdmit.ok ? codeAdmit.runId : null,
		styleRunId: styleAdmit.ok ? styleAdmit.runId : null,
		conventionsRunId: conventionsAdmit.ok ? conventionsAdmit.runId : null,
		codeAdmitOk: codeAdmit.ok,
		styleAdmitOk: styleAdmit.ok,
		conventionsAdmitOk: conventionsAdmit.ok,
		runId,
		action: "specialists_dispatched",
	});

	// For each failed admit, overwrite the crash-protection placeholder with a
	// final:true degraded result so the surviving specialists can still claim
	// the finalize lock. If all fail, claim the lock here and admit finalize
	// directly — nothing else will.
	const admitResults: Array<{
		admit: AdmitOutcome;
		stream: string;
		degraded: () => unknown;
		label: string;
	}> = [
		{
			admit: codeAdmit,
			stream: "code",
			degraded: degradedCodeResult,
			label: "Code-review",
		},
		{
			admit: styleAdmit,
			stream: "style",
			degraded: degradedStyleResult,
			label: "Style-guide",
		},
		{
			admit: conventionsAdmit,
			stream: "conventions",
			degraded: degradedConventionsResult,
			label: "Conventions",
		},
	];

	let anyFailed = false;
	let firstFailedStream = "";
	for (const { admit, stream, degraded, label } of admitResults) {
		if (!admit.ok) {
			anyFailed = true;
			if (!firstFailedStream) firstFailedStream = stream;
			console.log({
				message: `${label} specialist admit failed: PR #${input.number} — ${admit.reason}`,
				event: "code_review_orchestrator",
				number: input.number,
				error: admit.reason,
				stream,
				runId,
				action: "specialist_admit_failed",
			});
			await writeStreamResult(
				bucket,
				input.number,
				currentHeadSha,
				runId,
				stream,
				{
					ok: false,
					result: degraded(),
					final: true,
				},
			).catch(() => {});
		}
	}

	// If any admit failed, try to claim the finalize lock. In the all-fail case
	// all streams are final:true so the claim succeeds and finalize runs with
	// three degraded results. In a partial-fail case, surviving specialists write
	// final:true when they finish and the last one to do so claims the lock.
	if (anyFailed) {
		try {
			const won = await tryClaimFinalize(
				bucket,
				input.number,
				currentHeadSha,
				runId,
				firstFailedStream,
				[...EXPECTED_STREAMS],
			);
			if (won) {
				await admitWorkflow({
					baseUrl,
					pathname: "/workflows/finalize-review",
					headers: internalHeaders,
					body: {
						eventType: "pull_request",
						number: input.number,
						headSha: currentHeadSha,
						dispatchId: runId,
					},
				});
				console.log({
					message: `Orchestrator admitted finalize-review after specialist admit failure: PR #${input.number}`,
					event: "code_review_orchestrator",
					number: input.number,
					runId,
					action: "orchestrator_finalize_admitted",
				});
			}
		} catch (err) {
			console.log({
				message: `Orchestrator failed to admit finalize-review after specialist failure: PR #${input.number} — ${err instanceof Error ? err.message : String(err)}`,
				event: "code_review_orchestrator",
				number: input.number,
				error: err instanceof Error ? err.message : String(err),
				runId,
				action: "orchestrator_finalize_admit_failed",
			});
		}
	}

	return {
		dispatched: codeAdmit.ok || styleAdmit.ok || conventionsAdmit.ok,
		headSha: currentHeadSha,
		diffMode: diffMode.type,
		codeAdmitOk: codeAdmit.ok,
		styleAdmitOk: styleAdmit.ok,
		conventionsAdmitOk: conventionsAdmit.ok,
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
	};
}
