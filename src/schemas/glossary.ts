import { z } from "astro:schema";

export const glossarySchema = z.object({
	productName: z.string(),
	entries: z
		.object({
			term: z.string(),
			general_definition: z.string(),
		})
		.array(),
});
