import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import dedent from "dedent";

export const GET: APIRoute = async ({ url }) => {
	const base = url.origin;
	const directory = await getCollection("directory", (p) => {
		return !!p.data.entry.group;
	});

	const docs = await getCollection("docs");

	// Build a set of product IDs that actually have docs pages
	const productsWithDocs = new Set(
		directory
			.filter((entry) => {
				const prefix = entry.data.entry.url.slice(1, -1);
				return docs.some(
					(e) => e.id.startsWith(prefix + "/") || e.id === prefix,
				);
			})
			.map((entry) => entry.id),
	);

	// Group products by their group, skipping any without docs pages
	const grouped = Object.entries(
		Object.groupBy(
			directory.filter((entry) => productsWithDocs.has(entry.id)),
			(entry) => entry.data.entry.group as string,
		),
	).sort(([a], [b]) => a.localeCompare(b));

	const markdown = dedent(`
		# Cloudflare Developer Documentation

		Explore guides and tutorials to start building on Cloudflare's platform.

		> Each product below links to its own llms.txt, which contains a full index of that product's documentation pages and is the recommended way to explore a specific product's content.
		>
		> For the complete documentation archive in a single file, use the [Full Documentation Archive](${base}/llms-full.txt). That file is intended for offline indexing, bulk vectorization, or large-context models. Each product's llms.txt also links to a product-scoped llms-full.txt.

		${grouped
			.map(([group, entries]) => {
				return dedent(`
				## ${group}

				${entries
					?.map((entry) => {
						const line = `- [${entry.data.entry.title}](${base}/${entry.id}/llms.txt)`;
						const description = entry.data.meta?.description;
						return description ? line.concat(`: ${description}`) : line;
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
