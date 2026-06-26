/**
 * R2 rendezvous helpers for the two-specialist → finalize handoff.
 *
 * Each review dispatch (orchestrator run) creates a short-lived namespace:
 *
 *   diffs/pr-<n>/pending/<headSha>/<dispatchId>/
 *     context.json   — written by the orchestrator; everything finalize needs
 *     code.json      — written by the code-review specialist on completion
 *     style.json     — written by the style-guide specialist on completion
 *     finalize.lock  — atomic conditional-PUT claim; exactly one specialist wins
 *
 * dispatchId = the orchestrator's runId. It isolates same-head concurrent
 * dispatches (e.g. an auto-review and a /full-review landing at the same time).
 *
 * Once finalize-review completes it calls cleanupPending(), which list-deletes
 * the entire prefix, leaving zero residue in R2 from the run.
 */

import type { CodeReviewResult } from "./code-review-results";
import type { StyleGuideResult } from "./style-guide-results";
import type { DiffMode } from "./code-review-state";

// ── Key helpers ───────────────────────────────────────────────────────────────

function pendingPrefix(
	prNumber: number,
	headSha: string,
	dispatchId: string,
): string {
	return `diffs/pr-${prNumber}/pending/${headSha}/${dispatchId}`;
}

export function contextKey(
	prNumber: number,
	headSha: string,
	dispatchId: string,
): string {
	return `${pendingPrefix(prNumber, headSha, dispatchId)}/context.json`;
}

export function streamResultKey(
	prNumber: number,
	headSha: string,
	dispatchId: string,
	stream: "code" | "style",
): string {
	return `${pendingPrefix(prNumber, headSha, dispatchId)}/${stream}.json`;
}

function finalizeLockKey(
	prNumber: number,
	headSha: string,
	dispatchId: string,
): string {
	return `${pendingPrefix(prNumber, headSha, dispatchId)}/finalize.lock`;
}

// ── Context written by the orchestrator ───────────────────────────────────────

/**
 * Everything finalize-review needs that was computed in the orchestrator's
 * dispatch phase. Carried through R2 so finalize never needs to re-fetch PR
 * metadata or re-derive diffMode / human-comment partitioning.
 */
export interface FinalizeContext {
	prNumber: number;
	headSha: string;
	dispatchId: string;
	/** Base URL of the Worker (origin only). Passed to admitWorkflow. */
	baseUrl: string;
	diffMode: DiffMode;
	forceFullReview: boolean;
	bypassReviewLimit: boolean;
	reviewMode: string;
	/** SHA the bot comment was last reviewed at (null = no prior review). */
	previousReviewedSha: string | null;
	/** Comment ID of the codeowner command that triggered this run, if any. */
	triggerCommentId?: number;
	/** Reaction ID of the 👀 on the trigger comment, to remove when done. */
	triggerEyesReactionId?: number | null;
	/**
	 * Human comments posted after the last bot review, captured at dispatch
	 * time. Stored here so finalize uses the same snapshot the orchestrator
	 * partitioned against, avoiding comment-timing races.
	 */
	humanComments: Array<{ author: string; created_at: string; body: string }>;
}

export async function writeContext(
	bucket: R2Bucket,
	ctx: FinalizeContext,
): Promise<void> {
	await bucket.put(
		contextKey(ctx.prNumber, ctx.headSha, ctx.dispatchId),
		JSON.stringify(ctx),
	);
}

export async function readContext(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
	dispatchId: string,
): Promise<FinalizeContext | null> {
	const obj = await bucket.get(contextKey(prNumber, headSha, dispatchId));
	if (!obj) return null;
	return (await obj.json()) as FinalizeContext;
}

// ── Per-stream results written by each specialist ─────────────────────────────

export interface StreamResultPayload<T> {
	ok: boolean;
	result: T;
}

export async function writeStreamResult<T>(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
	dispatchId: string,
	stream: "code" | "style",
	payload: StreamResultPayload<T>,
): Promise<void> {
	await bucket.put(
		streamResultKey(prNumber, headSha, dispatchId, stream),
		JSON.stringify(payload),
	);
}

export async function readStreamResult<T>(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
	dispatchId: string,
	stream: "code" | "style",
): Promise<StreamResultPayload<T> | null> {
	const obj = await bucket.get(
		streamResultKey(prNumber, headSha, dispatchId, stream),
	);
	if (!obj) return null;
	return (await obj.json()) as StreamResultPayload<T>;
}

// ── Finalize lock (atomic create-if-absent) ───────────────────────────────────

/**
 * Try to claim the finalize lock for this dispatch.
 *
 * Both specialists call this after writing their own stream result. Both first
 * check that the sibling result is present — if it is not, the sibling has
 * not finished yet and will claim the lock when it does. If both finish near
 * simultaneously and both see both-present, the R2 conditional PUT
 * (If-None-Match: *) lets exactly one win; the other gets null back.
 *
 * Returns true iff this caller won the lock and should admit finalize-review.
 */
export async function tryClaimFinalize(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
	dispatchId: string,
	myStream: "code" | "style",
): Promise<boolean> {
	// Check that the sibling has already written its result.
	const siblingStream = myStream === "code" ? "style" : "code";
	const sibling = await bucket.head(
		streamResultKey(prNumber, headSha, dispatchId, siblingStream),
	);
	if (!sibling) {
		// Sibling not done yet — it will claim the lock when it finishes.
		return false;
	}

	// Both present. Race for the lock via conditional PUT (create-if-absent).
	const won = await bucket.put(
		finalizeLockKey(prNumber, headSha, dispatchId),
		"1",
		{ onlyIf: new Headers({ "If-None-Match": "*" }) },
	);
	return won !== null;
}

// ── Cleanup ───────────────────────────────────────────────────────────────────

/**
 * Delete every key under the pending/<headSha>/<dispatchId>/ prefix.
 * Called by finalize-review on terminal (success, both-failed, or stale head).
 * Best-effort — non-fatal if it partially fails.
 */
export async function cleanupPending(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
	dispatchId: string,
): Promise<void> {
	const prefix = `${pendingPrefix(prNumber, headSha, dispatchId)}/`;
	try {
		const listed = await bucket.list({ prefix });
		if (listed.objects.length > 0) {
			await Promise.all(listed.objects.map((o) => bucket.delete(o.key)));
		}
	} catch {
		// Non-fatal — orphaned keys are tiny and will be overwritten on retry.
	}
}

// ── Degraded empty results (for specialist catch paths) ───────────────────────

export function degradedCodeResult(): CodeReviewResult {
	return {
		findings: [],
		summary: "Code review could not complete.",
		reviewedFiles: [],
	};
}

export function degradedStyleResult(): StyleGuideResult {
	return {
		findings: [],
		summary: "Style-guide review could not complete.",
		reviewedFiles: [],
	};
}
