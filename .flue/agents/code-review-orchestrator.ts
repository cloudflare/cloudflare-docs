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
 * POST /agents/code-review-orchestrator/:id
 */
import type { FlueContext } from "@flue/runtime";
import {
	getDefaultWorkspace,
	getShellSandbox,
	hydrateFromBucket,
} from "@flue/runtime/cloudflare";
import * as v from "valibot";
import {
	comparePullRequestHeads,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	getPullRequestFiles,
	postComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "../lib/github";
import type { StyleGuideFinding, StyleGuideResult } from "./style-guide-review";

export const triggers = { webhook: true };

// Temporary allowlist for live testing — remove once validated in production.
const CODE_REVIEW_PR_ALLOWLIST = new Set([30981]);

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
}

export default async function ({
	id,
	init,
	payload,
	env,
	runId,
	req,
}: FlueContext) {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, string & unknown>;

	// Only run for allowlisted PRs during live testing — remove once validated.
	if (!CODE_REVIEW_PR_ALLOWLIST.has(input.number)) {
		return { acted: false, summary: "PR not in allowlist." };
	}

	const reviewMode =
		(typedEnv.DOCS_FLUE_REVIEW_MODE as string | undefined) ?? "log";
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
	const loader = typedEnv.LOADER as unknown as Parameters<
		typeof getShellSandbox
	>[0]["loader"];

	const workspace = getDefaultWorkspace();
	if (!(await workspace.exists("/.hydrated"))) {
		await hydrateFromBucket(workspace, bucket);
		await workspace.writeFile("/.hydrated", new Date().toISOString());
	}

	const harness = await init({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.6",
		role: "cloudflare-docs-bot",
	});

	const token = await getInstallationToken(typedEnv as Record<string, string>);

	console.log({
		message: `Code review started: PR #${input.number}`,
		event: "code_review_orchestrator",
		number: input.number,
		mode: reviewMode,
		runId,
		action: "started",
	});

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
		reviewMode === "log"
			? `code-review-orchestrator:${input.number}:${runId}`
			: `code-review-orchestrator:${input.number}:${currentHeadSha}`;
	const session = await harness.session(sessionKey);
	const previousReviewedSha = extractReviewedHeadSha(botComment?.body ?? null);

	// Determine diff mode: incremental if we have a prior reviewed SHA that
	// differs from the current head; full otherwise.
	let diffMode: DiffMode;
	let allFiles: Awaited<ReturnType<typeof getPullRequestFiles>>;

	if (previousReviewedSha && previousReviewedSha !== currentHeadSha) {
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
			console.log({
				message: `Code review using incremental diff: PR #${input.number} — ${previousReviewedSha.slice(0, 7)}...${currentHeadSha.slice(0, 7)}, ${allFiles.length} file(s) changed`,
				event: "code_review_orchestrator",
				number: input.number,
				diff_mode: "incremental",
				from_sha: previousReviewedSha,
				to_sha: currentHeadSha,
				files: allFiles.length,
				runId,
				action: "diff_mode_resolved",
			});
		} else {
			// Base SHA gone (force-push) — fall back to full PR diff
			diffMode = { type: "full" };
			allFiles = await getPullRequestFiles(token, input.number);
			console.log({
				message: `Code review falling back to full diff (base SHA not found): PR #${input.number}`,
				event: "code_review_orchestrator",
				number: input.number,
				diff_mode: "full",
				fallback_reason: "base_sha_not_found",
				to_sha: currentHeadSha,
				files: allFiles.length,
				runId,
				action: "diff_mode_resolved",
			});
		}
	} else {
		// No previous review or SHA unchanged — full PR diff
		diffMode = { type: "full" };
		allFiles = await getPullRequestFiles(token, input.number);
		console.log({
			message: `Code review using full diff: PR #${input.number} — ${allFiles.length} file(s)`,
			event: "code_review_orchestrator",
			number: input.number,
			diff_mode: "full",
			to_sha: currentHeadSha,
			had_previous_review: previousReviewedSha !== null,
			files: allFiles.length,
			runId,
			action: "diff_mode_resolved",
		});
	}

	console.log({
		message: `Code review context fetched: PR #${input.number} — ${allFiles.length} file(s) in diff, ${allComments.length} comment(s), prior bot review: ${botComment ? "yes" : "no"}, human replies: ${humanCommentsAfterBot.length}`,
		event: "code_review_orchestrator",
		number: input.number,
		files: allFiles.length,
		comments: allComments.length,
		has_prior_bot_review: botComment !== null,
		human_replies: humanCommentsAfterBot.length,
		runId,
		action: "context_fetched",
	});

	// PR-scoped context directory in R2 — keyed by PR number so each new commit
	// overwrites the previous state rather than accumulating stale data.
	// Written to R2 (not the local workspace) so specialist Durable Objects,
	// which run in separate isolates, can read the files into their own workspace.
	const diffDir = `diffs/pr-${input.number}`;
	const commentsPath = `diffs/pr-${input.number}/comments.json`;

	// ── 2. Write diff and comments to R2, and post placeholder comment ────────
	await Promise.all([
		writeDiffToR2(bucket, diffDir, allFiles),
		bucket.put(commentsPath, JSON.stringify(allComments, null, 2)),
		// In comment mode, immediately post/update with a "review in progress"
		// message so the reviewer sees something right away.
		reviewMode === "comment"
			? postOrUpdateComment(
					token,
					input.number,
					botComment,
					renderPendingComment(currentHeadSha, botComment !== null),
				)
			: Promise.resolve(),
	]);

	console.log({
		message: `Code review context written to R2: PR #${input.number}`,
		event: "code_review_orchestrator",
		number: input.number,
		diffDir,
		commentsPath,
		runId,
		action: "r2_written",
	});

	// ── 3. Run specialist agents ───────────────────────────────────────────────
	console.log({
		message: `Style-guide review dispatched: PR #${input.number}`,
		event: "code_review_orchestrator",
		number: input.number,
		runId,
		action: "style_guide_dispatched",
	});

	let styleGuideResult: StyleGuideResult;
	try {
		styleGuideResult = await dispatchStyleGuideReview(
			id,
			input.number,
			diffDir,
			commentsPath,
			req,
		);
		console.log({
			message: `Style-guide review returned: PR #${input.number} — ${styleGuideResult.findings.length} finding(s)`,
			event: "code_review_orchestrator",
			number: input.number,
			findings: styleGuideResult.findings.length,
			runId,
			action: "style_guide_complete",
		});
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
		? `${diffDir.replace(/\/diff$/, "")}/review-${previousReviewedSha}.json`
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
		console.log({
			message: `Reconciliation skipped (deterministic): PR #${input.number} — no prior findings and no human comments`,
			event: "code_review_orchestrator",
			number: input.number,
			active: reconciled.active.length,
			runId,
			action: "reconciliation_skipped",
		});
	} else {
		const { data } = await session.skill("reconcile-code-review/SKILL.md", {
			args: {
				pullRequest: { number: input.number },
				currentFindings: styleGuideResult.findings,
				previousFindings,
				humanComments: humanCommentsAfterBot.map((c) => ({
					author: c.user?.login ?? "unknown",
					created_at: c.created_at,
					body: c.body ?? "",
				})),
				diffMode,
			},
			schema: ReconcileResultSchema,
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
	const currentReviewKey = `${diffDir.replace(/\/diff$/, "")}/review-${currentHeadSha}.json`;
	await bucket.put(currentReviewKey, JSON.stringify(reconciled.active));

	// ── 6. Render the review comment ───────────────────────────────────────────
	const commentBody = renderComment(reconciled, currentHeadSha);

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
	return { eventType: input.eventType, number: input.number };
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

async function writeDiffToR2(
	bucket: R2Bucket,
	diffDir: string,
	files: Awaited<ReturnType<typeof getPullRequestFiles>>,
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

	await bucket.put(
		`${diffDir}/manifest.json`,
		JSON.stringify(manifest, null, 2),
	);
}

async function dispatchStyleGuideReview(
	orchestratorId: string,
	prNumber: number,
	diffDir: string,
	commentsPath: string,
	req: Request | undefined,
): Promise<StyleGuideResult> {
	// Derive the base URL from the incoming request so this works on any port
	// in local dev as well as in production without extra env config.
	const baseUrl = req ? new URL(req.url).origin : "http://localhost:8787";
	const url = new URL(
		`/agents/style-guide-review/${encodeURIComponent(orchestratorId)}`,
		baseUrl,
	);

	const response = await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ number: prNumber, diffDir, commentsPath }),
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
		`> ❌ Review failed for commit \`${shortSha}\`. This is usually a transient error — it will retry on the next push.`,
	].join("\n");
}

