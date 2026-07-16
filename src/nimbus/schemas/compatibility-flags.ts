import { z } from "astro/zod";

export type CompatibilityFlagsSchema = z.infer<typeof compatibilityFlagsSchema>;

export const compatibilityFlagsSchema = z.object({
	name: z.string(),
	enable_date: z.string().optional().nullable(),
	enable_flag: z.string().nullable(),
	disable_flag: z.string().optional().nullable(),
	sort_date: z.string(),
	experimental: z.boolean().optional(),
});
