import { z } from "astro/zod";

export const appsSchema = z
	.object({
		id: z.string(),
		link: z.url(),
		description: z.string(),
		tags: z.string().array().optional(),
		products: z.string().array(),
		languages: z.string().array(),
		cloudflare: z.boolean(),
		author: z.string().optional(),
		updated: z.coerce.date(),
	})
	.strict();
