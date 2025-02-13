import type { RSSFeedItem } from "@astrojs/rss";
import {
	getCollection,
	getEntries,
	getEntry,
	type CollectionEntry,
} from "astro:content";
import { entryToString } from "~/util/container";

import { unified, type PluggableList } from "unified";

import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeBaseUrl from "~/plugins/rehype/base-url";
import rehypeFilterElements from "~/plugins/rehype/filter-elements";

export type GetChangelogsOptions = {
	filter?: (entry: CollectionEntry<"changelog">) => boolean;
};

export async function getChangelogs({
	filter,
}: GetChangelogsOptions): Promise<Array<CollectionEntry<"changelog">>> {
	let entries = await getCollection("changelog");

	if (filter) {
		entries = entries.filter((e) => filter(e));
	}

	entries = await Promise.all(
		entries.map(async (e) => {
			const slug = e.id.split("/").slice(1).join("/");
			const folder = e.id.split("/")[0];
			const product = { collection: "products", id: folder } as const;

			const isValidProduct = await getEntry(product);

			if (!isValidProduct) {
				throw new Error(
					`[getChangelogs] ${e.id} is not located inside a valid product folder (received ${folder})`,
				);
			}

			if (!e.data.products.some((p) => p.id === product.id)) {
				e.data.products.push(product);
			}

			return {
				...e,
				id: slug,
			};
		}),
	);

	return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

type GetRSSItemsOptions = {
	/**
	 * An array of changelog entries from the `getChangelogs({})` function.
	 * @see {@link getChangelogs}
	 */
	notes: Array<CollectionEntry<"changelog">>;
	/**
	 * `locals`, either from `Astro.locals` in custom pages or
	 * `context.locals` in endpoints.
	 * @see {@link https://docs.astro.build/en/reference/api-reference/#locals}
	 */
	locals: App.Locals;
	/**
	 * Returns Markdown in the `<content:encoded>` field instead of HTML.
	 */
	markdown?: boolean;
};

export async function getRSSItems({
	notes,
	locals,
}: GetRSSItemsOptions): Promise<Array<RSSFeedItem>> {
	return await Promise.all(
		notes.map(async (note) => {
			const { title, date, products } = note.data;

			const productEntries = await getEntries(products);
			const productTitles = productEntries.map((p) => p.data.name as string);

			const html = await entryToString(note, locals);

			const plugins: PluggableList = [
				rehypeParse,
				rehypeBaseUrl,
				rehypeFilterElements,
				rehypeStringify,
			];

			const file = await unified()
				.data("settings", {
					fragment: true,
				})
				.use(plugins)
				.process(html);

			const content = String(file).trim();

			return {
				title: `${productTitles.join(", ")} - ${title}`,
				description: content,
				pubDate: date,
				categories: productTitles,
				link: `/changelog/${note.id}/`,
				customData: `<product>${productTitles.at(0)}</product>`,
			};
		}),
	);
}
