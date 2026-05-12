import { track } from "~/util/zaraz";
import type { DocSearchClientOptions } from "@astrojs/starlight-docsearch";
import {
	ALGOLIA_APP_ID,
	ALGOLIA_API_KEY,
	ALGOLIA_INDEX,
	ALGOLIA_INDEX_STYLE_GUIDE,
} from "~/util/algolia";

const isStyleGuide = window.location.pathname.startsWith("/style-guide/");

export default {
	appId: ALGOLIA_APP_ID,
	apiKey: ALGOLIA_API_KEY,
	indexName: isStyleGuide ? ALGOLIA_INDEX_STYLE_GUIDE : ALGOLIA_INDEX,
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
