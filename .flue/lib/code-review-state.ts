/**
 * Code-review state helpers.
 *
 * Extracts review metadata from bot comment bodies, partitions comment threads,
 * and manages the per-PR auto-review counter in R2.
 */
import type { GitHubIssueComment } from "./github";

// Marker embedded in every bot review comment — used to find and update it.
// Also used by render helpers; exported here as the single source of truth.
export const BOT_COMMENT_MARKER = "<!-- cloudflare-docs-flue-code-review -->";

// Regexes to extract metadata embedded in bot comment bodies.
const REVIEWED_HEAD_SHA_RE = /<!-- reviewed-head-sha: ([0-9a-f]{40}) -->/;
const REVIEWED_AT_RE = /<!-- reviewed-at: ([^\n]+) -->/;

/**
 * Extract the previously reviewed head SHA from a bot comment body.
 * Returns null if the body is absent or the marker is not found.
 */
export function extractReviewedHeadSha(body: string | null): string | null {
	if (!body) return null;
	return body.match(REVIEWED_HEAD_SHA_RE)?.[1] ?? null;
}

/**
 * Extract the reviewed-at timestamp from a bot comment body.
 * Returns null if the body is absent or the marker is not found.
 */
export function extractReviewedAt(body: string | null): string | null {
	if (!body) return null;
	return body.match(REVIEWED_AT_RE)?.[1] ?? null;
}

/**
 * Describes whether this run reviewed the full PR diff or only commits
 * since the last bot review. Passed to the reconciler so it can apply the
 * correct resolution logic.
 */
export type DiffMode =
	| { type: "full" }
	| { type: "incremental"; fromSha: string; toSha: string };

/**
 * Partition a flat comment list into the most recent bot review comment and
 * the human comments that came after it.
 *
 * Automated bots (GitHub Actions, Dependabot, etc.) are excluded from the
 * human list since they never address review findings.
 */
export function partitionComments(comments: GitHubIssueComment[]): {
	botComment: GitHubIssueComment | null;
	humanCommentsAfterBot: GitHubIssueComment[];
} {
	// Find the latest bot review comment (last one containing the marker).
	let botComment: GitHubIssueComment | null = null;
	for (const c of comments) {
		if (c.body?.includes(BOT_COMMENT_MARKER)) {
			botComment = c;
		}
	}

	// Use the reviewed-at timestamp embedded in the comment when present;
	// fall back to created_at. This handles the case where the comment was
	// updated after creation (e.g. a pending → complete transition).
	const botTimestamp =
		extractReviewedAt(botComment?.body ?? null) ??
		botComment?.created_at ??
		null;

	const humanCommentsAfterBot = comments.filter(
		(c) =>
			!c.body?.includes(BOT_COMMENT_MARKER) &&
			c.user?.type !== "Bot" &&
			(botTimestamp === null || c.created_at > botTimestamp),
	);

	return { botComment, humanCommentsAfterBot };
}

/**
 * Read the current automatic review count for a PR from R2.
 * Returns 0 if no counter exists yet.
 */
export async function getAutoReviewCount(
	bucket: R2Bucket,
	prNumber: number,
): Promise<number> {
	const key = `diffs/pr-${prNumber}/auto-review-count.json`;
	const obj = await bucket.get(key);
	if (!obj) return 0;
	const data = (await obj.json()) as { count?: number };
	return data.count ?? 0;
}

/**
 * Increment the automatic review counter for a PR in R2.
 * Takes the current count to avoid a read-modify-write race on the caller side.
 */
export async function incrementAutoReviewCount(
	bucket: R2Bucket,
	prNumber: number,
	current: number,
): Promise<void> {
	const key = `diffs/pr-${prNumber}/auto-review-count.json`;
	await bucket.put(key, JSON.stringify({ count: current + 1 }));
}
