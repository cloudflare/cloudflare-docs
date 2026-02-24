import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import dedent from "dedent";

export const getStaticPaths = (async () => {
	const directory = await getCollection("directory", (p) => {
		return !!p.data.entry.group;
	});

	const docs = await getCollection("docs");

	return directory
		.map((entry) => {
			const prefix = entry.data.entry.url.slice(1, -1);
			const pages = docs.filter(
				(e) => e.id.startsWith(prefix + "/") || e.id === prefix,
			);

			if (pages.length === 0) return null;

			return {
				params: { product: entry.id },
				props: { entry, pages },
			};
		})
		.filter((p) => p !== null);
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) => {
	const { entry, pages } = props;
	const { title, url } = entry.data.entry;
	const description = entry.data.meta?.description;

	const pageLinks = pages
		.map((e) => {
			const line = `- [${e.data.title}](https://developers.cloudflare.com/${e.id}/index.md)`;
			return e.data.description ? line.concat(`: ${e.data.description}`) : line;
		})
		.join("\n");

	const markdown = dedent(`
		# ${title}

		${description ?? ""}

		> Use [${title} llms-full.txt](https://developers.cloudflare.com${url}llms-full.txt) for the complete ${title} documentation in a single file. That file is intended for offline indexing, bulk vectorization, or large-context models.
		>
		> For other Cloudflare products, see the [Cloudflare documentation directory](https://developers.cloudflare.com/llms.txt).

		## ${title} documentation pages

		${pageLinks}
	`);

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};
