import { z } from "astro:schema";
import type { SchemaContext } from "astro:content";

import { sidebar } from "./types/sidebar";

const spotlightAuthorDetails = z
	.object({
		author: z.string(),
		author_bio_link: z.string().url(),
		author_bio_source: z.string(),
	})
	.optional()
	.describe(
		"These are used to automatically add the [SpotlightAuthorDetails component](/style-guide/components/spotlight-author-details/) to the page.",
	);

export const baseSchema = ({ image }: SchemaContext) =>
	z.object({
		preview_image: image()
			.optional()
			.describe(
				"A `src` path to the image that you want to use as a custom preview image for social sharing.",
			),
		pcx_content_type: z
			.union([
				z.literal("overview"),
				z.literal("get-started"),
				z.literal("how-to"),
				z.literal("concept"),
				z.literal("reference"),
				z.literal("reference-architecture"),
				z.literal("reference-architecture-diagram"),
				z.literal("tutorial"),
				z.literal("api"),
				z.literal("troubleshooting"),
				z.literal("faq"),
				z.literal("integration-guide"),
				z.literal("changelog"),
				z.literal("configuration"),
				z.literal("navigation"),
				z.literal("example"),
				z.literal("learning-unit"),
				z.literal("design-guide"),
				z.literal("video"),
			])
			.catch((ctx) => ctx.input)
			.optional()
			.describe(
				"The purpose of the page, and defined through specific pages in [Content strategy](/style-guide/documentation-content-strategy/content-types/).",
			),
		content_type: z.string().optional(),
		tags: z
			.string()
			.array()
			.optional()
			.describe(
				"A group of related keywords relating to the purpose of the page. Refer to [Tags](/style-guide/frontmatter/tags/).",
			),
		external_link: z
			.string()
			.optional()
			.describe(
				"Path to another page in our docs or elsewhere. Used to add a crosslink entry to the lefthand navigation sidebar.",
			),
		difficulty: z
			.union([
				z.literal("Beginner"),
				z.literal("Intermediate"),
				z.literal("Advanced"),
			])
			.catch((ctx) => ctx.input)
			.optional()
			.describe(
				"Difficulty is displayed as a column in the [ListTutorials component](/style-guide/components/list-tutorials/).",
			),
		updated: z
			.date()
			.optional()
			.describe(
				"This is used to automatically add the [LastReviewed component](/style-guide/components/last-reviewed/).",
			),
		spotlight: spotlightAuthorDetails,
		release_notes_file_name: z.string().array().optional(),
		release_notes_product_area_name: z.string().optional(),
		products: z
			.string()
			.array()
			.optional()
			.describe(
				"The names of related products, which show on some grids for Examples, [Tutorials](/style-guide/documentation-content-strategy/content-types/tutorial/), and [Reference Architectures](/style-guide/documentation-content-strategy/content-types/reference-architecture/)",
			),
		languages: z.string().array().optional(),
		summary: z.string().optional(),
		goal: z.string().array().optional(),
		operation: z.string().array().optional(),
		noindex: z
			.boolean()
			.optional()
			.describe(
				"If true, this property adds a `noindex` declaration to the page, which will tell internal / external search crawlers to ignore this page. Helpful for pages that are historically accurate, but no longer recommended, such as [Workers Sites](/workers/configuration/sites/).",
			),
		sidebar,
		hideChildren: z
			.boolean()
			.optional()
			.describe(
				"Renders this group as a single link on the sidebar, to the index page. Refer to [Sidebar](https://developers.cloudflare.com/style-guide/frontmatter/sidebar/).",
			),
		styleGuide: z
			.object({
				component: z.string(),
			})
			.optional()
			.describe("Used by overrides for style guide component documentation"),
	});
