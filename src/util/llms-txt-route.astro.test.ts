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
			];
		}
		if (id === "workers-ai-models") return models;
		if (id === "catalog-models") return [];
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
});
