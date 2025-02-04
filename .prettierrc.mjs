// @ts-check
/** @type {import("prettier").Config} */
export default {
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	useTabs: true,
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
