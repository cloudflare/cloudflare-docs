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
	comparePullRequestHeads,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	getPullRequestFiles,
	getRepoFileContent,
	postComment,
	removeReactionFromComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "../lib/github";
import {
	runStyleGuideReviewInProcess,
	selectStyleGuideFiles,
	STYLE_GUIDE_CONCURRENCY,
} from "../lib/style-guide-inproc";
import type {
	StyleGuideFinding,
	StyleGuideResult,
} from "../lib/style-guide-results";
import {
	runCodeReviewInProcess,
	selectCodeReviewFiles,
	CODE_REVIEW_CONCURRENCY,
} from "../lib/code-review-inproc";
import type {
	CodeReviewFinding,
	CodeReviewResult,
} from "../lib/code-review-results";
import { writeDiffToWorkspace } from "../lib/code-review-diff";
import {
	BOT_COMMENT_MARKER,
	type DiffMode,
	extractReviewedHeadSha,
	getAutoReviewCount,
	incrementAutoReviewCount,
	isReviewLimitIgnored,
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

export async function run({ id: runId, init, payload, env }: FlueContext) {
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
		// Increment before running so a mid-run failure counts as a used review
		await incrementAutoReviewCount(bucket, input.number, autoReviewCount);
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

	// Run-scoped diff directory in the shared Workspace. The style-guide review
	// sessions run in this same Durable Object, so the diff is staged directly
	// in the Workspace (read by the `code` tool) — no R2 round-trip. prDir stays
	// the R2 key prefix for the cross-run review-state objects.
	const prDir = `diffs/pr-${input.number}`;
	const diffDir = `${prDir}/runs/${runId}`;

	// ── 2. Stage the diff in the Workspace, and post the placeholder comment ──
	await Promise.all([
		writeDiffToWorkspace(workspace, diffDir, allFiles, pr),
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

	// ── 3. Run both review fan-outs concurrently ───────────────────────────────
	// The generic code review and the style-guide review run over the same
	// shared workspace + staged diff, each in its own named harness. They are
	// independent: one failing degrades that section to an empty result rather
	// than aborting the whole review. Only a double failure surfaces an error.
	const styleGuideFiles = selectStyleGuideFiles(allFiles);
	const codeReviewFiles = selectCodeReviewFiles(allFiles);

	console.log({
		message: `Review fan-out: PR #${input.number} — code-review ${codeReviewFiles.length} file(s), style-guide ${styleGuideFiles.length} file(s)`,
		event: "code_review_orchestrator",
		number: input.number,
		codeReviewFiles: codeReviewFiles.length,
		styleGuideFiles: styleGuideFiles.length,
		codeReviewConcurrency: CODE_REVIEW_CONCURRENCY,
		styleGuideConcurrency: STYLE_GUIDE_CONCURRENCY,
		diffDir,
		runId,
		action: "review_fanout_start",
	});

	const prMeta = {
		number: pr.number,
		title: pr.title,
		base: pr.base.ref,
		head: pr.head.ref,
	};

	// Load the repo's root AGENTS.md at the PR head SHA so the code-review agent
	// has the repository conventions in context every run. Best-effort: the
	// review still runs (without that context) if the fetch fails. Skipped when
	// there are no code files to review.
	const repoAgentsMd =
		codeReviewFiles.length > 0
			? ((await getRepoFileContent(token, "AGENTS.md", currentHeadSha).catch(
					() => null,
				)) ?? undefined)
			: undefined;

	const [codeOutcome, styleOutcome] = await Promise.all([
		runCodeReviewInProcess({
			init,
			workspace,
			loader,
			token,
			headSha: currentHeadSha,
			repoAgentsMd,
			prNumber: input.number,
			pullRequest: prMeta,
			diffDir,
			files: codeReviewFiles,
			runId,
			concurrency: CODE_REVIEW_CONCURRENCY,
		}).then(
			(result) => ({ ok: true as const, result }),
			(err) => ({ ok: false as const, err }),
		),
		runStyleGuideReviewInProcess({
			init,
			workspace,
			loader,
			prNumber: input.number,
			pullRequest: prMeta,
			diffDir,
			files: styleGuideFiles,
			runId,
			concurrency: STYLE_GUIDE_CONCURRENCY,
		}).then(
			(result) => ({ ok: true as const, result }),
			(err) => ({ ok: false as const, err }),
		),
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
			message: `Code review failed: PR #${input.number} — ${codeOutcome.err instanceof Error ? codeOutcome.err.message : String(codeOutcome.err)}`,
			event: "code_review_orchestrator",
			number: input.number,
			error:
				codeOutcome.err instanceof Error
					? codeOutcome.err.message
					: String(codeOutcome.err),
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
			message: `Style-guide review failed: PR #${input.number} — ${styleOutcome.err instanceof Error ? styleOutcome.err.message : String(styleOutcome.err)}`,
			event: "code_review_orchestrator",
			number: input.number,
			error:
				styleOutcome.err instanceof Error
					? styleOutcome.err.message
					: String(styleOutcome.err),
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
		{ code: reconciledCode, style: reconciledStyle },
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
