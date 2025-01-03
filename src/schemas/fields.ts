import { z } from "astro:schema";

export const fieldsSchema = z.object({
	entries: z
		.object({
			name: z.string(),
			data_type: z.string(),
			categories: z.array(z.string()).optional(),
			keywords: z.array(z.string()).optional(),
			summary: z.string(),
			description: z.string().optional(),
			plan_info_label: z.string().optional(),
			example_value: z.string().optional(),
			example_block: z.string().optional(),
		})
		.array(),
});
