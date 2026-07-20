import { type CollectionEntry } from "astro:content";

const DEFAULT_OG_IMAGE = "/og-docs.png";

const CHANGELOG_OG_IMAGE = "/og-changelog.png";

export async function getOgImage(entry: CollectionEntry<"docs" | "changelog">) {
	return entry.collection === "changelog"
		? CHANGELOG_OG_IMAGE
		: DEFAULT_OG_IMAGE;
}
