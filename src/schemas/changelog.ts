import { reference, type SchemaContext } from "astro:content";
import { z } from "astro:schema";

export const changelogSchema = ({ image }: SchemaContext) =>
	z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		scheduled: z.boolean().default(false),
		products: z
			.array(reference("directory"))
			.default([])
			.describe(
				"An array of directory entries to associate this changelog entry with. You may omit the entry named after the folder this entry is in.",
			),
		preview_image: image().optional(),
		hidden: z
			.boolean()
			.default(false)
			.describe(
				"Whether this changelog entry should be hidden from /changelog/ and RSS feeds.",
			),
	});
