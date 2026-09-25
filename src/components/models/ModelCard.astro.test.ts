import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parse } from "node-html-parser";
import { describe, expect, test } from "vitest";

import type { ModelCardData } from "~/util/models";
import ModelCard from "./ModelCard.astro";

const model: ModelCardData = {
	id: "model-card-fixture",
	name: "fixture-author/verylongmodelnamethatmustwrapwithouttruncation",
	slug: "fixture-author/verylongmodelnamethatmustwrapwithouttruncation",
	displayName: "Very Long Model",
	shortName: "verylongmodelnamethatmustwrapwithouttruncation",
	author: "fixture-author",
	authorName: "Fixture Author",
	hosting: "proxied",
	dataSource: "catalog",
	source: 2,
	task: "Text Generation",
	description:
		"A deliberately long model description that exceeds four lines and must be clipped before it overlaps the model facts and comparison control.",
	tags: [],
	capabilities: [],
	beta: true,
	properties: {},
	propertiesList: [],
};

const truncationClasses = (className: string | undefined): string[] =>
	(className ?? "")
		.split(/\s+/)
		.filter((token) =>
			/^(?:line-clamp-(?:[1-9]\d*|\[[^\]]+\])$|truncate$|overflow-(?:[xy]-)?(?:hidden|clip|ellipsis)$|text-ellipsis$|whitespace-nowrap$)/.test(
				token,
			),
		);

describe("ModelCard", () => {
	test("wraps titles and clamps descriptions to four lines", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(ModelCard, {
			props: { model, index: 0, cols: 3 },
		});
		const root = parse(html);
		const link = root.querySelector("a");
		const title = root.querySelector("h3");
		const titleRow = title?.parentNode;
		const description = root.querySelector("a > p");
		const compareRow = root.querySelector("[data-model-compare]")?.parentNode;
		const descriptionClasses =
			description?.getAttribute("class")?.split(/\s+/) ?? [];

		expect(title?.textContent).toBe(model.shortName);
		expect(truncationClasses(titleRow?.getAttribute("class"))).toEqual([]);
		expect(truncationClasses(title?.getAttribute("class"))).toEqual([]);
		expect(title?.getAttribute("class")).toContain("min-w-0");
		expect(title?.getAttribute("class")).toContain("[overflow-wrap:anywhere]");
		expect(description?.textContent).toBe(model.description);
		expect(truncationClasses(description?.getAttribute("class"))).toEqual([
			"line-clamp-4",
		]);
		expect(descriptionClasses).toContain("h-24");
		expect(description?.getAttribute("class")).toContain(
			"[overflow-wrap:anywhere]",
		);
		expect(link?.getAttribute("class")).toContain("flex-1");
		expect(link?.getAttribute("class")).not.toContain("pb-16");
		expect(compareRow?.getAttribute("class")).not.toContain("absolute");
		expect(compareRow?.textContent.trim()).toBe("Compare");
	});
});
