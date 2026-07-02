import { describe, expect, it } from "vitest";
import {
	EMPTY_USAGE_INPUTS,
	computeEstimate,
	includedZoneEnd,
	minutesToSliderForRow,
	sliderToMinutesForRow,
} from "./pricing-utils";

describe("computeEstimate", () => {
	it("returns zero cost when there is no usage", () => {
		const estimate = computeEstimate(EMPTY_USAGE_INPUTS, 30);
		expect(estimate.total).toBe(0);
		expect(estimate.breakdown).toHaveLength(0);
	});

	it("only bills participant minutes beyond the included allowance", () => {
		const estimate = computeEstimate({ ...EMPTY_USAGE_INPUTS, av: 10_000 }, 30);
		expect(estimate.total).toBe(0);

		const overIncluded = computeEstimate(
			{ ...EMPTY_USAGE_INPUTS, av: 11_000 },
			30,
		);
		expect(overIncluded.total).toBeCloseTo(1000 * 0.002, 6);
		expect(overIncluded.costShares.video).toBeCloseTo(2, 6);
	});

	it("bills export minutes at the correct group rate", () => {
		const estimate = computeEstimate({ ...EMPTY_USAGE_INPUTS, ev: 1_100 }, 30);
		// 1,100 - 100 included = 1,000 billable minutes at $0.010/min
		expect(estimate.costShares.export).toBeCloseTo(10, 6);
		expect(estimate.total).toBeCloseTo(10, 6);
	});

	it("only bills Workers AI neurons beyond the free daily allowance", () => {
		const withinFreeTier = computeEstimate(
			{ ...EMPTY_USAGE_INPUTS, rt: 100 },
			30,
		);
		// 100 min * 836.36 neurons/min is well within 10,000 * 30 free neurons
		expect(withinFreeTier.total).toBe(0);
		expect(withinFreeTier.billableNeurons).toBe(0);

		const overFreeTier = computeEstimate(
			{ ...EMPTY_USAGE_INPUTS, rt: 100_000 },
			1,
		);
		expect(overFreeTier.billableNeurons).toBeGreaterThan(0);
		expect(overFreeTier.total).toBeGreaterThan(0);
		expect(overFreeTier.costShares.transcription).toBeCloseTo(
			overFreeTier.total,
			6,
		);
	});

	it("annualizes the monthly total", () => {
		const estimate = computeEstimate({ ...EMPTY_USAGE_INPUTS, av: 50_000 }, 30);
		expect(estimate.annualized).toBeCloseTo(estimate.total * 12, 6);
	});
});

describe("slider <-> minutes mapping", () => {
	it("round-trips participant minutes through the slider and back", () => {
		for (const minutes of [0, 10_000, 55_000, 100_000, 500_000, 1_000_000]) {
			const slider = minutesToSliderForRow("av", minutes);
			const roundTripped = sliderToMinutesForRow("av", slider);
			expect(roundTripped).toBeCloseTo(minutes, -1);
		}
	});

	it("round-trips export minutes through the slider and back", () => {
		for (const minutes of [0, 100, 2_500, 5_000, 25_000, 50_000]) {
			const slider = minutesToSliderForRow("ev", minutes);
			const roundTripped = sliderToMinutesForRow("ev", slider);
			expect(roundTripped).toBeCloseTo(minutes, -1);
		}
	});

	it("round-trips transcription minutes through the slider and back", () => {
		for (const minutes of [0, 5_000, 10_000, 50_000, 100_000]) {
			const slider = minutesToSliderForRow("rt", minutes);
			const roundTripped = sliderToMinutesForRow("rt", slider);
			expect(roundTripped).toBeCloseTo(minutes, -1);
		}
	});

	it("marks the included free zone at the expected slider position", () => {
		expect(includedZoneEnd("av")).toBe(30);
		expect(includedZoneEnd("ev")).toBe(30);
		expect(includedZoneEnd("rt")).toBe(50);
	});
});
