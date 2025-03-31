import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getChangelogs, getRSSItems } from "~/util/changelog";

import type {
	APIRoute,
	InferGetStaticPropsType,
	InferGetStaticParamsType,
	GetStaticPaths,
} from "astro";

export const getStaticPaths = (async () => {
	const products = await getCollection("products");

	return products.map((product) => {
		return {
			params: {
				product: product.id,
			},
			props: {
				product,
			},
		};
	});
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = async ({
	params,
	props,
	locals,
}) => {
	const { data } = props.product;

	const notes = await getChangelogs({
		filter: (e) => {
			return e.data.products.some(({ id }) => id === params.product);
		},
	});

	const items = await getRSSItems({
		notes,
		locals,
	});

	return rss({
		title: `Cloudflare changelogs | ${data.name}`,
		description: `Cloudflare changelogs for ${data.name}`,
		site: "https://developers.cloudflare.com/changelog/",
		items,
	});
};
