import { z } from "astro:schema";

const supportInfo = z
	.object({
		name: z.string(),
		default: z.string().optional(),
		supported: z.string().optional(),
		environment_variable: z.string().optional(),
		file: z.string().array().optional(),
	})
	.strict();

export const pagesBuildEnvironmentSchema = z
	.object({
		major_version: z.number(),
		enable_date: z.string(),
		languages: supportInfo.array(),
		tools: supportInfo.array(),
		build_environment: z.object({
			operating_system: z.string(),
			architecture: z.string(),
		}),
		status: z.string().optional().nullable(),
	})
	.strict();
