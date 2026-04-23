import { z } from "astro/zod";

const mcpRemoteSchema = z.object({
	url: z.url(),
	type: z.enum(["streamable-http", "sse"]),
	headers: z
		.array(
			z.object({
				name: z.string(),
				description: z.string().optional(),
				// server-card.json uses both camelCase and snake_case variants
				isRequired: z.boolean().optional(),
				isSecret: z.boolean().optional(),
				is_required: z.boolean().optional(),
				is_secret: z.boolean().optional(),
			}),
		)
		.optional(),
});

export const mcpServerCardSchema = z.object({
	name: z.string(),
	version: z.string(),
	title: z.string(),
	description: z.string(),
	websiteUrl: z.url().optional(),
	repository: z
		.object({
			url: z.url(),
			source: z.string(),
		})
		.optional(),
	remotes: z.array(mcpRemoteSchema),
});
