import { readdir, readFile } from "node:fs/promises";

import { mdxjs } from "micromark-extension-mdxjs";
import { fromMarkdown } from "mdast-util-from-markdown";
import {
	mdxFromMarkdown,
	type MdxJsxFlowElement,
	type MdxJsxTextElement,
} from "mdast-util-mdx";
import { visit } from "unist-util-visit";

type Usage = { count: number; pages: Set<string> };

let usages: Record<string, Usage>;

export function getComponentsUsage(): Promise<Record<string, Usage>>;
export function getComponentsUsage(component: string): Promise<Usage>;
export async function getComponentsUsage(
	component?: string,
): Promise<Usage | Record<string, Usage>> {
	if (!usages) {
		usages = {};

		const entities = await readdir("./src/content/", {
			recursive: true,
			withFileTypes: true,
		});

		const files = entities.filter(
			(entity) => entity.isFile() && entity.name.endsWith(".mdx"),
		);

		for (const file of files) {
			const fullName = file.parentPath + "/" + file.name;
			const content = await readFile(fullName, "utf8");

			if (!content.includes("import")) continue;

			const tree = fromMarkdown(content, {
				extensions: [mdxjs()],
				mdastExtensions: [mdxFromMarkdown()],
			});

			visit(tree, ["mdxJsxFlowElement", "mdxJsxTextElement"], function (node) {
				const typed = node as MdxJsxFlowElement | MdxJsxTextElement;

				if (!typed.name || typed.name[0] === typed.name[0].toLowerCase())
					return;

				usages[typed.name] ||= { count: 0, pages: new Set() };
				usages[typed.name].count++;
				usages[typed.name].pages.add(fullName);
			});
		}
	}

	if (component) {
		return usages[component] || { count: 0, pages: new Set() };
	}

	return usages;
}
