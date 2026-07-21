import { readFile } from "node:fs/promises";
import { parse } from "node-html-parser";
import fg from "fast-glob";
import { transformContent } from "./content-transformers";
import type { Args, Manifest, PageHash } from "./types";
import {
	addSectionRecordFields,
	docsPathToItemKey,
	htmlPathToDocsPath,
	meta,
	normalizeText,
	sha256,
	shouldIndexHtmlPath,
	sourceMarkdownForPath,
} from "./shared";

async function pageFromHtml(
	dist: string,
	htmlFile: string,
	sourceDocsDir: string,
) {
	const path = htmlPathToDocsPath(dist, htmlFile);
	if (!shouldIndexHtmlPath(path)) return null;

	const html = await readFile(htmlFile, "utf8");
	const root = parse(html);

	const robots = meta(root, "robots");
	const refresh = root.querySelector('meta[http-equiv="refresh"]');
	if (robots?.includes("noindex") || refresh) return null;

	const title = normalizeText(
		root.querySelector("title")?.text.split("|")[0] ??
			root.querySelector("h1")?.text ??
			path,
	);
	const description = meta(root, "description");
	const source = await sourceMarkdownForPath(sourceDocsDir, path);
	const rawSections = await transformContent({
		path,
		title,
		description,
		sourceMarkdown: source?.content,
		sourceMarkdownPath: source?.file,
		root,
	});
	const text = rawSections.map((section) => section.text).join("\n\n");
	if (!text) return null;

	const product = meta(root, "pcx_product");
	// Fold the indexed page fields into the page hash so metadata-only edits
	// still produce a diff event and refresh the whole-page item.
	const hash = sha256(
		[title, description ?? "", product ?? "", text].join("\n"),
	);
	const page: PageHash = {
		path,
		key: docsPathToItemKey(path),
		title,
		description,
		product,
		hash,
		sections: addSectionRecordFields(path, rawSections),
	};

	return page;
}

export async function buildManifest(
	args: Pick<Args, "dist" | "sourceDocsDir" | "includePathPrefixes">,
): Promise<Manifest> {
	const htmlFiles = await fg("**/*.html", {
		cwd: args.dist,
		absolute: true,
		ignore: ["404.html", "**/404/index.html"],
	});

	const pages: Record<string, PageHash> = {};
	for (const htmlFile of htmlFiles.sort()) {
		const page = await pageFromHtml(args.dist, htmlFile, args.sourceDocsDir);
		if (!page) continue;
		if (
			args.includePathPrefixes.length > 0 &&
			!args.includePathPrefixes.some((prefix) => page.path.startsWith(prefix))
		) {
			continue;
		}
		pages[page.path] = page;
	}

	return {
		version: 1,
		generatedAt: new Date().toISOString(),
		pages,
	};
}
