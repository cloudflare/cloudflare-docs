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
import remarkGfm from "remark-gfm";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { marked } from "marked";
import { sub } from "date-fns";

async function getWARPReleases(): Promise<Array<CollectionEntry<"changelog">>> {
	const releases = await getCollection("warp-releases", (e) => {
		if (e.id.startsWith("linux/beta/")) {
			return false;
		}

		const oneYearAgo = sub(new Date(), {
			years: 1,
		});

		if (e.data.releaseDate.getTime() < oneYearAgo.getTime()) {
			return false;
		}

		return true;
	});

	return releases.map((release) => {
		const { platformName, version, releaseNotes, releaseDate } = release.data;
		const title = `WARP client for ${platformName} (version ${version})`;

		const [platform, track] = release.id.split("/");

		const prettyTrack = track === "ga" ? "GA" : "Beta";
		const prettyPlatform =
			platform === "macos"
				? "macOS"
				: platform.charAt(0).toUpperCase() + platform.slice(1);

		const link =
			track === "ga"
				? "[stable releases downloads page](/cloudflare-one/team-and-resources/devices/warp/download-warp/)"
				: "[beta releases downloads page](/cloudflare-one/team-and-resources/devices/warp/download-warp/beta-releases/)";

		const prefix = `A new ${prettyTrack} release for the ${prettyPlatform} WARP client is now available on the ${link}.`;

		return {
			id: `${releaseDate.toISOString().slice(0, 10)}-warp-${platform}-${track}`,
			collection: "changelog",
			body: releaseNotes,
			data: {
				title,
				description: title,
				hidden: false,
				date: releaseDate,
				products: [{ id: "zero-trust-warp", collection: "directory" }],
				scheduled: false,
			},
			rendered: {
				html: marked.parse([prefix, releaseNotes].join("\n\n"), {
					async: false,
				}),
			},
		};
	});
}

export type GetChangelogsOptions = {
	filter?: (entry: CollectionEntry<"changelog">) => boolean;
};

export async function getChangelogs({
	filter,
}: GetChangelogsOptions): Promise<Array<CollectionEntry<"changelog">>> {
	let entries = await getCollection("changelog");

	entries = await Promise.all(
		entries.map(async (e) => {
			const slug = e.id.split("/").slice(1).join("/");
			const folder = e.id.split("/")[0];
			const product = { collection: "directory", id: folder } as const;

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

	entries = entries.concat(await getWARPReleases());

	if (filter) {
		entries = entries.filter((e) => filter(e));
	}

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
	 * Returns Markdown in the `<description>` field instead of HTML.
	 */
	markdown?: boolean;
};

export async function getRSSItems({
	notes,
	locals,
	markdown,
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
			];

			if (markdown) {
				plugins.push(remarkGfm, rehypeRemark, remarkStringify);
			} else {
				plugins.push(rehypeStringify);
			}

			const file = await unified()
				.data("settings", {
					fragment: true,
				})
				.use(plugins)
				.process(html);

			const content = String(file).trim();

			const itemTitle = `${productTitles.join(", ")} - ${title}`;

			return {
				title: itemTitle,
				description: content,
				pubDate: date,
				categories: productTitles,
				link: `/changelog/${note.id}/`,
				customData: `<product>${productTitles.at(0)}</product>`,
			};
		}),
	);
}
