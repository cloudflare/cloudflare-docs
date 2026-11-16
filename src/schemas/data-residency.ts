import { z } from "astro/zod";

export const dataResidencyStatuses = [
	"supported",
	"requirements",
	"not-supported",
	"out-of-scope",
	"unassessed",
] as const;

const control = z
	.object({
		status: z.enum(dataResidencyStatuses),
		requirements: z.array(z.string()).optional(),
		impact: z.array(z.string()).optional(),
		notes: z.array(z.string()).optional(),
	})
	.superRefine((c, ctx) => {
		if (c.status === "requirements" && !c.requirements?.length) {
			ctx.addIssue({
				code: "custom",
				message: "`requirements` status needs at least one requirement",
			});
		}
	});

export const dataResidencySchema = z.object({
	category: z.string(),
	order: z.number(),
	entries: z.array(
		z.object({
			product: z.string(),
			controls: z.object({
				regional_services: control,
				storage: control,
				cmb: control,
				gkm: control,
			}),
			last_verified: z
				.string()
				.regex(/^\d{4}-\d{2}-\d{2}$/)
				.optional(),
			evidence: z.array(z.string()).optional(),
			review: z.boolean().optional(),
		}),
	),
});

export type DataResidencySchema = z.infer<typeof dataResidencySchema>;
