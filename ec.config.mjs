// @ts-check
import { defineEcConfig } from "astro-expressive-code";

import darkTheme from "solarflare-theme/themes/cloudflare-dark-color-theme.json" with { type: "json" };
import lightTheme from "solarflare-theme/themes/cloudflare-light-color-theme.json" with { type: "json" };

import pluginWorkersPlayground from "./src/plugins/expressive-code/workers-playground.js";
import pluginOutputFrame from "./src/plugins/expressive-code/output-frame.js";
import pluginDefaultTitles from "./src/plugins/expressive-code/default-titles.js";
import pluginGraphqlApiExplorer from "./src/plugins/expressive-code/graphql-api-explorer.js";
import pluginExplainCode from "./src/plugins/expressive-code/explain-code.js";

import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

export default defineEcConfig({
	plugins: [
		pluginWorkersPlayground(),
		pluginOutputFrame(),
		pluginDefaultTitles(),
		pluginCollapsibleSections(),
		pluginGraphqlApiExplorer(),
		pluginLineNumbers(),
		pluginExplainCode(),
	],
	defaultProps: {
		showLineNumbers: false,
	},
	themes: [darkTheme, lightTheme],
	styleOverrides: {
		borderWidth: "1px",
		borderRadius: "0.25rem",
		textMarkers: {
			defaultLuminance: ["32%", "88%"],
		},
		frames: {
			// Override default EC copy icon with Phosphor Copy (Regular) to match PackageManagers.
			// Must be a CSS url() value as it is used directly as a mask-image.
			copyIcon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='black'%3E%3Cpath d='M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z'/%3E%3C/svg%3E")`,
		},
	},
	frames: {
		extractFileNameFromCode: false,
	},
	shiki: {
		langAlias: {
			curl: "sh",
		},
	},
});
