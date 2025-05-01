import { experimental_AstroContainer } from "astro/container";
import reactRenderer from "@astrojs/react/server.js";
import mdxRenderer from "@astrojs/mdx/server.js";
import { render, type CollectionEntry } from "astro:content";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export async function entryToString(
	entry: CollectionEntry<"docs" | "changelog">,
	locals: any,
) {
	if (entry.rendered?.html) {
		return entry.rendered.html;
	}

	const container = await experimental_AstroContainer.create({});
	container.addServerRenderer({
		name: "astro:jsx",
		renderer: mdxRenderer,
	});
	container.addServerRenderer({
		name: "@astrojs/react",
		renderer: reactRenderer,
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
	const container = await experimental_AstroContainer.create({});
	container.addServerRenderer({
		name: "astro:jsx",
		renderer: mdxRenderer,
	});
	container.addServerRenderer({
		name: "@astrojs/react",
		renderer: reactRenderer,
	});

	const html = await container.renderToString(component, {
		props,
	});

	return html;
}
