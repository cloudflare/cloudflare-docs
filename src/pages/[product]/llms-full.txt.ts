import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
	const products = await getCollection("products", (p) => {
		return p.data.product.group?.toLowerCase() === "developer platform";
	});

	return products.map((entry) => {
		return {
			params: {
				product: entry.id,
			},
			props: {
				product: entry,
			},
		};
	});
}

export const GET: APIRoute = async ({ props }) => {
	const markdown = await getCollection("docs", (e) => {
		if (
			e.id === "warp-client/legal/3rdparty" ||
			e.id === "magic-wan/legal/3rdparty"
		)
			return false;

		return (
			e.id.startsWith(props.product.data.product.url.slice(1, -1)) && e.body
		);
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
