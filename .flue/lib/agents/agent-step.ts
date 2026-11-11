import { init, type Agent, type DeliveredMessageInput } from "@flue/runtime";
import type { WorkflowStep } from "cloudflare:workers";
import * as v from "valibot";
import { AGENT_READ_TIMEOUT_BUFFER_MS } from "./durability";

const DISPATCH_TIMEOUT_MS = 60_000;

export type AgentStepResult<T> =
	{ ok: true; value: T } | { ok: false; error: string };

export interface AgentStepOptions<TSchema extends v.GenericSchema> {
	name: string;
	agent: Agent;
	id: string;
	message: DeliveredMessageInput;
	initialData?: unknown;
	dataName: string;
	schema: TSchema;
	/** Agent durability timeout, excluding the two-minute observation buffer. */
	readTimeoutMs: number;
	dispatchTimeoutMs?: number;
}

interface SerializedReceipt {
	submissionId: string;
	acceptedAt: string;
	uid: string;
	deduplicated?: true;
}

interface DispatchedAgent {
	receipt: SerializedReceipt;
	dispatchedAt: string;
}

type SerializedAgentResult =
	{ ok: true; value: string } | { ok: false; error: string };

export function millisecondsUntil(deadline: number, now = Date.now()): number {
	return Math.max(0, deadline - now);
}

export function parseAgentResult<TSchema extends v.GenericSchema>(
	schema: TSchema,
	dataName: string,
	data: Record<string, unknown[]>,
): v.InferOutput<TSchema> {
	const value = data[dataName]?.at(-1);
	if (value === undefined)
		throw new Error(`agent produced no ${dataName} result`);
	return v.parse(schema, value);
}

function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

/**
 * Dispatch and read one agent through independently durable Workflow steps.
 * The read deadline is anchored to the original dispatch so Workflow retries
 * cannot extend the agent's total observation window.
 */
export async function agentStep<TSchema extends v.GenericSchema>(
	step: WorkflowStep,
	options: AgentStepOptions<TSchema>,
): Promise<AgentStepResult<v.InferOutput<TSchema>>> {
	const agent = init(options.agent, { id: options.id });
	const dispatchTimeoutMs = options.dispatchTimeoutMs ?? DISPATCH_TIMEOUT_MS;
	const totalReadTimeoutMs =
		options.readTimeoutMs + AGENT_READ_TIMEOUT_BUFFER_MS;

	try {
		const dispatched = await step.do<DispatchedAgent>(
			`${options.name}:dispatch`,
			{
				timeout: dispatchTimeoutMs,
				retries: { limit: 3, delay: 1_000, backoff: "exponential" },
			},
			async () => {
				const receipt = await agent.dispatch({
					message: options.message,
					initialData: options.initialData,
					idempotencyKey: options.id,
				});
				return {
					receipt: {
						submissionId: receipt.submissionId,
						acceptedAt: receipt.acceptedAt,
						uid: receipt.uid,
						...(receipt.deduplicated ? { deduplicated: true as const } : {}),
					},
					dispatchedAt: receipt.acceptedAt,
				};
			},
		);

		const result = await step.do<SerializedAgentResult>(
			`${options.name}:read`,
			{
				timeout: totalReadTimeoutMs,
				retries: { limit: 2, delay: 1_000, backoff: "exponential" },
			},
			async () => {
				const deadline =
					Date.parse(dispatched.dispatchedAt) + totalReadTimeoutMs;
				const reply = await agent.read(dispatched.receipt, {
					signal: AbortSignal.timeout(millisecondsUntil(deadline)),
				});
				return {
					ok: true,
					value: JSON.stringify(
						parseAgentResult(options.schema, options.dataName, reply.data),
					),
				};
			},
		);
		if (!result.ok) return result;
		return {
			ok: true,
			value: v.parse(options.schema, JSON.parse(result.value)),
		};
	} catch (error) {
		const message = errorMessage(error);
		try {
			await step.do(
				`${options.name}:abort`,
				{ timeout: DISPATCH_TIMEOUT_MS, retries: { limit: 1, delay: 1_000 } },
				async () => {
					await agent.abort();
					return { aborted: true };
				},
			);
		} catch (abortError) {
			console.error({
				event: "agent_step_abort_failed",
				name: options.name,
				id: options.id,
				error: errorMessage(abortError),
			});
		}
		console.error({
			event: "agent_step_failed",
			name: options.name,
			id: options.id,
			error: message,
		});
		return { ok: false, error: message };
	}
}
