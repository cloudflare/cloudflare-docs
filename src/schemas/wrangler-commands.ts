import { z } from "astro:schema";

export const wranglerCommandsSchema = z.record(
	z.string(),
	z.object({
		example: z.string(),
		description: z.string(),
		positionals: z
			.object({
				name: z.string(),
				description: z.string(),
				type: z.string().default("[unknown]"),
			})
			.array()
			.optional(),
		options: z
			.object({
				flags: z.string(),
				description: z.string(),
				type: z.string().default("unknown"),
			})
			.array()
			.optional(),
	}),
);
