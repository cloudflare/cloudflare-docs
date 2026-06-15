import { describe, expect, test } from "vitest";
import { detectApiModes, getTopLevelVariants } from "./model-schema";

/**
 * Fixture mirroring the exact shape the AI Gateway catalog generator emits for
 * multi-format ("variable schema") models: a root-level `oneOf` on both input
 * and output, where each branch is a plain object schema carrying a
 * human-readable `title` (the request format). See
 * `packages/model-catalog/src/generate-schema.ts` in ai-gateway-infra and the
 * regenerated `models/openai/gpt-5/schema.json`.
 *
 * The branches are trimmed for readability but structurally identical to the
 * real output: `type: "object"` + `properties` + `required` + `title`, with no
 * `contentType`, no `format: "binary"`, and no `requests` property.
 */
function requestFormatOneOf(extraInputBranch?: Record<string, unknown>) {
	const input = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		oneOf: [
			{
				type: "object",
				properties: { messages: { type: "array" }, model: { type: "string" } },
				required: ["messages"],
				title: "Chat Completions",
			},
			{
				type: "object",
				properties: { input: { type: "string" }, model: { type: "string" } },
				required: ["input"],
				title: "Responses",
			},
			...(extraInputBranch ? [extraInputBranch] : []),
		],
	};
	const output = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		oneOf: [
			{
				type: "object",
				properties: { choices: { type: "array" } },
				required: ["choices"],
				title: "Chat Completions",
			},
			{
				type: "object",
				properties: { output: { type: "array" } },
				required: ["output"],
				title: "Responses",
			},
		],
	};
	return { input, output };
}

describe("detectApiModes", () => {
	// The keystone case: this is precisely the shape the catalog generator
	// (ai-gateway-infra MR !462) produces. It MUST NOT be hijacked into
	// Synchronous/Batch/Streaming API modes — those would flatten the oneOf to
	// a single branch per "mode" and drop the request-format distinction.
	// Returning `undefined` makes ModelDetailPage fall through to
	// SchemaDisplay, which renders the titled branches as a variant selector.
	test("returns undefined for a titled request-format oneOf (no API-mode hijack)", () => {
		const schema = requestFormatOneOf();
		expect(detectApiModes(schema)).toBeUndefined();
	});

	test("does not hijack even though output branches are objects with properties", () => {
		// Guard against the subtle trap: `jsonOutputIndex` matches an object
		// branch, but with no streaming/batch counterpart only one mode is
		// built, so the `modes.length > 1` gate still yields undefined.
		const { input, output } = requestFormatOneOf();
		expect(detectApiModes({ input, output })).toBeUndefined();
	});

	test("returns undefined for a flat (non-oneOf) schema", () => {
		const schema = {
			input: { type: "object", properties: { prompt: { type: "string" } } },
			output: { type: "object", properties: { response: { type: "string" } } },
		};
		expect(detectApiModes(schema)).toBeUndefined();
	});

	// Boundary documentation: these are the real Workers AI shapes
	// `detectApiModes` is designed to split. They confirm the request-format
	// case above is excluded specifically because it lacks these signals.
	test("still splits a genuine sync/batch schema (requests branch)", () => {
		const schema = {
			input: {
				oneOf: [
					{ type: "object", properties: { prompt: { type: "string" } } },
					{
						type: "object",
						properties: { requests: { type: "array" } },
					},
				],
			},
			output: {
				oneOf: [{ type: "object", properties: { response: {} } }],
			},
		};
		const modes = detectApiModes(schema);
		expect(modes?.map((m) => m.id)).toEqual(["sync", "batch"]);
	});

	test("still splits a genuine sync/streaming schema (string output branch)", () => {
		const schema = {
			input: {
				oneOf: [
					{ type: "object", properties: { messages: { type: "array" } } },
					{ type: "object", properties: { prompt: { type: "string" } } },
				],
			},
			output: {
				oneOf: [
					{ type: "object", properties: { choices: {} } },
					{ type: "string" },
				],
			},
		};
		const modes = detectApiModes(schema);
		expect(modes?.map((m) => m.id)).toEqual(["sync", "streaming"]);
	});
});

describe("getTopLevelVariants", () => {
	// Because detectApiModes returns undefined for the request-format oneOf,
	// ModelDetailPage falls through to SchemaDisplay, which calls
	// getTopLevelVariants to render the labelled variant selector. This proves
	// the second half of the render decision: the titled branches surface as a
	// selector with the generator's titles, for both input and output.
	test("surfaces the titled request-format branches with their labels", () => {
		const { input, output } = requestFormatOneOf();

		const inputVariants = getTopLevelVariants(input);
		expect(inputVariants?.map((v) => v.title)).toEqual([
			"Chat Completions",
			"Responses",
		]);

		const outputVariants = getTopLevelVariants(output);
		expect(outputVariants?.map((v) => v.title)).toEqual([
			"Chat Completions",
			"Responses",
		]);
	});

	test("returns the full branch schema for each variant", () => {
		const { input } = requestFormatOneOf();
		const variants = getTopLevelVariants(input);
		// The selector renders each branch's own object schema (properties), not
		// the wrapping oneOf.
		expect(variants?.[0].schema).toMatchObject({
			type: "object",
			title: "Chat Completions",
			properties: { messages: { type: "array" } },
		});
	});

	test("returns null for a flat (non-oneOf) schema", () => {
		expect(
			getTopLevelVariants({
				type: "object",
				properties: { prompt: { type: "string" } },
			}),
		).toBeNull();
	});

	test("returns null when oneOf branches have no title (avoids a bare tab strip)", () => {
		expect(
			getTopLevelVariants({
				oneOf: [
					{ type: "object", properties: { a: {} } },
					{ type: "object", properties: { b: {} } },
				],
			}),
		).toBeNull();
	});

	test("returns null for a single-branch oneOf (nothing to choose)", () => {
		expect(
			getTopLevelVariants({
				oneOf: [{ type: "object", properties: {}, title: "Only" }],
			}),
		).toBeNull();
	});
});
