// @ts-check
/** @type {import("prettier").Config} */
export default {
	plugins: [
		"prettier-plugin-astro",
		"prettier-plugin-tailwindcss",
		"./plugins/prettier-plugin-mdx-inline/index.mjs",
	],
	useTabs: true,
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		// Prettier's MDX formatter wraps inline JSX elements (like <code> and
		// <GlossaryTooltip>) onto new lines, which causes MDX v2+ to inject <p>
		// tags inside them — breaking the rendered HTML. This custom plugin
		// prevents that by keeping configured elements on a single line.
		// This may become unnecessary once prettier adds MDX v3 support:
		// https://github.com/prettier/prettier/issues/12209
		{
			files: "*.mdx",
			options: {
				parser: "mdx-inline",
				mdxInlineElements: "code,GlossaryTooltip",
			},
		},
	],
};
