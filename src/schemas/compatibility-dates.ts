import { z } from "astro:content";

export type CompatibilityDatesSchema = z.infer<typeof compatibilityDatesSchema>;

export const compatibilityDatesSchema = z.object({
	name: z.string(),
	enable_date: z.string().optional(),
	enable_flag: z.string(),
	disable_flag: z.string().optional(),
	sort_date: z.string(),
	experimental: z.boolean().optional(),
});
