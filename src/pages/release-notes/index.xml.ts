import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from "astro";
import { marked, type Token } from "marked";
import { getWranglerReleases } from "~/util/release-notes";
import { slug } from "github-slugger";
import { entryToString } from "~/util/container";

export const GET: APIRoute = async (context) => {
	function walkTokens(token: Token) {
		if (token.type === "image" || token.type === "link") {
			if (token.href.startsWith("/")) {
				token.href = context.site + token.href.slice(1);
			}
		}
	}

	marked.use({ walkTokens });

	const releaseNotes = await getCollection("release-notes", (e) => {
		return e.id !== "api-deprecations";
	});

	releaseNotes.push(await getWranglerReleases());

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

	return rss({
		title: `Cloudflare release notes`,
		description: `Updates to various Cloudflare products.`,
		site: "https://developers.cloudflare.com/release-notes/",
		trailingSlash: false,
		items: entries.map((entry) => {
			return {
				title: `${entry.product} - ${entry.title ?? entry.date}`,
				description: marked.parse(entry.description ?? "", {
					async: false,
				}) as string,
				pubDate: new Date(entry.date),
				link: entry.link,
				customData: `<product>${entry.product}</product>`,
			};
		}),
	});
};
