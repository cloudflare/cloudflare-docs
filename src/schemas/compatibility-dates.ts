import { z } from "astro:content";

export type CompatibilityDatesSchema = z.infer<typeof compatibilityDatesSchema>;

export const compatibilityDatesSchema = z.object({
	name: z.string(),
	enable_date: z.string().optional().nullable(),
	enable_flag: z.string().nullable(),
	disable_flag: z.string().optional().nullable(),
	sort_date: z.string(),
	experimental: z.boolean().optional(),
});
