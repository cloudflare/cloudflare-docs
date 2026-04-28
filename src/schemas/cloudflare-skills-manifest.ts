import { z } from "astro/zod";

export const cloudflareSkillSchema = z.object({
	name: z.string(),
	description: z.string(),
	files: z.array(z.string()),
});
