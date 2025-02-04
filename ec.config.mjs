// @ts-check
import darkTheme from "solarflare-theme/themes/cloudflare-dark-color-theme.json" with { type: "json" };
import lightTheme from "solarflare-theme/themes/cloudflare-light-color-theme.json" with { type: "json" };

import pluginWorkersPlayground from "./src/plugins/expressive-code/workers-playground.js";
import pluginOutputFrame from "./src/plugins/expressive-code/output-frame.js";
import pluginDefaultTitles from "./src/plugins/expressive-code/default-titles.js";

import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

export default {
	plugins: [
		pluginWorkersPlayground(),
		pluginOutputFrame(),
		pluginDefaultTitles(),
		pluginCollapsibleSections(),
	],
	themes: [darkTheme, lightTheme],
	styleOverrides: {
		textMarkers: {
			defaultLuminance: ["32%", "88%"],
		},
	},
	frames: {
		extractFileNameFromCode: false,
	},
};
