/**
 * Trusted-code driver for the review validator agent.
 *
 * This is the control-flow half of finding validation — the part that runs
 * in ordinary TypeScript, not in the model. It dispatches the validator
 * agent with the active findings from one review stream, reads the
 * structured decisions back, and suppresses findings marked invalid.
 *
 * Fail-open policy: on any error (timeout, schema failure, missing result),
 * all findings are kept as-is. The validator can only suppress findings,
 * never add new ones.
 */
import { init } from "@flue/runtime";
import * as v from "valibot";
import ReviewValidator, {
	REVIEW_VALIDATION_DATA,
	ReviewValidationSchema,
	type ReviewValidatorInput,
	type ReviewValidationData,
} from "../agents/review-validator";
import type { ReconcileFinding } from "../agents/reconcile-reviewer";

const DISPATCH_MESSAGE =
	"Validate the review findings by reading the actual file content, then submit your decisions.";

/** Per-validation hard timeout — a wedged read must not hang the orchestrator step. */
export const VALIDATION_TIMEOUT_MS = 5 * 60_000;

// ── Pure helpers (unit-testable) ─────────────────────────────────────────────

/**
 * Apply validation decisions to a set of findings, returning only the
 * findings that should remain active.
 *
 * - Findings explicitly marked `invalid` are removed.
 * - Findings explicitly marked `valid` are kept.
 * - Findings with no decision are kept (fail-open).
 * - If a finding has both `valid` and `invalid` decisions (duplicate), it
 *   is kept — prefer keeping a potentially real finding over suppressing it.
 * - Unknown decision IDs are ignored (they don't match any finding).
 */
export function applyValidationDecisions(
	findings: ReconcileFinding[],
	decisions: ReviewValidationData["decisions"],
): ReconcileFinding[] {
	const validIds = new Set<string>();
	const invalidIds = new Set<string>();

	for (const d of decisions) {
		if (d.verdict === "valid") validIds.add(d.id);
		else invalidIds.add(d.id);
	}

	// Suppress only if invalid AND not also valid (duplicate → keep).
	const suppressIds = new Set<string>();
	for (const id of invalidIds) {
		if (!validIds.has(id)) suppressIds.add(id);
	}

	return findings.filter((f) => !suppressIds.has(f.id));
}

// ── Agent round-trip ─────────────────────────────────────────────────────────

/**
 * Run the review validator once and return the validated decisions.
 * Throws on timeout, missing result, or schema-validation failure.
 */
export async function runReviewValidation(
	input: ReviewValidatorInput,
	instanceId: string,
): Promise<ReviewValidationData> {
	const agent = init(ReviewValidator, { id: instanceId });
	const receipt = await agent.dispatch({
		message: DISPATCH_MESSAGE,
		initialData: input,
	});

	let reply;
	try {
		reply = await agent.read(receipt, {
			signal: AbortSignal.timeout(VALIDATION_TIMEOUT_MS),
		});
	} catch (err) {
		await Promise.resolve(agent.abort()).catch(() => {});
		throw err;
	}

	const raw = reply.data[REVIEW_VALIDATION_DATA]?.[0];
	if (raw === undefined) {
		throw new Error("review validator produced no result");
	}
	return v.parse(ReviewValidationSchema, raw);
}

// ── Stream-level validation with fail-open ───────────────────────────────────

export interface ValidateStreamOptions {
	/** "code" | "style" | "conventions" — surfaced in logs. */
	streamLabel: string;
	pullRequest: ReviewValidatorInput["pullRequest"];
	headSha: string;
	/** Active findings from the reconciled stream to validate. */
	findings: ReconcileFinding[];
	prBody: string;
	prTemplate: string;
	changedFiles: ReviewValidatorInput["changedFiles"];
	/** Stable per-stream agent instance address, e.g. `${runId}:val:code`. */
	instanceId: string;
	/** Orchestrator run id, for log correlation. */
	runId: string;
}

/**
 * Validate one review stream's active findings, applying the fail-open policy.
 *
 * If there are no findings to validate, returns immediately (no model round
 * trip). On any error, the original findings are returned unchanged.
 */
export async function validateStream(
	options: ValidateStreamOptions,
): Promise<ReconcileFinding[]> {
	const {
		streamLabel,
		pullRequest,
		headSha,
		findings,
		prBody,
		prTemplate,
		changedFiles,
		instanceId,
		runId,
	} = options;

	if (findings.length === 0) return findings;

	try {
		const result = await runReviewValidation(
			{
				pullRequest,
				headSha,
				streamLabel,
				findings,
				prBody,
				prTemplate,
				changedFiles,
			},
			instanceId,
		);

		const validated = applyValidationDecisions(findings, result.decisions);
		const suppressed = findings.length - validated.length;

		console.log({
			message: `Validation complete (${streamLabel}): PR #${pullRequest.number} — ${validated.length}/${findings.length} findings kept, ${suppressed} suppressed`,
			event: "review_orchestrator",
			number: pullRequest.number,
			stream: streamLabel,
			kept: validated.length,
			suppressed,
			runId,
			action: "validation_complete",
		});

		return validated;
	} catch (err) {
		console.log({
			message: `Validation error (${streamLabel}): PR #${pullRequest.number} — ${err instanceof Error ? err.message : String(err)} — keeping all findings`,
			event: "review_orchestrator",
			number: pullRequest.number,
			stream: streamLabel,
			error: err instanceof Error ? err.message : String(err),
			runId,
			action: "validation_error",
		});
		return findings;
	}
}
