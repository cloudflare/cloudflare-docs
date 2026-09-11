#!/usr/bin/env tsx

import fs from "fs";
import { join } from "path";

import YAML from "yaml";

import {
	downloadToDotTempIfNotPresent,
	extractTarGz,
	getDotTmpPath,
} from "../src/util/custom-loaders";

const MIDDLECACHE_BASE_URL = `${(
	process.env.MIDDLECACHE_BASE_URL ?? "https://middlecache.ced.cloudflare.com"
).replace(/\/+$/, "")}/`;
const ARCHIVE_MIDDLECACHE_PATH = "v1/logpush-datasets/datasets.tar.gz";
const ARCHIVE_DOT_TMP_PATH = `middlecache/${ARCHIVE_MIDDLECACHE_PATH}`;
const DATASETS_DIR = "./src/content/docs/logs/logpush/logpush-job/datasets";
const EXTRACTED_DIR = join(".tmp", "logpush-datasets-extracted");

// --soft: warn and continue on failure instead of exiting non-zero.
//         Used by the predev hook so a network failure doesn't block local development.
// --force: re-fetch even if the generated dataset pages exist, including a
//         fresh download of the archive from middlecache.
const soft = process.argv.includes("--soft");
const force = process.argv.includes("--force");

const fail = (message: string): never => {
	if (soft) {
		const hasPages = fs.existsSync(DATASETS_DIR)
			? getManagedScopes().some((scope) => getScopePages(scope).length > 0)
			: false;
		console.warn(
			hasPages
				? `Warning: ${message} — continuing with existing Logpush dataset pages`
				: `Warning: ${message} — Logpush dataset pages are missing, /logs/logpush/logpush-job/datasets/ will not work`,
		);
		process.exit(0);
	}
	console.error(`Error: ${message}`);
	process.exit(1);
};

// The scope dirs are hand-maintained (they carry index.mdx + sidebar wiring);
// generated .md pages are only synced into scopes that already exist.
const getManagedScopes = () =>
	fs
		.readdirSync(DATASETS_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.filter((scope) => fs.existsSync(join(DATASETS_DIR, scope, "index.mdx")));

const getScopePages = (scope: string) => {
	const scopeDir = join(DATASETS_DIR, scope);
	return fs.existsSync(scopeDir)
		? fs
				.readdirSync(scopeDir)
				.filter((file) => file.endsWith(".md"))
				.sort()
		: [];
};

const managedScopes = getManagedScopes();
const hasGeneratedPages =
	fs.existsSync(DATASETS_DIR) &&
	managedScopes.length > 0 &&
	managedScopes.every((scope) => getScopePages(scope).length > 0);

if (hasGeneratedPages && !force) {
	console.log(
		"Logpush dataset pages already present, skipping fetch. (run `pnpm tsx bin/fetch-logpush-datasets.ts --force` to re-fetch)",
	);
	process.exit(0);
}

// Resolve the cache path the same way downloadToDotTempIfNotPresent does
// (repo-root `.tmp`, not cwd-relative) so the --force eviction always targets
// the file the downloader will reuse.
const archivePath = join(getDotTmpPath(), ...ARCHIVE_DOT_TMP_PATH.split("/"));

if (force) {
	// --force means re-fetch from middlecache: drop the cached archive so
	// downloadToDotTempIfNotPresent actually downloads rather than reusing it.
	fs.rmSync(archivePath, { force: true });
}

console.log("Fetching Logpush dataset pages from middlecache");

try {
	await downloadToDotTempIfNotPresent(
		`${MIDDLECACHE_BASE_URL}${ARCHIVE_MIDDLECACHE_PATH}`,
		ARCHIVE_DOT_TMP_PATH,
	);
} catch (err) {
	fail(`fetch failed: ${err}`);
}

// Remove any stale extracted content so we never sync pages from an old run.
fs.rmSync(EXTRACTED_DIR, { recursive: true, force: true });

try {
	await extractTarGz(archivePath, EXTRACTED_DIR);
} catch (err) {
	fail(`tar extraction failed: ${(err as Error).message}`);
}

const archiveScopes = fs
	.readdirSync(EXTRACTED_DIR, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

// Warn about archive scopes that have no hand-written nav wiring yet; they are
// not synced until an index.mdx + sidebar entry are added for them.
for (const scope of archiveScopes) {
	if (!managedScopes.includes(scope)) {
		console.warn(
			`Warning: skipping Logpush dataset scope not seeded in the docs: ${scope}`,
		);
	}
}

const pagesToCopy = new Map<string, string[]>();
for (const scope of managedScopes) {
	const sourceDir = join(EXTRACTED_DIR, scope);
	if (!fs.existsSync(sourceDir)) {
		fail(
			`Logpush dataset archive is missing scope: ${scope}. If intentional, remove that scope's generated pages in the same change`,
		);
	}
	pagesToCopy.set(
		scope,
		fs
			.readdirSync(sourceDir)
			.filter((file) => file.endsWith(".md"))
			.sort(),
	);
}

// Validate frontmatter before touching the checked-in tree.
for (const [scope, pages] of pagesToCopy) {
	for (const page of pages) {
		const content = fs.readFileSync(join(EXTRACTED_DIR, scope, page), "utf8");
		const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:$|\r?\n)/.exec(
			content,
		)?.[1];
		const metadata = frontmatter
			? (YAML.parse(frontmatter) as unknown)
			: undefined;
		if (
			!metadata ||
			typeof metadata !== "object" ||
			!("title" in metadata) ||
			typeof metadata.title !== "string" ||
			metadata.title.trim() === ""
		) {
			fail(`Logpush dataset page has invalid frontmatter: ${scope}/${page}`);
		}
	}
}

let written = 0;
let removed = 0;

for (const [scope, pages] of pagesToCopy) {
	const scopeDir = join(DATASETS_DIR, scope);
	for (const page of getScopePages(scope)) {
		if (!pages.includes(page)) {
			fs.rmSync(join(scopeDir, page));
			removed++;
		}
	}
	for (const page of pages) {
		fs.copyFileSync(join(EXTRACTED_DIR, scope, page), join(scopeDir, page));
		written++;
	}
}

console.log(
	`Logpush dataset pages ready (${written} written, ${removed} removed)`,
);
