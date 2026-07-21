/**
 * Trusted-code driver for the reconcile reviewer agent.
 *
 * This is the control-flow half of reconciliation — the policy that runs in
 * ordinary TypeScript, not in the model. It ports the `reconcileStream` closure
 * from the 0.11 `workflows/finalize-review.ts` to the 2.0
 * `init().dispatch().read()` contract:
 *
 *   - `runReconcile` performs one agent round trip (dispatch → read → validate).
 *   - `reconcileStream` wraps it with the finalize policy: short-circuit when
 *     there is nothing to reconcile against, degrade to the current findings on
 *     any agent failure, and emit the same structured log lines.
 *
 * The orchestrator (`cloudflare.ts`) calls `reconcileStream` once per stream
 * (code, style, conventions), each with its own agent instance id.
 */
import { init } from "@flue/runtime";
import * as v from "valibot";
import ReconcileReviewer, {
	RECONCILE_DATA,
	type ReconcileFinding,
	type ReconcileHumanComment,
	type ReconcileInput,
} from "../agents/reconcile-reviewer";
import {
	ReconcileResultSchema,
	type ReconcileResult,
} from "./code-review-render";
import type { DiffMode } from "./code-review-state";

const DISPATCH_MESSAGE =
	"Reconcile the current review findings against the previous review and human comments, then submit the result.";

/** Per-reconcile hard timeout — a wedged read must not hang the orchestrator step. */
export const RECONCILE_TIMEOUT_MS = 5 * 60_000;

/**
 * Run the reconcile reviewer once and return the validated {@link ReconcileResult}.
 * Throws on timeout, missing result, or schema-validation failure — callers that
 * want the finalize degrade behavior should use {@link reconcileStream} instead.
 */
export async function runReconcile(
	input: ReconcileInput,
	instanceId: string,
): Promise<ReconcileResult> {
	const agent = init(ReconcileReviewer, { id: instanceId });
	const receipt = await agent.dispatch({
		message: DISPATCH_MESSAGE,
		initialData: input,
	});

	let reply;
	try {
		reply = await agent.read(receipt, {
			signal: AbortSignal.timeout(RECONCILE_TIMEOUT_MS),
		});
	} catch (err) {
		// The read signal only cancels observation; durably stop the instance so
		// a wedged reconcile does not keep burning model calls after we gave up.
		await Promise.resolve(agent.abort()).catch(() => {});
		throw err;
	}

	const raw = reply.data[RECONCILE_DATA]?.[0];
	if (raw === undefined) {
		throw new Error("reconcile reviewer produced no result");
	}
	return v.parse(ReconcileResultSchema, raw);
}

export interface ReconcileStreamOptions {
	/** "code" | "style" | "conventions" — surfaced in logs. */
	streamLabel: string;
	pullRequest: ReconcileInput["pullRequest"];
	currentFindings: ReconcileFinding[];
	reviewedFiles: string[];
	previousFindings: ReconcileFinding[];
	humanComments: ReconcileHumanComment[];
	diffMode: DiffMode;
	/** Summary used when reconciliation is skipped or degrades to a fallback. */
	fallbackSummary: string;
	/** Stable per-stream agent instance address, e.g. `${runId}:rc:code`. */
	instanceId: string;
	/** Orchestrator run id, for log correlation. */
	runId: string;
}

/**
 * Reconcile one review stream, applying the finalize policy.
 *
 * When there is nothing to reconcile against (no previous findings AND no human
 * comments) the current findings are returned as-is with the fallback summary —
 * no model round trip. Otherwise the reconcile agent runs; if it throws for any
 * reason the current findings are carried forward (degrade, never crash).
 */
export async function reconcileStream(
	options: ReconcileStreamOptions,
): Promise<ReconcileResult> {
	const {
		streamLabel,
		pullRequest,
		currentFindings,
		reviewedFiles,
		previousFindings,
		humanComments,
		diffMode,
		fallbackSummary,
		instanceId,
		runId,
	} = options;

	const needsReconciliation =
		previousFindings.length > 0 || humanComments.length > 0;

	const fallback = (): ReconcileResult => ({
		active: currentFindings,
		ignored_by_reviewer: [],
		resolved: [],
		summary: fallbackSummary,
	});

	if (!needsReconciliation) {
		return fallback();
	}

	let reconciled: ReconcileResult;
	try {
		reconciled = await runReconcile(
			{
				pullRequest,
				currentFindings,
				reviewedFiles,
				previousFindings,
				humanComments,
				diffMode,
			},
			instanceId,
		);
	} catch (err) {
		console.log({
			message: `Reconciliation error (${streamLabel}): PR #${pullRequest.number} — ${err instanceof Error ? err.message : String(err)}`,
			event: "review_orchestrator",
			number: pullRequest.number,
			stream: streamLabel,
			error: err instanceof Error ? err.message : String(err),
			runId,
			action: "reconciliation_error",
		});
		return fallback();
	}

	console.log({
		message: `Reconciliation complete (${streamLabel}): PR #${pullRequest.number} — ${reconciled.active.length} active, ${reconciled.ignored_by_reviewer.length} ignored, ${reconciled.resolved.length} resolved`,
		event: "review_orchestrator",
		number: pullRequest.number,
		stream: streamLabel,
		active: reconciled.active.length,
		ignored: reconciled.ignored_by_reviewer.length,
		resolved: reconciled.resolved.length,
		runId,
		action: "reconciliation_complete",
	});

	return reconciled;
}
