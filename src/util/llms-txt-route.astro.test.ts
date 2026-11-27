import { describe, expect, test, vi } from "vitest";

import { GET, getStaticPaths } from "../pages/[...product]/llms.txt";
import { getLegacyModels } from "./models";

const models = [
	{
		id: "model-a",
		digest: "model-a-digest",
		data: {
			name: "@cf/example/model-a",
			description: "The first model.",
			task: { name: "Text generation" },
			tags: [],
			properties: [],
			schema: {},
		},
	},
	{
		id: "model-b",
		digest: "model-b-digest",
		data: {
			name: "@cf/example/model-b",
			description: "The second model.",
			task: { name: "Text generation" },
			tags: [],
			properties: [],
			schema: {},
		},
	},
];

const catalogModels = [
	{
		id: "openai-tts-1",
		digest: "tts-digest",
		data: {
			model_id: "openai/tts-1",
			name: "TTS 1",
			task: "Text-to-Speech",
			description: "Speech synthesis.",
			tags: [],
			schema: {},
		},
	},
];

const directoryOnlyBody = vi.hoisted(
	() =>
		'import { DirectoryListing } from "~/components";\n\n<DirectoryListing />',
);

vi.mock("astro:content", () => ({
	getCollection: vi.fn(async (id: string) => {
		if (id === "directory") {
			return [
				{
					id: "workers-ai",
					digest: "directory-digest",
					data: {
						name: "Workers AI",
						entry: { title: "Workers AI", url: "/workers-ai/" },
					},
				},
				{
					id: "ai",
					digest: "ai-directory-digest",
					data: { name: "AI", entry: { title: "AI", url: "/ai/" } },
				},
				{
					id: "example",
					digest: "example-directory-digest",
					data: {
						name: "Example",
						entry: { title: "Example", url: "/example/" },
					},
				},
			];
		}
		if (id === "docs") {
			return [
				{
					id: "workers-ai",
					digest: "index-digest",
					body: "Workers AI documentation.",
					data: { title: "Workers AI", sidebar: { order: 1 } },
				},
				{
					id: "workers-ai/models",
					digest: "models-digest",
					body: "Browse the model catalog.",
					data: {
						title: "Models",
						description: "Browse the model catalog.",
						sidebar: { order: 2 },
					},
				},
				{
					id: "ai",
					digest: "ai-index-digest",
					body: "AI documentation.",
					data: { title: "AI", sidebar: { order: 1 } },
				},
				{
					id: "ai/models",
					digest: "ai-models-digest",
					body: "Browse the model catalog.",
					data: { title: "Models", sidebar: { order: 2 } },
				},
				{
					id: "example",
					digest: "example-index-digest",
					body: "Example documentation.",
					data: { title: "Example", sidebar: { order: 1 } },
				},
				{
					id: "example/runtime",
					digest: "example-runtime-digest",
					body: directoryOnlyBody,
					data: { title: "Runtime", sidebar: { order: 3 } },
				},
				{
					id: "example/runtime/state",
					digest: "example-state-digest",
					body: "Store state.",
					data: { title: "State" },
				},
				{
					id: "example/tools",
					digest: "example-tools-digest",
					body: "Tools give the agent abilities beyond the model.",
					data: { title: "Tools", sidebar: { order: 2 } },
				},
				{
					id: "example/tools/browser",
					digest: "example-browser-digest",
					body: "Browse the web.",
					data: { title: "Browser" },
				},
				{
					id: "example/getting-started",
					digest: "example-getting-started-digest",
					body: directoryOnlyBody,
					data: { title: "Getting started", sidebar: { order: 1 } },
				},
				{
					id: "example/getting-started/quick-start",
					digest: "example-quick-start-digest",
					body: "Build your first agent.",
					data: { title: "Quick start" },
				},
			];
		}
		if (id === "workers-ai-models") return models;
		if (id === "catalog-models") return catalogModels;
		return [];
	}),
}));

describe("Workers AI llms.txt", () => {
	test("includes every published model page exactly once", async () => {
		const paths = await getStaticPaths();
		const workersAi = paths.find(
			(path) => path.params.product === "workers-ai",
		);
		expect(workersAi).toBeDefined();

		const response = await GET({
			props: workersAi!.props,
			url: new URL("https://developers.cloudflare.com/workers-ai/llms.txt"),
		} as never);
		const body = await response.text();
		const publishedModels = await getLegacyModels();

		expect(body.match(/^## Models$/gm)).toHaveLength(1);
		expect(body.split("/workers-ai/models/index.md")).toHaveLength(2);
		for (const model of publishedModels) {
			const slug = model.name.split("/").at(-1)!;
			const url = `https://developers.cloudflare.com/workers-ai/models/${slug}/index.md`;
			expect(body.split(url)).toHaveLength(2);
		}
	});

	test("/ai/ lists catalog and legacy models once, keeping multi-segment slugs", async () => {
		const paths = await getStaticPaths();
		const ai = paths.find((path) => path.params.product === "ai");
		expect(ai).toBeDefined();

		const response = await GET({
			props: ai!.props,
			url: new URL("https://developers.cloudflare.com/ai/llms.txt"),
		} as never);
		const body = await response.text();

		for (const slug of [
			"openai/tts-1",
			"@cf/example/model-a",
			"@cf/example/model-b",
		]) {
			const url = `https://developers.cloudflare.com/ai/models/${slug}/index.md`;
			expect(body.split(url)).toHaveLength(2);
		}
	});
});

describe("product llms.txt sections", () => {
	test("sections with a directory-only index page use its title and sidebar order", async () => {
		const paths = await getStaticPaths();
		const example = paths.find((path) => path.params.product === "example");
		expect(example).toBeDefined();

		const response = await GET({
			props: example!.props,
			url: new URL("https://developers.cloudflare.com/example/llms.txt"),
		} as never);
		const body = await response.text();

		expect(body.match(/^## .+$/gm)).toEqual([
			"## Overview",
			"## Getting started",
			"## Tools",
			"## Runtime",
		]);
		expect(body).not.toContain(
			"https://developers.cloudflare.com/example/runtime/index.md",
		);
	});
});
