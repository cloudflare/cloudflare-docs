#!/usr/bin/env tsx

/**
 * Downloads all workers_ai_model_catalog files from middlecache into .tmp/:
 *   - ai-catalog.json
 *   - workers-ai-catalog.json
 *   - all-models-detail.json
 *   - models.tar.gz  (extracted to models/<slug>/parameters.json + schema files)
 *
 * This runs as a prebuild/predev hook so the entire catalog payload is on the
 * local filesystem before the Astro build starts. Nothing is fetched lazily at
 * build time — all reads are plain fs.readFileSync calls.
 *
 * Flags:
 *   --soft   Warn and continue on failure (used by predev so a network
 *            failure doesn't block local development)
 *   --force  Re-fetch even if the models directory already exists
 */

import { spawn } from "child_process";
import fs from "fs";
import { join } from "path";

import kleur from "kleur";

import { downloadToDotTempIfNotPresent } from "../src/util/custom-loaders";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const CATALOG_BASE_PATH = "v1/workers-ai-model-catalog";

// Top-level JSON files fetched directly (not in the tarball)
const TOP_LEVEL_FILES = [
	"ai-catalog.json",
	"workers-ai-catalog.json",
	"all-models-detail.json",
];

const TARBALL_MIDDLECACHE_PATH = `${CATALOG_BASE_PATH}/models.tar.gz`;
const TARBALL_DOT_TMP_PATH = `middlecache/${TARBALL_MIDDLECACHE_PATH}`;

// The extracted models/ directory inside .tmp/middlecache/v1/workers-ai-model-catalog/
const MODELS_DOT_TMP_DIR =
	".tmp/middlecache/v1/workers-ai-model-catalog/models";

const soft = process.argv.includes("--soft");
const force = process.argv.includes("--force");

const tag = kleur.blue("[fetch-models]");

const fail = (message: string): never => {
	if (soft) {
		const hasExisting = fs.existsSync(MODELS_DOT_TMP_DIR);
		console.warn(
			tag +
				" " +
				kleur.yellow(
					hasExisting
						? `Warning: ${message} — continuing with existing models data`
						: `Warning: ${message} — ${MODELS_DOT_TMP_DIR} does not exist, model parameters will not render`,
				),
		);
		process.exit(0);
	}
	console.error(tag + " " + kleur.red(`Error: ${message}`));
	process.exit(1);
};

const tarballPath = join(".tmp", ...TARBALL_DOT_TMP_PATH.split("/"));
const extractDir = join(
	".tmp",
	"middlecache",
	"v1",
	"workers-ai-model-catalog",
);

if (fs.existsSync(MODELS_DOT_TMP_DIR) && !force) {
	console.log(
		tag +
			" " +
			kleur.dim(`${MODELS_DOT_TMP_DIR} already exists, skipping fetch.`) +
			" " +
			kleur.cyan("(run `pnpm tsx bin/fetch-models.ts --force` to re-fetch)"),
	);
	process.exit(0);
}

// Clear stale data before downloading so catalog files are always fresh
// after a pipeline graduation. Must happen before downloadToDotTempIfNotPresent
// so it re-fetches files it would otherwise skip as "already present".
fs.rmSync(MODELS_DOT_TMP_DIR, { recursive: true, force: true });
for (const staleName of [
	"ai-catalog.json",
	"workers-ai-catalog.json",
	"all-models-detail.json",
	"models.tar.gz",
]) {
	fs.rmSync(join(extractDir, staleName), { force: true });
}
fs.mkdirSync(extractDir, { recursive: true });

console.log(tag + " " + "Fetching AI model catalog from middlecache...");

// Fetch top-level JSON files and the tarball in parallel
try {
	await Promise.all([
		...TOP_LEVEL_FILES.map((name) =>
			downloadToDotTempIfNotPresent(
				`${MIDDLECACHE_BASE_URL}${CATALOG_BASE_PATH}/${name}`,
				`middlecache/${CATALOG_BASE_PATH}/${name}`,
			),
		),
		downloadToDotTempIfNotPresent(
			`${MIDDLECACHE_BASE_URL}${TARBALL_MIDDLECACHE_PATH}`,
			TARBALL_DOT_TMP_PATH,
		),
	]);
} catch (err) {
	fail(`fetch failed: ${err}`);
}

console.log(tag + " " + "Extracting models.tar.gz...");

// Extract models.tar.gz into .tmp/middlecache/v1/workers-ai-model-catalog/
// The archive contains models/<slug>/... so we extract into the parent dir.
const tar = spawn("tar", ["-xzf", tarballPath, "-C", extractDir], {
	stdio: "inherit",
});

const exitCode = await new Promise<number | null>((resolve) =>
	tar.on("close", resolve),
);

if (exitCode !== 0) {
	fail(`tar exited with code ${exitCode}`);
}

const modelCount = fs
	.readdirSync(MODELS_DOT_TMP_DIR, { withFileTypes: true })
	.reduce((count, entry) => {
		// Count top-level dirs and second-level dirs (e.g. cf/meta/llama or openai/gpt)
		return count + (entry.isDirectory() ? 1 : 0);
	}, 0);

console.log(
	tag +
		" " +
		kleur.green(
			`Done — ${modelCount} top-level entries in ${MODELS_DOT_TMP_DIR}`,
		),
);
