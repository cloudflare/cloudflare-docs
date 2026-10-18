/**
 * Shared helpers for calling the Clef decision model on Workers AI.
 *
 * Clef takes a `state` and typed `questions` and returns a probability per
 * answer, so the spam gates can map answers to verdicts in trusted code
 * instead of running an agent loop. Parsers throw on malformed responses so
 * callers can fail open.
 */

/** Workers AI model ID for Clef. */
export const CLEF_MODEL_ID = "@cf/cloudflare/clef";

/** Probability at or above which a spam verdict is high confidence. */
export const HIGH_CONFIDENCE = 0.8;
/** Probability at or above which a spam verdict is at least medium confidence. */
export const MEDIUM_CONFIDENCE = 0.5;

/** Minimal shape of the Workers AI binding, so tests can fake it. */
export interface AiRunner {
	run(model: string, input: unknown, options?: unknown): Promise<unknown>;
}

export interface NoulQuestion {
	type: "noul";
	instructions: string;
	criteria?: { true?: string; false?: string };
}

export interface ChoiceQuestion {
	type: "choice";
	instructions: string;
	criteria: Record<string, string>;
}

export type ClefQuestion = NoulQuestion | ChoiceQuestion;

export interface ClefRequest {
	state: unknown;
	questions: Record<string, ClefQuestion>;
}

/** Spam verdict shared by the item and comment gates. */
export interface SpamVerdict {
	is_spam: boolean;
	confidence: "low" | "medium" | "high";
	reason: string;
}

/**
 * Run Clef. The request body requires `model: "clef"`. When a gateway ID is
 * given, the call goes through AI Gateway like the agent model calls do.
 */
export async function runClef(
	ai: AiRunner,
	request: ClefRequest,
	gatewayId?: string,
): Promise<unknown> {
	return ai.run(
		CLEF_MODEL_ID,
		{ model: "clef", ...request },
		gatewayId ? { gateway: { id: gatewayId } } : undefined,
	);
}

function answer(response: unknown, id: string): Record<string, unknown> {
	const answers = (response as { answers?: Record<string, unknown> } | null)
		?.answers;
	const value = answers?.[id];
	if (!value || typeof value !== "object") {
		throw new Error(`clef response missing answer "${id}"`);
	}
	return value as Record<string, unknown>;
}

/** Read a yes-probability (0..1) from a `noul` answer. */
export function parseNoul(response: unknown, id: string): number {
	const noul = answer(response, id).noul;
	if (typeof noul !== "number" || Number.isNaN(noul)) {
		throw new Error(`clef answer "${id}" has no numeric noul`);
	}
	return noul;
}

/**
 * Read the chosen option from a `choice` answer. An option outside `allowed`
 * is treated as malformed.
 */
export function parseChoice<T extends string>(
	response: unknown,
	id: string,
	allowed: readonly T[],
): T {
	const choice = answer(response, id).choice;
	const match = allowed.find((option) => option === choice);
	if (!match) {
		throw new Error(`clef answer "${id}" has unexpected choice`);
	}
	return match;
}

/** Map a spam probability to a confidence level. */
export function confidenceFor(probability: number): "medium" | "high" | "low" {
	if (probability >= HIGH_CONFIDENCE) return "high";
	if (probability >= MEDIUM_CONFIDENCE) return "medium";
	return "low";
}
