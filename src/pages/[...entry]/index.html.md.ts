import type { APIRoute } from "astro";
import type { InferGetStaticPropsType, GetStaticPaths } from "astro";

import { getCollection } from "astro:content";

export const getStaticPaths = (async () => {
	const entries = await getCollection("docs", (e) => Boolean(e.body));

	return entries.map((entry) => {
		return {
			params: {
				// https://llmstxt.org/: (URLs without file names should append index.html.md instead.)
				entry: entry.id,
			},
			props: {
				entry,
			},
		};
	});
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = (context) => {
	return new Response(context.props.entry.body, {
		headers: {
			"content-type": "text/markdown",
		},
	});
};
