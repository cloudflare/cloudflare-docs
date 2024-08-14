import { z } from "astro:content";

const preset = z
	.object({
		display_name: z.string(),
		build_command: z.string(),
		build_output_directory: z.string(),
		icon: z.string(),
	})
	.strict();

export const pagesFrameworkPresetsSchema = z
	.object({
		build_configs: z.record(z.string(), preset),
	})
	.strict();
