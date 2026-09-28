import { type CollectionEntry, getEntries } from "astro:content";

import { changelogOgVersion } from "./changelog-og";
import { DEFAULT_OG_IMAGE } from "./page-head";

// Changelog cards are rendered on demand by the Worker (worker/changelog-og.ts).
// Inputs mirror what the post page emits (og:title, <time>, pcx_product).
export async function getOgImage(entry: CollectionEntry<"docs" | "changelog">) {
	if (entry.collection !== "changelog") return DEFAULT_OG_IMAGE;

	const [primaryProduct] = await getEntries(entry.data.products);
	const version = await changelogOgVersion({
		title: entry.data.title,
		date: entry.data.date.toISOString().slice(0, 10),
		product: primaryProduct?.data.entry?.title ?? "",
	});
	return `/changelog/post/${entry.id}/og.png?v=${version}`;
}
