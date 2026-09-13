import { init } from "@flue/runtime";
import type { WorkflowStep } from "cloudflare:workers";
import * as v from "valibot";
import { REVIEW_AGENTS, type AgentKind } from "./review-agents";
import { AGENT_TIMEOUT_MS } from "./review-domain";

export type AgentOutcome<T> =
	{ ok: true; value: T } | { ok: false; error: string };

/** Dispatch and observation have separate durable checkpoints. A read retry
 * reattaches to the accepted submission; it never sends another model prompt. */
export async function agentStep<T extends v.GenericSchema>(
	step: WorkflowStep,
	name: string,
	kind: AgentKind,
	id: string,
	input: unknown,
	dataName: string,
	schema: T,
): Promise<AgentOutcome<v.InferOutput<T>>> {
	const agent = init(REVIEW_AGENTS[kind], { id });
	try {
		const dispatched = await step.do(
			`${name}:dispatch`,
			{
				timeout: "1 minute",
				retries: { limit: 3, delay: "5 seconds", backoff: "exponential" },
			},
			async () => ({
				receipt: await agent.dispatch({
					message:
						"Complete the review task in your initial data and submit the structured result.",
					initialData: input,
				}),
				deadline: Date.now() + AGENT_TIMEOUT_MS,
			}),
		);
		const result = await step.do(
			`${name}:read`,
			{
				timeout: "14 minutes",
				retries: { limit: 2, delay: "5 seconds", backoff: "exponential" },
			},
			async () => {
				const remaining = dispatched.deadline - Date.now();
				if (remaining <= 0) throw new Error("Agent deadline exceeded");
				const reply = await agent.read(dispatched.receipt, {
					signal: AbortSignal.timeout(remaining),
				});
				const raw = reply.data[dataName]?.at(-1);
				if (raw === undefined)
					throw new Error(`Agent did not submit ${dataName}`);
				return JSON.stringify(v.parse(schema, raw));
			},
		);
		return { ok: true, value: v.parse(schema, JSON.parse(result)) };
	} catch (error) {
		await step.do(`${name}:abort`, async () => {
			await agent.abort().catch((abortError) =>
				console.error({
					event: "abort_failed",
					id,
					error: String(abortError),
				}),
			);
			return true;
		});
		console.error({ event: "agent_failed", kind, id, error: String(error) });
		return {
			ok: false,
			error: "The agent could not complete this review task.",
		};
	}
}
