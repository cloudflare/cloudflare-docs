import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { slug } from "github-slugger";

export async function getStaticPaths() {
	const products = await getCollection("products");

	const areas = new Set(
		products.flatMap((p) => {
			if (!p.data.product.group) return [];

			return slug(p.data.product.group.toLowerCase());
		}),
	);

	return [...areas].map((area) => {
		return {
			params: {
				area,
			},
		};
	});
}

export const GET: APIRoute = async ({ params }) => {
	const products = await getCollection("products", (p) => {
		if (!p.data.product.group) return false;

		return slug(p.data.product.group.toLowerCase()) === params.area;
	});

	const markdown = await getCollection("docs", (e) => {
		if (!e.body) return false;

		if (
			e.id === "warp-client/legal/3rdparty" ||
			e.id === "magic-wan/legal/3rdparty"
		)
			return false;

		return products.some((p) =>
			e.id.startsWith(p.data.product.url.slice(1, -1)),
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
