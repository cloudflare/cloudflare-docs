// @ts-check
/** @type {import("prettier").Config} */
export default {
	plugins: [
		"prettier-plugin-astro",
		"prettier-plugin-tailwindcss",
		"./plugins/prettier-plugin-cloudflare-docs/index.mjs",
	],
	useTabs: true,
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		// Custom plugin that prevents prettier from reformatting specific
		// MDX components. Listed elements are preserved verbatim.
		// May become unnecessary once prettier adds MDX v3 support:
		// https://github.com/prettier/prettier/issues/12209
		{
			files: "*.mdx",
			options: {
				parser: "mdx-cloudflare-docs",
				mdxPreserveElements:
					"code,GlossaryTooltip,Steps,Tabs,TabItem,FileTree,WranglerConfig",
			},
		},
	],
};
