import { describe, expect, it } from "vitest";
import * as v from "valibot";
import { millisecondsUntil, parseAgentResult } from "./agent-step";
import {
	AGENT_READ_TIMEOUT_BUFFER_MS,
	JUDGE_DURABILITY,
	SMALL_AGENT_DURABILITY,
	SPECIALIST_DURABILITY,
} from "./durability";

describe("agent step helpers", () => {
	it("keeps every read step within the 30-minute Workflow step timeout", () => {
		for (const { timeoutMs } of [
			SPECIALIST_DURABILITY,
			JUDGE_DURABILITY,
			SMALL_AGENT_DURABILITY,
		]) {
			expect(timeoutMs + AGENT_READ_TIMEOUT_BUFFER_MS).toBeLessThanOrEqual(
				30 * 60_000,
			);
		}
	});

	it("does not let a retry extend the original read deadline", () => {
		expect(millisecondsUntil(12_000, 10_000)).toBe(2_000);
		expect(millisecondsUntil(8_000, 10_000)).toBe(0);
	});

	it("reads and validates the final data part", () => {
		const schema = v.object({ ok: v.boolean() });
		expect(
			parseAgentResult(schema, "result", {
				result: [{ ok: false }, { ok: true }],
			}),
		).toEqual({ ok: true });
	});

	it("rejects missing and invalid data parts", () => {
		const schema = v.object({ ok: v.boolean() });
		expect(() => parseAgentResult(schema, "result", {})).toThrow(
			"agent produced no result result",
		);
		expect(() =>
			parseAgentResult(schema, "result", { result: [{ ok: "yes" }] }),
		).toThrow();
	});
});
