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

const READ_BATCH_SIZE = 100;

async function ensureScanned() {
	if (usages && partials) return;

	usages = {};
	partials = {};

	// Pre-populate all partials with zero usage
	const partialEntities = await readdir("./src/content/partials/", {
		recursive: true,
		withFileTypes: true,
	});

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

	// List all content files
	const entities = await readdir("./src/content/", {
		recursive: true,
		withFileTypes: true,
	});

	const files = entities.filter(
		(entity) => entity.isFile() && entity.name.endsWith(".mdx"),
	);

	// Read files in parallel batches
	type FileContent = { fullName: string; content: string };
	const fileContents: FileContent[] = [];

	for (let i = 0; i < files.length; i += READ_BATCH_SIZE) {
		const batch = files.slice(i, i + READ_BATCH_SIZE);
		const results = await Promise.all(
			batch.map(async (file) => {
				const parentPath =
					process.platform === "win32"
						? file.parentPath.replaceAll("\\", "/")
						: file.parentPath;
				const fullName = parentPath + "/" + file.name;
				const content = await readFile(fullName, "utf8");
				return { fullName, content };
			}),
		);
		fileContents.push(...results);
	}

	// Single pass: extract both component usage and partial usage
	for (const { fullName, content } of fileContents) {
		if (!content.includes("import")) continue;

		const tree = fromMarkdown(content, {
			extensions: [mdxjs()],
			mdastExtensions: [mdxFromMarkdown()],
		});

		visit(tree, ["mdxJsxFlowElement", "mdxJsxTextElement"], function (node) {
			const typed = node as MdxJsxFlowElement | MdxJsxTextElement;

			if (!typed.name || typed.name[0] === typed.name[0].toLowerCase()) return;

			// Track component usage
			usages[typed.name] ||= { count: 0, pages: new Set() };
			usages[typed.name].count++;
			usages[typed.name].pages.add(fullName);

			// Track partial usage
			if (typed.name === "Render") {
				const file = typed.attributes.find(
					(attr) => attr.type === "mdxJsxAttribute" && attr.name === "file",
				)?.value;

				let product = typed.attributes.find(
					(attr) => attr.type === "mdxJsxAttribute" && attr.name === "product",
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

		visit(tree, "code", function (node: Code) {
			if (node.lang === "mermaid") {
				usages["Mermaid"] ||= { count: 0, pages: new Set() };
				usages["Mermaid"].count++;
				usages["Mermaid"].pages.add(fullName);
			}
		});
	}
}

export function getComponentsUsage(): Promise<Record<string, Usage>>;
export function getComponentsUsage(component: string): Promise<Usage>;
export async function getComponentsUsage(
	component?: string,
): Promise<Usage | Record<string, Usage>> {
	await ensureScanned();

	if (component) {
		return usages[component] || { count: 0, pages: new Set() };
	}

	return usages;
}

export async function getPartialsUsage(): Promise<Record<string, Usage>> {
	await ensureScanned();
	return partials;
}
