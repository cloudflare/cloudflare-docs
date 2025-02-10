import { z } from "astro:schema";

export const partialSchema = z.object({
	params: z.string().array().optional(),
});