function renderPendingComment(headSha: string, isUpdate: boolean): string {
	const shortSha = headSha.slice(0, 7);
	const status = isUpdate
		? `> Reviewing new changes (commit \`${shortSha}\`)…`
		: `> Review in progress for commit \`${shortSha}\`…`;

	return [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${headSha} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		`<!-- status: pending -->`,
		"",
		"## Review",
		"",
		status,
	].join("\n");
}

function renderComment(
	reconciled: ReconcileResult,
	reviewedHeadSha: string,
): string {
	const shortSha = reviewedHeadSha.slice(0, 7);
	const warnings = reconciled.active.filter((f) => f.severity === "warning");
	const suggestions = reconciled.active.filter(
		(f) => f.severity === "suggestion",
	);
	const totalActive = reconciled.active.length;

	// Status line
	let statusLine: string;
	if (totalActive === 0 && reconciled.ignored_by_reviewer.length === 0) {
		statusLine = `> ✅ No style-guide issues found in commit \`${shortSha}\`.`;
	} else if (warnings.length > 0) {
		statusLine = `> ⚠️ ${warnings.length} warning${warnings.length === 1 ? "" : "s"}${suggestions.length > 0 ? ` and ${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"}` : ""} found in commit \`${shortSha}\`.`;
	} else {
		statusLine = `> 💡 ${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"} found in commit \`${shortSha}\`.`;
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
		lines.push("");
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
		lines.push("");
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
		lines.push("");
		lines.push("| File | Issue | Note |");
		lines.push("|---|---|---|");
		for (const f of reconciled.ignored_by_reviewer) {
			const file = formatFile(f.path, f.line);
			lines.push(`| ${file} | ${f.rule} | ${f.reviewer_note} |`);
		}
		lines.push("");
		lines.push("</details>");
	}

	return lines.join("\n");
}

function formatFile(path: string, line?: number): string {
	// Shorten path: drop src/content/docs/ prefix for readability
	const short = path
		.replace(/^src\/content\/docs\//, "")
		.replace(/^src\/content\//, "");
	return line ? `\`${short}\` line ${line}` : `\`${short}\``;
}

function renderFindingRow(f: ReconcileResult["active"][number]): string {
	const file = formatFile(f.path, f.line);
	const rule = f.rule.replace(/\|/g, "\\|");
	const evidence = f.evidence.replace(/\|/g, "\\|");
	const suggestion = f.suggestion.replace(/\|/g, "\\|");
	return `| ${file} | **${rule}** — ${evidence} Fix: ${suggestion} |`;
}
