import { describe, expect, test } from "vitest";

import {
	getDocumentLayers,
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
		expect(getInputParts("Hi")).toEqual({ imageUrls: [] });
	});
});

describe("getInputParts on non-chat inputs", () => {
	test("reads prompt and image fields, keeping only https URLs", () => {
		expect(
			getInputParts({
				prompt: "Swap the sofa",
				image_urls: ["https://a.test/1.jpg", "data:image/png;base64,xx"],
				image: "https://a.test/2.jpg",
			}),
		).toEqual({
			prompt: "Swap the sofa",
			imageUrls: ["https://a.test/2.jpg", "https://a.test/1.jpg"],
		});
	});

	test("returns no prompt for an image-only input", () => {
		expect(getInputParts({ image: "https://a.test/ad.jpg" })).toEqual({
			prompt: undefined,
			imageUrls: ["https://a.test/ad.jpg"],
		});
	});
});

describe("getDocumentLayers", () => {
	test("returns visible text and image layers in paint order", () => {
		const layers = getDocumentLayers({
			document: {
				layers: [
					{
						id: "title",
						type: "text",
						z_order: 2,
						text: "SALE",
						text_style: {
							font_family: "Oswald,sans-serif",
							font_weight: 700,
							font_size_px: 40,
							color: "#fff",
						},
					},
					{ id: "bg", type: "vector", z_order: 0 },
					{
						id: "logo",
						type: "image",
						subtype: "logo",
						z_order: 1,
						asset_path: "https://a.test/logo.png",
					},
					{ id: "hidden", type: "text", z_order: 3, text: "x", hidden: true },
				],
			},
		});
		expect(layers.map((l) => l.id)).toEqual(["logo", "title"]);
		expect(layers[1]).toMatchObject({ font: "Oswald 700 40px", color: "#fff" });
	});

	test("returns nothing for outputs without a document", () => {
		expect(getDocumentLayers({ text: "hi" })).toEqual([]);
		expect(getDocumentLayers(undefined)).toEqual([]);
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
