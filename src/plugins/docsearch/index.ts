import { track } from "~/util/zaraz";
import type { DocSearchClientOptions } from "@astrojs/starlight-docsearch";

const isStyleGuide = window.location.pathname.startsWith("/style-guide/");

export default {
	appId: "D32WIYFTUF",
	apiKey: "5cec275adc19dd3bc17617f7d9cf312a",
	indexName: isStyleGuide ? "prod_devdocs_styleguide" : "prod_devdocs",
	insights: true,
	// Replace URL with the current origin so search
	// can be used in local development and previews.
	transformItems(items) {
		return items.map((item) => {
			const { pathname, hash } = new URL(item.url);
			const url = new URL(pathname + hash, window.location.origin);

			return {
				...item,
				url: url.toString(),
			};
		});
	},
	resultsFooterComponent({ state }) {
		if (isStyleGuide) {
			return null;
		}

		return {
			type: "a",
			ref: undefined,
			constructor: undefined,
			__v: null,
			key: state.query,
			props: {
				onclick: () => {
					track("serp from location", { value: "widget", query: state.query });
				},
				id: "docsearch-search-link",
				href: `/search/?query=${state.query}`,
				target: "_blank",
				children: "View all results",
			},
		};
	},
	// @ts-expect-error Will be fixed with the next release of @docsearch/js
	keyboardShortcuts: {
		"Ctrl/Cmd+K": true,
		"/": false,
	},
} satisfies DocSearchClientOptions;
