/**
 * Trusted-code driver for the dependabot reviewer agent.
 *
 * Ports the `session.skill("dependabot-review", …)` round trip from the 0.11
 * `workflows/dependabot-review.ts` to the 2.0 `init().dispatch().read()`
 * contract. The workflow owns everything else (PR fetch, package parse, comment
 * render/post, 👀→👍 swap); this driver only dispatches the agent and returns
 * the validated {@link DependabotReviewResult}.
 */
import { init } from "@flue/runtime";
import * as v from "valibot";
import DependabotReviewer, {
	DEPENDABOT_REVIEW_DATA,
	type DependabotReviewInput,
} from "../agents/dependabot-reviewer";
import {
	DependabotReviewResultSchema,
	type DependabotReviewResult,
} from "./dependabot-review";

const DISPATCH_MESSAGE =
	"Review this Dependabot PR's bumped packages, then submit the structured result.";

/** Per-review hard timeout — a wedged read must not hang the workflow step. */
export const DEPENDABOT_REVIEW_TIMEOUT_MS = 10 * 60_000;

/**
 * Run the dependabot reviewer once and return the validated result. Throws on
 * timeout, missing result, or schema-validation failure — the workflow step
 * catches and degrades to a failure comment.
 */
export async function runDependabotReview(
	input: DependabotReviewInput,
	instanceId: string,
): Promise<DependabotReviewResult> {
	const agent = init(DependabotReviewer, { id: instanceId });
	const receipt = await agent.dispatch({
		message: DISPATCH_MESSAGE,
		initialData: input,
	});

	let reply;
	try {
		reply = await agent.read(receipt, {
			signal: AbortSignal.timeout(DEPENDABOT_REVIEW_TIMEOUT_MS),
		});
	} catch (err) {
		// The read signal only cancels observation; durably stop the instance so
		// a wedged review does not keep burning model calls after we gave up.
		await Promise.resolve(agent.abort()).catch(() => {});
		throw err;
	}

	const raw = reply.data[DEPENDABOT_REVIEW_DATA]?.[0];
	if (raw === undefined) {
		throw new Error("dependabot reviewer produced no result");
	}
	return v.parse(DependabotReviewResultSchema, raw);
}
