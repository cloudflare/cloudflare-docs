/**
 * Code review orchestrator
 *
 * Coordinates specialist review agents for a pull request, reconciles their
 * findings against the review history and human comments, then renders a
 * single review comment.
 *
 * Behavior is controlled by the DOCS_FLUE_REVIEW_MODE env var:
 *   "log"     — (default) fetch context, run agents, log the rendered comment.
 *               Does NOT mutate GitHub.
 *   "comment" — create or update the single bot review comment on the PR.
 *
 * POST /workflows/code-review-orchestrator
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { createAgent } from "@flue/runtime";
import reconcileSkill from "../.agents/skills/reconcile-code-review/SKILL.md" with { type: "skill" };
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import {
	addReactionToComment,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	postComment,
	removeReactionFromComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "../lib/github";
import type {
	StyleGuideFinding,
	StyleGuideResult,
} from "../lib/style-guide-results";
import type {
	CodeReviewFinding,
	CodeReviewResult,
} from "../lib/code-review-results";
import { getInternalHeaders } from "../lib/internal-auth";
import { admitWorkflow, pollRun } from "../lib/poll-run";
import { toReviewSpecialistPrMeta } from "../lib/review-specialist";
import {
	BOT_COMMENT_MARKER,
	type DiffMode,
	extractReviewedHeadSha,
	getAutoReviewCount,
	isReviewLimitIgnored,
	markAutoReviewCompleted,
	partitionComments,
} from "../lib/code-review-state";
import {
	ReconcileResultSchema,
	type ReconcileResult,
	renderComment,
	renderFailureComment,
	renderPendingComment,
	renderReviewLimitComment,
} from "../lib/code-review-render";

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

export async function run({ id: runId, init, payload, env, req }: FlueContext) {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, string & unknown>;

	const reviewMode =
		(typedEnv.DOCS_FLUE_REVIEW_MODE as string | undefined) ?? "log";
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
	const loader = typedEnv.LOADER as unknown as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const workspace = getDefaultWorkspace();

	// ── Auto-review limit check ────────────────────────────────────────────────
	// Automatic reviews are capped at 2 per PR. Codeowner commands bypass this,
	// and the /ignore-review-limit command permanently lifts the cap for the PR.
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
				// Only post if not already showing the paused message
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
				mode: reviewMode,
				active: 0,
				ignored: 0,
				resolved: 0,
				summary: "Auto-review limit reached.",
				commentBody: null,
			};
		}
		// Note: the auto-review counter is incremented on *successful completion*
		// (see markAutoReviewCompleted below), not here — so interrupted or failed
		// runs never burn a slot.
	}

	const token = await getInstallationToken(typedEnv as Record<string, string>);

	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
		skills: [reconcileSkill],
	}));
	const harness = await init(agent);

	// console.log({
	// 	message: `Code review started: PR #${input.number}`,
	// 	event: "code_review_orchestrator",
	// 	number: input.number,
	// 	mode: reviewMode,
	// 	runId,
	// 	action: "started",
	// });

	// ── 1. Gather PR review context ────────────────────────────────────────────
	const [allComments, pr] = await Promise.all([
		getIssueComments(token, input.number),
		getPullRequest(token, input.number),
	]);
	const { botComment, humanCommentsAfterBot } = partitionComments(allComments);

	const currentHeadSha = pr.head.sha;

	// Session key is scoped to PR + head SHA so each new commit gets a fresh
	// context. Re-runs for the same SHA reuse the session (enabling the
	// reconciler to work correctly across retries). In log mode, also scope by
	// runId so local test runs never share state.
	const sessionKey =
		reviewMode === "log" || input.forceFullReview
			? `code-review-orchestrator:${input.number}:${runId}`
			: `code-review-orchestrator:${input.number}:${currentHeadSha}`;
	const session = await harness.session(sessionKey);

	// forceFullReview: wipe all previous review JSONs so reconciler starts fresh
	if (input.forceFullReview) {
		const prPrefix = `diffs/pr-${input.number}/`;
		const existing = await bucket.list({ prefix: prPrefix });
		await Promise.all(
			existing.objects
				.filter((o) => o.key.match(/review-[0-9a-f]+\.json$/))
				.map((o) => bucket.delete(o.key)),
		);
		// console.log({
		// 	message: `Full review forced: cleared previous review JSONs for PR #${input.number}`,
		// 	event: "code_review_orchestrator",
		// 	number: input.number,
		// 	runId,
		// 	action: "full_review_forced",
		// });
	}

	const previousReviewedSha = input.forceFullReview
		? null
		: extractReviewedHeadSha(botComment?.body ?? null);

	// Determine diff mode: incremental if we have a prior reviewed SHA that
	// differs from the current head; full otherwise. The orchestrator no longer
	// fetches the file list — each specialist self-fetches its own diff from
	// this descriptor and self-heals to a full diff if the base SHA is gone.
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

	// prDir is the R2 key prefix for the cross-run review-state objects.
	const prDir = `diffs/pr-${input.number}`;

	// ── 2. Post the placeholder comment ──────────────────────────────────────
	// In comment mode, immediately post/update with a "review in progress"
	// message so the reviewer sees something right away.
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

	// ── 3. Dispatch both specialist workflows and poll them in parallel ────────
	// Each specialist runs in its own Durable Object (its own isolate and memory
	// budget), so the two heavy fan-outs never share one isolate. They run
	// concurrently here; one failing degrades that section to an empty result
	// rather than aborting the whole review. Only a double failure surfaces an
	// error. Specialists self-fetch their own diff — no diff is sent in the
	// payload or staged in R2.
	const baseUrl = new URL(req!.url).origin;
	const internalHeaders = getInternalHeaders(
		typedEnv as Record<string, string>,
	);
	const specialistPayloadPr = toReviewSpecialistPrMeta(pr);
	const specialistBody = {
		eventType: "pull_request" as const,
		number: input.number,
		headSha: currentHeadSha,
		diffMode,
		pr: specialistPayloadPr,
		...(input.forceReviewMode
			? { forceReviewMode: input.forceReviewMode }
			: {}),
	};

	console.log({
		message: `Review dispatch: PR #${input.number} — admitting code-review and style-guide specialists (${diffMode.type} diff)`,
		event: "code_review_orchestrator",
		number: input.number,
		diffMode: diffMode.type,
		runId,
		action: "specialists_dispatch",
	});

	// Admit both specialists concurrently.
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

	// Poll an admitted specialist to completion. Never throws — returns an
	// ok/result outcome the caller maps to a review section.
	const pollSpecialist = async <T>(
		admit: AdmitOutcome,
		label: string,
	): Promise<{ ok: true; result: T } | { ok: false; reason: string }> => {
		if (!admit.ok) return { ok: false, reason: admit.reason };

		const poll = await pollRun<T>({
			runId: admit.runId,
			baseUrl,
			headers: internalHeaders,
			// Generous: a large code review is many multi-turn agent sessions with
			// slow model calls (p90 ~45s/call). Specialists run in their own DO via
			// durable execution, so a long poll only holds this lightweight loop.
			timeoutMs: 20 * 60 * 1000,
			label: `${label} PR #${input.number}`,
		});

		if (poll.timedOut) return { ok: false, reason: "specialist timed out" };
		if (poll.isError)
			return { ok: false, reason: poll.error?.message ?? "specialist errored" };
		if (poll.result === undefined)
			return { ok: false, reason: "specialist returned no result" };
		return { ok: true, result: poll.result };
	};

	const [codeOutcome, styleOutcome] = await Promise.all([
		pollSpecialist<CodeReviewResult>(codeAdmit, "code-review"),
		pollSpecialist<StyleGuideResult>(styleAdmit, "style-guide"),
	]);

	if (codeOutcome.ok) {
		console.log({
			message: `Code review returned: PR #${input.number} — ${codeOutcome.result.findings.length} finding(s) across ${codeOutcome.result.reviewedFiles.length} file(s)`,
			event: "code_review_orchestrator",
			number: input.number,
			findings: codeOutcome.result.findings.length,
			reviewedFiles: codeOutcome.result.reviewedFiles.length,
			runId,
			action: "code_review_complete",
		});
	} else {
		console.log({
			message: `Code review failed: PR #${input.number} — ${codeOutcome.reason}`,
			event: "code_review_orchestrator",
			number: input.number,
			error: codeOutcome.reason,
			runId,
			action: "code_review_failed",
		});
	}

	if (styleOutcome.ok) {
		console.log({
			message: `Style-guide review returned: PR #${input.number} — ${styleOutcome.result.findings.length} finding(s) across ${styleOutcome.result.reviewedFiles.length} file(s)`,
			event: "code_review_orchestrator",
			number: input.number,
			findings: styleOutcome.result.findings.length,
			reviewedFiles: styleOutcome.result.reviewedFiles.length,
			runId,
			action: "style_guide_complete",
		});
	} else {
		console.log({
			message: `Style-guide review failed: PR #${input.number} — ${styleOutcome.reason}`,
			event: "code_review_orchestrator",
			number: input.number,
			error: styleOutcome.reason,
			runId,
			action: "style_guide_failed",
		});
	}

	// Both reviews failed — surface a failure comment rather than falsely
	// claiming no issues were found, and stop.
	if (!codeOutcome.ok && !styleOutcome.ok) {
		if (reviewMode === "comment") {
			const failureComment = renderFailureComment(currentHeadSha);
			try {
				let targetComment = botComment;
				if (targetComment === null) {
					const freshComments = await getIssueComments(token, input.number);
					targetComment =
						freshComments.findLast((c) =>
							c.body?.includes(BOT_COMMENT_MARKER),
						) ?? null;
				}
				await postOrUpdateComment(
					token,
					input.number,
					targetComment,
					failureComment,
				);
			} catch (postErr) {
				console.log({
					message: `Failed to post failure comment: PR #${input.number}`,
					event: "code_review_orchestrator",
					number: input.number,
					error: postErr instanceof Error ? postErr.message : String(postErr),
					runId,
					action: "failure_comment_post_failed",
				});
			}
		}
		return {
			mode: reviewMode,
			active: 0,
			ignored: 0,
			resolved: 0,
			summary: "Review failed.",
			commentBody: null,
		};
	}

	// A failed review degrades to an empty result with no reviewedFiles, so the
	// reconciler will not falsely resolve its prior findings.
	const codeReviewResult: CodeReviewResult = codeOutcome.ok
		? codeOutcome.result
		: { findings: [], summary: "Code review failed.", reviewedFiles: [] };
	const styleGuideResult: StyleGuideResult = styleOutcome.ok
		? styleOutcome.result
		: {
				findings: [],
				summary: "Style-guide review failed.",
				reviewedFiles: [],
			};

	// ── 4. Reconcile findings with review history and human comments ───────────
	// Load previous findings from R2 (structured) rather than parsing the
	// comment. The stored shape is `{ code, style }`; legacy keys hold a bare
	// array (style-guide findings only) and are still honored.
	const previousReviewKey = previousReviewedSha
		? `${prDir}/review-${previousReviewedSha}.json`
		: null;
	let previousCodeFindings: CodeReviewFinding[] = [];
	let previousStyleFindings: StyleGuideFinding[] = [];
	if (previousReviewKey) {
		try {
			const obj = await bucket.get(previousReviewKey);
			if (obj) {
				const parsed = JSON.parse(await obj.text());
				if (Array.isArray(parsed)) {
					previousStyleFindings = parsed as StyleGuideFinding[];
				} else {
					previousCodeFindings = (parsed.code ?? []) as CodeReviewFinding[];
					previousStyleFindings = (parsed.style ?? []) as StyleGuideFinding[];
				}
			}
		} catch {
			// Non-fatal — fall back to empty previous findings
		}
	}

	// Reconcile one review stream (code or style) against its own previous
	// findings. Both streams see the same human comments. When there is nothing
	// to reconcile against, pass the findings through deterministically.
	const reconcileStream = async (
		streamLabel: "code" | "style",
		currentFindings: (CodeReviewFinding | StyleGuideFinding)[],
		reviewedFiles: string[],
		previousFindings: (CodeReviewFinding | StyleGuideFinding)[],
		fallbackSummary: string,
	): Promise<ReconcileResult> => {
		const needsReconciliation =
			previousFindings.length > 0 || humanCommentsAfterBot.length > 0;

		if (!needsReconciliation) {
			return {
				active: currentFindings,
				ignored_by_reviewer: [],
				resolved: [],
				summary: fallbackSummary,
			};
		}

		const { data } = await session.skill("reconcile-code-review", {
			model: "cloudflare/@cf/zai-org/glm-4.7-flash",
			args: {
				pullRequest: { number: input.number },
				currentFindings,
				reviewedFiles,
				previousFindings,
				humanComments: humanCommentsAfterBot.map((c) => ({
					author: c.user?.login ?? "unknown",
					created_at: c.created_at,
					body: c.body ?? "",
				})),
				diffMode,
			},
			result: ReconcileResultSchema,
		});

		const reconciled = data ?? {
			active: currentFindings,
			ignored_by_reviewer: [],
			resolved: [],
			summary: fallbackSummary,
		};

		console.log({
			message: `Reconciliation complete (${streamLabel}): PR #${input.number} — ${reconciled.active.length} active, ${reconciled.ignored_by_reviewer.length} ignored, ${reconciled.resolved.length} resolved`,
			event: "code_review_orchestrator",
			number: input.number,
			stream: streamLabel,
			active: reconciled.active.length,
			ignored: reconciled.ignored_by_reviewer.length,
			resolved: reconciled.resolved.length,
			reconciliation_used_fallback: data === undefined,
			runId,
			action: "reconciliation_complete",
		});

		return reconciled;
	};

	const reconciledCode = await reconcileStream(
		"code",
		codeReviewResult.findings,
		codeReviewResult.reviewedFiles,
		previousCodeFindings,
		codeReviewResult.findings.length === 0
			? "No code review issues found."
			: `${codeReviewResult.findings.length} finding(s); no prior review to reconcile against.`,
	);
	const reconciledStyle = await reconcileStream(
		"style",
		styleGuideResult.findings,
		styleGuideResult.reviewedFiles,
		previousStyleFindings,
		styleGuideResult.findings.length === 0
			? "No style-guide issues found."
			: `${styleGuideResult.findings.length} finding(s); no prior review to reconcile against.`,
	);

	// ── 5. Persist findings to R2 for future reconciliation ───────────────────
	const currentReviewKey = `${prDir}/review-${currentHeadSha}.json`;
	await bucket.put(
		currentReviewKey,
		JSON.stringify({
			code: reconciledCode.active,
			style: reconciledStyle.active,
		}),
	);

	// ── 6. Render the review comment ───────────────────────────────────────────
	const commentBody = renderComment(
		{
			code: reconciledCode,
			style: reconciledStyle,
			codeFailed: !codeOutcome.ok,
			styleFailed: !styleOutcome.ok,
			codeMode: codeOutcome.ok ? codeOutcome.result.reviewMode : undefined,
		},
		currentHeadSha,
		input.forceFullReview,
	);

	// ── 7. Log or post ─────────────────────────────────────────────────────────
	const totalActive =
		reconciledCode.active.length + reconciledStyle.active.length;
	const totalIgnored =
		reconciledCode.ignored_by_reviewer.length +
		reconciledStyle.ignored_by_reviewer.length;
	const totalResolved =
		reconciledCode.resolved.length + reconciledStyle.resolved.length;
	const combinedSummary = `Code review: ${reconciledCode.summary} Style guide: ${reconciledStyle.summary}`;

	if (reviewMode === "log") {
		console.log({
			message: `Review complete (log mode): PR #${input.number} — ${totalActive} active, ${totalIgnored} ignored, ${totalResolved} resolved`,
			event: "code_review_orchestrator",
			number: input.number,
			mode: reviewMode,
			active: totalActive,
			ignored: totalIgnored,
			resolved: totalResolved,
			codeActive: reconciledCode.active.length,
			styleActive: reconciledStyle.active.length,
			runId,
			action: "complete_log_mode",
			commentBody,
		});
	} else {
		// Update the placeholder comment with the final review.
		// botComment may have been created or updated in step 2 — re-fetch to
		// get the latest comment id if we didn't have one before.
		let targetComment = botComment;
		if (targetComment === null) {
			const freshComments = await getIssueComments(token, input.number);
			targetComment =
				freshComments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ??
				null;
		}
		await postOrUpdateComment(token, input.number, targetComment, commentBody);

		// Swap 👀 → 👍 on the /full-review trigger comment if applicable
		if (input.triggerCommentId) {
			if (input.triggerEyesReactionId) {
				await removeReactionFromComment(
					token,
					input.triggerCommentId,
					input.triggerEyesReactionId,
				).catch(() => {}); // non-fatal
			}
			await addReactionToComment(token, input.triggerCommentId, "+1").catch(
				() => {},
			); // non-fatal
		}

		console.log({
			message: `Review comment updated with final review: PR #${input.number}`,
			event: "code_review_orchestrator",
			number: input.number,
			mode: reviewMode,
			active: totalActive,
			ignored: totalIgnored,
			resolved: totalResolved,
			runId,
			action: "complete_comment_posted",
		});
	}

	// Count this toward the auto-review cap only on successful completion (not at
	// the start), and only for automatic runs — so interrupted/failed runs and
	// codeowner-bypassed runs never burn a slot.
	if (!input.bypassReviewLimit) {
		await markAutoReviewCompleted(bucket, input.number, currentHeadSha).catch(
			() => {},
		);
	}

	return {
		mode: reviewMode,
		active: totalActive,
		ignored: totalIgnored,
		resolved: totalResolved,
		summary: combinedSummary,
		commentBody,
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
