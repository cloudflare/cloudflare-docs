/**
 * Existing configuration options in Starlight's `sidebar` object are duplicated
 * here due to https://github.com/StefanTerdell/zod-to-json-schema/issues/68
 *
 * Existing options can be found in
 * https://github.com/withastro/starlight/blob/main/packages/starlight/schema.ts
 */

import { z } from "astro/zod";

/**
 * From https://github.com/withastro/starlight/blob/main/packages/starlight/schemas/badge.ts
 */

const linkHTMLAttributesSchema = z.record(
	z.string(),
	z.union([z.string(), z.number(), z.boolean(), z.undefined()]),
);

const SidebarLinkItemHTMLAttributesSchema = () =>
	linkHTMLAttributesSchema.prefault({});

/**
 * https://github.com/withastro/starlight/blob/main/packages/starlight/schemas/sidebar.ts
 */

const badgeBaseSchema = z.object({
	variant: z
		.enum(["note", "danger", "success", "caution", "tip", "default"])
		.default("default"),
	class: z.string().optional(),
});

const badgeSchema = badgeBaseSchema.extend({
	text: z.string(),
});

const BadgeConfigSchema = () =>
	z
		.union([z.string(), badgeSchema])
		.transform((badge) => {
			if (typeof badge === "string") {
				return { variant: "default" as const, text: badge };
			}
			return badge;
		})
		.optional();

export const sidebar = z
	.object({
		order: z.number().optional(),
		label: z.string().optional(),
		hidden: z.boolean().default(false),
		badge: BadgeConfigSchema(),
		attrs: SidebarLinkItemHTMLAttributesSchema(),
		group: z
			.object({
				label: z
					.string()
					.optional()
					.describe(
						"Overrides the default 'Overview' label for index pages in the sidebar. Refer to https://developers.cloudflare.com/style-guide/frontmatter/sidebar/.",
					),
				hideIndex: z
					.boolean()
					.default(false)
					.describe(
						"Hides the index page from the sidebar. Refer to [Sidebar](/style-guide/frontmatter/sidebar/).",
					),
				badge: BadgeConfigSchema(),
			})
			.optional(),
	})
	.prefault({})
	.describe(
		"Used to configure various sidebar options. Refer to [Sidebar](/style-guide/frontmatter/sidebar/).",
	);
