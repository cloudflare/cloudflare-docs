import { type CollectionEntry } from "astro:content";

import { CHANGELOG_OG_IMAGE, DEFAULT_OG_IMAGE } from "./page-head";

export async function getOgImage(entry: CollectionEntry<"docs" | "changelog">) {
	return entry.collection === "changelog"
		? CHANGELOG_OG_IMAGE
		: DEFAULT_OG_IMAGE;
}
