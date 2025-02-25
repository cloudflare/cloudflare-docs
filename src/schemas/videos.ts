import { z } from "astro:schema";

export const videosSchema = z
	.object({
		id: z.string(),
		link: z.string().url(),
		description: z.string(),
		tags: z.string().array().optional(),
		products: z.string().array(),
		cloudflare: z.boolean(),
		stream_id: z.string().optional(),
		author: z.string(),
		updated: z.coerce.date(),
		difficulty: z.string(),
		content_type: z.string(),
		pcx_content_type: z.string(),
		languages: z.string().array().optional(),
	})
	.strict();
