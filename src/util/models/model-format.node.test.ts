import { describe, expect, it } from "vitest";
import {
	formatCompactTokens,
	formatModelPricing,
	formatModelReasoning,
} from "./model-format";

describe("model display formatting", () => {
	it("formats token counts compactly", () => {
		expect(formatCompactTokens(200_000)).toBe("200K tokens");
		expect(formatCompactTokens(null)).toBeNull();
	});

	it("formats structured reasoning efforts in a concise natural order", () => {
		expect(
			formatModelReasoning(
				{
					supported_efforts: ["xhigh", "medium", "low"],
					default_effort: "xhigh",
					default_enabled: true,
				},
				"true",
			),
		).toEqual([
			{ value: "low", isDefault: false },
			{ value: "medium", isDefault: false },
			{ value: "xhigh", isDefault: true },
		]);
		expect(
			formatModelReasoning(
				{
					supported_efforts: ["medium", "low", "none"],
					default_effort: "medium",
				},
				"true",
			),
		).toEqual([
			{ value: "none", isDefault: false },
			{ value: "low", isDefault: false },
			{ value: "medium", isDefault: true },
		]);
		expect(
			formatModelReasoning(
				{
					supported_efforts: ["max", "high", "low"],
					default_effort: "max",
				},
				"true",
			),
		).toEqual([
			{ value: "low", isDefault: false },
			{ value: "high", isDefault: false },
			{ value: "max", isDefault: true },
		]);
		expect(
			formatModelReasoning(
				{ supported_efforts: ["off", "none", "low"] },
				"true",
			),
		).toEqual([
			{ value: "none", isDefault: false },
			{ value: "low", isDefault: false },
		]);
	});

	it("falls back to a clean yes or no when effort metadata is absent", () => {
		expect(formatModelReasoning(undefined, "true")).toBe("Yes");
		expect(formatModelReasoning(undefined, "false")).toBe("No");
		expect(formatModelReasoning(undefined, undefined)).toBeNull();
	});

	it("summarizes structured binary reasoning metadata", () => {
		expect(
			formatModelReasoning({ mandatory: true, default_enabled: true }, "false"),
		).toBe("Always on");
		expect(
			formatModelReasoning(
				{ mandatory: false, default_enabled: true },
				"false",
			),
		).toBe("Yes");
		expect(
			formatModelReasoning(
				{ mandatory: false, default_enabled: false },
				"false",
			),
		).toBe("Yes");
	});

	it("formats supported pricing values and omits nested metadata", () => {
		expect(
			formatModelPricing({
				"Input tokens (per 1M)": 1.25,
				"Input text tokens (per 1M)": 1.5,
				"Reasoning tokens (per 1M)": 1.75,
				"Cache creation tokens (per 1M)": 2,
				"per M output tokens": 2.5,
				"per M cached input tokens": 0.25,
				"cached output tokens (per 1m)": 0.5,
				output_text_tokens: 9,
				output_audio_tokens: 12,
				output_video_tokens: 17.5,
				plan: "included",
				metadata: { currency: "USD" },
			}),
		).toEqual([
			"Input (per 1M tokens): $1.25",
			"Input text (per 1M tokens): $1.50",
			"Reasoning (per 1M tokens): $1.75",
			"Cache creation (per 1M tokens): $2.00",
			"Output (per 1M tokens): $2.50",
			"Cached input (per 1M tokens): $0.25",
			"Cached output (per 1M tokens): $0.50",
			"Output text (per 1M tokens): $9.00",
			"Output audio (per 1M tokens): $12.00",
			"Output video (per 1M tokens): $17.50",
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
				output_audio_seconds: 0.05,
				"Requests (per 1M)": 0.06,
			}),
		).toEqual([
			"per input 512x512 tile: $0.000059",
			"per step: $0.01",
			"per image MP: $0.02",
			"per audio minute: $0.03",
			"per request: $0.04",
			"output audio seconds: $0.05",
			"Requests (per 1M): $0.06",
		]);
	});
});
