import { z } from "astro:schema";

export const learningPathsSchema = z
	.object({
		title: z.string(),
		uid: z.string().optional(),
		path: z.string(),
		priority: z.number(),
		description: z.string(),
		products: z.string().array(),
		product_group: z.string(),
		additional_groups: z.string().array().optional(),
	})
	.strict();
