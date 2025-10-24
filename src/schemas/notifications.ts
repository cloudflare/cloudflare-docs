import { z } from "astro:schema";

export const notificationsSchema = z
	.object({
		entries: z
			.object({
				name: z.string(),
				audience: z.string(),
				availability: z.string(),
				associatedProducts: z.string(),
				nextSteps: z.string(),
				otherFilters: z.string(),
				additional_information: z.string().optional(),
				limitations: z.string().optional(),
			})
			.array(),
	})
	.strict();
