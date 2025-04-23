import { getCollection } from "astro:content";

export const products = await getCollection("products");

export const productsByGroup = Object.entries(
	products
		.filter((product) => Boolean(product.data.product.group))
		.reduce(
			(groups, product) => {
				const primaryGroup = product.data.product.group;
				const additionalGroups = product.data.product.additional_groups ?? [];
				const allGroups = [primaryGroup, ...additionalGroups];

				for (const group of allGroups) {
					if (!groups[group]) {
						groups[group] = [];
					}
					groups[group].push(product);
				}

				return groups;
			},
			{} as Record<string, typeof products>,
		),
);

export const groups = [
	...new Set(
		products.flatMap((product) =>
			[
				product.data.product.group,
				...(product.data.product.additional_groups ?? []),
			].filter(Boolean),
		),
	),
].sort();
