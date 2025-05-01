import { getCollection } from "astro:content";

export const products = await getCollection("products");

export const productsByGroup = Object.entries(
	Object.groupBy(
		products.filter((product) => Boolean(product.data.product.group)),
		(product) => product.data.product.group,
	),
);

export const groups = [
	...new Set(products.flatMap((product) => product.data.product.group ?? [])),
].sort();
