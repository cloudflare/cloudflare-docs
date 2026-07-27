/**
 * Rebase conflict resolution — trusted domain logic (D6).
 *
 * Ported near-verbatim from the 0.11 `workflows/rebase.ts` helpers
 * `resolveConflictsWithAI` and `applyResolution`. All the deterministic parts —
 * conflict detection, the four-case rename read/write path mapping, the
 * file-cap / binary / conflict-cap short-circuits, and the Git Data API tree
 * build with production-moved and PR-branch-moved guards — stay in ordinary
 * TypeScript exactly as they were in production.
 *
 * The only change: the inline `session.skill("rebase-conflict", …)` call is
 * lifted out behind a `runAgent` callback so the AI round trip lives in the 2.0
 * agent + driver (`agents/rebase-conflict-resolver.ts`,
 * `lib/run-rebase-conflict.ts`). `resolveConflictsWithAI` prepares the three
 * versions of each conflicting file, hands them to `runAgent`, then applies the
 * same high-confidence completeness downgrade the workflow relied on.
 */
import * as v from "valibot";
import {
	compareCommits,
	comparePullRequestHeads,
	createBlob,
	createGitCommit,
	createTree,
	getGitCommit,
	getRef,
	getRepoFileContent,
	getPullRequest,
	getTree,
	updateRef,
	type GitHubPullRequest,
	type TreeUpdate,
} from "./github";

/** Structured response schema from the AI conflict resolver. */
export const ConflictResolutionFromModelSchema = v.object({
	confidence: v.picklist(["high", "medium", "low"]),
	reason: v.string(),
	files: v.array(
		v.object({
			path: v.string(),
			content: v.string(),
		}),
	),
});

export type ConflictResolutionData = v.InferOutput<
	typeof ConflictResolutionFromModelSchema
>;

/** Structured response from the AI conflict resolver. */
export interface ConflictResolution {
	confidence: "high" | "medium" | "low";
	reason: string;
	files: Array<{ path: string; content: string }>;
}

/** A file entry with rename metadata preserved from the GitHub compare API. */
interface PrFileEntry {
	path: string;
	status: string;
	/** Set when status === "renamed"; the path the file had before the rename. */
	previousPath?: string;
}

/** One conflicting file's three versions, prepared for the agent. */
export interface ConflictFileForAgent {
	path: string;
	writePath: string;
	renameNote?: string;
	baseVersion: string | null;
	prVersion: string | null;
	productionVersion: string | null;
}

/** Input handed to the rebase-conflict-resolver agent at dispatch time. */
export interface RebaseConflictAgentInput {
	prTitle: string;
	prDescription: string | null;
	prHeadSha: string;
	mergeBaseSha: string;
	productionHeadSha: string;
	productionCommits: Array<{ sha: string; message: string }>;
	conflictFiles: ConflictFileForAgent[];
	/** GitHub installation token backing the read_repo_file / get_commit_pr tools. */
	token: string;
}

/** Runs the AI conflict resolver; returns null on any failure (→ low-confidence fallback). */
export type RunConflictAgent = (
	input: RebaseConflictAgentInput,
) => Promise<ConflictResolutionData | null>;

