import { z } from "astro:schema";
import { reference } from "astro:content";

export const streamSchema = z.object({
	id: z.string(),
	url: z.string(),
	title: z.string(),
	description: z.string(),
	products: z
		.array(reference("products"))
		.default([])
		.describe(
			"The names of related products (according to their file name in `src/content/products`). Usually, these correspond to file paths, but not always, such as with `cloudflare-tunnel`",
		),
	transcript: z.string().optional(),
	chapters: z.record(z.string(), z.string()).optional(),
	tags: z.array(z.string()).optional(),
	updated: z.date().optional(),
	pcx_content_type: z.string().default("video"),
	thumbnail: z
		.object({
			url: z.string(),
		})
		.or(
			z.object({
				timestamp: z.string(),
			}),
		)
		.optional(),
});
