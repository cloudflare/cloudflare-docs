import { z } from "astro:schema";
import { reference } from "astro:content";

export const streamSchema = z.object({
	id: z.string(),
	url: z.string(),
	title: z.string(),
	description: z.string(),
	products: z.array(reference("products")),
	transcript: z.string().optional(),
	chapters: z.record(z.string(), z.string()).optional(),
	tags: z.array(z.string()).optional(),
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
