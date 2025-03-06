import { experimental_AstroContainer } from "astro/container";
import { getContainerRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { render, type CollectionEntry } from "astro:content";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export async function entryToString(
	entry: CollectionEntry<"docs" | "changelog">,
	locals: any,
) {
	if (entry.rendered?.html) {
		return entry.rendered.html;
	}

	const renderers = await loadRenderers([getContainerRenderer()]);
	const container = await experimental_AstroContainer.create({
		renderers,
	});

	const { Content } = await render(entry);

	const html = await container.renderToString(Content, {
		params: { slug: entry.id },
		locals,
	});

	return html;
}

export async function componentToString(
	component: AstroComponentFactory,
	props: any,
) {
	const renderers = await loadRenderers([getContainerRenderer()]);
	const container = await experimental_AstroContainer.create({
		renderers,
	});

	const html = await container.renderToString(component, {
		props,
	});

	return html;
}
