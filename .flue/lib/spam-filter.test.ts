import { describe, expect, it, vi } from "vitest";
import {
	buildItemSpamInput,
	evaluateItemSpam,
	isOffTopicCategory,
	parseItemSpamVerdict,
} from "./spam-filter";

function response(noul: number, choice: string) {
	return {
		answers: {
			is_spam: { type: "noul", noul },
			category: { type: "choice", choice },
		},
	};
}

describe("parseItemSpamVerdict", () => {
	it("is high confidence spam at 0.95", () => {
		expect(parseItemSpamVerdict(response(0.95, "spam"))).toMatchObject({
			is_spam: true,
			confidence: "high",
			category: "spam",
			probability: 0.95,
		});
	});

	it("is medium confidence spam at 0.5", () => {
		expect(parseItemSpamVerdict(response(0.5, "bot_or_test"))).toMatchObject({
			is_spam: true,
			confidence: "medium",
		});
	});

	it("is not spam at 0.49", () => {
		expect(parseItemSpamVerdict(response(0.49, "spam"))).toMatchObject({
			is_spam: false,
			confidence: "low",
		});
	});

	it("treats irrelevant_change as spam, not off-topic", () => {
		expect(
			parseItemSpamVerdict(response(0.9, "irrelevant_change")),
		).toMatchObject({ is_spam: true, confidence: "high" });
		expect(isOffTopicCategory("irrelevant_change")).toBe(false);
	});

	it("decides on probability alone, even when the category is none", () => {
		expect(parseItemSpamVerdict(response(0.99, "none"))).toMatchObject({
			is_spam: true,
			confidence: "high",
			category: "none",
		});
		expect(parseItemSpamVerdict(response(0.2, "spam"))).toMatchObject({
			is_spam: false,
			confidence: "low",
		});
	});

	it("throws on an unknown category", () => {
		expect(() => parseItemSpamVerdict(response(0.9, "weird"))).toThrow();
	});

	it("throws on a malformed response", () => {
		expect(() => parseItemSpamVerdict({})).toThrow();
		expect(() => parseItemSpamVerdict(null)).toThrow();
	});
});

describe("isOffTopicCategory", () => {
	it("flags support and feature requests only", () => {
		expect(isOffTopicCategory("support_request")).toBe(true);
		expect(isOffTopicCategory("feature_request")).toBe(true);
		expect(isOffTopicCategory("spam")).toBe(false);
		expect(isOffTopicCategory("bot_or_test")).toBe(false);
		expect(isOffTopicCategory("none")).toBe(false);
	});
});

describe("buildItemSpamInput", () => {
	it("puts the item and diff in state and asks both questions", () => {
		const input = buildItemSpamInput({
			eventType: "issues",
			item: { title: "t" },
		});
		expect(input.state).toEqual({
			eventType: "issues",
			item: { title: "t" },
			diff: null,
		});
		expect(Object.keys(input.questions)).toEqual(["is_spam", "category"]);
		expect(input.questions.is_spam.instructions).toContain("untrusted");
	});
});

describe("evaluateItemSpam", () => {
	it("forwards the gateway id and parses the verdict", async () => {
		const run = vi.fn().mockResolvedValue(response(0.9, "support_request"));
		const verdict = await evaluateItemSpam(
			{ run },
			{ eventType: "issues", item: {} },
			"gw",
		);
		expect(verdict.category).toBe("support_request");
		expect(run).toHaveBeenCalledWith(
			"@cf/cloudflare/clef",
			expect.objectContaining({ model: "clef" }),
			{ gateway: { id: "gw" } },
		);
	});
});
