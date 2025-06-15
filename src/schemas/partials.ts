import { z } from "astro:schema";

const paramsDocs =
	"https://developers.cloudflare.com/style-guide/components/render/#defining-expected-properties-in-frontmatter";

export const partialsSchema = z
	.object({
		slug: z
			.string()
			.optional()
			.describe(
				"Used to define custom IDs: https://docs.astro.build/en/guides/content-collections/#defining-custom-ids",
			),
		params: z
			.string()
			.array()
			.optional()
			.describe(`Used to define expected properties: ${paramsDocs}`),
		inputParameters: z
			.string()
			.optional()
			.describe(
				`Deprecated - this field has no functionality, please migrate to ${paramsDocs}`,
			),
	})
	.strict();
