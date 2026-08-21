/**
 * Trusted-code driver for the rebase conflict resolver agent.
 *
 * Ports the `session.skill("rebase-conflict", …)` round trip from the 0.11
 * `workflows/rebase.ts` `resolveConflictsWithAI` closure to the 2.0
 * `init().dispatch().read()` contract. `resolveConflictsWithAI`
 * (`lib/rebase-conflict.ts`) prepares the conflict file versions and calls this
 * as its `runAgent` callback; the workflow supplies the per-run instance id.
 *
 * Returns `null` on any failure (timeout, missing result, validation error) so
 * `resolveConflictsWithAI` maps it to the low-confidence fallback — matching the
 * 0.11 behavior where a skill error produced a "resolve manually" halt rather
 * than crashing the rebase.
 */
import { init } from "@flue/runtime";
import * as v from "valibot";
import RebaseConflictResolver, {
	CONFLICT_RESOLUTION_DATA,
} from "../agents/rebase-conflict-resolver";
import {
	ConflictResolutionFromModelSchema,
	type ConflictResolutionData,
	type RebaseConflictAgentInput,
} from "./rebase-conflict";

const DISPATCH_MESSAGE =
	"Resolve the merge conflicts between this PR and production, then submit the result.";

/** Per-resolution hard timeout — a wedged read must not hang the workflow step. */
export const REBASE_CONFLICT_TIMEOUT_MS = 10 * 60_000;

/**
 * Run the rebase conflict resolver once. Returns the validated model result, or
 * `null` on timeout / missing result / validation failure.
 */
export async function runRebaseConflictAgent(
	input: RebaseConflictAgentInput,
	instanceId: string,
): Promise<ConflictResolutionData | null> {
	const agent = init(RebaseConflictResolver, { id: instanceId });

	try {
		const receipt = await agent.dispatch({
			message: DISPATCH_MESSAGE,
			initialData: input,
		});

		let reply;
		try {
			reply = await agent.read(receipt, {
				signal: AbortSignal.timeout(REBASE_CONFLICT_TIMEOUT_MS),
			});
		} catch (err) {
			await Promise.resolve(agent.abort()).catch(() => {});
			throw err;
		}

		const raw = reply.data[CONFLICT_RESOLUTION_DATA]?.[0];
		if (raw === undefined) return null;
		return v.parse(ConflictResolutionFromModelSchema, raw);
	} catch (err) {
		console.log({
			message: `rebase-conflict agent failed: ${err instanceof Error ? err.message : String(err)}`,
			event: "rebase_workflow",
			action: "agent_error",
		});
		return null;
	}
}
