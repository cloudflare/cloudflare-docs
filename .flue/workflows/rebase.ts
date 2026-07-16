/**
 * Rebase workflow
 *
 * Handles the /rebase and /rebaseWithConflicts slash commands. Both commands:
 *   1. Check the PR targets `production` (not a fork, not a different base).
 *   2. Post a "rebase in progress" status at the top of the bot comment.
 *   3. Attempt a GitHub rebase via the update-branch API.
 *   4. On clean rebase: update comment to "complete", trigger a /full-review.
 *   5. On conflict:
 *      - /rebase: update comment to "halted-conflict" and stop.
 *      - /rebaseWithConflicts: attempt AI-assisted conflict resolution using
 *        the Git Data API. If confidence is high, apply and trigger /full-review.
 *        Otherwise update comment to "halted-confidence" with the reason.
 *
 * POST /workflows/rebase  (internal — admitted by orchestrate)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import {
	addReactionToComment,
	compareCommits,
	createBlob,
	createGitCommit,
	createTree,
	getGitBlob,
	getGitCommit,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	getRepoFileContent,
	getTree,
	getRef,
	removeReactionFromComment,
	updatePullRequestBranch,
	updateRef,
} from "../lib/github";
import { getInternalHeaders } from "../lib/internal-auth";
import { admitWorkflow } from "../lib/poll-run";
import {
	BOT_COMMENT_MARKER,
	partitionComments,
} from "../lib/code-review-state";
import {
	postOrUpdateComment,
	renderRebaseStatusUpdate,
} from "../lib/code-review-render";

export const route: WorkflowRouteHandler = async (_c, next) => next();

interface RebasePayload {
	prNumber: number;
	mode: "rebase" | "rebaseWithConflicts";
	triggerCommentId: number;
	triggerEyesReactionId: number | null;
	senderLogin: string;
}

/** Structured response from the AI conflict resolver. */
interface ConflictResolution {
	confidence: "high" | "medium" | "low";
	reason: string;
	files: Array<{ path: string; content: string }>;
}

