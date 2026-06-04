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
import * as v from "valibot";
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
import type { StyleGuideFinding, StyleGuideResult } from "./style-guide-review";

export const route: WorkflowRouteHandler = async (_c, next) => next();

// Only review docs/partials/changelog MDX, capped before specialist fan-out.
const STYLE_GUIDE_REVIEWABLE_PATH_RE =
	/^src\/content\/(docs|partials|changelog)\/.+\.mdx$/;
const STYLE_GUIDE_MAX_FILES = 20;
const STYLE_GUIDE_CONCURRENCY = 10;

// Marker embedded in every bot review comment — used to find and update it
const BOT_COMMENT_MARKER = "<!-- cloudflare-docs-flue-code-review -->";

// Regex to extract the previously reviewed head SHA from the bot comment
const REVIEWED_HEAD_SHA_RE = /<!-- reviewed-head-sha: ([0-9a-f]{40}) -->/;

function extractReviewedHeadSha(body: string | null): string | null {
	if (!body) return null;
	const m = body.match(REVIEWED_HEAD_SHA_RE);
	return m?.[1] ?? null;
}

// Describes whether this run reviewed the full PR diff or only commits
// since the last bot review. Passed to the reconciler so it can apply the
// correct resolution logic.
type DiffMode =
	| { type: "full" }
	| { type: "incremental"; fromSha: string; toSha: string };

const ReconcileResultSchema = v.object({
	active: v.array(
		v.object({
			id: v.string(),
			severity: v.picklist(["warning", "suggestion"]),
			path: v.string(),
			line: v.optional(v.number()),
			rule: v.string(),
			evidence: v.string(),
			suggestion: v.string(),
		}),
	),
	ignored_by_reviewer: v.array(
		v.object({
			id: v.string(),
			severity: v.picklist(["warning", "suggestion"]),
			path: v.string(),
			line: v.optional(v.number()),
			rule: v.string(),
			evidence: v.string(),
			suggestion: v.string(),
			reviewer_note: v.string(),
		}),
	),
	resolved: v.array(v.string()),
	summary: v.string(),
});

type ReconcileResult = v.InferOutput<typeof ReconcileResultSchema>;

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

export async function run({ id, init, payload, env, runId, req }: FlueContext) {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, string & unknown>;

	const reviewMode =
		(typedEnv.DOCS_FLUE_REVIEW_MODE as string | undefined) ?? "log";
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
	const loader = typedEnv.LOADER as Parameters<
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
		model: "cloudflare/@cf/moonshotai/kimi-k2.6",
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

	// PR-scoped context directory in R2 — keyed by PR number so each new commit
	// overwrites the previous state rather than accumulating stale data.
	// Written to R2 (not the local workspace) so specialist Durable Objects,
	// which run in separate isolates, can read the files into their own workspace.
	const diffDir = `diffs/pr-${input.number}`;
	const commentsPath = `diffs/pr-${input.number}/comments.json`;

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
		// console.log({
		// 	message: `Style-guide review fan-out: PR #${input.number} — ${styleGuideFiles.length} file(s), concurrency ${STYLE_GUIDE_CONCURRENCY}`,
		// 	event: "code_review_orchestrator",
		// 	number: input.number,
		// 	files: styleGuideFiles.length,
		// 	concurrency: STYLE_GUIDE_CONCURRENCY,
		// 	runId,
		// 	action: "style_guide_fanout_start",
		// });

		const styleGuideResults = await withConcurrency(
			styleGuideFiles.map(
				(file, index) => async () =>
					dispatchStyleGuideReview(
						`${id}:style-guide:${index}`,
						input.number,
						diffDir,
						commentsPath,
						req,
						file.filename,
					),
			),
			STYLE_GUIDE_CONCURRENCY,
		);
		styleGuideResult = mergeStyleGuideResults(styleGuideResults);
		// console.log({
		// 	message: `Style-guide review returned: PR #${input.number} — ${styleGuideResult.findings.length} finding(s)`,
		// 	event: "code_review_orchestrator",
		// 	number: input.number,
		// 	findings: styleGuideResult.findings.length,
		// 	runId,
		// 	action: "style_guide_complete",
		// });

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
		? `${diffDir}/review-${previousReviewedSha}.json`
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
	const currentReviewKey = `${diffDir}/review-${currentHeadSha}.json`;
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

function partitionComments(comments: GitHubIssueComment[]): {
	botComment: GitHubIssueComment | null;
	humanCommentsAfterBot: GitHubIssueComment[];
} {
	// Find the latest bot review comment (last one containing the marker)
	let botComment: GitHubIssueComment | null = null;
	for (const c of comments) {
		if (c.body?.includes(BOT_COMMENT_MARKER)) {
			botComment = c;
		}
	}

	// Human comments after the last bot review — exclude automated bots
	// (GitHub Actions, Dependabot, etc.) since they never address review findings.
	const botTimestamp = botComment?.created_at ?? null;
	const humanCommentsAfterBot = comments.filter(
		(c) =>
			!c.body?.includes(BOT_COMMENT_MARKER) &&
			c.user?.type !== "Bot" &&
			(botTimestamp === null || c.created_at > botTimestamp),
	);

	return { botComment, humanCommentsAfterBot };
}

interface DiffManifestEntry {
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	/** R2 key for the patch file, or null if no patch is available. */
	patch_key: string | null;
}

function selectStyleGuideFiles(
	files: Awaited<ReturnType<typeof getPullRequestFiles>>,
): Awaited<ReturnType<typeof getPullRequestFiles>> {
	return files
		.filter(
			(file) =>
				STYLE_GUIDE_REVIEWABLE_PATH_RE.test(file.filename) &&
				file.additions > 0 &&
				file.patch,
		)
		.sort((a, b) => b.additions - a.additions)
		.slice(0, STYLE_GUIDE_MAX_FILES);
}

async function withConcurrency<T>(
	tasks: Array<() => Promise<T>>,
	limit: number,
): Promise<T[]> {
	const results: T[] = new Array(tasks.length);
	let index = 0;

	async function worker() {
		while (index < tasks.length) {
			const current = index++;
			results[current] = await tasks[current]();
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(limit, tasks.length) }, () => worker()),
	);
	return results;
}

