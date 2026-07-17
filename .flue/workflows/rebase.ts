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
	comparePullRequestHeads,
	createBlob,
	createGitCommit,
	createTree,
	getGitCommit,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	getRepoFileContent,
	getRef,
	getTree,
	pollForBranchUpdate,
	removeReactionFromComment,
	updatePullRequestBranch,
	updateRef,
	type TreeUpdate,
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

	// A fork PR has head.repo.full_name !== base.repo.full_name.
	// head.repo can be null when the fork has been deleted — treat that as a
	// fork (we can't push to it regardless).
	const isFork = (pr.head.repo?.full_name ?? "") !== pr.base.repo.full_name;

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
		// If GitHub accepted the request asynchronously (202), poll until the
		// branch's head SHA changes before declaring success. A timeout is
		// treated as success (the operation is still likely completing) — the
		// subsequent /full-review will run against whatever head SHA is current.
		if (rebaseResult.async) {
			const priorSha = pr.head.sha;
			console.log({
				message: `Rebase async for PR #${input.prNumber} — polling for branch update`,
				event: "rebase_workflow",
				number: input.prNumber,
				action: "rebase_polling",
			});
			await pollForBranchUpdate(token, input.prNumber, priorSha);
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

	let resolution: Awaited<ReturnType<typeof resolveConflictsWithAI>>;
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
 *
 * Also returns allPrFiles so that applyResolution can include non-conflicting
 * PR changes in the final tree (preventing them from being silently dropped).
 */

/** A file entry with rename metadata preserved from the GitHub compare API. */
interface PrFileEntry {
	path: string;
	status: string;
	/** Set when status === "renamed"; the path the file had before the rename. */
	previousPath?: string;
}

async function resolveConflictsWithAI(
	token: string,
	pr: Awaited<ReturnType<typeof getPullRequest>>,
	typedEnv: Record<string, string & unknown>,
): Promise<
	ConflictResolution & {
		allPrFiles: PrFileEntry[];
		conflictCandidateSet: ReadonlySet<string>;
		/**
		 * Maps each conflict candidate (PR path) to the path where the resolved
		 * content should be written in the rebased tree.
		 *
		 * - Normal (same path on both sides): A → A
		 * - Production renamed A→C, PR changed A: A → C (write to production's new path)
		 * - PR renamed A→B, production changed A: B → B (write to PR's new path)
		 * - Both sides renamed A differently (A→B by PR, A→C by prod): B → C
		 *
		 * Separate from the read paths used when fetching file content.
		 */
		conflictWritePathMap: ReadonlyMap<string, string>;
		mergeBaseSha: string;
		productionRefSha: string;
	}
> {
	// Get the merge base and current production HEAD in parallel.
	const [prVsProduction, productionRef] = await Promise.all([
		compareCommits(token, "production", pr.head.sha),
		getRef(token, "production"),
	]);

	const mergeBaseSha = prVsProduction.mergeBaseSha;

	// compareCommits("production", pr.head.sha) returns the PR's commits
	// (commits reachable from prHead but not from production). We need the
	// production-side commits separately to populate the prompt correctly.
	const prCommits = prVsProduction.commits;

	// Use comparePullRequestHeads which already paginates via Link headers and
	// handles ref encoding. Returns null on 404 (no common history), which we
	// treat as an empty file list.
	const toPrFileEntries = (
		result: Awaited<ReturnType<typeof comparePullRequestHeads>>,
	): PrFileEntry[] => {
		if (!result) return [];
		return result.files.map((f) => ({
			path: f.filename,
			status: f.status,
			previousPath: f.previous_filename,
		}));
	};

	// Fetch files changed on each side since the merge base in parallel, plus
	// production commits for the AI prompt.
	const [prFiles, productionFiles, productionCommits] = await Promise.all([
		comparePullRequestHeads(token, mergeBaseSha, pr.head.sha).then(
			toPrFileEntries,
		),
		comparePullRequestHeads(token, mergeBaseSha, productionRef.sha).then(
			toPrFileEntries,
		),
		compareCommits(token, mergeBaseSha, productionRef.sha).then(
			(r) => r.commits,
		),
	]);

	const prChangedPaths = new Set(prFiles.map((f) => f.path));
	const productionChangedPaths = new Set(productionFiles.map((f) => f.path));

	// Map from a production file's old path to its new path for renames.
	// e.g. production renamed A→C: productionRenameMap.get("A") === "C".
	// This lets us detect the symmetric case (PR changed A, production renamed A)
	// AND correctly fetch the production version from C instead of A.
	const productionRenameMap = new Map<string, string>(
		productionFiles.flatMap((f) =>
			f.previousPath ? [[f.previousPath, f.path]] : [],
		),
	);

	// Intersection = files changed on both sides = potential conflict zone.
	// Four cases:
	//   1. Same path changed on both sides (common case).
	//   2. PR renamed A→B, production changed A (PR previousPath in production paths).
	//   3. Production renamed A→C, PR changed A (PR path in productionRenameMap).
	//   4. Both sides renamed the same file differently — caught by cases 2 or 3.
	const conflictCandidates = [...prChangedPaths].filter((p) => {
		if (productionChangedPaths.has(p)) return true;
		if (productionRenameMap.has(p)) return true; // case 3
		const entry = prFiles.find((f) => f.path === p);
		return entry?.previousPath
			? productionChangedPaths.has(entry.previousPath) ||
					productionRenameMap.has(entry.previousPath)
			: false;
	});

	// Per-candidate metadata: separate read paths (where to fetch content from)
	// from the write path (where to store the resolution in the rebased tree).
	//
	// Case 1 – same path changed on both sides (A modified by both):
	//   writePath=A, productionReadPath=A, baseReadPath=A
	// Case 2 – PR renamed A→B, production changed A (candidate=B, previousPath=A):
	//   writePath=B, productionReadPath=A, baseReadPath=A
	//   (production still has A; B doesn't exist on production or base)
	// Case 3 – production renamed A→C, PR changed A (candidate=A):
	//   writePath=C, productionReadPath=C, baseReadPath=A
	//   (production's content is at C; base is still at A)
	// Case 4 – both sides renamed A (PR: A→B, production: A→C) (candidate=B):
	//   writePath=C, productionReadPath=C, baseReadPath=A
	//   (production's rename wins for the write destination)
	interface ConflictMeta {
		writePath: string;
		productionReadPath: string;
		baseReadPath: string;
	}
	const conflictMetaMap = new Map<string, ConflictMeta>(
		conflictCandidates.map((p) => {
			// Case 3/4: production renamed the PR's original path (or PR's new path).
			const productionNewPath = productionRenameMap.get(p);
			if (productionNewPath) {
				return [
					p,
					{
						writePath: productionNewPath,
						productionReadPath: productionNewPath,
						baseReadPath: p,
					},
				];
			}
			const entry = prFiles.find((f) => f.path === p);
			if (entry?.previousPath) {
				const fromPrevious = productionRenameMap.get(entry.previousPath);
				if (fromPrevious) {
					// Case 4: both sides renamed the same original file.
					return [
						p,
						{
							writePath: fromPrevious,
							productionReadPath: fromPrevious,
							baseReadPath: entry.previousPath,
						},
					];
				}
				// Case 2: PR renamed A→B, production changed A.
				return [
					p,
					{
						writePath: p,
						productionReadPath: entry.previousPath,
						baseReadPath: entry.previousPath,
					},
				];
			}
			// Case 1: same path on both sides.
			return [p, { writePath: p, productionReadPath: p, baseReadPath: p }];
		}),
	);

	// Derive the write-path map passed to applyResolution (prPath → writePath).
	const conflictWritePathMap = new Map<string, string>(
		[...conflictMetaMap.entries()].map(([p, m]) => [p, m.writePath]),
	);

	if (conflictCandidates.length === 0) {
		// No overlapping files — rebase should be clean (shouldn't normally reach
		// here since the update-branch API already returned a conflict).
		return {
			confidence: "low",
			reason:
				"Could not identify specific conflicting files. Please resolve manually.",
			files: [],
			allPrFiles: prFiles,
			conflictCandidateSet: new Set(conflictCandidates),
			conflictWritePathMap,
			mergeBaseSha,
			productionRefSha: productionRef.sha,
		};
	}

	// Hard cap at 10 conflict candidates to bound AI prompt size and cost.
	// Surface an explicit halted status rather than silently truncating.
	const CONFLICT_CAP = 10;
	if (conflictCandidates.length > CONFLICT_CAP) {
		return {
			confidence: "low",
			reason: `Too many conflicting files (${conflictCandidates.length}) to resolve automatically — limit is ${CONFLICT_CAP}. Please resolve conflicts manually.`,
			files: [],
			allPrFiles: prFiles,
			conflictCandidateSet: new Set(conflictCandidates),
			conflictWritePathMap,
			mergeBaseSha,
			productionRefSha: productionRef.sha,
		};
	}

	// Fetch all three versions of each conflicting file using the correct read
	// paths from conflictMetaMap. Using p directly for all three fetches was
	// wrong for rename cases where the file lives at a different path on
	// production or in the base.
	const fileContents = await Promise.all(
		conflictCandidates.map(async (path) => {
			const meta = conflictMetaMap.get(path)!;
			const isProductionRename =
				meta.productionReadPath !== path &&
				!prFiles.find((f) => f.path === path)?.previousPath;
			const isPrRename = !!prFiles.find((f) => f.path === path)?.previousPath;
			const [prVersion, productionVersion, baseVersion] = await Promise.all([
				getRepoFileContent(token, path, pr.head.sha),
				getRepoFileContent(token, meta.productionReadPath, productionRef.sha),
				getRepoFileContent(token, meta.baseReadPath, mergeBaseSha),
			]);
			return {
				path,
				meta,
				isProductionRename,
				isPrRename,
				prVersion,
				productionVersion,
				baseVersion,
			};
		}),
	);

	// Build the AI prompt context with correctly attributed commit messages.
	const prCommitMessages = prCommits
		.map((c) => `- ${c.message.split("\n")[0]}`)
		.join("\n");

	const productionCommitMessages = productionCommits
		.map((c) => `- ${c.message.split("\n")[0]}`)
		.join("\n");

	const filesContext = fileContents
		.map(
			({
				path,
				meta,
				isProductionRename,
				isPrRename,
				prVersion,
				productionVersion,
				baseVersion,
			}) => {
				let renameNote = "";
				let productionHeader =
					"**Production version (what production has now):**";
				// Case 4: both the PR and production renamed the same base file.
				// meta.writePath (production's new name) differs from path (PR's new name).
				const isBothSidesRenamed = isPrRename && meta.writePath !== path;
				if (isBothSidesRenamed) {
					const entry = prFiles.find((f) => f.path === path);
					renameNote = `Note: both sides renamed this file. This PR renamed \`${entry?.previousPath ?? "?"}\` to \`${path}\`; production renamed it to \`${meta.writePath}\`. The production content is shown at \`${meta.productionReadPath}\`. Return the resolved content at path \`${meta.writePath}\`.`;
					productionHeader = `**Production version (at \`${meta.productionReadPath}\`, where production moved this file):**`;
				} else if (isProductionRename) {
					renameNote = `Note: production renamed \`${path}\` to \`${meta.productionReadPath}\`. Return the resolved content at path \`${meta.writePath}\`.`;
					productionHeader = `**Production version (at \`${meta.productionReadPath}\`, where production moved this file):**`;
				} else if (isPrRename) {
					const entry = prFiles.find((f) => f.path === path);
					renameNote = `Note: this PR renamed \`${entry?.previousPath ?? "?"}\` to \`${path}\`. Production's content is at \`${meta.productionReadPath}\` (the original path). Return the resolved content at path \`${meta.writePath}\`.`;
					productionHeader = `**Production version (at \`${meta.productionReadPath}\`, the original path before this PR renamed it):**`;
				}
				return [
					`### File: ${path}`,
					...(renameNote ? ["", renameNote] : []),
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
					productionHeader,
					"```",
					productionVersion ?? "(file deleted on production)",
					"```",
				].join("\n");
			},
		)
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
	const ai = typedEnv.AI as unknown as Ai;
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

	// Parse the AI response. Try strategies in order:
	//   1. Whole-response JSON.parse (model followed the system prompt and returned
	//      only JSON — most reliable, handles `}` inside string values correctly).
	//   2. ```json fence extraction (model wrapped its response in a fence).
	// The bare-object regex fallback is intentionally omitted: non-greedy `}` stops
	// at the first closing brace, truncating any object whose content contains `}`.
	const lowConfidenceFallback = {
		confidence: "low" as const,
		reason:
			"AI did not return a parseable JSON response. Please resolve manually.",
		files: [] as { path: string; content: string }[],
		allPrFiles: prFiles,
		conflictCandidateSet: new Set(conflictCandidates),
		conflictWritePathMap,
		mergeBaseSha,
		productionRefSha: productionRef.sha,
	};

	type ParsedResponse = {
		confidence?: unknown;
		reason?: unknown;
		files?: unknown;
	};
	let parsed: ParsedResponse | null = null;

	// Strategy 1: try parsing the whole response directly.
	try {
		parsed = JSON.parse(text.trim()) as ParsedResponse;
	} catch {
		// not plain JSON — try fence extraction below
	}

	// Strategy 2: extract from a ```json ... ``` fence.
	if (!parsed) {
		const fenceMatch = text.match(/```json\s*([\s\S]+?)\s*```/);
		if (!fenceMatch) return lowConfidenceFallback;
		try {
			parsed = JSON.parse(fenceMatch[1]) as ParsedResponse;
		} catch {
			return lowConfidenceFallback;
		}
	}

	// Both strategies either returned or set parsed; null is impossible here.
	const parsedResponse = parsed as ParsedResponse;

	// Validate each file entry — malformed entries from the model are dropped
	// rather than passed to createBlob with undefined arguments.
	const rawFiles = Array.isArray(parsedResponse.files)
		? parsedResponse.files
		: [];
	const validatedFiles = (rawFiles as unknown[]).filter(
		(entry): entry is { path: string; content: string } =>
			typeof (entry as Record<string, unknown>)?.path === "string" &&
			typeof (entry as Record<string, unknown>)?.content === "string",
	);

	let confidence: ConflictResolution["confidence"] =
		parsedResponse.confidence === "high" ||
		parsedResponse.confidence === "medium" ||
		parsedResponse.confidence === "low"
			? parsedResponse.confidence
			: "low";
	let reason =
		typeof parsedResponse.reason === "string" ? parsedResponse.reason : "";

	// If the model claimed high confidence but omitted one or more conflict
	// candidates from the files array, downgrade to medium before returning so
	// the user gets a clear "halted-confidence" status rather than a cryptic
	// "failed" error from the completeness check inside applyResolution.
	if (confidence === "high") {
		const resolvedResponsePaths = new Set(validatedFiles.map((f) => f.path));
		const missingCandidates = conflictCandidates.filter((candidate) => {
			const writePath = conflictWritePathMap.get(candidate) ?? candidate;
			return (
				!resolvedResponsePaths.has(candidate) &&
				!resolvedResponsePaths.has(writePath)
			);
		});
		if (missingCandidates.length > 0) {
			confidence = "medium";
			reason = `AI claimed high confidence but omitted ${missingCandidates.length} conflict candidate(s): ${missingCandidates.join(", ")}. Please resolve manually.`;
		}
	}

	return {
		confidence,
		reason,
		files: validatedFiles,
		allPrFiles: prFiles,
		conflictCandidateSet: new Set(conflictCandidates),
		conflictWritePathMap,
		mergeBaseSha,
		productionRefSha: productionRef.sha,
	};
}

/**
 * Apply the AI-resolved conflict files to the PR branch using the Git Data API.
 *
 * Builds the new tree from the production HEAD, applying:
 *   - All non-conflicting PR changes (preserving additions, deletions, modifications)
 *   - AI-resolved content for the conflict files
 *
 * This correctly rebases the full PR onto production without silently dropping
 * any of the PR's changes.
 */
async function applyResolution(
	token: string,
	pr: Awaited<ReturnType<typeof getPullRequest>>,
	resolution: ConflictResolution & {
		allPrFiles: PrFileEntry[];
		conflictCandidateSet: ReadonlySet<string>;
		conflictWritePathMap: ReadonlyMap<string, string>;
		mergeBaseSha: string;
		productionRefSha: string;
	},
): Promise<void> {
	if (resolution.files.length === 0) {
		throw new Error("No resolved files to apply.");
	}

	// Build a map of AI-resolved content keyed by the PRODUCTION path (where the
	// content should land in the rebased tree). The model is instructed to return
	// paths at the production location for rename conflicts (A→C), so we also
	// accept entries keyed by the production path directly. For safety, restrict
	// to paths that correspond to known conflict candidates.
	const resolvedByProductionPath = new Map<string, string>();
	for (const { path, content } of resolution.files) {
		// Accept if `path` is a conflict candidate (normal case).
		if (resolution.conflictCandidateSet.has(path)) {
			const productionPath = resolution.conflictWritePathMap.get(path) ?? path;
			resolvedByProductionPath.set(productionPath, content);
			continue;
		}
		// Also accept if `path` is the production-side new path of a rename
		// conflict (the model returned the renamed path directly).
		const isProductionNewPath = [
			...resolution.conflictWritePathMap.values(),
		].includes(path);
		if (isProductionNewPath) {
			resolvedByProductionPath.set(path, content);
		}
	}

	// Assert every conflict candidate has an AI-resolved entry. If the model
	// omitted one, falling through to the PR version would silently drop
	// production changes, so we abort instead.
	for (const candidate of resolution.conflictCandidateSet) {
		const writePath =
			resolution.conflictWritePathMap.get(candidate) ?? candidate;
		if (!resolvedByProductionPath.has(writePath)) {
			throw new Error(
				`AI resolution is missing conflict candidate: ${candidate} (expected at ${writePath}). Aborting to avoid data loss.`,
			);
		}
	}

	// Re-fetch the production HEAD immediately before committing so the new
	// commit is parented on the current tip rather than a snapshot taken before
	// the (potentially long) AI resolution call.
	const freshProductionRef = await getRef(token, "production");
	if (freshProductionRef.sha !== resolution.productionRefSha) {
		// Production advanced while the AI was working. Abort so we don't
		// silently parent the commit on a stale SHA — the user can retry.
		throw new Error(
			`Production branch moved during AI resolution (was ${resolution.productionRefSha.slice(0, 7)}, now ${freshProductionRef.sha.slice(0, 7)}). Please retry /rebaseWithConflicts.`,
		);
	}

	// Get the production commit's tree to build on top of.
	const productionCommit = await getGitCommit(token, freshProductionRef.sha);

	// Get the PR head commit and its full tree. We use the tree to look up blob
	// SHAs and modes for non-conflicting files rather than going through the
	// contents API, which (a) can't handle binary files and (b) strips mode info.
	const prCommit = await getGitCommit(token, pr.head.sha);
	const prTree = await getTree(token, prCommit.treeSha);
	const prEntryMap = new Map(
		prTree
			.filter((e) => e.type === "blob")
			.map((e) => [e.path, { sha: e.sha, mode: e.mode as TreeUpdate["mode"] }]),
	);

	// For every file changed by the PR build a tree update:
	//   - Conflict file:   use the AI-resolved content (text, via createBlob).
	//   - Deleted file:    remove from the tree (sha: null).
	//   - Renamed file:    add at new path + emit a deletion for the old path.
	//   - Addition/mod:    copy blob SHA + mode directly from the PR head tree,
	//                      handling binary files and executable bits correctly.
	const treeUpdates: TreeUpdate[] = [];

	await Promise.all(
		resolution.allPrFiles.map(
			async ({ path, status, previousPath }): Promise<void> => {
				// Conflict file — use AI-resolved content.
				// The production path is where the content belongs in the rebased tree.
				// For a production-renamed conflict (A→C, PR changed A), productionPath
				// is C: we write resolved content to C and delete A from the tree.
				const productionPath =
					resolution.conflictWritePathMap.get(path) ?? path;
				const resolvedContent = resolvedByProductionPath.get(productionPath);
				if (resolvedContent !== undefined) {
					// Remove the PR's old path if it differs from the production path.
					// This handles production-rename conflicts (A→C: delete A, write C)
					// as well as PR-rename conflicts where a previous-path deletion is
					// also needed.
					if (productionPath !== path) {
						treeUpdates.push({
							path,
							mode: "100644",
							type: "blob",
							sha: null,
						});
					}
					// Also clean up the PR's own previousPath for renamed conflict files.
					if (status === "renamed" && previousPath) {
						treeUpdates.push({
							path: previousPath,
							mode: "100644",
							type: "blob",
							sha: null,
						});
					}
					// Preserve the original file mode (100755 for executables, etc.)
					// by looking it up from the PR head tree. Fall back to 100644.
					const originalMode =
						(prEntryMap.get(path)?.mode as TreeUpdate["mode"]) ?? "100644";
					const blobSha = await createBlob(token, resolvedContent);
					treeUpdates.push({
						path: productionPath,
						mode: originalMode,
						type: "blob",
						sha: blobSha,
					});
					return;
				}

				// Deleted file — remove from tree.
				if (status === "removed") {
					treeUpdates.push({ path, mode: "100644", type: "blob", sha: null });
					return;
				}

				// Renamed file — remove old path before adding new path below.
				if (status === "renamed" && previousPath) {
					treeUpdates.push({
						path: previousPath,
						mode: "100644",
						type: "blob",
						sha: null,
					});
				}

				// Non-conflicting addition or modification (including the new path of a
				// rename) — copy the blob SHA and mode directly from the PR head tree.
				// This preserves binary files (no base64 round-trip) and executable bits.
				const entry = prEntryMap.get(path);
				if (!entry || entry.sha === null) {
					throw new Error(
						`File ${path} expected in PR tree but not found. Cannot apply non-conflicting change.`,
					);
				}
				treeUpdates.push({
					path,
					mode: entry.mode,
					type: "blob",
					sha: entry.sha,
				});
			},
		),
	);

	// Deduplicate and sort treeUpdates. Because the entries are pushed from
	// concurrent async callbacks the array order is nondeterministic, and the
	// same path may appear more than once (e.g. a conflict file that is also
	// renamed generates both a deletion and a blob entry). Deduplicate by keeping
	// the last entry per path (last-write-wins) so deletions are not overridden
	// by stale blob entries, then sort lexicographically for deterministic output.
	const seenPaths = new Map<string, TreeUpdate>();
	for (const u of treeUpdates) {
		seenPaths.set(u.path, u);
	}
	const dedupedUpdates = [...seenPaths.values()].sort((a, b) =>
		a.path.localeCompare(b.path),
	);

	// Create a new tree rooted at the production HEAD tree with all PR changes applied.
	const newTreeSha = await createTree(
		token,
		productionCommit.treeSha,
		dedupedUpdates,
	);

	// Create a new commit whose parent is the (re-verified) production HEAD.
	// Use the PR title rather than the last commit message — for multi-commit PRs
	// the last commit is often something like "address review feedback", which
	// is uninformative in history.
	const commitMessage = [
		pr.title,
		"",
		`Conflicts resolved by cloudflare-docs-bot during rebase onto production.`,
	].join("\n");

	const newCommitSha = await createGitCommit(token, commitMessage, newTreeSha, [
		freshProductionRef.sha,
	]);

	// Guard against a concurrent push to the PR branch during the AI resolution.
	// If the author pushed between when we read pr.head.sha and now, silently
	// overwriting that push would lose their work. Abort and let them retry.
	const currentPr = await getPullRequest(token, pr.number);
	if (currentPr.head.sha !== pr.head.sha) {
		throw new Error(
			`PR branch moved during AI resolution (was ${pr.head.sha.slice(0, 7)}, now ${currentPr.head.sha.slice(0, 7)}). Please retry /rebaseWithConflicts.`,
		);
	}

	// Force-update the PR branch to point to the new commit.
	await updateRef(token, pr.head.ref, newCommitSha);
}
