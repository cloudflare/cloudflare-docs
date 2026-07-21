import type { DocSearchClientOptions } from "@astrojs/starlight-docsearch";
import {
	ALGOLIA_APP_ID,
	ALGOLIA_API_KEY,
	ALGOLIA_INDEX,
	ALGOLIA_INDEX_STYLE_GUIDE,
} from "~/util/algolia";

// Style-guide pages use a separate index. Exported so consumers can resolve the
// index for the current path (e.g. per client-side navigation).
export function getIndexName() {
	return window.location.pathname.startsWith("/style-guide/")
		? ALGOLIA_INDEX_STYLE_GUIDE
		: ALGOLIA_INDEX;
}

export default {
	appId: ALGOLIA_APP_ID,
	apiKey: ALGOLIA_API_KEY,
	indexName: getIndexName(),
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
	// @ts-expect-error Will be fixed with the next release of @docsearch/js
	keyboardShortcuts: {
		"Ctrl/Cmd+K": true,
		"/": false,
	},
} satisfies DocSearchClientOptions;
