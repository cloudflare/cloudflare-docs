import { describe, expect, it } from "vitest";
import { formatCompactTokens, formatModelPricing } from "./model-format";

describe("model display formatting", () => {
	it("formats token counts compactly", () => {
		expect(formatCompactTokens(200_000)).toBe("200K tokens");
		expect(formatCompactTokens(null)).toBeNull();
	});

	it("formats supported pricing values and omits nested metadata", () => {
		expect(
			formatModelPricing({
				"Input tokens (per 1M)": 1.25,
				"per M output tokens": 2.5,
				"per M cached input tokens": 0.25,
				"cached output tokens (per 1m)": 0.5,
				plan: "included",
				metadata: { currency: "USD" },
			}),
		).toEqual([
			"Input (per 1M tokens): $1.25",
			"Output (per 1M tokens): $2.50",
			"Cached input (per 1M tokens): $0.25",
			"Cached output (per 1M tokens): $0.50",
			"plan: included",
		]);
	});

	it("preserves non-token billing units", () => {
		expect(
			formatModelPricing({
				"per input 512x512 tile": 0.000059,
				"per step": 0.01,
				"per image MP": 0.02,
				"per audio minute": 0.03,
				"per request": 0.04,
			}),
		).toEqual([
			"per input 512x512 tile: $0.000059",
			"per step: $0.01",
			"per image MP: $0.02",
			"per audio minute: $0.03",
			"per request: $0.04",
		]);
	});
});
