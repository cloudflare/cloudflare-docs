/**
 * Trusted-code driver for the conventions reviewer agent.
 *
 * This is the control-flow half of the conventions check — the part that runs
 * in ordinary TypeScript, not in the model. It addresses a per-PR agent
 * instance, dispatches the typed input as `initialData`, awaits the structured
 * reply, validates it, and assigns stable `CV-` finding ids. The agent itself
 * only reasons and submits; ids, GitHub, and R2 all stay out here.
 *
 * Mirrors the round trip the 0.11 `conventions-specialist.ts` performed with
 * `session.skill({ result })`, re-expressed with the 2.0
 * `init().dispatch().read()` + `useDataWriter` contract.
 */
import { init } from "@flue/runtime";
import * as v from "valibot";
import ConventionsReviewer, {
	CONVENTIONS_REVIEW_DATA,
	ConventionsReviewSchema,
	type ConventionsReviewInput,
} from "../agents/conventions-reviewer";
import {
	type CodeReviewResult,
	assignCodeReviewFindingIds,
} from "./code-review-results";

const DISPATCH_MESSAGE =
	"Review this pull request against the repository conventions and submit your review.";

/** Per-review hard timeout — a wedged read must not hang the orchestrator step. */
const CONVENTIONS_TIMEOUT_MS = 5 * 60_000;

/**
 * Run the conventions reviewer for one PR and return a normalized
 * {@link CodeReviewResult} with `CV-` prefixed finding ids.
 *
 * @param input        Typed PR metadata delivered to the agent as initialData.
 * @param instanceId   Stable per-PR/head agent instance address.
 */
export async function runConventionsReview(
	input: ConventionsReviewInput,
	instanceId: string,
): Promise<CodeReviewResult> {
	const agent = init(ConventionsReviewer, { id: instanceId });
	const receipt = await agent.dispatch({
		message: DISPATCH_MESSAGE,
		initialData: input,
	});

	let reply;
	try {
		reply = await agent.read(receipt, {
			signal: AbortSignal.timeout(CONVENTIONS_TIMEOUT_MS),
		});
	} catch (err) {
		await Promise.resolve(agent.abort()).catch(() => {});
		throw err;
	}

	const raw = reply.data[CONVENTIONS_REVIEW_DATA]?.[0];
	const parsed = v.parse(ConventionsReviewSchema, raw);

	const findingsWithIds = await assignCodeReviewFindingIds(
		parsed.findings.map((f) => ({
			...f,
			// The conventions check is specified to emit warning-only; guard in
			// case the model strays to another severity.
			severity: "warning" as const,
		})),
	);

	// Override the CR- namespace with CV- to distinguish conventions findings.
	const cvFindings = findingsWithIds.map((f) => ({
		...f,
		id: f.id.replace(/^CR-/, "CV-"),
	}));

	return {
		findings: cvFindings,
		summary: parsed.summary,
		reviewedFiles: ["pr"],
	};
}
