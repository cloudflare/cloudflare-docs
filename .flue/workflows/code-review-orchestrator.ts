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
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import {
	addReactionToComment,
	comparePullRequestHeads,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	getPullRequestFiles,
	postComment,
	removeReactionFromComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "../lib/github";
import { getInternalHeaders } from "../lib/internal-auth";
import {
	dispatchStyleGuideReview,
	mergeStyleGuideResults,
	selectStyleGuideFiles,
	STYLE_GUIDE_CONCURRENCY,
	withConcurrency,
} from "../lib/style-guide-fanout";
import type {
	StyleGuideFinding,
	StyleGuideResult,
} from "../lib/style-guide-results";
import { writeDiffToR2 } from "../lib/code-review-diff";
import {
	BOT_COMMENT_MARKER,
	type DiffMode,
	extractReviewedHeadSha,
	getAutoReviewCount,
	incrementAutoReviewCount,
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
	// Automatic reviews are capped at 2 per PR. Codeowner commands bypass this.
	if (!input.bypassReviewLimit) {
		const autoReviewCount = await getAutoReviewCount(bucket, input.number);
		if (autoReviewCount >= 2) {
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
		// Increment before running so a mid-run failure counts as a used review
		await incrementAutoReviewCount(bucket, input.number, autoReviewCount);
	}

	const token = await getInstallationToken(typedEnv as Record<string, string>);

	// Write reconciler skill from R2 into workspace at request time
	const reconcileSkillObj = await bucket.get(
		".agents/skills/reconcile-code-review/SKILL.md",
	);
	if (!reconcileSkillObj) {
		throw new Error(
			"Missing .agents/skills/reconcile-code-review/SKILL.md in DOCS_FLUE_BUCKET. " +
				"For local dev, run `pnpm run flue:sync-agents:local` before invoking the workflow.",
		);
	}
	if (reconcileSkillObj) {
		await workspace.mkdir("/.agents/skills/reconcile-code-review", {
			recursive: true,
		});
		await workspace.writeFile(
			"/.agents/skills/reconcile-code-review/SKILL.md",
			await reconcileSkillObj.text(),
		);
	}

	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
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
	// differs from the current head; full otherwise.
	let diffMode: DiffMode;
	let allFiles: Awaited<ReturnType<typeof getPullRequestFiles>>;

	if (
		!input.forceFullReview &&
		previousReviewedSha &&
		previousReviewedSha !== currentHeadSha
	) {
		// Attempt incremental diff — commits since last review
		const compare = await comparePullRequestHeads(
			token,
			previousReviewedSha,
			currentHeadSha,
		);

		if (compare) {
			diffMode = {
				type: "incremental",
				fromSha: previousReviewedSha,
				toSha: currentHeadSha,
			};
			allFiles = compare.files;
			// console.log({
			// 	message: `Code review using incremental diff: PR #${input.number} — ${previousReviewedSha.slice(0, 7)}...${currentHeadSha.slice(0, 7)}, ${allFiles.length} file(s) changed`,
			// 	event: "code_review_orchestrator",
			// 	number: input.number,
			// 	diff_mode: "incremental",
			// 	from_sha: previousReviewedSha,
			// 	to_sha: currentHeadSha,
			// 	files: allFiles.length,
			// 	runId,
			// 	action: "diff_mode_resolved",
			// });
		} else {
			// Base SHA gone (force-push) — fall back to full PR diff
			diffMode = { type: "full" };
			allFiles = await getPullRequestFiles(token, input.number);
			// console.log({
			// 	message: `Code review falling back to full diff (base SHA not found): PR #${input.number}`,
			// 	event: "code_review_orchestrator",
			// 	number: input.number,
			// 	diff_mode: "full",
			// 	fallback_reason: "base_sha_not_found",
			// 	to_sha: currentHeadSha,
			// 	files: allFiles.length,
			// 	runId,
			// 	action: "diff_mode_resolved",
			// });
		}
	} else {
		// No previous review or SHA unchanged — full PR diff
		diffMode = { type: "full" };
		allFiles = await getPullRequestFiles(token, input.number);
		// console.log({
		// 	message: `Code review using full diff: PR #${input.number} — ${allFiles.length} file(s)`,
		// 	event: "code_review_orchestrator",
		// 	number: input.number,
		// 	diff_mode: "full",
		// 	to_sha: currentHeadSha,
		// 	had_previous_review: previousReviewedSha !== null,
		// 	files: allFiles.length,
		// 	runId,
		// 	action: "diff_mode_resolved",
		// });
	}

	// console.log({
	// 	message: `Code review context fetched: PR #${input.number} — ${allFiles.length} file(s) in diff, ${allComments.length} comment(s), prior bot review: ${botComment ? "yes" : "no"}, human replies: ${humanCommentsAfterBot.length}`,
	// 	event: "code_review_orchestrator",
	// 	number: input.number,
	// 	files: allFiles.length,
	// 	comments: allComments.length,
	// 	has_prior_bot_review: botComment !== null,
	// 	human_replies: humanCommentsAfterBot.length,
	// 	runId,
	// 	action: "context_fetched",
	// });

	// Run-scoped context directory in R2 so concurrent reviews for the same PR
	// cannot overwrite each other's manifest, patches, or comments.
	// Written to R2 (not the local workspace) so specialist Durable Objects,
	// which run in separate isolates, can read the files into their own workspace.
	const prDir = `diffs/pr-${input.number}`;
	const diffDir = `${prDir}/runs/${runId}`;
	const commentsPath = `${diffDir}/comments.json`;

	// ── 2. Write diff and comments to R2, and post placeholder comment ────────
	await Promise.all([
		writeDiffToR2(bucket, diffDir, allFiles, pr),
		bucket.put(commentsPath, JSON.stringify(allComments, null, 2)),
		// In comment mode, immediately post/update with a "review in progress"
		// message so the reviewer sees something right away.
		reviewMode === "comment"
			? postOrUpdateComment(
					token,
					input.number,
					botComment,
					renderPendingComment(
						currentHeadSha,
						botComment !== null,
						input.forceFullReview,
						botComment?.body ?? undefined,
					),
				)
			: Promise.resolve(),
	]);

	// console.log({
	// 	message: `Code review context written to R2: PR #${input.number}`,
	// 	event: "code_review_orchestrator",
	// 	number: input.number,
	// 	diffDir,
	// 	commentsPath,
	// 	runId,
	// 	action: "r2_written",
	// });

	let styleGuideResult: StyleGuideResult;
	try {
		const styleGuideFiles = selectStyleGuideFiles(allFiles);
		const internalHeaders = getInternalHeaders(
			typedEnv as Record<string, string>,
		);
		console.log({
			message: `Style-guide review fan-out: PR #${input.number} — ${styleGuideFiles.length} file(s), concurrency ${STYLE_GUIDE_CONCURRENCY}`,
			event: "code_review_orchestrator",
			number: input.number,
			files: styleGuideFiles.length,
			concurrency: STYLE_GUIDE_CONCURRENCY,
			diffDir,
			runId,
			action: "style_guide_fanout_start",
		});

		const styleGuideResults = await withConcurrency(
			styleGuideFiles.map(
				(file, index) => async () =>
					dispatchStyleGuideReview(
						`${runId}:style-guide:${index}`,
						input.number,
						diffDir,
						commentsPath,
						req,
						internalHeaders,
						file.filename,
					),
			),
			STYLE_GUIDE_CONCURRENCY,
		);
		styleGuideResult = mergeStyleGuideResults(styleGuideResults);
		console.log({
			message: `Style-guide review returned: PR #${input.number} — ${styleGuideResult.findings.length} finding(s) across ${styleGuideResult.reviewedFiles.length} file(s)`,
			event: "code_review_orchestrator",
			number: input.number,
			findings: styleGuideResult.findings.length,
			reviewedFiles: styleGuideResult.reviewedFiles.length,
			runId,
			action: "style_guide_complete",
		});

		// If the agent returned a known failure summary (e.g. model timed out
		// and produced no output), surface a failure comment rather than
		// falsely claiming no issues were found.
		const FAILURE_SUMMARIES = [
			"Style-guide review produced no result.",
			"Style-guide review failed.",
		];
		if (
			styleGuideResult.findings.length === 0 &&
			FAILURE_SUMMARIES.includes(styleGuideResult.summary)
		) {
			if (reviewMode === "comment") {
				const failureComment = renderFailureComment(currentHeadSha);
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
				).catch(() => {});
			}
			return {
				mode: reviewMode,
				active: 0,
				ignored: 0,
				resolved: 0,
				summary: styleGuideResult.summary,
				commentBody: null,
			};
		}
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Style-guide review failed: PR #${input.number} — ${errMsg}`,
			event: "code_review_orchestrator",
			number: input.number,
			error: errMsg,
			runId,
			action: "style_guide_failed",
		});

		// Update the placeholder comment to show failure rather than leaving
		// it stuck on "Review in progress".
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
			summary: "Style-guide review failed.",
			commentBody: null,
		};
	}

	// ── 4. Reconcile findings with review history and human comments ───────────
	// Load previous findings from R2 (structured) rather than parsing the comment.
	const previousReviewKey = previousReviewedSha
		? `${prDir}/review-${previousReviewedSha}.json`
		: null;
	let previousFindings: StyleGuideFinding[] = [];
	if (previousReviewKey) {
		try {
			const obj = await bucket.get(previousReviewKey);
			if (obj) {
				previousFindings = JSON.parse(await obj.text()) as StyleGuideFinding[];
			}
		} catch {
			// Non-fatal — fall back to empty previous findings
		}
	}

	let reconciled: ReconcileResult;

	const needsReconciliation =
		previousFindings.length > 0 || humanCommentsAfterBot.length > 0;

	if (!needsReconciliation) {
		reconciled = {
			active: styleGuideResult.findings,
			ignored_by_reviewer: [],
			resolved: [],
			summary:
				styleGuideResult.findings.length === 0
					? "No style-guide issues found."
					: `${styleGuideResult.findings.length} finding(s); no prior review to reconcile against.`,
		};
		// console.log({
		// 	message: `Reconciliation skipped (deterministic): PR #${input.number} — no prior findings and no human comments`,
		// 	event: "code_review_orchestrator",
		// 	number: input.number,
		// 	active: reconciled.active.length,
		// 	runId,
		// 	action: "reconciliation_skipped",
		// });
	} else {
		const { data } = await session.skill("reconcile-code-review", {
			model: "cloudflare/@cf/zai-org/glm-4.7-flash",
			args: {
				pullRequest: { number: input.number },
				currentFindings: styleGuideResult.findings,
				reviewedFiles: styleGuideResult.reviewedFiles,
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

		reconciled = data ?? {
			active: styleGuideResult.findings,
			ignored_by_reviewer: [],
			resolved: [],
			summary: styleGuideResult.summary,
		};

		console.log({
			message: `Reconciliation complete: PR #${input.number} — ${reconciled.active.length} active, ${reconciled.ignored_by_reviewer.length} ignored, ${reconciled.resolved.length} resolved`,
			event: "code_review_orchestrator",
			number: input.number,
			active: reconciled.active.length,
			ignored: reconciled.ignored_by_reviewer.length,
			resolved: reconciled.resolved.length,
			reconciliation_used_fallback: data === undefined,
			runId,
			action: "reconciliation_complete",
		});
	}

	// ── 5. Persist findings to R2 for future reconciliation ───────────────────
	const currentReviewKey = `${prDir}/review-${currentHeadSha}.json`;
	await bucket.put(currentReviewKey, JSON.stringify(reconciled.active));

	// ── 6. Render the review comment ───────────────────────────────────────────
	const commentBody = renderComment(
		reconciled,
		currentHeadSha,
		input.forceFullReview,
	);

	// ── 7. Log or post ─────────────────────────────────────────────────────────
	if (reviewMode === "log") {
		console.log({
			message: `Code review complete (log mode): PR #${input.number} — ${reconciled.active.length} active, ${reconciled.ignored_by_reviewer.length} ignored, ${reconciled.resolved.length} resolved`,
			event: "code_review_orchestrator",
			number: input.number,
			mode: reviewMode,
			active: reconciled.active.length,
			ignored: reconciled.ignored_by_reviewer.length,
			resolved: reconciled.resolved.length,
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
			message: `Code review comment updated with final review: PR #${input.number}`,
			event: "code_review_orchestrator",
			number: input.number,
			mode: reviewMode,
			active: reconciled.active.length,
			ignored: reconciled.ignored_by_reviewer.length,
			resolved: reconciled.resolved.length,
			runId,
			action: "complete_comment_posted",
		});
	}

	return {
		mode: reviewMode,
		active: reconciled.active.length,
		ignored: reconciled.ignored_by_reviewer.length,
		resolved: reconciled.resolved.length,
		summary: reconciled.summary,
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
