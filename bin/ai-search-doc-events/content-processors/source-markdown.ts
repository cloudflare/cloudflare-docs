import type { ContentTransformer } from "../types";
import { extractSections } from "./mdast";

export const sourceMarkdownProcessor: ContentTransformer = {
	name: "source-markdown",
	transform: ({ sourceMarkdown, sourceMarkdownPath, title }) =>
		sourceMarkdown
			? extractSections(
					sourceMarkdown,
					title,
					sourceMarkdownPath?.endsWith(".mdx") ?? false,
				)
			: undefined,
};
