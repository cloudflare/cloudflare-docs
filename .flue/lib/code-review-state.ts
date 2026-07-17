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

// Rebase status values embedded in the bot comment as HTML comments.
// The type is derived from the array so both stay in sync — adding a status
// to one without updating the other is a compile error.
const KNOWN_REBASE_STATUSES = [
	"in-progress",
	"complete",
	"halted-conflict",
	"halted-wrong-base",
	"halted-fork",
	"halted-confidence",
	"failed",
] as const;

export type RebaseStatus = (typeof KNOWN_REBASE_STATUSES)[number];

const REBASE_STATUS_RE = /<!-- rebase-status: ([^\s]+) -->/;

/**
 * Extract the rebase status marker from a bot comment body.
 * Returns null if absent or if the embedded value is not a known status.
 */
export function extractRebaseStatus(body: string | null): RebaseStatus | null {
	if (!body) return null;
	const match = body.match(REBASE_STATUS_RE);
	const value = match?.[1];
	if (!value) return null;
	return KNOWN_REBASE_STATUSES.includes(value as RebaseStatus)
		? (value as RebaseStatus)
		: null;
}

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
 * Record that an automatic review *completed* for a PR head SHA.
 *
 * The counter is incremented on successful completion (not at the start of a
 * run), and deduplicated per head SHA. This means interrupted or failed runs
 * never burn an auto-review slot, and re-runs of the same head SHA are not
 * double-counted. The cap therefore limits the number of *delivered* automatic
 * reviews, which is the intended behavior.
 *
 * Uses an ETag-based conditional PUT (If-Match) to make the read-modify-write
 * atomic: if two concurrent finalizes race, one will win and the other will
 * retry rather than silently overwriting. Retries up to 3 times on conflict.
 */
export async function markAutoReviewCompleted(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
): Promise<void> {
	const key = `diffs/pr-${prNumber}/auto-review-count.json`;

	for (let attempt = 0; attempt < 3; attempt++) {
		const obj = await bucket.get(key);
		let count = 0;
		let shas: string[] = [];
		const etag = obj?.etag ?? null;

		if (obj) {
			try {
				const data = (await obj.json()) as { count?: number; shas?: string[] };
				// Validate shape defensively — corrupt or migrated data should not
				// produce wrong counts or crash .includes()/.push() calls.
				count =
					typeof data.count === "number" && Number.isFinite(data.count)
						? data.count
						: 0;
				shas = Array.isArray(data.shas) ? (data.shas as string[]) : [];
			} catch {
				// Corrupt counter — start fresh.
			}
		}

		if (shas.includes(headSha)) return; // already counted this head SHA

		shas.push(headSha);
		const body = JSON.stringify({ count: count + 1, shas });

		// Conditional PUT: succeed only if the object hasn't changed since we read it.
		// etag=null means the key didn't exist; use If-None-Match: * to create-if-absent.
		const putResult = etag
			? await bucket.put(key, body, {
					onlyIf: new Headers({ "If-Match": etag }),
				})
			: await bucket.put(key, body, {
					onlyIf: new Headers({ "If-None-Match": "*" }),
				});

		if (putResult !== null) return; // success — conditional PUT won

		// Lost the race — another finalize updated the key between our get and put.
		// Retry with a fresh read.
	}
	// After 3 failed attempts, give up non-fatally. The review was delivered;
	// failing to count it precisely is preferable to failing the entire finalize.
}

/**
 * Check whether the review limit has been permanently ignored for a PR.
 * Returns false if no ignore flag exists.
 */
export async function isReviewLimitIgnored(
	bucket: R2Bucket,
	prNumber: number,
): Promise<boolean> {
	const key = `diffs/pr-${prNumber}/ignore-review-limit.json`;
	const obj = await bucket.get(key);
	if (!obj) return false;
	const data = (await obj.json()) as { ignored?: boolean };
	return data.ignored === true;
}

/**
 * Permanently ignore the review limit for a PR in R2.
 * Records the actor who set the flag for auditability.
 */
export async function setReviewLimitIgnored(
	bucket: R2Bucket,
	prNumber: number,
	actor: string,
): Promise<void> {
	const key = `diffs/pr-${prNumber}/ignore-review-limit.json`;
	await bucket.put(
		key,
		JSON.stringify({ ignored: true, actor, setAt: new Date().toISOString() }),
	);
}

/**
 * Check whether automatic reviews have been disabled for a PR.
 * When true, push-triggered reviews are suppressed; codeowner slash commands
 * (which set bypassReviewLimit) still work normally.
 * Returns false if no disable flag exists.
 */
export async function isAutoReviewDisabled(
	bucket: R2Bucket,
	prNumber: number,
): Promise<boolean> {
	const key = `diffs/pr-${prNumber}/auto-review-disabled.json`;
	const obj = await bucket.get(key);
	if (!obj) return false;
	try {
		const data = (await obj.json()) as { disabled?: boolean };
		return data.disabled === true;
	} catch {
		// Corrupt file — treat as not disabled.
		return false;
	}
}

/**
 * Disable automatic reviews for a PR in R2.
 * Records the actor who set the flag for auditability.
 */
export async function setAutoReviewDisabled(
	bucket: R2Bucket,
	prNumber: number,
	actor: string,
): Promise<void> {
	const key = `diffs/pr-${prNumber}/auto-review-disabled.json`;
	await bucket.put(
		key,
		JSON.stringify({ disabled: true, actor, setAt: new Date().toISOString() }),
	);
}
