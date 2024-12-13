import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
	const markdown = await getCollection("docs")
		.then((entries) => entries.map((entry) => entry.body))
		.then((array) => array.join("\n\n"));

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};