export async function run({
	payload,
	env,
	req,
}: FlueContext): Promise<Record<string, unknown>> {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, string & unknown>;
	const token = await getInstallationToken(typedEnv as Record<string, string>);

	// ── 1. Fetch PR metadata ──────────────────────────────────────────────────
	const [pr, allComments] = await Promise.all([
		getPullRequest(token, input.prNumber),
		getIssueComments(token, input.prNumber),
	]);

	const { botComment } = partitionComments(allComments);
	const existingBody = botComment?.body ?? null;

	// ── 2. Validate: must target production, must not be a fork ───────────────
	if (pr.base.ref !== "production") {
		const body = renderRebaseStatusUpdate(
			"halted-wrong-base",
			pr.base.ref,
			input.senderLogin,
			existingBody,
		);
		await postOrUpdateComment(token, input.prNumber, botComment, body);
		await swapReaction(
			token,
			input.triggerCommentId,
			input.triggerEyesReactionId,
		);
		console.log({
			message: `Rebase skipped: PR #${input.prNumber} targets ${pr.base.ref}, not production`,
			event: "rebase_workflow",
			number: input.prNumber,
			action: "halted_wrong_base",
		});
		return { acted: false, reason: "wrong_base", base: pr.base.ref };
	}

	// A fork PR has a different repository for the head.
	// GitHub exposes this as head.repo.fork === true OR head.repo.full_name !== base.repo.full_name.
	// The API response on GitHubPullRequest does not include nested repo info so
	// we check head.ref ownership indirectly: if head.repo would differ we can't push.
	// The safest heuristic: if the PR author is not in the same org context (forks
	// always have a different head.label format "user:branch" vs "cloudflare:branch").
	const headLabel =
		(pr as unknown as { head: { label?: string } }).head.label ?? "";
	const isFork = !headLabel.startsWith("cloudflare/");

	if (isFork) {
		const body = renderRebaseStatusUpdate(
			"halted-fork",
			undefined,
			input.senderLogin,
			existingBody,
		);
		await postOrUpdateComment(token, input.prNumber, botComment, body);
		await swapReaction(
			token,
			input.triggerCommentId,
			input.triggerEyesReactionId,
		);
		console.log({
			message: `Rebase skipped: PR #${input.prNumber} is from a fork`,
			event: "rebase_workflow",
			number: input.prNumber,
			action: "halted_fork",
		});
		return { acted: false, reason: "fork" };
	}

	// ── 3. Post "in progress" status ──────────────────────────────────────────
	const inProgressBody = renderRebaseStatusUpdate(
		"in-progress",
		undefined,
		input.senderLogin,
		existingBody,
	);
	await postOrUpdateComment(token, input.prNumber, botComment, inProgressBody);

	// Re-fetch the comment we just created/updated so we have its id for
	// subsequent updates.
	const updatedComments = await getIssueComments(token, input.prNumber);
	const liveBot =
		updatedComments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ??
		null;

	// ── 4. Attempt the rebase ─────────────────────────────────────────────────
	let rebaseResult: Awaited<ReturnType<typeof updatePullRequestBranch>>;
	try {
		rebaseResult = await updatePullRequestBranch(
			token,
			input.prNumber,
			"rebase",
		);
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		const failBody = renderRebaseStatusUpdate(
			"failed",
			errMsg,
			input.senderLogin,
			liveBot?.body ?? null,
		);
		await postOrUpdateComment(token, input.prNumber, liveBot, failBody);
		await swapReaction(
			token,
			input.triggerCommentId,
			input.triggerEyesReactionId,
		);
		console.log({
			message: `Rebase failed for PR #${input.prNumber}: ${errMsg}`,
			event: "rebase_workflow",
			number: input.prNumber,
			error: errMsg,
			action: "rebase_api_error",
		});
		return { acted: false, reason: "api_error", error: errMsg };
	}

	// ── 5. Handle clean rebase ────────────────────────────────────────────────
	if (rebaseResult.ok) {
		const completeBody = renderRebaseStatusUpdate(
			"complete",
			undefined,
			input.senderLogin,
			liveBot?.body ?? null,
		);
		await postOrUpdateComment(token, input.prNumber, liveBot, completeBody);
		await swapReaction(
			token,
			input.triggerCommentId,
			input.triggerEyesReactionId,
		);

		// Trigger a full review — rebase changes the head SHA so incremental
		// would be wrong, and the full PR should be reviewed fresh.
		if (req) {
			const baseUrl = new URL(req.url).origin;
			const internalHeaders = getInternalHeaders(
				typedEnv as Record<string, string>,
			);
			try {
				await admitWorkflow({
					baseUrl,
					pathname: `/workflows/code-review-orchestrator`,
					headers: internalHeaders,
					body: {
						eventType: "pull_request" as const,
						number: input.prNumber,
						forceFullReview: true,
						bypassReviewLimit: true,
					},
				});
			} catch (reviewErr) {
				// Non-fatal: the rebase succeeded; review will run on next push.
				console.log({
					message: `Could not admit full-review after rebase for PR #${input.prNumber}: ${reviewErr instanceof Error ? reviewErr.message : String(reviewErr)}`,
					event: "rebase_workflow",
					number: input.prNumber,
					action: "review_admit_failed_after_rebase",
				});
			}
		}

		console.log({
			message: `Rebase complete for PR #${input.prNumber}`,
			event: "rebase_workflow",
			number: input.prNumber,
			action: "rebase_complete",
		});
		return { acted: true, reason: "rebase_complete" };
	}

	// ── 6. Handle conflicts ────────────────────────────────────────────────────
	const conflictMessage = rebaseResult.message ?? "Merge conflict";

	if (input.mode === "rebase") {
		// Plain /rebase: just report and stop.
		const haltedBody = renderRebaseStatusUpdate(
			"halted-conflict",
			conflictMessage,
			input.senderLogin,
			liveBot?.body ?? null,
		);
		await postOrUpdateComment(token, input.prNumber, liveBot, haltedBody);
		await swapReaction(
			token,
			input.triggerCommentId,
			input.triggerEyesReactionId,
		);
		console.log({
			message: `Rebase halted (conflicts) for PR #${input.prNumber}`,
			event: "rebase_workflow",
			number: input.prNumber,
			action: "halted_conflict",
		});
		return { acted: false, reason: "conflict" };
	}

	// ── 7. /rebaseWithConflicts: attempt AI resolution ────────────────────────
	console.log({
		message: `Attempting AI conflict resolution for PR #${input.prNumber}`,
		event: "rebase_workflow",
		number: input.prNumber,
		action: "ai_resolution_start",
	});

	let resolution: ConflictResolution;
	try {
		resolution = await resolveConflictsWithAI(token, pr, typedEnv);
	} catch (resolveErr) {
		const errMsg =
			resolveErr instanceof Error ? resolveErr.message : String(resolveErr);
		const failBody = renderRebaseStatusUpdate(
			"failed",
			`AI conflict resolution failed: ${errMsg}`,
			input.senderLogin,
			liveBot?.body ?? null,
		);
		await postOrUpdateComment(token, input.prNumber, liveBot, failBody);
		await swapReaction(
			token,
			input.triggerCommentId,
			input.triggerEyesReactionId,
		);
		console.log({
			message: `AI resolution threw for PR #${input.prNumber}: ${errMsg}`,
			event: "rebase_workflow",
			number: input.prNumber,
			error: errMsg,
			action: "ai_resolution_error",
		});
		return { acted: false, reason: "ai_resolution_error", error: errMsg };
	}

	console.log({
		message: `AI conflict resolution result for PR #${input.prNumber}: confidence=${resolution.confidence}`,
		event: "rebase_workflow",
		number: input.prNumber,
		confidence: resolution.confidence,
		reason: resolution.reason,
		action: "ai_resolution_result",
	});

	// ── 8. Apply high-confidence resolution ──────────────────────────────────
	if (resolution.confidence === "high") {
		try {
			await applyResolution(token, pr, resolution);
		} catch (applyErr) {
			const errMsg =
				applyErr instanceof Error ? applyErr.message : String(applyErr);
			const failBody = renderRebaseStatusUpdate(
				"failed",
				`Failed to apply resolved commits: ${errMsg}`,
				input.senderLogin,
				liveBot?.body ?? null,
			);
			await postOrUpdateComment(token, input.prNumber, liveBot, failBody);
			await swapReaction(
				token,
				input.triggerCommentId,
				input.triggerEyesReactionId,
			);
			console.log({
				message: `Failed to apply AI resolution for PR #${input.prNumber}: ${errMsg}`,
				event: "rebase_workflow",
				number: input.prNumber,
				error: errMsg,
				action: "apply_resolution_error",
			});
			return { acted: false, reason: "apply_error", error: errMsg };
		}

		const completeBody = renderRebaseStatusUpdate(
			"complete",
			undefined,
			input.senderLogin,
			liveBot?.body ?? null,
		);
		await postOrUpdateComment(token, input.prNumber, liveBot, completeBody);
		await swapReaction(
			token,
			input.triggerCommentId,
			input.triggerEyesReactionId,
		);

		// Trigger a full review after successful AI-assisted rebase.
		if (req) {
			const baseUrl = new URL(req.url).origin;
			const internalHeaders = getInternalHeaders(
				typedEnv as Record<string, string>,
			);
			try {
				await admitWorkflow({
					baseUrl,
					pathname: `/workflows/code-review-orchestrator`,
					headers: internalHeaders,
					body: {
						eventType: "pull_request" as const,
						number: input.prNumber,
						forceFullReview: true,
						bypassReviewLimit: true,
					},
				});
			} catch (reviewErr) {
				console.log({
					message: `Could not admit full-review after AI rebase for PR #${input.prNumber}: ${reviewErr instanceof Error ? reviewErr.message : String(reviewErr)}`,
					event: "rebase_workflow",
					number: input.prNumber,
					action: "review_admit_failed_after_ai_rebase",
				});
			}
		}

		console.log({
			message: `AI rebase complete for PR #${input.prNumber}`,
			event: "rebase_workflow",
			number: input.prNumber,
			action: "ai_rebase_complete",
		});
		return { acted: true, reason: "ai_rebase_complete" };
	}

	// ── 9. Medium/low confidence: stop and explain ────────────────────────────
	const haltedBody = renderRebaseStatusUpdate(
		"halted-confidence",
		resolution.reason,
		input.senderLogin,
		liveBot?.body ?? null,
	);
	await postOrUpdateComment(token, input.prNumber, liveBot, haltedBody);
	await swapReaction(
		token,
		input.triggerCommentId,
		input.triggerEyesReactionId,
	);
	console.log({
		message: `AI resolution halted (${resolution.confidence} confidence) for PR #${input.prNumber}`,
		event: "rebase_workflow",
		number: input.prNumber,
		confidence: resolution.confidence,
		reason: resolution.reason,
		action: "halted_confidence",
	});
	return {
		acted: false,
		reason: "low_confidence",
		confidence: resolution.confidence,
	};
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function parsePayload(payload: unknown): RebasePayload {
	const input = payload as Partial<RebasePayload>;
	if (
		typeof input.prNumber !== "number" ||
		(input.mode !== "rebase" && input.mode !== "rebaseWithConflicts") ||
		typeof input.triggerCommentId !== "number" ||
		typeof input.senderLogin !== "string"
	) {
		throw new Error(
			"[flue] rebase workflow requires payload { prNumber, mode, triggerCommentId, senderLogin }.",
		);
	}
	return {
		prNumber: input.prNumber,
		mode: input.mode,
		triggerCommentId: input.triggerCommentId,
		triggerEyesReactionId:
			typeof input.triggerEyesReactionId === "number"
				? input.triggerEyesReactionId
				: null,
		senderLogin: input.senderLogin,
	};
}

/** Remove the 👀 reaction and add 👍 to the trigger comment. Non-fatal. */
async function swapReaction(
	token: string,
	commentId: number,
	eyesReactionId: number | null,
): Promise<void> {
	if (eyesReactionId) {
		await removeReactionFromComment(token, commentId, eyesReactionId).catch(
			() => {},
		);
	}
	await addReactionToComment(token, commentId, "+1").catch(() => {});
}

/**
 * Use an AI agent to resolve conflicts between the PR branch and production.
 *
 * Strategy:
 *   1. Compare production...prHead to get the merge base and the commits on
 *      each side since then.
 *   2. For every file changed in the PR, check whether production also changed
 *      it after the merge base (potential conflict zone).
 *   3. Present both versions of each potentially conflicting file, plus the
 *      PR description and production commit messages, to the AI agent.
 *   4. Ask the agent to resolve and report its confidence.
 */
async function resolveConflictsWithAI(
	token: string,
	pr: Awaited<ReturnType<typeof getPullRequest>>,
	typedEnv: Record<string, string & unknown>,
): Promise<ConflictResolution> {
	const env = typedEnv;
	// Get the compare data: merge base + commits on each side.
	const [prVsProduction, productionRef] = await Promise.all([
		compareCommits(token, "production", pr.head.sha),
		getRef(token, "production"),
	]);

	const mergeBaseSha = prVsProduction.mergeBaseSha;
	const prCommits = prVsProduction.commits;

	// Files changed in the PR since merge base.
	const prMergeBase = await compareCommits(token, mergeBaseSha, pr.head.sha);
	const prChangedPaths = new Set(
		prMergeBase.commits.flatMap((_c) => [] as string[]),
	);

	// Simpler: use the compare endpoint files list which GitHub provides.
	// compareCommits returns commits but not file lists. We re-use
	// comparePullRequestHeads (already in github.ts) to get the changed files.
	// But since we want to avoid code duplication, we fetch it via the REST path.
	const prFilesRes = await fetch(
		`https://api.github.com/repos/cloudflare/cloudflare-docs/compare/${mergeBaseSha}...${pr.head.sha}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
				"User-Agent": "cloudflare-docs-agents",
			},
		},
	);
	const prFilesData = prFilesRes.ok
		? ((await prFilesRes.json()) as {
				files?: Array<{ filename: string }>;
			})
		: { files: [] };
	for (const f of prFilesData.files ?? []) {
		prChangedPaths.add(f.filename);
	}

	// Files changed on production since merge base.
	const productionFilesRes = await fetch(
		`https://api.github.com/repos/cloudflare/cloudflare-docs/compare/${mergeBaseSha}...${productionRef.sha}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
				"User-Agent": "cloudflare-docs-agents",
			},
		},
	);
	const productionFilesData = productionFilesRes.ok
		? ((await productionFilesRes.json()) as {
				files?: Array<{ filename: string }>;
			})
		: { files: [] };
	const productionChangedPaths = new Set(
		(productionFilesData.files ?? []).map((f) => f.filename),
	);

	// Intersection = files changed on both sides = potential conflict zone.
	const conflictCandidates = [...prChangedPaths].filter((p) =>
		productionChangedPaths.has(p),
	);

	if (conflictCandidates.length === 0) {
		// No overlapping files — rebase should be clean (shouldn't normally reach
		// here since the update-branch API already returned a conflict).
		return {
			confidence: "low",
			reason:
				"Could not identify specific conflicting files. Please resolve manually.",
			files: [],
		};
	}

	// Fetch both versions of each conflicting file.
	const fileContents = await Promise.all(
		conflictCandidates.slice(0, 10).map(async (path) => {
			const [prVersion, productionVersion, baseVersion] = await Promise.all([
				getRepoFileContent(token, path, pr.head.sha),
				getRepoFileContent(token, path, productionRef.sha),
				getRepoFileContent(token, path, mergeBaseSha),
			]);
			return { path, prVersion, productionVersion, baseVersion };
		}),
	);

	// Build the AI prompt context.
	const productionCommitMessages = prVsProduction.commits
		.map((c) => `- ${c.message.split("\n")[0]}`)
		.join("\n");

	const prCommitMessages = prCommits
		.map((c) => `- ${c.message.split("\n")[0]}`)
		.join("\n");

	const filesContext = fileContents
		.map(({ path, prVersion, productionVersion, baseVersion }) => {
			return [
				`### File: ${path}`,
				"",
				"**Common ancestor (merge base):**",
				"```",
				baseVersion ?? "(file did not exist at merge base)",
				"```",
				"",
				"**PR version (what this PR changes it to):**",
				"```",
				prVersion ?? "(file deleted in PR)",
				"```",
				"",
				"**Production version (what production has now):**",
				"```",
				productionVersion ?? "(file deleted on production)",
				"```",
			].join("\n");
		})
		.join("\n\n---\n\n");

	const prompt = [
		"You are resolving merge conflicts for a documentation pull request.",
		"",
		`PR title: ${pr.title}`,
		`PR description: ${pr.body ?? "(none)"}`,
		"",
		`Commits on this PR since merge base:`,
		prCommitMessages,
		"",
		`Commits on production since merge base (these created the conflicts):`,
		productionCommitMessages,
		"",
		"The following files were changed by BOTH the PR and production, creating conflicts.",
		"For each file, you are given the merge base version, the PR version, and the production version.",
		"",
		filesContext,
		"",
		"Your task:",
		"1. For each file, produce the correctly merged version that incorporates both the PR's intent and the production changes.",
		"2. Assess your confidence in the resolution: high, medium, or low.",
		"   - high: you are certain the resolution is correct and preserves both intents without ambiguity.",
		"   - medium: the resolution is your best guess but there is ambiguity.",
		"   - low: you cannot confidently resolve the conflict.",
		"3. If confidence is medium or low, explain specifically why.",
		"",
		"Respond with valid JSON matching this exact schema:",
		"```json",
		JSON.stringify(
			{
				confidence: "high | medium | low",
				reason:
					"Explanation. If high, say why you are confident. If medium/low, explain the ambiguity.",
				files: [
					{
						path: "path/to/file",
						content: "full resolved file content",
					},
				],
			},
			null,
			2,
		),
		"```",
		"",
		"Only include files in the `files` array if confidence is high. Otherwise files can be an empty array.",
	].join("\n");

	// One-shot AI call via Workers AI binding — no tools or file system access
	// needed, just structured JSON reasoning over the file contents.
	const ai = env.AI as unknown as Ai;
	const aiResponse = await ai.run(
		"@cf/moonshotai/kimi-k2.7-code" as Parameters<typeof ai.run>[0],
		{
			messages: [
				{
					role: "system",
					content:
						"You are an expert in resolving documentation merge conflicts. Respond only with the requested JSON. No prose outside the JSON.",
				},
				{ role: "user", content: prompt },
			],
		} as Parameters<typeof ai.run>[1],
	);

	const text =
		typeof aiResponse === "string"
			? aiResponse
			: typeof (aiResponse as { response?: string }).response === "string"
				? (aiResponse as { response: string }).response
				: JSON.stringify(aiResponse);

	// Extract JSON from the response (may be wrapped in a ```json fence).
	const jsonMatch =
		text.match(/```json\s*([\s\S]+?)\s*```/) ?? text.match(/(\{[\s\S]+\})/);

	if (!jsonMatch) {
		return {
			confidence: "low",
			reason:
				"AI did not return a parseable JSON response. Please resolve manually.",
			files: [],
		};
	}

	const parsed = JSON.parse(jsonMatch[1]) as ConflictResolution;
	return {
		confidence:
			parsed.confidence === "high" ||
			parsed.confidence === "medium" ||
			parsed.confidence === "low"
				? parsed.confidence
				: "low",
		reason: parsed.reason ?? "",
		files: Array.isArray(parsed.files) ? parsed.files : [],
	};
}

