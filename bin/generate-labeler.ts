import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { dump, load } from "js-yaml";

// Regenerates .github/labeler.yml from the content collections.
//
// Sources:
//   src/content/docs/{slug}/**            product docs pages
//   src/content/partials/{slug}/**        shared content snippets
//   src/assets/images/{slug}/**           product screenshots/diagrams
//   src/content/release-notes/*.yaml      release notes (productLink first segment)
//   src/content/directory/*.yaml          changelog product mapping (entry.url first segment)
//   src/content/changelog/{slug}/**       per-product changelog entries
//   src/assets/images/changelog/{slug}/** per-product changelog screenshots
//
// Run: pnpm run generate:labeler

const rootDir = path.resolve(import.meta.dirname, "..");

// Collection folders that map wholesale to a single product.
const collectionGlobs: Record<string, string[]> = {
	"ai-gateway": ["src/content/catalog-models/**"],
	"ruleset-engine": ["src/content/fields/**"],
	workers: ["src/content/compatibility-flags/**"],
	"workers-ai": ["src/content/workers-ai-models/**"],
};

// Hand-added globs that are not derivable from the directory structure.
const extraGlobs: Record<string, string[]> = {
	"network-flow": ["src/content/partials/networking-services/mnm/**"],
};

// Rules for paths that are not product docs dirs.
const specialRules: Record<string, string[]> = {
	"product:changelog": [
		"src/content/changelog/**",
		"src/assets/images/changelog/**",
	],
	"product:email-routing": ["src/content/partials/email-routing/**"],
};

// Changelog folders whose names do not match a directory entry.
const changelogAliases: Record<string, string> = {
	"cloudflare-tunnel": "tunnel",
};

function firstUrlSegment(url: string): string {
	if (url.startsWith("http")) {
		url = new URL(url).pathname;
	}
	return url.replace(/^\/+|\/+$/g, "").split("/")[0];
}

async function readDir(pathname: string): Promise<string[]> {
	return (await readdir(path.join(rootDir, pathname), { withFileTypes: true }))
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
}

async function loadYaml(pathname: string): Promise<Record<string, unknown>> {
	const contents = await readFile(path.join(rootDir, pathname), {
		encoding: "utf-8",
	});
	return (load(contents) ?? {}) as Record<string, unknown>;
}

// Map changelog folder -> product slug via its directory entry url.
async function changelogToProduct(
	folders: string[],
	aliases: Record<string, string>,
): Promise<Map<string, string>> {
	const result = new Map<string, string>();
	for (const folder of folders) {
		const alias = aliases[folder];
		if (alias) {
			result.set(folder, alias);
			continue;
		}
		let entry: Record<string, unknown>;
		try {
			entry = await loadYaml(`src/content/directory/${folder}.yaml`);
		} catch {
			console.warn(
				`No directory entry for changelog folder "${folder}"; skipping.`,
			);
			continue;
		}
		const url =
			((entry.entry as Record<string, unknown> | undefined)?.url as string) ??
			"";
		if (!url) {
			console.warn(
				`Missing entry.url in src/content/directory/${folder}.yaml; skipping.`,
			);
			continue;
		}
		result.set(folder, firstUrlSegment(url));
	}
	return result;
}

async function main() {
	const docsDir = "src/content/docs";
	const productSlugs = (await readDir(docsDir)).sort();
	const partialDirs = new Set(await readDir("src/content/partials"));
	const imageDirs = new Set(await readDir("src/assets/images"));

	// Release notes -> product slug.
	const releaseNotes = new Map<string, string>();
	const releaseNotesDir = "src/content/release-notes";
	const releaseNotesFiles = (
		await readdir(path.join(rootDir, releaseNotesDir), { withFileTypes: true })
	)
		.filter((entry) => entry.isFile() && entry.name.endsWith(".yaml"))
		.map((entry) => entry.name)
		.sort();
	for (const file of releaseNotesFiles) {
		const entry = await loadYaml(`${releaseNotesDir}/${file}`);
		const productLink = (entry.productLink as string | undefined) ?? "";
		if (productLink) releaseNotes.set(file, firstUrlSegment(productLink));
	}

	// Changelog folders -> product slug.
	const changelogToSlug = await changelogToProduct(
		await readDir("src/content/changelog"),
		changelogAliases,
	);
	const changelogImagesToSlug = await changelogToProduct(
		await readDir("src/assets/images/changelog"),
		changelogAliases,
	);

	const rules: Record<string, string[][]> = {};

	for (const slug of productSlugs) {
		const globs = [`src/content/docs/${slug}/**`];
		if (partialDirs.has(slug)) globs.push(`src/content/partials/${slug}/**`);
		if (imageDirs.has(slug)) globs.push(`src/assets/images/${slug}/**`);

		for (const [file, product] of [...releaseNotes].sort()) {
			if (product === slug) globs.push(`src/content/release-notes/${file}`);
		}
		for (const [folder, product] of [...changelogToSlug].sort()) {
			if (product === slug) globs.push(`src/content/changelog/${folder}/**`);
		}
		for (const [folder, product] of [...changelogImagesToSlug].sort()) {
			if (product === slug)
				globs.push(`src/assets/images/changelog/${folder}/**`);
		}
		if (extraGlobs[slug]) globs.push(...extraGlobs[slug]);
		if (collectionGlobs[slug]) globs.push(...collectionGlobs[slug]);

		rules[`product:${slug}`] = [globs];
	}

	for (const [label, globs] of Object.entries(specialRules)) {
		rules[label] = [globs, ...(rules[label] ?? [])];
	}

	const sortedRules: Record<string, string[][]> = {};
	for (const label of Object.keys(rules).sort()) {
		sortedRules[label] = rules[label];
	}

	const matchShape = (globs: string[]) => ({
		"changed-files": [{ "any-glob-to-any-file": globs }],
	});

	const rulesForYaml = Object.fromEntries(
		Object.entries(sortedRules).map(([label, globGroups]) => [
			label,
			globGroups.map(matchShape),
		]),
	);

	const header = `# Generated product label rules for actions/labeler.
#
# Maps changed paths to product: labels. Coverage:
#   src/content/docs/{slug}/**            product docs pages
#   src/content/partials/{slug}/**        shared content snippets
#   src/assets/images/{slug}/**           product screenshots/diagrams
#   src/content/release-notes/{slug}.yaml release notes
#   src/content/changelog/**              changelog entries (product:changelog)
#   src/content/changelog/{slug}/**       per-product changelog entries
#   src/content/{workers-ai-models,compatibility-flags,fields,catalog-models}
#
# Regenerate with: pnpm run generate:labeler
#
# Rules referencing paths that do not exist are intentionally omitted.
`;

	const labeler = dump(rulesForYaml, { noRefs: true, lineWidth: -1 })
		.split("\n")
		.map((line) => (line && /^[^\s#-]/.test(line) ? `\n${line}` : line))
		.join("\n");

	if (Object.keys(sortedRules).length === 0) {
		throw new Error(
			"No label rules generated; refusing to overwrite .github/labeler.yml",
		);
	}

	await writeFile(path.join(rootDir, ".github/labeler.yml"), header + labeler, {
		encoding: "utf-8",
	});

	console.log(
		`Wrote .github/labeler.yml with ${Object.keys(sortedRules).length} label rules.`,
	);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
