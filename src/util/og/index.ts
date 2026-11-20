import { type CollectionEntry, getEntries } from "astro:content";

import { changelogOgVersion } from "./changelog";
import { docsOgVersion, type DocsCard } from "./docs";

export { OG_CARD_META, resolveDocsCard, type DocsCard } from "./docs";

// Cards are rendered on demand by the Worker (worker/og/) from the page at
// `<path>/`; `v` changes whenever the card's content or design does.

/** Inputs mirror what the post page emits (og:title, <time>, pcx_product). */
export async function changelogOgImage(entry: CollectionEntry<"changelog">) {
	const [primaryProduct] = await getEntries(entry.data.products);
	const version = await changelogOgVersion({
		title: entry.data.title,
		date: entry.data.date.toISOString().slice(0, 10),
		product: primaryProduct?.data.entry?.title ?? "",
	});
	return `/changelog/post/${entry.id}/og.png?v=${version}`;
}

/** `pathname` is the page's resolved route (`Astro.url.pathname`). */
export async function docsOgImage(pathname: string, card: DocsCard) {
	const page = pathname.endsWith("/") ? pathname : `${pathname}/`;
	return `${page}og.png?v=${await docsOgVersion(card)}`;
}
