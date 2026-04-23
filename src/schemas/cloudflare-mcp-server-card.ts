import { z } from "astro/zod";

export const mcpServerSchema = z.object({
	name: z.string(),
	description: z.string(),
	url: z.url(),
});
