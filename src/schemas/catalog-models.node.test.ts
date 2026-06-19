import { describe, expect, test } from "vitest";
import { catalogModelsSchema } from "./catalog-models";

/**
 * Minimum-valid catalog row: every required field present, every optional
 * field omitted. Adapted from the simplest on-disk JSON in
 * `src/content/catalog-models/`. Mutated per-case so each assertion stays
 * focused on the field under test.
 */
function makeMinimalModel(
	overrides: Record<string, unknown> = {},
): Record<string, unknown> {
	return {
		model_id: "@cf/example/test-model",
		provider_id: "example",
		name: "Test Model",
		description: "A model used to exercise the catalog Zod schema.",
		task: "Text Generation",
		tags: [],
		context_length: null,
		max_output_tokens: null,
		supports_async: false,
		examples: [],
		metadata: {},
		external_info: null,
		terms: null,
		cover_image_url: null,
		schema_version: null,
		...overrides,
	};
}

describe("catalogModelsSchema", () => {
	test("parses a minimum-valid row with no banner or request_formats", () => {
		const parsed = catalogModelsSchema.parse(makeMinimalModel());
		expect(parsed.model_id).toBe("@cf/example/test-model");
		expect(parsed.banner).toBeUndefined();
		expect(parsed.request_formats).toBeUndefined();
	});

	// Most production catalog rows ship `banner: null` and
	// `request_formats: null` even when populated upstream. Both fields
	// must accept null without coercion so the resolver sees the same shape
	// as the on-disk JSON.
	test("accepts banner: null and request_formats: null", () => {
		const parsed = catalogModelsSchema.parse(
			makeMinimalModel({ banner: null, request_formats: null }),
		);
		expect(parsed.banner).toBeNull();
		expect(parsed.request_formats).toBeNull();
	});

	// Mirrors the shape of `src/content/catalog-models/anthropic-claude-fable-5.json`,
	// the on-disk sample that exercises every nested banner field (title,
	// link, severity="warning", dismissible=true). Locking it in here
	// catches accidental schema tightening that would silently drop the
	// link, title, or dismissible flag. `pruna-p-image-try-on.json` carries
	// a second, simpler banner shape (severity="info", no link) that the
	// "accepts banner: null" and severity tests already cover by structure.
	test("parses a fully populated banner and round-trips every nested field", () => {
		const parsed = catalogModelsSchema.parse(
			makeMinimalModel({
				banner: {
					title: "NOTE",
					text: "Access to this model is currently limited.",
					severity: "warning",
					dismissible: true,
					link: {
						url: "https://example.com/notice",
						label: "More info",
					},
				},
			}),
		);
		expect(parsed.banner).toEqual({
			title: "NOTE",
			text: "Access to this model is currently limited.",
			severity: "warning",
			dismissible: true,
			link: { url: "https://example.com/notice", label: "More info" },
		});
	});

	test("accepts request_formats as a non-empty string array", () => {
		const parsed = catalogModelsSchema.parse(
			makeMinimalModel({
				request_formats: ["chat-completions", "responses"],
			}),
		);
		expect(parsed.request_formats).toEqual(["chat-completions", "responses"]);
	});

	// Guard against a future tightening of `severity` to a z.enum(...). The
	// upstream Stratus enum is not yet locked down, so unknown values must
	// continue to parse cleanly — the renderer falls back to a neutral
	// Aside style. The chosen value MUST be outside both the observed
	// production set ("warning", "info") and the renderer's switch
	// ("info"/"warning"/"danger"/"error") so this test fails loudly the
	// moment anyone constrains the field.
	test("accepts a genuinely unobserved severity string without rejecting", () => {
		const parsed = catalogModelsSchema.parse(
			makeMinimalModel({
				banner: { text: "Heads up.", severity: "experimental" },
			}),
		);
		expect(parsed.banner?.severity).toBe("experimental");
	});

	// Negative cases: `text` and `severity` are both required on
	// `catalogBannerSchema`. Omitting either should produce a parse error
	// rather than silently rendering a broken Aside.
	test("rejects a banner without text", () => {
		const result = catalogModelsSchema.safeParse(
			makeMinimalModel({
				banner: { severity: "warning" },
			}),
		);
		expect(result.success).toBe(false);
	});

	test("rejects a banner without severity", () => {
		const result = catalogModelsSchema.safeParse(
			makeMinimalModel({
				banner: { text: "Heads up." },
			}),
		);
		expect(result.success).toBe(false);
	});
});
