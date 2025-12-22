import { z } from "astro:schema";
import { reference, type SchemaContext } from "astro:content";

import { sidebar, SidebarIconSchema } from "./types/sidebar";

export const baseSchema = ({ image }: SchemaContext) =>
	z.object({
		preview_image: image()
			.optional()
			.describe(
				"A `src` path to the image that you want to use as a custom preview image for social sharing.",
			),
		pcx_content_type: z
			.union([
				z.literal("changelog"),
				z.literal("changelog-entry"),
				z.literal("configuration"),
				z.literal("concept"),
				z.literal("design-guide"),
				z.literal("example"),
				z.literal("faq"),
				z.literal("get-started"),
				z.literal("how-to"),
				z.literal("integration-guide"),
				z.literal("implementation-guide"),
				z.literal("learning-unit"),
				z.literal("navigation"),
				z.literal("overview"),
				z.literal("reference"),
				z.literal("reference-architecture"),
				z.literal("reference-architecture-diagram"),
				z.literal("release-notes"),
				z.literal("troubleshooting"),
				z.literal("tutorial"),
				z.literal("video"),
			])
			.catch((ctx) => ctx.input)
			.optional()
			.describe(
				"The purpose of the page, and defined through specific pages in [Content strategy](/style-guide/documentation-content-strategy/content-types/).",
			),
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
		reviewed: z
			.date()
			.optional()
			.describe(
				"A `YYYY-MM-DD` value that signals when the page was last explicitly reviewed from beginning to end.",
			),
		release_notes_file_name: z
			.string()
			.array()
			.optional()
			.describe(
				"Required for the [`ProductReleaseNotes`](/style-guide/components/usage/#productreleasenotes) component.",
			),
		products: z
			.array(reference("products"))
			.default([])
			.describe(
				"The names of related products (according to their file name in `src/content/products`). Usually, these correspond to file paths, but not always, such as with `cloudflare-tunnel`",
			),
		summary: z
			.string()
			.optional()
			.describe("Renders a summary description directly below the page title."),
		noindex: z
			.boolean()
			.optional()
			.describe(
				"If true, this property adds a `noindex` declaration to the page, which will tell internal / external search crawlers to ignore this page. Helpful for pages that are historically accurate, but no longer recommended, such as [Workers Sites](/workers/configuration/sites/). Companion to the `chatbot_deprioritize` property.",
			),
		chatbot_deprioritize: z
			.boolean()
			.optional()
			.describe(
				"If true, this property will de-prioritize this page in the responses surfaced by Support AI. Helpful for pages that are historically accurate, but no longer recommended, such as [Workers Sites](/workers/configuration/sites/). Companion to the `noindex` property.",
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
			.describe(
				"Used by overrides for style guide component documentation, which helps us display the [usage counts](/style-guide/components/usage/) for components directly on the component page itself.",
			),
		banner: z
			.object({
				content: z.string(),
				type: z
					.enum(["default", "note", "tip", "caution", "danger"])
					.optional()
					.default("default"),
				dismissible: z
					.object({ id: z.string(), days: z.number().optional().default(7) })
					.optional(),
			})
			.optional()
			.describe(
				"Displays a [Banner](https://developers.cloudflare.com/style-guide/frontmatter/banner/) on the current docs page.",
			),
		icon: SidebarIconSchema(),
		feedback: z
			.boolean()
			.default(true)
			.describe(
				"Whether to show the FeedbackPrompt on the page, defaults to true",
			),
	});
