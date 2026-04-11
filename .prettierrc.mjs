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
		{
			files: "*.mdx",
			options: {
				parser: "mdx-inline",
				mdxInlineElements: "code,GlossaryTooltip",
			},
		},
	],
};
