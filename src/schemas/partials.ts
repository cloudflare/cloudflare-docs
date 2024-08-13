import { z } from "astro:content";

export const partialSchema = z.object({
	params: z.string().array().optional(),
});
