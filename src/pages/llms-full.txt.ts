import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
	const markdown = await getCollection("docs", (e) => {
		if (!e.body) return false;

		if (
			e.id === "warp-client/legal/3rdparty" ||
			e.id === "magic-wan/legal/3rdparty"
		)
			return false;

		return true;
	})
		.then((entries) =>
			entries.map((entry) => {
				return [
					`# ${entry.data.title}`,
					`URL: https://developers.cloudflare.com/${entry.id}/`,
					`${entry.body?.trim()}`,
					"---",
				].join("\n\n");
			}),
		)
		.then((array) => array.join("\n\n"));

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};
