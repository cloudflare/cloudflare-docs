import { experimental_AstroContainer } from "astro/container";
import { getContainerRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import type { CollectionEntry } from "astro:content";

export async function entryToString(
	entry: CollectionEntry<"docs">,
	locals: any,
) {
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
		locals,
	});

	return html;
}
