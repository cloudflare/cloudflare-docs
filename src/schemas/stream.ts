import { z } from "astro:schema";
import { reference } from "astro:content";

export const streamSchema = z.object({
	id: z.string(),
	url: z.string(),
	title: z.string(),
	description: z.string(),
	products: z
		.array(reference("directory"))
		.default([])
		.describe(
			"The names of related directory entries (according to their file name in `src/content/directory`). Usually, these correspond to file paths, but not always, such as with `cloudflare-tunnel`",
		),
	transcript: z.string().optional(),
	chapters: z.record(z.string(), z.string()).optional(),
	tags: z.array(z.string()).optional(),
	updated: z.date().optional(),
	pcx_content_type: z.string().default("video"),
	reviewed: z
		.date()
		.optional()
		.describe(
			"A `YYYY-MM-DD` value that signals when the page was last explicitly reviewed from beginning to end. This is used to sort learning paths presented in the [ResourcesBySelector component](/style-guide/components/resources-by-selector/).",
		),
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