function mergeStyleGuideResults(results: StyleGuideResult[]): StyleGuideResult {
	const findingsById = new Map<string, StyleGuideFinding>();
	const reviewedFiles = new Set<string>();

	for (const result of results) {
		for (const finding of result.findings) {
			findingsById.set(finding.id, finding);
		}
		for (const file of result.reviewedFiles) {
			reviewedFiles.add(file);
		}
	}

	const findings = [...findingsById.values()];
	const warnings = findings.filter((f) => f.severity === "warning").length;
	const suggestions = findings.filter(
		(f) => f.severity === "suggestion",
	).length;
	const summary =
		findings.length === 0
			? "No style-guide issues found."
			: `${warnings} warning(s) and ${suggestions} suggestion(s) found across ${reviewedFiles.size} file(s).`;

	return {
		findings,
		summary,
		reviewedFiles: [...reviewedFiles],
	};
}

async function writeDiffToR2(
	bucket: R2Bucket,
	diffDir: string,
	files: Awaited<ReturnType<typeof getPullRequestFiles>>,
	pr: import("../lib/github").GitHubPullRequest,
): Promise<void> {
	const manifest: DiffManifestEntry[] = [];

	await Promise.all(
		files.map(async (file) => {
			// Encode the filename into a safe flat key: replace slashes with __
			const safeName = file.filename.replace(/\//g, "__");
			const patchKey = file.patch ? `${diffDir}/${safeName}.patch` : null;

			if (file.patch && patchKey) {
				await bucket.put(patchKey, file.patch);
			}

			manifest.push({
				filename: file.filename,
				status: file.status,
				additions: file.additions,
				deletions: file.deletions,
				changes: file.changes,
				patch_key: patchKey,
			});
		}),
	);

	await Promise.all([
		bucket.put(`${diffDir}/manifest.json`, JSON.stringify(manifest, null, 2)),
		bucket.put(
			`${diffDir}/pr.json`,
			JSON.stringify(
				{
					number: pr.number,
					title: pr.title,
					description: pr.body ?? "",
					author: pr.user?.login ?? "",
					base: pr.base.ref,
					head: pr.head.ref,
					labels: pr.labels.map((l) => l.name),
					files: manifest.map((f) => ({
						filename: f.filename,
						status: f.status,
						additions: f.additions,
						deletions: f.deletions,
						changes: f.changes,
					})),
				},
				null,
				2,
			),
		),
	]);
}

async function dispatchStyleGuideReview(
	reviewId: string,
	prNumber: number,
	diffDir: string,
	commentsPath: string,
	req: Request | undefined,
	filename?: string,
): Promise<StyleGuideResult> {
	// Derive the base URL from the incoming request so this works on any port
	// in local dev as well as in production without extra env config.
	const baseUrl = req ? new URL(req.url).origin : "http://localhost:8787";
	const url = new URL(`/workflows/style-guide-review`, baseUrl);
	url.searchParams.set("wait", "result");

	const response = await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ number: prNumber, diffDir, commentsPath, filename }),
	});

	if (!response.ok) {
		throw new Error(
			`Style-guide review dispatch failed: ${response.status} ${await response.text()}`,
		);
	}

	const result = (await response.json()) as { result?: StyleGuideResult };
	return (
		result.result ?? {
			findings: [],
			summary: "Style-guide review produced no result.",
			reviewedFiles: [],
		}
	);
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

