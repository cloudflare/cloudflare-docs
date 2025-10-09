import { z } from "astro:schema";
import { reference } from "astro:content";

export const learningPathsSchema = z
	.object({
		title: z.string(),
		uid: z.string().optional(),
		path: z.string(),
		priority: z.number(),
		description: z.string(),
		pcx_content_type: z.string().default("learning-path"),
		products: z
			.array(reference("products"))
			.default([])
			.describe(
				"The names of related products (according to their file name in `src/content/products`). Usually, these correspond to file paths, but not always, such as with `cloudflare-tunnel`",
			),
		product_group: z.string(),
		tags: z.string().array().optional(),
		additional_groups: z.string().array().optional(),
		video: z.boolean().default(false),
	})
	.strict();
