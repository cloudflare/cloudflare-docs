import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getChangelogs, getRSSItems } from "~/util/changelog";
import { slug } from "github-slugger";

import type {
	APIRoute,
	InferGetStaticPropsType,
	InferGetStaticParamsType,
	GetStaticPaths,
} from "astro";

export const getStaticPaths = (async () => {
	const products = await getCollection("products", (e) =>
		Boolean(e.data.product.group),
	);

	const areas = Object.entries(
		Object.groupBy(products, (p) => p.data.product.group),
	);

	return areas.map(([area, products]) => {
		if (!products)
			throw new Error(`[Changelog] No products attributed to "${area}"`);

		return {
			params: {
				area: slug(area),
			},
			props: {
				title: area,
				products,
			},
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

	const items = await getRSSItems({
		notes,
		locals,
	});

	return rss({
		title: `Cloudflare changelogs | ${title}`,
		description: `Cloudflare changelogs for ${title} products`,
		site: "https://developers.cloudflare.com/changelog/",
		items,
	});
};