function renderFailureComment(headSha: string): string {
	const shortSha = headSha.slice(0, 7);
	return [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${headSha} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Review",
		"",
		`❌ Review failed for commit \`${shortSha}\`. This is usually a transient error — it will retry on the next push.`,
	].join("\n");
}

function renderPendingComment(
	headSha: string,
	isUpdate: boolean,
	forceFullReview?: boolean,
	existingBody?: string,
): string {
	const shortSha = headSha.slice(0, 7);
	const status = forceFullReview
		? `Full review in progress for entire PR diff (commit \`${shortSha}\`)…`
		: isUpdate
			? `Reviewing new changes (commit \`${shortSha}\`)…`
			: `Review in progress for commit \`${shortSha}\`…`;

	// If there's an existing *completed* review body, preserve it below the pending notice.
	// Don't preserve a body that was itself a pending placeholder (to avoid duplication).
	// Strip the old header metadata lines (HTML comments + "## Review" heading).
	const wasAlreadyPending = existingBody?.includes("<!-- status: pending -->");
	const preservedBody =
		existingBody && !wasAlreadyPending
			? existingBody
					.split("\n")
					.filter(
						(l) =>
							!l.startsWith("<!-- ") &&
							l !== "## Review" &&
							l !== BOT_COMMENT_MARKER,
					)
					.join("\n")
					.replace(/^\n+/, "")
			: null;

	const lines = [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${headSha} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		`<!-- status: pending -->`,
		"",
		"## Review",
		"",
		status,
	];

	if (preservedBody) {
		lines.push("", "---", "", preservedBody);
	}

	return lines.join("\n");
}

