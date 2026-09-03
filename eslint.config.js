import pluginJavaScript from "@eslint/js";
import pluginTypeScript from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginAstro from "eslint-plugin-astro";
import pluginReactA11y from "eslint-plugin-jsx-a11y";

import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	pluginJavaScript.configs.recommended,
	...pluginTypeScript.configs.recommended,
	...pluginAstro.configs.recommended,
	...pluginAstro.configs["jsx-a11y-recommended"],
	{
		files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
		...pluginReact.configs.flat.recommended,
		...pluginReactA11y.flatConfigs.recommended,
		...pluginReact.configs.flat["jsx-runtime"],
	},
	{
		ignores: [
			".astro/",
			".wrangler/",
			".flue/dist/",
			".flue/.flue-vite/",
			".flue/.wrangler/",
			"dist/",
			".github/",
			// Generated at prebuild/predev by bin/fetch-skills.ts (gitignored).
			"skills/",
		],
	},
	{
		rules: {
			"no-var": "error",
			// Diagrams build on
			// the headless `@cloudflare/nimbus-docs/react` primitives plus the
			// repo-owned CSS "weld" kit — motion is CSS, never framer-motion.
			// Ban the import so the dependency cannot creep back in.
			"no-restricted-imports": [
				"error",
				{
					paths: [
						{
							name: "framer-motion",
							message:
								"framer-motion is not a dependency of this repo. Use CSS transitions/animations or the @cloudflare/nimbus-docs/react diagram primitives instead.",
						},
						{
							name: "motion",
							message:
								"The motion / framer-motion library is not a dependency of this repo. Use CSS transitions/animations or the @cloudflare/nimbus-docs/react diagram primitives instead.",
						},
					],
					patterns: [
						{
							group: ["framer-motion/*", "motion/*"],
							message:
								"framer-motion / motion is not a dependency of this repo. Use CSS transitions/animations or the @cloudflare/nimbus-docs/react diagram primitives instead.",
						},
					],
				},
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
				},
			],
		},
	},
	{
		files: ["src/scripts/**/*.{js,ts}"],
		rules: {
			"no-console": [
				"error",
				{
					allow: ["warn", "error"],
				},
			],
		},
	},
];
