import { z } from "astro:content";

const spotlightAuthorDetails = z
	.object({
		author: z.string(),
		author_bio_link: z.string().url(),
		author_bio_source: z.string(),
	})
	.optional();

export const baseSchema = z.object({
	pcx_content_type: z.string().optional(),
	content_type: z.string().optional(),
	tags: z.string().array().optional(),
	hideChildren: z.boolean().optional(),
	external_link: z.string().optional(),
	difficulty: z.string().optional(),
	updated: z.date().optional(),
	spotlight: spotlightAuthorDetails,
	changelog_file_name: z.string().array().optional(),
	changelog_product_area_name: z.string().optional(),
	products: z.string().array().optional(),
	languages: z.string().array().optional(),
	summary: z.string().optional(),
	goal: z.string().array().optional(),
	operation: z.string().array().optional(),
});
