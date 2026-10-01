#!/usr/bin/env tsx

import fs from "fs";
import { join } from "path";

import {
	downloadToDotTempIfNotPresent,
	extractTarGz,
} from "../src/util/custom-loaders";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const SKILLS_MIDDLECACHE_PATH = "v1/cloudflare-skills/skills.tar.gz";
const SKILLS_DOT_TMP_PATH = `middlecache/${SKILLS_MIDDLECACHE_PATH}`;
const MANIFEST_MIDDLECACHE_PATH = "v1/cloudflare-skills/skills-manifest.json";
const MANIFEST_DOT_TMP_PATH = `middlecache/${MANIFEST_MIDDLECACHE_PATH}`;
const SKILLS_DIR = "./skills";

// --soft: warn and continue on failure instead of exiting non-zero.
//         Used by the predev hook so a network failure doesn't block local development.
// --force: re-fetch even if skills/ already exists.
const soft = process.argv.includes("--soft");
const force = process.argv.includes("--force");

const fail = (message: string): never => {
	if (soft) {
		const hasExisting = fs.existsSync(SKILLS_DIR);
		console.warn(
			hasExisting
				? `Warning: ${message} — continuing with existing Cloudflare Skills`
				: `Warning: ${message} — skills/ does not exist, /.well-known/skills/ will not work`,
		);
		process.exit(0);
	}
	console.error(`Error: ${message}`);
	process.exit(1);
};

if (fs.existsSync(SKILLS_DIR) && !force) {
	console.log(
		"/skills directory already exists, skipping fetch. (run `pnpm tsx bin/fetch-skills.ts --force` to re-fetch)",
	);
	process.exit(0);
}

console.log("Fetching Cloudflare Skills from middlecache");

try {
	await Promise.all([
		downloadToDotTempIfNotPresent(
			`${MIDDLECACHE_BASE_URL}${SKILLS_MIDDLECACHE_PATH}`,
			SKILLS_DOT_TMP_PATH,
		),
		downloadToDotTempIfNotPresent(
			`${MIDDLECACHE_BASE_URL}${MANIFEST_MIDDLECACHE_PATH}`,
			MANIFEST_DOT_TMP_PATH,
		),
	]);
} catch (err) {
	fail(`fetch failed: ${err}`);
}

const tarballPath = join(".tmp", ...SKILLS_DOT_TMP_PATH.split("/"));

// Remove existing skills/ directory so stale Cloudflare Skills don't accumulate
fs.rmSync(SKILLS_DIR, { recursive: true, force: true });
fs.mkdirSync(SKILLS_DIR, { recursive: true });

// Extract the tarball from .tmp/ into ./skills/.
// The archive contains skills/<skill-name>/... so we strip the leading "skills/"
// component and extract into SKILLS_DIR.
try {
	await extractTarGz(tarballPath, SKILLS_DIR, { stripComponents: 1 });
} catch (err) {
	fail(`tar extraction failed: ${(err as Error).message}`);
}

const cloudflareSkills = fs
	.readdirSync(SKILLS_DIR)
	.filter((entry) => fs.statSync(`${SKILLS_DIR}/${entry}`).isDirectory());

console.log(
	`Fetched ${cloudflareSkills.length} Cloudflare Skills: ${cloudflareSkills.join(", ")}`,
);
