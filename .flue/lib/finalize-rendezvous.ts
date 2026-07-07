/**
 * R2 rendezvous helpers for the N-specialist → finalize handoff.
 *
 * Each review dispatch (orchestrator run) creates a short-lived namespace:
 *
 *   diffs/pr-<n>/pending/<headSha>/<dispatchId>/
 *     context.json        — written by the orchestrator; everything finalize needs
 *     code.json           — written by the code-review specialist on completion
 *     style.json          — written by the style-guide specialist on completion
 *     conventions.json    — written by the conventions specialist on completion
 *     finalize.lock       — atomic conditional-PUT claim; exactly one specialist wins
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
import { admitWorkflow } from "../lib/poll-run";
import { getInternalHeaders } from "../lib/internal-auth";

/**
 * Canonical ordered list of all specialist streams for a review dispatch.
 * Shared by the orchestrator and every specialist — avoids per-site constants
 * that can drift out of sync.
 */
export const EXPECTED_STREAMS = ["code", "style", "conventions"] as const;

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
	stream: string,
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
	/**
	 * All specialist stream names expected for this dispatch. Written by the
	 * orchestrator so tryClaimFinalize knows which siblings to wait for.
	 */
	expectedStreams: string[];
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
	try {
		return (await obj.json()) as FinalizeContext;
	} catch {
		// Corrupted or partial write — treat as missing.
		return null;
	}
}

// ── Per-stream results written by each specialist ─────────────────────────────

export interface StreamResultPayload<T> {
	ok: boolean;
	result: T;
	/**
	 * false = crash-protection placeholder written by the orchestrator before
	 * the review starts (guarantees a key exists even if the specialist DO is
	 * evicted immediately). true = the actual result written by the specialist
	 * after its review completes (or fails).
	 *
	 * tryClaimFinalize only proceeds when all sibling results are final:true,
	 * preventing a premature finalize triggered by placeholders racing.
	 */
	final: boolean;
}

export async function writeStreamResult<T>(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
	dispatchId: string,
	stream: string,
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
	stream: string,
): Promise<StreamResultPayload<T> | null> {
	const obj = await bucket.get(
		streamResultKey(prNumber, headSha, dispatchId, stream),
	);
	if (!obj) return null;
	try {
		return (await obj.json()) as StreamResultPayload<T>;
	} catch {
		// Corrupted or partial write — treat as missing.
		return null;
	}
}

// ── Finalize lock (atomic create-if-absent) ───────────────────────────────────

/**
 * Try to claim the finalize lock for this dispatch.
 *
 * Each specialist calls this after writing its own stream result. It first
 * checks that every sibling stream has written a FINAL result (final:true).
 * If any sibling is still a placeholder (final:false) or absent, this caller
 * returns false and that sibling will claim the lock when it finishes.
 *
 * When all streams are final, the R2 conditional PUT (If-None-Match: *)
 * lets exactly one specialist win; the rest get null back.
 *
 * Returns true iff this caller won the lock and should admit finalize-review.
 */
