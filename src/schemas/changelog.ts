import { reference, type SchemaContext } from "astro:content";
import { z } from "astro:schema";

export const changelogSchema = ({ image }: SchemaContext) =>
	z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date().transform((d) => {
			// Shift date-only values (parsed as UTC midnight) to noon UTC,
			// so that `format()` from date-fns (which uses the local timezone)
			// always displays the intended calendar date regardless of timezone.
			if (
				d.getUTCHours() === 0 &&
				d.getUTCMinutes() === 0 &&
				d.getUTCSeconds() === 0
			) {
				return new Date(
					Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12),
				);
			}
			return d;
		}),
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
