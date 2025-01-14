import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import dedent from "dedent";

export const GET: APIRoute = async () => {
	const products = await getCollection("products", (p) => {
		return p.data.product.group?.toLowerCase() === "developer platform";
	});

	const docs = await getCollection("docs", (e) => {
		return products.some((p) =>
			e.slug.startsWith(p.data.product.url.slice(1, -1)),
		);
	});

	const grouped = Object.entries(
		Object.groupBy(docs, (e) => {
			const product = products.find((p) =>
				e.slug.startsWith(p.data.product.url.slice(1, -1)),
			);

			if (!product) throw new Error(`Unable to find product for ${e.slug}`);

			return product.data.product.title;
		}),
	);

	const markdown = dedent(`
		# Cloudflare Developer Documentation

		Easily build and deploy full-stack applications everywhere,
		thanks to integrated compute, storage, and networking.

		${grouped
			.map(([product, entries]) => {
				return dedent(`
				## ${product}

				${entries
					?.map((e) => {
						const line = `- [${e.data.title}](https://developers.cloudflare.com/${e.slug}/)`;

						const description = e.data.description;

						if (description) {
							return line.concat(`: ${description}`);
						}

						return line;
					})
					.join("\n")}
			`);
			})
			.join("\n\n")}
	`);

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};
