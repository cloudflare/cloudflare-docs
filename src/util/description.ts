import { experimental_AstroContainer } from "astro/container";
import { getContainerRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import type { CollectionEntry } from "astro:content";
import { parse } from "node-html-parser";

/*
    1. If there is a `description` property in the frontmatter, return that.
    2. If there is a `<p>...</p>` element in the HTML, return that.
    3. Return `undefined` to signal to consumers there is no suitable description.
*/
export async function getPageDescription(entry: CollectionEntry<"docs">) {
	if (entry.data.description) return entry.data.description;

	if (!entry.render) {
		return undefined;
	}

	const renderers = await loadRenderers([getContainerRenderer()]);
	const container = await experimental_AstroContainer.create({
		renderers,
	});

	const { Content } = await entry.render();

	const html = await container.renderToString(Content, {
		params: { slug: entry.slug },
	});

	const dom = parse(html);
	const description = dom.querySelector(":root > p");

	if (description) return description.innerText;

	return undefined;
}
