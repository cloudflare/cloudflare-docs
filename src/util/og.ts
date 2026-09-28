import { type CollectionEntry } from "astro:content";

import { DEFAULT_OG_IMAGE } from "./page-head";

// Changelog cards are rendered on demand by the Worker (worker/changelog-og.ts).
export async function getOgImage(entry: CollectionEntry<"docs" | "changelog">) {
	return entry.collection === "changelog"
		? `/changelog/post/${entry.id}/og.png`
		: DEFAULT_OG_IMAGE;
}
