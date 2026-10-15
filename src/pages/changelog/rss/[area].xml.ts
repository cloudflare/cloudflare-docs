/**
 * /changelog/rss/<group-slug>.xml — per product-group ("area") RSS feed.
 * CF source: cloudflare-docs/src/pages/changelog/rss/[area].xml.ts
 * Adapted: area slug uses the same `lower + spaces→hyphens` rule as the
 * product-group pages (no github-slugger dependency).
 */
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { config } from "virtual:nimbus/config";
import { getChangelogs, getRSSItems, slugifyArea } from "~/util/changelog";

import type {
	APIRoute,
	InferGetStaticPropsType,
	InferGetStaticParamsType,
	GetStaticPaths,
} from "astro";

export const prerender = true;

export const getStaticPaths = (async () => {
	const products = await getCollection("directory", (e) =>
		Boolean(e.data.entry?.group),
	);
	const allNotes = await getChangelogs({});

	const areas = Object.entries(
		Object.groupBy(products, (p) => p.data.entry!.group!),
	);

	return areas.map(([area, products]) => {
		if (!products)
			throw new Error(`[Changelog] No products attributed to "${area}"`);

		const sortedProducts = [...products].sort((a, b) =>
			a.id.localeCompare(b.id),
		);
		const productIds = new Set(sortedProducts.map((p) => p.id));
		const areaNotes = allNotes.filter((n) =>
			n.data.products.some((p) => productIds.has(p.id)),
		);
		const productDigest = sortedProducts.map((p) => p.digest ?? p.id).join(",");
		const notesDigest = areaNotes.map((n) => n.digest ?? n.id).join(",");

		return {
			params: { area: slugifyArea(area) },
			props: { title: area, products },
			cacheKey: `${productDigest}:${notesDigest}`,
		};
	});
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = async ({ props, locals }) => {
	const { title, products } = props;

	const notes = await getChangelogs({
		filter: (e) => {
			return e.data.products.some((x) => products.some((y) => x.id === y.id));
		},
	});

	const items = await getRSSItems({ notes, locals });

	return rss({
		title: `Cloudflare changelogs | ${title}`,
		description: `Cloudflare changelogs for ${title} products`,
		site: new URL("/changelog/", config.site).href,
		items,
	});
};
