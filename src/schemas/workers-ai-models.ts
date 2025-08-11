import { z } from "astro:schema";

export type WorkersAIModelsSchema = z.infer<typeof workersAiModelsSchema>;

export const workersAiModelsSchema = z.object({
	id: z.string(),
	source: z.number(),
	name: z.string(),
	description: z.string(),
	task: z.object({
		id: z.string(),
		name: z.string(),
		description: z.string(),
	}),
	created_at: z.string().optional(),
	tags: z.string().array().optional(),
	properties: z
		.object({
			property_id: z.string(),
			value: z.string().or(z.array(z.object({}).passthrough())),
		})
		.array(),
	schema: z.object({
		input: z.object({}).passthrough(),
		output: z.object({}).passthrough(),
	}),
});
