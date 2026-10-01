import { describe, expect, it } from "vitest";

import { configExplorerMetadata } from "./config-explorer-jsdoc.mjs";

describe("config explorer JSDoc", () => {
	it("uses namespaced descriptions and repeatable labeled links", () => {
		expect(
			configExplorerMetadata(
				{
					description: "Default TypeScript documentation.",
					tags: {
						configExplorerDescription: ["Concise explorer documentation."],
						configExplorerLink: [
							"https://developers.cloudflare.com/durable-objects/ Durable Objects",
							"https://developers.cloudflare.com/workers/platform/limits/ Workers limits",
						],
					},
				},
				"Example.value",
			),
		).toEqual({
			description: "Concise explorer documentation.",
			links: [
				{
					label: "Durable Objects",
					url: "https://developers.cloudflare.com/durable-objects/",
				},
				{
					label: "Workers limits",
					url: "https://developers.cloudflare.com/workers/platform/limits/",
				},
			],
		});
	});

	it("falls back to standard TypeScript documentation", () => {
		expect(
			configExplorerMetadata(
				{ description: "Default TypeScript documentation.", tags: {} },
				"Example.value",
			),
		).toEqual({ description: "Default TypeScript documentation." });
	});

	it("rejects malformed or insecure links", () => {
		expect(() =>
			configExplorerMetadata(
				{
					description: "",
					tags: { configExplorerLink: ["http://example.com Example"] },
				},
				"Example.value",
			),
		).toThrow("must use @configExplorerLink <https-url> <label>");
	});
});
