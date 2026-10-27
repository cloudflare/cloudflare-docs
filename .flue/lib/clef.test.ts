import { describe, expect, it, vi } from "vitest";
import {
	CLEF_MODEL_ID,
	confidenceFor,
	parseChoice,
	parseNoul,
	runClef,
} from "./clef";

const response = {
	answers: {
		a: { type: "noul", noul: 0.9 },
		b: { type: "choice", choice: "x", probabilities: {}, confidence: 0.9 },
	},
};

describe("runClef", () => {
	const request = { state: "s", questions: {} };

	it("sends model: clef with the request and no options by default", async () => {
		const run = vi.fn().mockResolvedValue(response);
		await runClef({ run }, request);
		expect(run).toHaveBeenCalledWith(
			CLEF_MODEL_ID,
			{ model: "clef", ...request },
			undefined,
		);
	});

	it("routes through AI Gateway when an ID is given", async () => {
		const run = vi.fn().mockResolvedValue(response);
		await runClef({ run }, request, "gw");
		expect(run.mock.calls[0][2]).toEqual({ gateway: { id: "gw" } });
	});
});

describe("parsers", () => {
	it("reads noul and choice answers", () => {
		expect(parseNoul(response, "a")).toBe(0.9);
		expect(parseChoice(response, "b", ["x", "y"] as const)).toBe("x");
	});

	it.each([null, {}, { answers: {} }, { answers: { a: { noul: "x" } } }])(
		"parseNoul throws on malformed response %j",
		(bad) => {
			expect(() => parseNoul(bad, "a")).toThrow();
		},
	);

	it("parseChoice throws on an unexpected option", () => {
		expect(() => parseChoice(response, "b", ["y"] as const)).toThrow();
	});
});

describe("confidenceFor", () => {
	it.each([
		[0.95, "high"],
		[0.8, "high"],
		[0.79, "medium"],
		[0.5, "medium"],
		[0.49, "low"],
	])("%s -> %s", (probability, expected) => {
		expect(confidenceFor(probability)).toBe(expected);
	});
});
