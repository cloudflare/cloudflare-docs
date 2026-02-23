import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getChangelogs, getRSSItems } from "~/util/changelog";

export const GET: APIRoute = async ({ locals }) => {
	const notes = await getChangelogs({
		filter: (entry) => !entry.data.hidden,
	});

	const items = await getRSSItems({
		notes,
		locals,
		markdown: true,
	});

	return rss({
		title: "Cloudflare changelogs",
		description: `Variant of the Cloudflare changelog with Markdown content rather than HTML`,
		site: "https://developers.cloudflare.com/changelog/",
		items,
	});
};
