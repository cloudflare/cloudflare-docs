/**
 * Diff fetch + self-heal for the review specialists.
 *
 * Both the code-review and style-guide specialists self-fetch the PR file list
 * for the diff mode the orchestrator chose. Incremental mode is the tricky one:
 * the orchestrator computes it as a three-dot compare of the last-reviewed head
 * SHA against the current head SHA. That is correct only when the branch is a
 * clean forward extension of the last-reviewed SHA (a normal push).
 *
 * When the branch has been rebased, force-pushed, or had `production` merged
 * into it ("Update branch"), the compare drags in upstream commits that are not
 * part of the PR — so the review flags findings in files the PR never touched
 * (the cross-PR-looking contamination bug). GitHub's compare `status` and the
 * PR's authoritative net-diff file set let us detect every one of those cases
 * and self-heal to the full PR diff instead.
 *
 * `fetchFilesForDiffMode` centralizes this so both specialists behave
 * identically — the incremental file list is trusted ONLY when:
 *   1. the compare succeeded (base SHA still exists), AND
 *   2. status is "ahead" or "identical" (base is an ancestor of head), AND
 *   3. every file in the incremental delta is part of the PR's net diff.
 * Any violation falls back to the full PR diff.
 */
import type { DiffMode } from "./code-review-state";
import {
	comparePullRequestHeads,
	getPullRequestFiles,
	type PullRequestFile,
} from "./github";

/** Why the resolved diff differs (or not) from the requested mode. */
export type DiffSelfHealReason =
	| "requested_full"
	| "clean_incremental"
	| "base_sha_gone"
	| "diverged"
	| "upstream_files_present";

export interface FetchFilesResult {
	files: PullRequestFile[];
	/** The mode actually used after any self-heal. */
	effectiveMode: "full" | "incremental";
	/** Explanation for the chosen mode — surfaced in specialist logs. */
	reason: DiffSelfHealReason;
}

/**
 * Fetch the PR file list for the requested diff mode, self-healing incremental
 * to full whenever the incremental delta cannot be trusted (see module docs).
 *
 * Full mode always uses the PR's authoritative net-diff endpoint.
 */
export async function fetchFilesForDiffMode(
	token: string,
	prNumber: number,
	diffMode: DiffMode,
): Promise<FetchFilesResult> {
	if (diffMode.type === "full") {
		return {
			files: await getPullRequestFiles(token, prNumber),
			effectiveMode: "full",
			reason: "requested_full",
		};
	}

	const full = async (
		reason: Exclude<DiffSelfHealReason, "requested_full" | "clean_incremental">,
	): Promise<FetchFilesResult> => ({
		files: await getPullRequestFiles(token, prNumber),
		effectiveMode: "full",
		reason,
	});

	// Incremental. SHA-pinned three-dot compare of last-reviewed head → head.
	const compare = await comparePullRequestHeads(
		token,
		diffMode.fromSha,
		diffMode.toSha,
	);

	// Base SHA garbage-collected (e.g. force-push then GC) — compare 404s.
	if (!compare) {
		return full("base_sha_gone");
	}

	// Base is not an ancestor of head — rebase or force-push. The compare's
	// merge-base regressed to the old fork point, so `files` includes every
	// upstream commit the branch now contains. Not a trustworthy incremental.
	if (compare.status !== "ahead" && compare.status !== "identical") {
		return full("diverged");
	}

	// Even when head is strictly ahead, a merge of `production` into the branch
	// ("Update branch") pulls upstream files into the delta. Bound the delta to
	// the PR's authoritative net diff: if the compare touched any file that is
	// not part of the PR, the incremental list is contaminated — self-heal.
	const prFiles = await getPullRequestFiles(token, prNumber);
	const prFileNames = new Set(prFiles.map((f) => f.filename));
	const hasUpstreamFiles = compare.files.some(
		(f) => !prFileNames.has(f.filename),
	);
	if (hasUpstreamFiles) {
		return {
			files: prFiles,
			effectiveMode: "full",
			reason: "upstream_files_present",
		};
	}

	// Clean incremental: every changed file belongs to the PR and head is a
	// forward extension of the last-reviewed SHA. Trust the compare delta.
	return {
		files: compare.files,
		effectiveMode: "incremental",
		reason: "clean_incremental",
	};
}
