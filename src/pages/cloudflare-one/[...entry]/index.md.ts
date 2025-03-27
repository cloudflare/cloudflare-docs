import type { APIRoute } from "astro";
import type { InferGetStaticPropsType, GetStaticPaths } from "astro";

import { getCollection } from "astro:content";
import { entryToString } from "~/util/container";

import { process } from "~/util/rehype";
import rehypeParse from "rehype-parse";
import rehypeBaseUrl from "~/plugins/rehype/base-url";
import rehypeFilterElements from "~/plugins/rehype/filter-elements";
import remarkGfm from "remark-gfm";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

export const getStaticPaths = (async () => {
	const entries = await getCollection("docs", (e) => {
		return e.id.startsWith("cloudflare-one") && Boolean(e.body);
	});

	return entries.map((entry) => {
		return {
			params: {
				entry: entry.id.replace("cloudflare-one/", ""),
			},
			props: {
				entry,
			},
		};
	});
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async (context) => {
	const html = await entryToString(context.props.entry, context.locals);

	const md = await process(html, [
		rehypeParse,
		rehypeBaseUrl,
		rehypeFilterElements,
		remarkGfm,
		rehypeRemark,
		remarkStringify,
	]);

	return new Response(md, {
		headers: {
			"content-type": "text/markdown",
		},
	});
};
