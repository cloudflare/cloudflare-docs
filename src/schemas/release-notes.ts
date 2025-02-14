import { z } from "astro:schema";

export const releaseNotesSchema = z.object({
	link: z.string(),
	productName: z.string(),
	productLink: z.string(),
	productArea: z.string(),
	productAreaLink: z.string(),
	entries: z
		.object({
			publish_date: z.string(),
			title: z.string().optional(),
			description: z.string().optional(),
			individual_page: z.boolean().optional(),
			link: z.string().optional(),
			scheduled: z.boolean().optional(),
			scheduled_date: z.string().optional(),
		})
		.array(),
});
