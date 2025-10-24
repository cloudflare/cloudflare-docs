import { readdir, readFile } from "node:fs/promises";

import { mdxjs } from "micromark-extension-mdxjs";
import { fromMarkdown } from "mdast-util-from-markdown";
import {
	mdxFromMarkdown,
	type MdxJsxFlowElement,
	type MdxJsxTextElement,
} from "mdast-util-mdx";
import type { Code } from "mdast";
import { visit } from "unist-util-visit";

type Usage = { count: number; pages: Set<string> };

let usages: Record<string, Usage>;
let partials: Record<string, Usage>;

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
			const parentPath =
				process.platform === "win32"
					? file.parentPath.replaceAll("\\", "/")
					: file.parentPath;
			const fullName = parentPath + "/" + file.name;
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

			visit(tree, "code", function (node: Code) {
				if (node.lang === "mermaid") {
					usages["Mermaid"] ||= { count: 0, pages: new Set() };
					usages["Mermaid"].count++;
					usages["Mermaid"].pages.add(fullName);
				}
			});
		}
	}

	if (component) {
		return usages[component] || { count: 0, pages: new Set() };
	}

	return usages;
}

export async function getPartialsUsage(): Promise<Record<string, Usage>> {
	if (!partials) {
		partials = {};

		const entities = await readdir("./src/content/", {
			recursive: true,
			withFileTypes: true,
		});

		const partialEntities = await readdir("./src/content/partials/", {
			recursive: true,
			withFileTypes: true,
		});

		// Populate all partials with zero usage
		const partialFiles = partialEntities.filter(
			(entity) => entity.isFile() && entity.name.endsWith(".mdx"),
		);
		for (const file of partialFiles) {
			const parentPath =
				process.platform === "win32"
					? file.parentPath.replaceAll("\\", "/")
					: file.parentPath;
			const folderPath = parentPath.split("/").splice(3).join("/");
			const partialName = `${folderPath}/${file.name.replace(".mdx", "")}`;
			partials[partialName] = { count: 0, pages: new Set() };
		}

		const files = entities.filter(
			(entity) => entity.isFile() && entity.name.endsWith(".mdx"),
		);

		for (const file of files) {
			const parentPath =
				process.platform === "win32"
					? file.parentPath.replaceAll("\\", "/")
					: file.parentPath;
			const fullName = parentPath + "/" + file.name;
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

				if (typed.name === "Render") {
					const file = typed.attributes.find(
						(attr) => attr.type === "mdxJsxAttribute" && attr.name === "file",
					)?.value;

					let product = typed.attributes.find(
						(attr) =>
							attr.type === "mdxJsxAttribute" && attr.name === "product",
					)?.value;

					if (!product) {
						product = fullName.split("/")[3];
					}

					const partialName = `${product}/${file}`;

					partials[partialName] ||= { count: 0, pages: new Set() };
					partials[partialName].count++;
					partials[partialName].pages.add(fullName);
				}
			});
		}
	}
	return partials;
}