export async function tryClaimFinalize(
	bucket: R2Bucket,
	prNumber: number,
	headSha: string,
	dispatchId: string,
	myStream: string,
	allExpectedStreams: string[],
): Promise<boolean> {
	// Only a recognised expected stream can trigger finalization.
	if (!allExpectedStreams.includes(myStream)) {
		console.log({
			message: `tryClaimFinalize: stream "${myStream}" is not in expectedStreams [${allExpectedStreams.join(", ")}] — skipping`,
			action: "finalize_stream_not_expected",
			stream: myStream,
			expectedStreams: allExpectedStreams,
		});
		return false;
	}

	// Fetch all sibling streams in parallel.
	const siblingStreams = allExpectedStreams.filter((s) => s !== myStream);
	const siblingChecks = await Promise.all(
		siblingStreams.map(async (stream) => {
			const obj = await bucket.get(
				streamResultKey(prNumber, headSha, dispatchId, stream),
			);
			if (!obj) return false; // Sibling hasn't written anything yet.
			try {
				const payload = (await obj.json()) as { final?: boolean };
				return payload.final === true;
			} catch {
				// Corrupted sibling result — treat as not-final.
				return false;
			}
		}),
	);

	// All siblings must be final before we attempt the lock.
	if (!siblingChecks.every(Boolean)) {
		return false;
	}

	// All streams have written final results. Race for the lock via
	// conditional PUT (create-if-absent) — exactly one specialist wins.
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
		// Paginate through all keys under the prefix — R2 list responses are
		// paginated and a single call may not return all objects.
		let cursor: string | undefined;
		do {
			const listed = await bucket.list({ prefix, cursor });
			if (listed.objects.length > 0) {
				await Promise.all(listed.objects.map((o) => bucket.delete(o.key)));
			}
			cursor = listed.truncated ? listed.cursor : undefined;
		} while (cursor);
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

export function degradedConventionsResult(): CodeReviewResult {
	return {
		findings: [],
		summary: "Conventions check could not complete.",
		reviewedFiles: [],
	};
}

// ── Shared specialist rendezvous tail ─────────────────────────────────────────

export interface ReportSpecialistResultOptions<T> {
	bucket: R2Bucket;
	env: Record<string, unknown>;
	baseUrl: string;
	dispatchId: string;
	prNumber: number;
	headSha: string;
	stream: string;
	/** All expected stream names for this dispatch — forwarded to tryClaimFinalize. */
	expectedStreams: string[];
	ok: boolean;
	result: T;
	runId: string;
	/** Event name prefix used in structured logs, e.g. "code_review_specialist". */
	eventName: string;
}

/**
 * Write the final stream result to R2, attempt to claim the finalize lock,
 * and admit finalize-review if this specialist wins.
 *
 * Shared by all specialists to eliminate duplicated rendezvous logic.
 * The try/catch is internal — rendezvous errors are logged, not rethrown.
 */
export async function reportSpecialistResult<T>(
	opts: ReportSpecialistResultOptions<T>,
): Promise<void> {
	const {
		bucket,
		env,
		baseUrl,
		dispatchId,
		prNumber,
		headSha,
		stream,
		expectedStreams,
		ok,
		result,
		runId,
		eventName,
	} = opts;

	if (!dispatchId || !baseUrl) {
		console.log({
			message: `${stream} specialist: no dispatchId/baseUrl — skipping rendezvous for PR #${prNumber}`,
			event: eventName,
			number: prNumber,
			runId,
			action: "rendezvous_skipped",
		});
		return;
	}

	let won = false;
	try {
		await writeStreamResult(bucket, prNumber, headSha, dispatchId, stream, {
			ok,
			result,
			final: true,
		});

		won = await tryClaimFinalize(
			bucket,
			prNumber,
			headSha,
			dispatchId,
			stream,
			expectedStreams,
		);
	} catch (rendezvousErr) {
		console.log({
			message: `${stream} specialist: rendezvous error for PR #${prNumber} — ${rendezvousErr instanceof Error ? rendezvousErr.message : String(rendezvousErr)}`,
			event: eventName,
			number: prNumber,
			error:
				rendezvousErr instanceof Error
					? rendezvousErr.message
					: String(rendezvousErr),
			runId,
			action: "rendezvous_error",
		});
	}

	// Admit finalize-review outside the catch-all so an admitWorkflow failure
	// is not silently swallowed. If the write or lock-claim above failed, won
	// is false and we skip admission entirely.
	if (won) {
		const internalHeaders = getInternalHeaders(env as Record<string, string>);
		await admitWorkflow({
			baseUrl,
			pathname: "/workflows/finalize-review",
			headers: internalHeaders,
			body: {
				eventType: "pull_request",
				number: prNumber,
				headSha,
				dispatchId,
			},
		});
		console.log({
			message: `${stream} specialist: finalize-review admitted for PR #${prNumber}`,
			event: eventName,
			number: prNumber,
			headSha,
			dispatchId,
			runId,
			action: "finalize_admitted",
		});
	}
}
