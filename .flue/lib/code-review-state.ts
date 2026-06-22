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
 * Record that an automatic review *completed* for a PR head SHA.
 *
 * The counter is incremented on successful completion (not at the start of a
 * run), and deduplicated per head SHA. This means interrupted or failed runs
 * never burn an auto-review slot, and re-runs of the same head SHA (e.g. a
 * watchdog recovery) are not double-counted. The cap therefore limits the
 * number of *delivered* automatic reviews, which is the intended behavior.
 */
export async function markAutoReviewCompleted(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
): Promise<void> {
	const key = `diffs/pr-${prNumber}/auto-review-count.json`;
	const obj = await bucket.get(key);
	let count = 0;
	let shas: string[] = [];
	if (obj) {
		try {
			const data = (await obj.json()) as { count?: number; shas?: string[] };
			count = data.count ?? 0;
			shas = data.shas ?? [];
		} catch {
			// Corrupt counter — start fresh.
		}
	}
	if (shas.includes(headSha)) return; // already counted this head SHA
	shas.push(headSha);
	await bucket.put(key, JSON.stringify({ count: count + 1, shas }));
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

// ── In-flight review markers ─────────────────────────────────────────────────
//
// A marker records that a code-review-orchestrator run is in progress and has
// posted a "review in progress" placeholder comment that it still owes a final
// update. The orchestrator writes the marker after posting the placeholder,
// records the specialist run IDs once they are admitted, and clears it on every
// terminal path. If the orchestrator's Durable Object is interrupted mid-run,
// Flue does not resume the workflow (workflows are not resumable), so the marker
// is left behind — that lingering marker is the durable signal the scheduled
// watchdog uses to re-drive the review.
//
// Markers live under a dedicated `inflight/` prefix (not `diffs/pr-<n>/`) so the
// watchdog can list only the small set of in-flight reviews instead of scanning
// every PR's review state.

export interface ReviewInflight {
	/** Head SHA the placeholder was posted for. */
	headSha: string;
	/** Epoch ms when this run posted its placeholder. */
	startedAt: number;
	/** Run ID of the orchestrator that owns this marker. */
	orchestratorRunId: string;
	/** Specialist run IDs ([code, style]) once admitted; absent before dispatch. */
	specialistRunIds?: string[];
	/** 0 for the original run; incremented for each watchdog-driven retry. */
	attempt: number;
}

/** A marker plus the PR number parsed from its key. */
export interface ReviewInflightEntry extends ReviewInflight {
	prNumber: number;
}

const inflightKey = (prNumber: number) => `inflight/pr-${prNumber}.json`;

/** Create or overwrite the in-flight marker for a PR. */
export async function setReviewInflight(
	bucket: R2Bucket,
	prNumber: number,
	marker: ReviewInflight,
): Promise<void> {
	await bucket.put(inflightKey(prNumber), JSON.stringify(marker));
}

/** Read the in-flight marker for a PR, or null if none / unparseable. */
export async function readReviewInflight(
	bucket: R2Bucket,
	prNumber: number,
): Promise<ReviewInflight | null> {
	const obj = await bucket.get(inflightKey(prNumber));
	if (!obj) return null;
	try {
		return (await obj.json()) as ReviewInflight;
	} catch {
		return null;
	}
}

/** Patch an existing in-flight marker. No-op if the marker is gone. */
export async function updateReviewInflight(
	bucket: R2Bucket,
	prNumber: number,
	patch: Partial<ReviewInflight>,
): Promise<void> {
	const current = await readReviewInflight(bucket, prNumber);
	if (!current) return;
	await bucket.put(
		inflightKey(prNumber),
		JSON.stringify({ ...current, ...patch }),
	);
}

/** Delete the in-flight marker for a PR. Safe to call when none exists. */
export async function clearReviewInflight(
	bucket: R2Bucket,
	prNumber: number,
): Promise<void> {
	await bucket.delete(inflightKey(prNumber));
}

/** List all in-flight markers, paging through the dedicated prefix. */
export async function listReviewInflight(
	bucket: R2Bucket,
): Promise<ReviewInflightEntry[]> {
	const entries: ReviewInflightEntry[] = [];
	let cursor: string | undefined;
	do {
		const listed = await bucket.list({ prefix: "inflight/pr-", cursor });
		for (const o of listed.objects) {
			const match = o.key.match(/^inflight\/pr-(\d+)\.json$/);
			if (!match) continue;
			const obj = await bucket.get(o.key);
			if (!obj) continue;
			try {
				const data = (await obj.json()) as ReviewInflight;
				entries.push({ ...data, prNumber: Number(match[1]) });
			} catch {
				// Skip malformed markers.
			}
		}
		cursor = listed.truncated ? listed.cursor : undefined;
	} while (cursor);
	return entries;
}
