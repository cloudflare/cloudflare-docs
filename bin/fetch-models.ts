#!/usr/bin/env tsx

/**
 * Downloads and extracts the workers_ai_model_catalog models.tar.gz from
 * middlecache into .tmp/middlecache/v1/workers-ai-model-catalog/models/.
 *
 * This runs as a prebuild/predev hook so cloudflare-docs can read
 * parameters.json and schema files from the local filesystem at build time
 * instead of making per-model HTTP requests.
 *
 * Flags:
 *   --soft   Warn and continue on failure (used by predev so a network
 *            failure doesn't block local development)
 *   --force  Re-fetch even if the models directory already exists
 */

import { spawn } from "child_process";
import fs from "fs";
import { join } from "path";

import { downloadToDotTempIfNotPresent } from "../src/util/custom-loaders";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const TARBALL_MIDDLECACHE_PATH = "v1/workers-ai-model-catalog/models.tar.gz";
const TARBALL_DOT_TMP_PATH = `middlecache/${TARBALL_MIDDLECACHE_PATH}`;

// The extracted models/ directory inside .tmp/middlecache/v1/workers-ai-model-catalog/
const MODELS_DOT_TMP_DIR =
	".tmp/middlecache/v1/workers-ai-model-catalog/models";

const soft = process.argv.includes("--soft");
const force = process.argv.includes("--force");

const fail = (message: string): never => {
	if (soft) {
		const hasExisting = fs.existsSync(MODELS_DOT_TMP_DIR);
		console.warn(
			hasExisting
				? `Warning: ${message} — continuing with existing models data`
				: `Warning: ${message} — ${MODELS_DOT_TMP_DIR} does not exist, model parameters will not render`,
		);
		process.exit(0);
	}
	console.error(`Error: ${message}`);
	process.exit(1);
};

if (fs.existsSync(MODELS_DOT_TMP_DIR) && !force) {
	console.log(
		`${MODELS_DOT_TMP_DIR} already exists, skipping fetch. (run \`pnpm tsx bin/fetch-models.ts --force\` to re-fetch)`,
	);
	process.exit(0);
}

console.log("Fetching AI model catalog from middlecache...");

try {
	await downloadToDotTempIfNotPresent(
		`${MIDDLECACHE_BASE_URL}${TARBALL_MIDDLECACHE_PATH}`,
		TARBALL_DOT_TMP_PATH,
	);
} catch (err) {
	fail(`fetch failed: ${err}`);
}

const tarballPath = join(".tmp", ...TARBALL_DOT_TMP_PATH.split("/"));
const extractDir = join(
	".tmp",
	"middlecache",
	"v1",
	"workers-ai-model-catalog",
);

// Remove existing models/ directory so stale data doesn't accumulate.
// Also remove the other catalog files so they are re-fetched fresh on the
// next build — their content changes whenever the pipeline re-graduates.
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
	`Extracted models.tar.gz to ${MODELS_DOT_TMP_DIR} (${modelCount} top-level entries)`,
);
