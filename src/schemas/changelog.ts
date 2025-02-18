import { reference } from "astro:content";
import { z } from "astro:schema";

export const changelogSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.coerce.date(),
	products: z
		.array(reference("products"))
		.default([])
		.describe(
			"An array of products to associate this changelog entry with. You may omit the product named after the folder this entry is in.",
		),
});
