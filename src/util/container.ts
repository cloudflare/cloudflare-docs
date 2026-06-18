import { experimental_AstroContainer } from "astro/container";
import reactRenderer from "@astrojs/react/server.js";
import mdxRenderer from "@astrojs/mdx/server.js";
import { render, type CollectionEntry } from "astro:content";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

// Creating an Astro container (and registering its renderers) is expensive, so
// we build a single shared instance lazily and reuse it across every call.
// Previously a fresh container was created per entry, which dominated the cost
// of rendering changelog RSS feeds (hundreds of feeds × hundreds of entries).
let containerPromise: Promise<
	Awaited<ReturnType<typeof experimental_AstroContainer.create>>
> | null = null;

function getContainer() {
	if (!containerPromise) {
		containerPromise = (async () => {
			const container = await experimental_AstroContainer.create({});
			container.addServerRenderer({
				name: "astro:jsx",
				renderer: mdxRenderer,
			});
			container.addServerRenderer({
				name: "@astrojs/react",
				renderer: reactRenderer,
			});
			return container;
		})();
	}

	return containerPromise;
}

// Cache of rendered entry HTML, keyed by collection + id. The same changelog
// entry is rendered for the global feed, the per-product feed, every area feed
// it belongs to, etc.; memoizing avoids re-rendering identical content.
const entryHtmlCache = new Map<string, Promise<string>>();

export async function entryToString(
	entry: CollectionEntry<"docs" | "changelog">,
	locals: any,
) {
	if (entry.rendered?.html) {
		return entry.rendered.html;
	}

	// `getChangelogs` rewrites `entry.id` to a folder-stripped slug, so prefer
	// the unique source `filePath` to avoid collisions between same-named files
	// in different product folders. Fall back to collection + id otherwise.
	const cacheKey = entry.filePath ?? `${entry.collection}:${entry.id}`;
	const cached = entryHtmlCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	const renderPromise = (async () => {
		const container = await getContainer();
		const { Content } = await render(entry);

		return container.renderToString(Content, {
			params: { slug: entry.id },
			locals,
		});
	})();

	entryHtmlCache.set(cacheKey, renderPromise);

	return renderPromise;
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
