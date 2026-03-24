#!/usr/bin/env tsx

import { spawn } from "child_process";
import fs from "fs";
import { join } from "path";

import { downloadToDotTempIfNotPresent } from "../src/util/custom-loaders";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const TARBALL_MIDDLECACHE_PATH =
	"v1/cloudflare-docs-llms-full/llms-full.tar.gz";
const TARBALL_DOT_TMP_PATH = `middlecache/${TARBALL_MIDDLECACHE_PATH}`;
const MANIFEST_MIDDLECACHE_PATH = "v1/cloudflare-docs-llms-full/manifest.json";
const MANIFEST_DOT_TMP_PATH = `middlecache/${MANIFEST_MIDDLECACHE_PATH}`;

// Per-product llms-full.txt files are extracted into public/{product}/llms-full.txt.
// Astro copies everything in public/ into dist/ as static assets.
// The root llms-full.txt (~40 MB) is NOT extracted here — it exceeds the
// Workers 25 MiB per-asset limit and is served from R2 at request time.
const OUTPUT_DIR = "./public";

// Sentinel directory used to detect a previous successful extraction so we
// can skip re-extraction when the tarball hasn't changed.
const SENTINEL = join(OUTPUT_DIR, "workers", "llms-full.txt");

// --soft: warn and continue on failure instead of exiting non-zero.
//         Used by the predev hook so a network failure doesn't block local development.
// --force: re-fetch even if llms-full.txt files already exist.
const soft = process.argv.includes("--soft");
const force = process.argv.includes("--force");

const fail = (message: string): never => {
	if (soft) {
		const hasExisting = fs.existsSync(SENTINEL);
		console.warn(
			hasExisting
				? `Warning: ${message} — continuing with existing llms-full.txt files`
				: `Warning: ${message} — llms-full.txt files will not be available`,
		);
		process.exit(0);
	}
	console.error(`Error: ${message}`);
	process.exit(1);
};

if (fs.existsSync(SENTINEL) && !force) {
	console.log(
		"Per-product llms-full.txt files already exist in public/, skipping fetch. (run `npx tsx bin/fetch-llms-full.ts --force` to re-fetch)",
	);
	process.exit(0);
}

console.log("Fetching llms-full.txt files from middlecache");

try {
	await Promise.all([
		downloadToDotTempIfNotPresent(
			`${MIDDLECACHE_BASE_URL}${TARBALL_MIDDLECACHE_PATH}`,
			TARBALL_DOT_TMP_PATH,
		),
		downloadToDotTempIfNotPresent(
			`${MIDDLECACHE_BASE_URL}${MANIFEST_MIDDLECACHE_PATH}`,
			MANIFEST_DOT_TMP_PATH,
		),
	]);
} catch (err) {
	fail(`fetch failed: ${err}`);
}

const tarballPath = join(".tmp", ...TARBALL_DOT_TMP_PATH.split("/"));

// Extract per-product files from the tarball into public/.
// The archive paths are v1/cloudflare-docs-llms-full/{product}/llms-full.txt
// so we strip the first 2 components to get {product}/llms-full.txt.
// The root llms-full.txt is excluded because it exceeds the Workers 25 MiB
// per-asset limit — it is served from the middlecache R2 bucket instead.
const tar = spawn(
	"tar",
	[
		"--strip-components=2",
		"--exclude=v1/cloudflare-docs-llms-full/llms-full.txt",
		"-xz",
		"-C",
		OUTPUT_DIR,
		"-f",
		tarballPath,
	],
	{ stdio: "inherit" },
);

const exitCode = await new Promise<number | null>((resolve) =>
	tar.on("close", resolve),
);

if (exitCode !== 0) {
	fail(`tar exited with code ${exitCode}`);
}

// Read the manifest to report what was extracted.
const manifestPath = join(".tmp", ...MANIFEST_DOT_TMP_PATH.split("/"));
try {
	const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
	console.log(
		`Fetched llms-full.txt for ${manifest.total_products} products (${(manifest.total_size / 1024 / 1024).toFixed(1)} MB total)`,
	);
} catch {
	console.log(
		"Fetched llms-full.txt files (could not read manifest for summary)",
	);
}
