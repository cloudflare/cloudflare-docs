import { z } from "astro:content";

export const workersAiSchema = z.object({
	model: z.object({
		id: z.string(),
		source: z.number(),
		name: z.string(),
		description: z.string(),
		task: z.object({
			id: z.string(),
			name: z.string(),
			description: z.string(),
		}),
		tags: z.string().array().optional(),
		properties: z
			.object({
				property_id: z.string(),
				value: z.string(),
			})
			.array(),
	}),
	task_type: z.string(),
	model_display_name: z.string(),
	json_schema: z.object({
		input: z.string(),
		output: z.string(),
	}),
});
