import { describe, expect, test } from "vitest";

import {
	getHtmlDocument,
	getInputParts,
	getToolCalls,
} from "./example-content";

describe("getInputParts", () => {
	test("returns the last user message's prompt and https images", () => {
		const input = {
			messages: [
				{ role: "system", content: "Be brief." },
				{
					role: "user",
					content: [
						{
							type: "image_url",
							image_url: { url: "https://example.com/a.png" },
						},
						{
							type: "image_url",
							image_url: { url: "data:image/png;base64,AAA" },
						},
						{ type: "text", text: "What is this?" },
					],
				},
			],
		};
		expect(getInputParts(input)).toEqual({
			prompt: "What is this?",
			imageUrls: ["https://example.com/a.png"],
		});
	});

	test("handles string content and missing messages", () => {
		expect(
			getInputParts({ messages: [{ role: "user", content: "Hi" }] }),
		).toEqual({
			prompt: "Hi",
			imageUrls: [],
		});
		expect(getInputParts({ prompt: "Hi" })).toEqual({ imageUrls: [] });
	});
});

describe("getToolCalls", () => {
	test("pretty-prints JSON arguments", () => {
		const output = {
			tool_calls: [
				{
					type: "function",
					function: { name: "get_weather", arguments: '{"city":"SF"}' },
				},
			],
		};
		expect(getToolCalls(output)).toEqual([
			{ name: "get_weather", args: '{\n  "city": "SF"\n}' },
		]);
	});

	test("keeps non-JSON arguments as-is and skips malformed calls", () => {
		const output = {
			tool_calls: [
				{ function: { name: "f", arguments: "not json" } },
				{ id: "x" },
			],
		};
		expect(getToolCalls(output)).toEqual([{ name: "f", args: "not json" }]);
		expect(getToolCalls(undefined)).toEqual([]);
	});
});

describe("getHtmlDocument", () => {
	test("extracts a full HTML page from a fenced block", () => {
		const text =
			"Here you go:\n```html\n<!DOCTYPE html>\n<html><body>Hi</body></html>\n```";
		expect(getHtmlDocument(text)).toBe(
			"<!DOCTYPE html>\n<html><body>Hi</body></html>",
		);
	});

	test("ignores HTML fragments and other languages", () => {
		expect(getHtmlDocument("```html\n<div>Hi</div>\n```")).toBeUndefined();
		expect(getHtmlDocument("```js\nconsole.log(1)\n```")).toBeUndefined();
		expect(getHtmlDocument(undefined)).toBeUndefined();
	});
});
