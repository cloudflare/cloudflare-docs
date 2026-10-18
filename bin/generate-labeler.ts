import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { dump, load } from "js-yaml";
import { format } from "prettier";
import {
	cloudflareOneLeafRules,
	cloudflareOneParentPaths,
	pathGlobsExcluding,
} from "./cloudflare-one-labels";

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

type ChangedFilesGroup = {
	"any-glob-to-any-file"?: string[];
	"all-globs-to-any-file"?: string[];
};

type LabelRules = Record<string, ChangedFilesGroup[]>;

const productRoots: Record<string, string[]> = {
	"cloudflare-one": [
		"src/content/docs/cloudflare-one",
		"src/content/partials/cloudflare-one",
		"src/assets/images/cloudflare-one",
	],
	"cloudflare-wan": [
		"src/content/docs/cloudflare-wan",
		"src/assets/images/cloudflare-wan",
	],
	"email-security": [
		"src/content/docs/email-security",
		"src/content/partials/email-security",
		"src/assets/images/email-security",
	],
};

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

const cloudflareOneChangelogLabels: Record<string, string> = {
	access: "product:access",
	"browser-isolation": "product:browser-isolation",
	casb: "product:casb",
	"cloudflare-one-client": "product:cloudflare-one-client",
	dex: "product:dex",
	dlp: "product:dlp",
	"email-security-cf1": "product:email-security",
	gateway: "product:gateway",
	"risk-score": "product:risk-score",
};

function firstUrlSegment(url: string): string {
	if (url.startsWith("http") && URL.canParse(url)) {
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
		} catch (error) {
			if ((error as NodeJS.ErrnoException)?.code !== "ENOENT") {
				throw error;
			}
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

function pathGlobs(root: string, pathname: string): string[] {
	return [`${root}/${pathname}/**`, `${root}/${pathname}.*`];
}

function addCloudflareOneRules(rules: LabelRules) {
	const movedChangelogGlobs = new Map<string, string[]>();
	const aggregateRules = rules["product:cloudflare-one"] ?? [];
	for (const rule of aggregateRules) {
		const globs = rule["any-glob-to-any-file"];
		if (!globs) continue;
		rule["any-glob-to-any-file"] = globs.filter((glob) => {
			const match = glob.match(
				/^src\/(?:content|assets\/images)\/changelog\/([^/]+)\/\*\*$/,
			);
			const label = match ? cloudflareOneChangelogLabels[match[1]] : undefined;
			if (!label) return true;
			movedChangelogGlobs.set(label, [
				...(movedChangelogGlobs.get(label) ?? []),
				glob,
			]);
			return false;
		});
	}

	for (const rule of cloudflareOneLeafRules) {
		const globs: string[] = [...(movedChangelogGlobs.get(rule.label) ?? [])];
		for (const pathname of rule.paths) {
			const [parent, ...segments] = pathname.split("/");
			const rulePath = segments.join("/");
			const childPaths = cloudflareOneLeafRules
				.filter(
					(candidate) =>
						candidate.label !== rule.label &&
						candidate.paths.some((path) => path.startsWith(`${pathname}/`)),
				)
				.flatMap((candidate) =>
					candidate.paths.filter((path) => path.startsWith(`${pathname}/`)),
				);

			if (childPaths.length === 0) {
				globs.push(
					...productRoots[parent].flatMap((root) => pathGlobs(root, rulePath)),
				);
				continue;
			}

			globs.push(
				...productRoots[parent].flatMap((root) =>
					pathGlobsExcluding(
						`${root}/${rulePath}`,
						childPaths.map((path) => path.slice(pathname.length + 1)),
					),
				),
			);
		}
		const existing = rules[rule.label] ?? [];
		rules[rule.label] = [{ "any-glob-to-any-file": globs }, ...existing];
	}

	for (const parent of cloudflareOneParentPaths) {
		const label = `product:${parent}`;
		const parentRules = rules[label] ?? [];
		const roots = productRoots[parent];
		const rootGlobs = new Set(roots.map((root) => `${root}/**`));
		const otherRules = parentRules
			.map((rule) => ({
				...rule,
				...(rule["any-glob-to-any-file"]
					? {
							"any-glob-to-any-file": rule["any-glob-to-any-file"].filter(
								(glob) => !rootGlobs.has(glob),
							),
						}
					: {}),
			}))
			.filter(
				(rule) =>
					(rule["any-glob-to-any-file"]?.length ?? 0) > 0 ||
					(rule["all-globs-to-any-file"]?.length ?? 0) > 0,
			);
		const excludedPaths = cloudflareOneLeafRules.flatMap((rule) =>
			rule.paths
				.filter((pathname) => pathname.startsWith(`${parent}/`))
				.map((pathname) => pathname.split("/").slice(1).join("/")),
		);
		const fallbackRules = roots.map((root) => ({
			"any-glob-to-any-file": pathGlobsExcluding(root, excludedPaths),
		}));

		rules[label] = [...otherRules, ...fallbackRules];
	}
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

	const rules: LabelRules = {};

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

		rules[`product:${slug}`] = [{ "any-glob-to-any-file": globs }];
	}

	for (const [label, globs] of Object.entries(specialRules)) {
		rules[label] = [{ "any-glob-to-any-file": globs }, ...(rules[label] ?? [])];
	}

	addCloudflareOneRules(rules);

	const sortedRules: LabelRules = {};
	for (const label of Object.keys(rules).sort()) {
		sortedRules[label] = rules[label];
	}

	const rulesForYaml = Object.fromEntries(
		Object.entries(sortedRules).map(([label, globGroups]) => [
			label,
			globGroups.map((group) => ({ "changed-files": [group] })),
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

	await writeFile(
		path.join(rootDir, ".github/labeler.yml"),
		await format(header + labeler, { filepath: ".github/labeler.yml" }),
		{
			encoding: "utf-8",
		},
	);

	console.log(
		`Wrote .github/labeler.yml with ${Object.keys(sortedRules).length} label rules.`,
	);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
