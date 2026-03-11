import { z } from "astro:schema";
import { reference } from "astro:content";

export const learningPathsSchema = z
	.object({
		title: z.string(),
		uid: z.string().optional(),
		path: z.string(),
		description: z.string(),
		pcx_content_type: z.string().default("learning-path"),
		products: z
			.array(reference("directory"))
			.default([])
			.describe(
				"The names of related directory entries (according to their file name in `src/content/directory`). Usually, these correspond to file paths, but not always, such as with `cloudflare-tunnel`",
			),
		tags: z.string().array().optional(),
		reviewed: z
			.date()
			.optional()
			.describe(
				"A `YYYY-MM-DD` value that signals when the page was last explicitly reviewed from beginning to end. This is used to sort learning paths presented in the [ResourcesBySelector component](/style-guide/components/resources-by-selector/).",
			),
	})
	.strict();
