import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getChangelogs, getRSSItems } from "~/util/changelog";

export const GET: APIRoute = async ({ locals }) => {
	const notes = await getChangelogs({});

	const items = await getRSSItems({
		notes,
		locals,
	});

	return rss({
		title: "Cloudflare changelogs",
		description: `Updates to various Cloudflare products`,
		site: "https://developers.cloudflare.com/changelog/",
		items,
	});
};
