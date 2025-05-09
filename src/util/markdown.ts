import { parse } from "node-html-parser";
import { process } from "../util/rehype";

import rehypeParse from "rehype-parse";
import rehypeBaseUrl from "../plugins/rehype/base-url";
import rehypeFilterElements from "../plugins/rehype/filter-elements";
import remarkGfm from "remark-gfm";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

export async function htmlToMarkdown(
	html: string,
): Promise<string | undefined> {
	const content = parse(html).querySelector(".sl-markdown-content");

	if (!content) {
		return;
	}

	const markdown = await process(content.toString(), [
		rehypeParse,
		rehypeBaseUrl,
		rehypeFilterElements,
		[remarkGfm, { tablePipeAlign: false }],
		rehypeRemark,
		remarkStringify,
	]);

<<<<<<< HEAD
	const title = dom.querySelector("title")?.textContent;
	const description = dom.querySelector("meta[name='description']")?.attributes
		.content;
	const lastUpdated = dom.querySelector(".meta time")?.attributes.datetime;

	const withFrontmatter = [
		"---",
		`title: ${title}`,
		description ? `description: ${description}` : [],
		lastUpdated ? `lastUpdated: ${lastUpdated}` : [],
		`source_url:`,
		`  html: ${url.replace("index.md", "")}`,
		`  md: ${url}`,
		"---\n",
		markdown,
	]
		.flat()
		.join("\n");

	return withFrontmatter;
=======
	return markdown;
>>>>>>> parent of 27aa5ce724 ([Docs Site] Add frontmatter to index.md output (#21980))
}