/** The full result of {@link resolveConflictsWithAI}, incl. apply metadata. */
export type ResolvedConflicts = ConflictResolution & {
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
	 */
	conflictWritePathMap: ReadonlyMap<string, string>;
	mergeBaseSha: string;
	productionRefSha: string;
};

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
export async function resolveConflictsWithAI(
	token: string,
	pr: GitHubPullRequest,
	runAgent: RunConflictAgent,
): Promise<ResolvedConflicts> {
	// Get the merge base and current production HEAD in parallel.
	const [prVsProduction, productionRef] = await Promise.all([
		compareCommits(token, "production", pr.head.sha),
		getRef(token, "production"),
	]);

	const mergeBaseSha = prVsProduction.mergeBaseSha;

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

	// GitHub's compare API caps the file list at 300 entries even when paginated.
	// If we hit the cap, allPrFiles will be silently incomplete, which would cause
	// applyResolution to omit files from the rebased commit. Halt with a clear
	// message rather than committing an incomplete tree.
	const GITHUB_FILE_CAP = 300;
	if (prFiles.length >= GITHUB_FILE_CAP) {
		return {
			confidence: "low",
			reason: `This PR changes at least ${GITHUB_FILE_CAP} files, which exceeds the GitHub compare API cap. The AI cannot safely resolve conflicts without a complete file list. Please rebase manually.`,
			files: [],
			allPrFiles: prFiles,
			conflictCandidateSet: new Set<string>(),
			conflictWritePathMap: new Map<string, string>(),
			mergeBaseSha,
			productionRefSha: productionRef.sha,
		};
	}
	if (productionFiles.length >= GITHUB_FILE_CAP) {
		return {
			confidence: "low",
			reason: `Production has changed at least ${GITHUB_FILE_CAP} files since the merge base, which exceeds the GitHub compare API cap. Conflict detection may be incomplete. Please rebase manually.`,
			files: [],
			allPrFiles: prFiles,
			conflictCandidateSet: new Set<string>(),
			conflictWritePathMap: new Map<string, string>(),
			mergeBaseSha,
			productionRefSha: productionRef.sha,
		};
	}

	const prChangedPaths = new Set(prFiles.map((f) => f.path));
	const productionChangedPaths = new Set(productionFiles.map((f) => f.path));

	// Map from a production file's old path to its new path for renames.
	const productionRenameMap = new Map<string, string>(
		productionFiles.flatMap((f) =>
			f.previousPath ? [[f.previousPath, f.path]] : [],
		),
	);

	// Intersection = files changed on both sides = potential conflict zone.
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
				// Check whether production changed the PR's new path (p=B) directly.
				if (productionChangedPaths.has(p)) {
					return [
						p,
						{
							writePath: p,
							productionReadPath: p,
							baseReadPath: entry.previousPath,
						},
					];
				}
				// Case 2: PR renamed A→B, production changed A (the original path).
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

	// Detect duplicate write paths: two conflict candidates mapping to the
	// same production path would cause last-write-wins in resolvedByProductionPath
	// and treeUpdates, silently dropping one candidate's resolution.
	const writePathCounts = new Map<string, string[]>();
	for (const [prPath, writePath] of conflictWritePathMap) {
		const existing = writePathCounts.get(writePath) ?? [];
		existing.push(prPath);
		writePathCounts.set(writePath, existing);
	}
	const duplicates = [...writePathCounts.entries()].filter(
		([, prPaths]) => prPaths.length > 1,
	);
	if (duplicates.length > 0) {
		const dupDesc = duplicates
			.map(([writePath, prPaths]) => `${prPaths.join(" + ")} → ${writePath}`)
			.join("; ");
		return {
			confidence: "low",
			reason: `Multiple conflict candidates map to the same write path (${dupDesc}). Cannot safely resolve automatically — please rebase manually.`,
			files: [],
			allPrFiles: prFiles,
			conflictCandidateSet: new Set(conflictCandidates),
			conflictWritePathMap,
			mergeBaseSha,
			productionRefSha: productionRef.sha,
		};
	}

	if (conflictCandidates.length === 0) {
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

	// Reject binary conflict candidates before passing anything to the AI.
	const BINARY_EXTENSIONS = new Set([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"avif",
		"ico",
		"pdf",
		"woff",
		"woff2",
		"ttf",
		"otf",
		"eot",
		"zip",
		"tar",
		"gz",
		"br",
	]);
	const binaryConflicts = conflictCandidates.filter((p) => {
		const ext = p.split(".").pop()?.toLowerCase() ?? "";
		return BINARY_EXTENSIONS.has(ext);
	});
	if (binaryConflicts.length > 0) {
		return {
			confidence: "low",
			reason: `Cannot automatically resolve binary file conflicts: ${binaryConflicts.join(", ")}. Please resolve manually.`,
			files: [],
			allPrFiles: prFiles,
			conflictCandidateSet: new Set(conflictCandidates),
			conflictWritePathMap,
			mergeBaseSha,
			productionRefSha: productionRef.sha,
		};
	}

	// Hard cap at 10 conflict candidates to bound AI prompt size and cost.
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
	// paths from conflictMetaMap.
	const conflictFiles: ConflictFileForAgent[] = await Promise.all(
		conflictCandidates.map(async (path): Promise<ConflictFileForAgent> => {
			const meta = conflictMetaMap.get(path)!;
			const isPrRename = !!prFiles.find((f) => f.path === path)?.previousPath;
			const isProductionRename =
				meta.productionReadPath !== path && !isPrRename;
			const [prVersion, productionVersion, baseVersion] = await Promise.all([
				getRepoFileContent(token, path, pr.head.sha),
				getRepoFileContent(token, meta.productionReadPath, productionRef.sha),
				getRepoFileContent(token, meta.baseReadPath, mergeBaseSha),
			]);
			// Build a human-readable rename note for the agent.
			let renameNote: string | undefined;
			const isBothSidesRenamed = isPrRename && meta.writePath !== path;
			if (isBothSidesRenamed) {
				const entry = prFiles.find((f) => f.path === path);
				renameNote = `Both sides renamed this file. This PR renamed \`${entry?.previousPath ?? "?"}\` to \`${path}\`; production renamed it to \`${meta.writePath}\`. Return the resolved content at path \`${meta.writePath}\`.`;
			} else if (isProductionRename) {
				renameNote = `Production renamed \`${path}\` to \`${meta.productionReadPath}\`. Return the resolved content at path \`${meta.writePath}\`.`;
			} else if (isPrRename) {
				const entry = prFiles.find((f) => f.path === path);
				renameNote = `This PR renamed \`${entry?.previousPath ?? "?"}\` to \`${path}\`. Production's content is at the original path \`${meta.productionReadPath}\`. Return the resolved content at path \`${meta.writePath}\`.`;
			}
			return {
				path,
				writePath: meta.writePath,
				renameNote,
				baseVersion: baseVersion ?? null,
				prVersion: prVersion ?? null,
				productionVersion: productionVersion ?? null,
			};
		}),
	);

	const lowConfidenceFallback: ResolvedConflicts = {
		confidence: "low",
		reason:
			"AI conflict resolution did not return a usable result. Please resolve manually.",
		files: [],
		allPrFiles: prFiles,
		conflictCandidateSet: new Set(conflictCandidates),
		conflictWritePathMap,
		mergeBaseSha,
		productionRefSha: productionRef.sha,
	};

	// ── Run the AI agent (lifted behind the runAgent callback) ────────────────
	const data = await runAgent({
		prTitle: pr.title,
		prDescription: pr.body ?? null,
		prHeadSha: pr.head.sha,
		mergeBaseSha,
		productionHeadSha: productionRef.sha,
		productionCommits: productionCommits.map((c) => ({
			sha: c.sha,
			message: c.message.split("\n")[0],
		})),
		conflictFiles,
		token,
	});

	if (!data) return lowConfidenceFallback;

	let confidence: ConflictResolution["confidence"] = data.confidence;
	let reason = data.reason;
	const validatedFiles = data.files;

	// If the agent claimed high confidence but omitted conflict candidates,
	// downgrade to medium so the user gets a clear halted-confidence status
	// instead of a cryptic failure from the completeness check in applyResolution.
	if (confidence === "high") {
		const resolvedPaths = new Set(validatedFiles.map((f) => f.path));
		const missingCandidates = conflictCandidates.filter((candidate) => {
			const writePath = conflictWritePathMap.get(candidate) ?? candidate;
			return !resolvedPaths.has(candidate) && !resolvedPaths.has(writePath);
		});
		if (missingCandidates.length > 0) {
			confidence = "medium";
			const originalReason = reason ? ` Agent reason: "${reason}"` : "";
			reason = `Agent claimed high confidence but omitted ${missingCandidates.length} conflict candidate(s): ${missingCandidates.join(", ")}.${originalReason} Please resolve manually.`;
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
 * Builds the new tree from the production HEAD, applying all non-conflicting PR
 * changes plus AI-resolved content for the conflict files, correctly rebasing
 * the full PR onto production without silently dropping any of the PR's changes.
 */
export async function applyResolution(
	token: string,
	pr: GitHubPullRequest,
	resolution: ResolvedConflicts,
): Promise<void> {
	if (resolution.files.length === 0) {
		throw new Error("No resolved files to apply.");
	}

	// Build a map of AI-resolved content keyed by the PRODUCTION path (where the
	// content should land in the rebased tree).
	const resolvedByProductionPath = new Map<string, string>();
	for (const { path, content } of resolution.files) {
		if (resolution.conflictCandidateSet.has(path)) {
			const productionPath = resolution.conflictWritePathMap.get(path) ?? path;
			resolvedByProductionPath.set(productionPath, content);
			continue;
		}
		const isProductionNewPath = [
			...resolution.conflictWritePathMap.values(),
		].includes(path);
		if (isProductionNewPath) {
			resolvedByProductionPath.set(path, content);
		}
	}

	// Assert every conflict candidate has an AI-resolved entry.
	for (const candidate of resolution.conflictCandidateSet) {
		const writePath =
			resolution.conflictWritePathMap.get(candidate) ?? candidate;
		if (!resolvedByProductionPath.has(writePath)) {
			throw new Error(
				`AI resolution is missing conflict candidate: ${candidate} (expected at ${writePath}). Aborting to avoid data loss.`,
			);
		}
	}

	// Re-fetch the production HEAD immediately before committing.
	const freshProductionRef = await getRef(token, "production");
	if (freshProductionRef.sha !== resolution.productionRefSha) {
		throw new Error(
			`Production branch moved during AI resolution (was ${resolution.productionRefSha.slice(0, 7)}, now ${freshProductionRef.sha.slice(0, 7)}). Please retry /rebase.`,
		);
	}

	// Get the production commit's tree to build on top of.
	const productionCommit = await getGitCommit(token, freshProductionRef.sha);

	// Get the PR head commit and its full tree.
	const prCommit = await getGitCommit(token, pr.head.sha);
	const prTree = await getTree(token, prCommit.treeSha);
	const prEntryMap = new Map(
		prTree
			.filter((e) => e.type === "blob")
			.map((e) => [e.path, { sha: e.sha, mode: e.mode as TreeUpdate["mode"] }]),
	);

	const treeUpdates: TreeUpdate[] = [];

	await Promise.all(
		resolution.allPrFiles.map(
			async ({ path, status, previousPath }): Promise<void> => {
				const productionPath =
					resolution.conflictWritePathMap.get(path) ?? path;
				const resolvedContent = resolvedByProductionPath.get(productionPath);
				if (resolvedContent !== undefined) {
					// Remove the PR's old path if it differs from the production path.
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
					// Preserve the original file mode.
					const originalMode =
						((prEntryMap.get(path)?.mode ??
							(previousPath
								? prEntryMap.get(previousPath)?.mode
								: undefined)) as TreeUpdate["mode"] | undefined) ?? "100644";
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

				// Non-conflicting addition or modification.
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

	// Deduplicate (last-write-wins per path) and sort for deterministic output.
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
	const commitMessage = [
		pr.title,
		"",
		`Conflicts resolved by cloudflare-docs-bot during rebase onto production.`,
	].join("\n");

	// Re-verify production hasn't advanced while the tree was being built.
	const preCommitProductionRef = await getRef(token, "production");
	if (preCommitProductionRef.sha !== freshProductionRef.sha) {
		throw new Error(
			`Production branch moved during tree construction (was ${freshProductionRef.sha.slice(0, 7)}, now ${preCommitProductionRef.sha.slice(0, 7)}). Please retry /rebase.`,
		);
	}

	const newCommitSha = await createGitCommit(token, commitMessage, newTreeSha, [
		preCommitProductionRef.sha,
	]);

	// Guard against a concurrent push to the PR branch during the AI resolution.
	const currentPr = await getPullRequest(token, pr.number);
	if (currentPr.head.sha !== pr.head.sha) {
		throw new Error(
			`PR branch moved during AI resolution (was ${pr.head.sha.slice(0, 7)}, now ${currentPr.head.sha.slice(0, 7)}). Please retry /rebase.`,
		);
	}

	// Force-update the PR branch to point to the new commit.
	await updateRef(token, pr.head.ref, newCommitSha);
}
