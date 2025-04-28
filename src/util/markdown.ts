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

	return markdown;
}