/**
 * Apply the AI-resolved file contents to the PR branch using the Git Data API.
 *
 * Creates new blobs for each resolved file, builds a new tree on top of the
 * current production HEAD tree, creates a new commit, then force-updates the
 * PR branch ref to point to it.
 *
 * This effectively rebases the PR onto production with the conflicts resolved.
 */
async function applyResolution(
	token: string,
	pr: Awaited<ReturnType<typeof getPullRequest>>,
	resolution: ConflictResolution,
): Promise<void> {
	if (resolution.files.length === 0) {
		throw new Error("No resolved files to apply.");
	}

	// Get the current production HEAD to rebase onto.
	const productionRef = await getRef(token, "production");
	const productionCommit = await getGitCommit(token, productionRef.sha);

	// Get the PR head commit for the commit message.
	const prCommit = await getGitCommit(token, pr.head.sha);

	// Build new blobs for each resolved file.
	const treeUpdates = await Promise.all(
		resolution.files.map(async ({ path, content }) => {
			const blobSha = await createBlob(token, content);
			return {
				path,
				mode: "100644" as const,
				type: "blob" as const,
				sha: blobSha,
			};
		}),
	);

	// Create a new tree based on the production HEAD tree, applying only the
	// resolved files on top.
	const newTreeSha = await createTree(
		token,
		productionCommit.treeSha,
		treeUpdates,
	);

	// Create a new commit whose parent is the production HEAD.
	const commitMessage = [
		prCommit.message,
		"",
		`Conflicts resolved by cloudflare-docs-bot during rebase onto production.`,
	].join("\n");

	const newCommitSha = await createGitCommit(token, commitMessage, newTreeSha, [
		productionRef.sha,
	]);

	// Force-update the PR branch to point to the new commit.
	await updateRef(token, pr.head.ref, newCommitSha);
}
