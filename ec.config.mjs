// @ts-check
import { defineEcConfig } from "astro-expressive-code";

import darkTheme from "solarflare-theme/themes/cloudflare-dark-color-theme.json" with { type: "json" };
import lightTheme from "solarflare-theme/themes/cloudflare-light-color-theme.json" with { type: "json" };

import pluginWorkersPlayground from "./src/plugins/expressive-code/workers-playground.js";
import pluginOutputFrame from "./src/plugins/expressive-code/output-frame.js";
import pluginDefaultTitles from "./src/plugins/expressive-code/default-titles.js";
import pluginGraphqlApiExplorer from "./src/plugins/expressive-code/graphql-api-explorer.js";

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
