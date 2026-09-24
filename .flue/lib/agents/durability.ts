import type { DurabilityConfig } from "@flue/runtime";

export const SPECIALIST_DURABILITY = {
	maxAttempts: 3,
	timeoutMs: 15 * 60_000,
} as const satisfies DurabilityConfig;

/**
 * The judge model's reasoning length varies widely between runs, even on
 * small inputs. The Workflow read step adds AGENT_READ_TIMEOUT_BUFFER_MS on
 * top of this and must stay within the 30-minute Workflow step timeout.
 */
export const JUDGE_DURABILITY = {
	maxAttempts: 3,
	timeoutMs: 20 * 60_000,
} as const satisfies DurabilityConfig;

export const SMALL_AGENT_DURABILITY = {
	maxAttempts: 3,
	timeoutMs: 5 * 60_000,
} as const satisfies DurabilityConfig;

export const AGENT_READ_TIMEOUT_BUFFER_MS = 2 * 60_000;
