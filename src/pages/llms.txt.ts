import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import dedent from "dedent";

export const GET: APIRoute = async ({ url }) => {
	const base = url.origin;
	const allDirectory = await getCollection("directory");
	const directory = allDirectory.filter((p) => !!p.data.entry.group);

	const docs = await getCollection("docs");

	// Build a set of all canonical URL prefixes across the entire directory.
	const allUrlPrefixes = new Set(
		allDirectory
			.map((entry) => entry.data.entry.url)
			.filter(
				(u): u is string =>
					typeof u === "string" && u !== "" && u !== "/" && !u.includes("#"),
			),
	);

	// Returns true if this entry's URL is nested under another directory entry's URL.
	// e.g. /logs/logpush/ is nested under /logs/  →  duplicate in parent's llms.txt
	function isSubProduct(entryUrl: string): boolean {
		if (!entryUrl || entryUrl === "/" || entryUrl.includes("#")) return false;
		for (const otherUrl of allUrlPrefixes) {
			if (otherUrl === entryUrl) continue;
			if (entryUrl.startsWith(otherUrl)) return true;
		}
		return false;
	}

	// Build a set of product IDs that actually have docs pages and are not sub-products
	const productsWithDocs = new Set(
		directory
			.filter((entry) => {
				if (isSubProduct(entry.data.entry.url)) return false;
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

	// Find ungrouped directory entries that have their own top-level docs section
	// (not nested under another product's URL path)
	const ungrouped = allDirectory
		.filter((entry) => {
			if (entry.data.entry.group) return false;
			if (isSubProduct(entry.data.entry.url)) return false;
			const prefix = entry.data.entry.url.slice(1, -1);
			return docs.some((e) => e.id.startsWith(prefix + "/") || e.id === prefix);
		})
		.sort((a, b) => a.data.entry.title.localeCompare(b.data.entry.title));

	const otherLinks = ungrouped
		.map((entry) => {
			const line = `- [${entry.data.entry.title}](${base}${entry.data.entry.url}llms.txt)`;
			const description = entry.data.meta?.description;
			return description ? line.concat(`: ${description}`) : line;
		})
		.join("\n");

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
						const line = `- [${entry.data.entry.title}](${base}${entry.data.entry.url}llms.txt)`;
						const description = entry.data.meta?.description;
						return description ? line.concat(`: ${description}`) : line;
					})
					.join("\n")}
			`);
			})
			.join("\n\n")}

		## Other

		${otherLinks}
	`);

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};
