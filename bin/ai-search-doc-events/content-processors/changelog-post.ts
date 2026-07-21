import { readFile } from "node:fs/promises";
import { relative, sep } from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";
import type { ContentTransformer, RawSection } from "../types";
import { asArray, asRecord, asString, compactLine } from "./data";
import { documentText } from "./mdast";
import { makeSections } from "./utils";

async function directoryEntryName(id: string) {
	const source = await readFile(
		`src/content/directory/${id}.yaml`,
		"utf8",
	).catch((error: NodeJS.ErrnoException) => {
		if (error.code === "ENOENT") return undefined;
		throw error;
	});
	if (!source) return undefined;
	const data = asRecord(parseYaml(source));
	return asString(data?.name) ?? asString(asRecord(data?.entry)?.title);
}

async function changelogPostSectionsForPath(
	path: string,
	pageTitle: string,
): Promise<RawSection[] | undefined> {
	const slug = path.match(/^\/changelog\/post\/([^/]+)\/$/)?.[1];
	if (!slug) throw new Error(`Invalid changelog post path: ${path}`);

	const candidates = await fg(`**/${slug}.{md,mdx}`, {
		cwd: "src/content/changelog",
		absolute: true,
	});
	const sourceFile = candidates.sort()[0];
	if (!sourceFile) return undefined;

	const source = await readFile(sourceFile, "utf8");
	const { data: frontmatter } = matter(source);
	const productId = relative("src/content/changelog", sourceFile).split(sep)[0];
	const productName =
		(await directoryEntryName(productId)) ??
		asArray(frontmatter.products).map(String).join(", ") ??
		productId;
	const title = asString(frontmatter.title) ?? pageTitle;
	const description = asString(frontmatter.description);
	const date =
		frontmatter.date instanceof Date
			? frontmatter.date.toISOString().slice(0, 10)
			: (asString(frontmatter.date) ?? undefined);
	const bodyText = documentText(source, sourceFile.endsWith(".mdx"));
	const text = [
		compactLine("Title", title),
		compactLine("Date", date),
		compactLine("Product", productName),
		description,
		bodyText,
	]
		.filter(Boolean)
		.join("\n\n");

	return makeSections([{ anchor: "", heading: title, text }]);
}

export const changelogPostProcessor: ContentTransformer = {
	name: "changelog-post",
	transform: ({ path, title }) => changelogPostSectionsForPath(path, title),
};
