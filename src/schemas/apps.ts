import { z } from "astro:schema";

export const appsSchema = z.object({
	entries: z
		.object({
			link: z.string().url(),
			name: z.string(),
			description: z.string(),
			tags: z.string().array().optional(),
			products: z.string().array(),
			languages: z.string().array(),
			cloudflare: z.boolean(),
			author: z.string().optional(),
			updated: z.coerce.date(),
		})
		.strict()
		.array(),
});
