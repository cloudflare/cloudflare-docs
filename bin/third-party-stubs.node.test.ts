// Guards single-sourced guides that are mirrored as navigation stubs in
// another product. Content lives only in `source`; `stub` holds one
// frontmatter-only page per guide that links to it via `external_link`.
// See .agents/skills/contributing/references/information-architecture.md.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, test } from "vitest";
import { parse, stringify } from "yaml";

const DOCS = "src/content/docs";

const PAIRS = [
	{
		source: "cloudflare-wan/configuration/third-party",
		stub: "cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party",
		stubProduct: "cloudflare-one",
	},
];

function walk(dir: string): string[] {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		return statSync(path).isDirectory() ? walk(path) : [path];
	});
}

function read(path: string) {
	const match = readFileSync(path, "utf8").match(
		/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/,
	);
	if (!match) throw new Error(`${path} has no frontmatter`);
	return { data: parse(match[1]) ?? {}, body: match[2] };
}

const isIndex = (rel: string) => rel.endsWith("index.mdx");
const urlFor = (dir: string, rel: string) =>
	`/${dir}/${rel.replace(/(\/?index)?\.mdx$/, "")}/`.replace(/\/+/g, "/");

describe.each(PAIRS)("navigation stubs for $source", (pair) => {
	const sourceDir = join(DOCS, pair.source);
	const stubDir = join(DOCS, pair.stub);
	const sourceFiles = walk(sourceDir)
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => relative(sourceDir, f));
	const stubFiles = walk(stubDir)
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => relative(stubDir, f));

	test("every guide has a stub", () => {
		const problems = sourceFiles
			.filter((rel) => !isIndex(rel) && !existsSync(join(stubDir, rel)))
			.map((rel) => {
				const { data } = read(join(sourceDir, rel));
				const frontmatter = stringify({
					title: data.title,
					pcx_content_type: "navigation",
					description: data.description,
					products: [pair.stubProduct],
					external_link: urlFor(pair.source, rel),
				});
				return [
					`Missing stub: ${join(stubDir, rel)}`,
					"Create it with this frontmatter and no body:",
					`---\n${frontmatter}---`,
				].join("\n");
			});
		expect(problems, problems.join("\n\n")).toEqual([]);
	});

	test("every guide folder has a matching stub index with <DirectoryListing />", () => {
		const problems = sourceFiles.filter(isIndex).flatMap((rel) => {
			const path = join(stubDir, rel);
			const sourcePath = join(sourceDir, rel);
			if (!existsSync(path)) {
				return [
					`Missing stub index: ${path}. Copy ${sourcePath}, set products to ${pair.stubProduct}, and keep the same body.`,
				];
			}
			const errors: string[] = [];
			const { body } = read(path);
			if (!body.includes("<DirectoryListing")) {
				errors.push(`${path} must render <DirectoryListing />.`);
			}
			if (body.trim() !== read(sourcePath).body.trim()) {
				errors.push(
					`${path} body must match ${sourcePath}. Move any new content to the Cloudflare WAN index and copy its body here.`,
				);
			}
			return errors;
		});
		expect(problems, problems.join("\n")).toEqual([]);
	});

	test("every stub folder has a guide folder", () => {
		const problems = stubFiles
			.filter((rel) => isIndex(rel) && rel !== "index.mdx")
			.filter((rel) => !existsSync(join(sourceDir, rel)))
			.map(
				(rel) =>
					`Orphaned stub folder: ${join(stubDir, rel)} has no matching guide folder at ${join(sourceDir, rel)}. Rename or delete the stub folder to match the guides.`,
			);
		expect(problems, problems.join("\n")).toEqual([]);
	});

	test("stubs have no body and link to an existing guide", () => {
		const problems = stubFiles
			.filter((rel) => !isIndex(rel))
			.flatMap((rel) => {
				const path = join(stubDir, rel);
				const { data, body } = read(path);
				const expected = urlFor(pair.source, rel);
				const errors: string[] = [];
				if (!existsSync(join(sourceDir, rel))) {
					errors.push(
						`Orphaned stub: ${path} has no matching guide at ${join(sourceDir, rel)}. Rename or delete the stub to match the guide.`,
					);
				}
				if (data.pcx_content_type !== "navigation") {
					errors.push(`${path} must set pcx_content_type: navigation.`);
				}
				if (data.external_link !== expected) {
					errors.push(`${path} must set external_link: ${expected}`);
				}
				if (body.trim() !== "") {
					errors.push(
						`${path} must have no body. Remove the content and edit ${join(sourceDir, rel)} instead.`,
					);
				}
				return errors;
			});
		expect(problems, problems.join("\n")).toEqual([]);
	});
});
