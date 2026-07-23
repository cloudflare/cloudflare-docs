import { getCollection } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as getMdxRenderer } from "@astrojs/mdx";
import { getContainerRenderer as getReactRenderer } from "@astrojs/react";
import { getHeadingsFromHtml, type Heading } from "@cloudflare/nimbus-docs";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

// AnchorHeading emits its <h*> at runtime via set:html, so those headings are
// absent from compile-time `render().headings`. Pages using it (directly or
// through a partial) must read headings from rendered HTML instead.
const RENDER_MARKER = "AnchorHeading";

function resolvePartialId(file?: string, product?: string): string | undefined {
	if (!file) return undefined;
	return product ? `${product}/${file}` : file;
}

function renderRefs(body: string): string[] {
	const ids: string[] = [];
	for (const match of body.matchAll(/<Render\b[^>]*>/g)) {
		const tag = match[0];
		const file = /\bfile=["']([^"']+)["']/.exec(tag)?.[1];
		const product = /\bproduct=["']([^"']+)["']/.exec(tag)?.[1];
		const id = resolvePartialId(file, product);
		if (id) ids.push(id);
	}
	return ids;
}

let dynamicPartials: Promise<Set<string>> | undefined;
async function computeDynamicPartials(): Promise<Set<string>> {
	const bodies = new Map<string, string>();
	for (const partial of await getCollection("partials")) {
		bodies.set(partial.id, partial.body ?? "");
	}

	const dynamic = new Set<string>();
	for (const [id, body] of bodies) {
		if (body.includes(RENDER_MARKER)) dynamic.add(id);
	}
	let changed = true;
	while (changed) {
		changed = false;
		for (const [id, body] of bodies) {
			if (dynamic.has(id)) continue;
			if (renderRefs(body).some((ref) => dynamic.has(ref))) {
				dynamic.add(id);
				changed = true;
			}
		}
	}
	return dynamic;
}

export async function pageHasRuntimeHeadings(body: string): Promise<boolean> {
	if (!body) return false;
	if (body.includes(RENDER_MARKER)) return true;
	const dynamic = await (dynamicPartials ??= computeDynamicPartials());
	return renderRefs(body).some((ref) => dynamic.has(ref));
}

let containerPromise: Promise<AstroContainer> | undefined;
export async function scrapeRenderedHeadings(
	Content: AstroComponentFactory,
	components: Record<string, unknown>,
): Promise<Heading[]> {
	containerPromise ??= loadRenderers([
		getMdxRenderer(),
		getReactRenderer(),
	]).then((renderers) => AstroContainer.create({ renderers }));
	const html = await (
		await containerPromise
	).renderToString(Content, { props: { components } });
	return getHeadingsFromHtml(html);
}
