import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from "astro";
import { marked, type Token } from "marked";
import { getWranglerReleases } from "~/util/release-notes";
import { slug } from "github-slugger";
import { entryToString } from "~/util/container";

export async function getStaticPaths() {
	const releaseNotes = await getCollection("docs", (entry) => {
		return (
			(entry.data.pcx_content_type === "changelog" &&
				entry.data.release_notes_file_name) ||
			entry.data.release_notes_product_area_name
		);
	});

	return releaseNotes.map((entry) => {
		return {
			params: {
				changelog: entry.id + `/index`,
			},
			props: {
				entry,
			},
		};
	});
}

export const GET: APIRoute = async (context) => {
	function walkTokens(token: Token) {
		if (token.type === "image" || token.type === "link") {
			if (token.href.startsWith("/")) {
				token.href = context.site + token.href.slice(1);
			}
		}
	}

	marked.use({ walkTokens });

	const entry = context.props.entry;

	if (
		!entry.data.release_notes_file_name &&
		!entry.data.release_notes_product_area_name
	) {
		throw new Error(
			`One of release_notes_file_name or release_notes_product_area_name is required on ${entry.id}, to generate RSS feeds.`,
		);
	}

	const releaseNotes = await getCollection("release-notes", (releaseNote) => {
		return (
			entry.data.release_notes_file_name?.includes(releaseNote.id) ||
			releaseNote.data.productArea ===
				entry.data.release_notes_product_area_name
		);
	});

	if (entry.data.release_notes_file_name?.includes("wrangler")) {
		releaseNotes.push(await getWranglerReleases());
	}

	const mapped = await Promise.all(
		releaseNotes.flatMap((product) => {
			return product.data.entries.map(async (entry) => {
				let description;
				if (entry.individual_page) {
					const link = entry.link;

					if (!link)
						throw new Error(
							`Changelog entry points to individual page but no link is provided`,
						);

					const page = await getEntry("docs", link.slice(1, -1));

					if (!page)
						throw new Error(
							`Changelog entry points to ${link.slice(1, -1)} but unable to find entry with that slug`,
						);

					description =
						(await entryToString(page, context.locals)) ?? page.body;
				} else {
					description = entry.description;
				}

				let link;
				if (entry.link) {
					link = entry.link;
				} else {
					const anchor = slug(entry.title ?? entry.publish_date);
					link = product.data.link.concat(`#${anchor}`);
				}

				let title;
				if (entry.scheduled) {
					title = `Scheduled for ${entry.scheduled_date}`;
				} else {
					title = entry.title;
				}

				return {
					product: product.data.productName,
					link,
					date: entry.publish_date,
					description,
					title,
				};
			});
		}),
	);

	const entries = mapped.sort((a, b) => {
		return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
	});

	const rssName =
		entry.data.release_notes_product_area_name ||
		releaseNotes[0].data.productName;

	const site = new URL(context.site ?? "");
	site.pathname = entry.id.concat("/");

	const isArea = Boolean(entry.data.release_notes_product_area_name);

	return rss({
		title: `Changelog | ${rssName}`,
		description: `Updates to ${rssName}`,
		site,
		trailingSlash: false,
		items: entries.map((entry) => {
			return {
				title: `${entry.product} - ${entry.title ?? entry.date}`,
				description: marked.parse(entry.description ?? "", {
					async: false,
				}) as string,
				pubDate: new Date(entry.date),
				link: entry.link,
				customData: isArea ? `<product>${entry.product}</product>` : undefined,
			};
		}),
	});
};
