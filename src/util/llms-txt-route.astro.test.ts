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
