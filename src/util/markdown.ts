import { parse } from "node-html-parser";
import { process } from "../util/rehype";

import YAML from "yaml";

import rehypeParse from "rehype-parse";
import rehypeBaseUrl from "../plugins/rehype/base-url";
import rehypeFilterElements from "../plugins/rehype/filter-elements";
import remarkGfm from "remark-gfm";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

export async function htmlToMarkdown(
	html: string,
	url: string,
): Promise<string | undefined> {
	const dom = parse(html);
	const content = dom.querySelector(".sl-markdown-content:not(.md-ignore)");

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

	const title = dom.querySelector("title")?.textContent;
	const description = dom.querySelector("meta[name='description']")?.attributes
		.content;
	const lastUpdated = dom.querySelector(".meta time")?.attributes.datetime;
	const chatbotDeprioritize = dom.querySelector(
		"meta[name='pcx_chatbot_deprioritize']",
	)?.attributes.content;
	const tags = dom.querySelector("meta[name='pcx_tags']")?.attributes.content;

	const withFrontmatter = [
		"---",
		YAML.stringify({
			title,
			description,
			lastUpdated,
			chatbotDeprioritize: Boolean(chatbotDeprioritize),
			tags,
			source_url: {
				html: url.replace("index.md", ""),
				md: url,
			},
		}).trim(),
		"---\n",
		markdown,
	]
		.flat()
		.join("\n");

	return withFrontmatter;
}