function renderComment(
	reconciled: ReconcileResult,
	reviewedHeadSha: string,
	forceFullReview?: boolean,
): string {
	const shortSha = reviewedHeadSha.slice(0, 7);
	// Exclude anything acknowledged by the reviewer from active sections
	const ignoredPaths = new Set(
		reconciled.ignored_by_reviewer.map((f) => `${f.path}:${f.line}:${f.rule}`),
	);
	const activeFindings = reconciled.active.filter(
		(f) => !ignoredPaths.has(`${f.path}:${f.line}:${f.rule}`),
	);
	const warnings = activeFindings.filter((f) => f.severity === "warning");
	const suggestions = activeFindings.filter((f) => f.severity === "suggestion");
	const totalActive = activeFindings.length;
	const scope = forceFullReview ? "full PR diff" : `commit \`${shortSha}\``;

	// Status line
	let statusLine: string;
	if (totalActive === 0 && reconciled.ignored_by_reviewer.length === 0) {
		statusLine = `✅ No style-guide issues found in ${scope}.`;
	} else if (warnings.length > 0) {
		statusLine = `⚠️ ${warnings.length} warning${warnings.length === 1 ? "" : "s"}${suggestions.length > 0 ? ` and ${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"}` : ""} found in ${scope}.`;
	} else {
		statusLine = `💡 ${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"} found in ${scope}.`;
	}

	const lines: string[] = [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${reviewedHeadSha} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Review",
		"",
		statusLine,
	];

	// Style guide findings — warnings and suggestions each in a dropdown
	if (warnings.length > 0) {
		lines.push("");
		lines.push("<details open>");
		lines.push(`<summary><b>Warnings</b> (${warnings.length})</summary>`);
		lines.push("<br/>");
		lines.push("");
		lines.push("| File | Issue |");
		lines.push("|---|---|");
		for (const f of warnings) {
			lines.push(renderFindingRow(f));
		}
		lines.push("");
		lines.push("</details>");
	}

	if (suggestions.length > 0) {
		lines.push("");
		lines.push("<details open>");
		lines.push(`<summary><b>Suggestions</b> (${suggestions.length})</summary>`);
		lines.push("<br/>");
		lines.push("");
		lines.push("| File | Issue |");
		lines.push("|---|---|");
		for (const f of suggestions) {
			lines.push(renderFindingRow(f));
		}
		lines.push("");
		lines.push("</details>");
	}

	if (reconciled.ignored_by_reviewer.length > 0) {
		lines.push("");
		lines.push("<details>");
		lines.push(
			`<summary>Acknowledged by author (${reconciled.ignored_by_reviewer.length})</summary>`,
		);
		lines.push("<br/>");
		lines.push("");
		lines.push("| File | Issue | Note |");
		lines.push("|---|---|---|");
		for (const f of reconciled.ignored_by_reviewer) {
			const file = formatFile(f.path, f.line);
			lines.push(
				`| ${file} | ${sanitizeTableCell(f.rule)} | ${sanitizeTableCell(f.reviewer_note)} |`,
			);
		}
		lines.push("");
		lines.push("</details>");
	}

	// Commands section — always shown at the bottom
	lines.push("");
	lines.push("<details>");
	lines.push("<summary>Commands</summary>");
	lines.push("<br/>");
	lines.push("");
	lines.push(
		"_Only codeowners can run commands. Post a comment with the command to trigger it._",
	);
	lines.push("");
	lines.push("| Command | Description |");
	lines.push("|---|---|");
	lines.push(
		"| `/review` | Runs a review now. Incremental if a prior review exists, full if not. |",
	);
	lines.push(
		"| `/full-review` | Re-reviews the entire PR diff from scratch, ignoring incremental history. Useful after a rebase, when you want a fresh review, or if the bot gets out of sync and reports issues that no longer exist. |",
	);
	lines.push("");
	lines.push("</details>");

	return lines.join("\n");
}

function formatFile(path: string, line?: number): string {
	// Shorten path: drop src/content/docs/ prefix for readability
	const short = path
		.replace(/^src\/content\/docs\//, "")
		.replace(/^src\/content\//, "");
	return line ? `\`${short}\` line ${line}` : `\`${short}\``;
}

function sanitizeTableCell(value: string): string {
	return value
		.replace(/\|/g, "\\|")
		.replace(/\*/g, "\\*")
		.replace(/\r?\n/g, " ");
}

function renderFindingRow(f: ReconcileResult["active"][number]): string {
	const file = formatFile(f.path, f.line);
	const rule = sanitizeTableCell(f.rule);
	const evidence = sanitizeTableCell(f.evidence);
	const suggestion = sanitizeTableCell(f.suggestion);
	return `| ${file} | **${rule}** — ${evidence} Fix: ${suggestion} |`;
}

function renderReviewLimitComment(existingBody?: string): string {
	const wasAlreadyPending = existingBody?.includes("<!-- status: pending -->");
	const preservedBody =
		existingBody && !wasAlreadyPending
			? existingBody
					.split("\n")
					.filter(
						(l) =>
							!l.startsWith("<!-- ") &&
							l !== "## Review" &&
							l !== BOT_COMMENT_MARKER,
					)
					.join("\n")
					.replace(/^\n+/, "") || null
			: null;

	const lines = [
		BOT_COMMENT_MARKER,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Review",
		"",
		"⏸️ Automatic reviews for this PR are paused.",
		"",
		"This PR has already received 2 automatic reviews. To run another review, a codeowner can comment `/review` or `/full-review`.",
		"",
		"> **Tip:** Keep PRs in draft mode until they are ready for review — the bot skips draft PRs automatically.",
	];

	if (preservedBody) {
		lines.push("", "---", "", preservedBody);
	}

	return lines.join("\n");
}

async function getAutoReviewCount(
	bucket: R2Bucket,
	prNumber: number,
): Promise<number> {
	const key = `diffs/pr-${prNumber}/auto-review-count.json`;
	const obj = await bucket.get(key);
	if (!obj) return 0;
	const data = (await obj.json()) as { count?: number };
	return data.count ?? 0;
}

async function incrementAutoReviewCount(
	bucket: R2Bucket,
	prNumber: number,
	current: number,
): Promise<void> {
	const key = `diffs/pr-${prNumber}/auto-review-count.json`;
	await bucket.put(key, JSON.stringify({ count: current + 1 }));
}
