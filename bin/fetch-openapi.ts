#!/usr/bin/env tsx

import fs from "fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
	downloadToDotTempIfNotPresent,
	extractTarGz,
	getDotTmpPath,
} from "../src/util/custom-loaders";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const OPENAPI_ARCHIVE_PATH = "v1/cloudflare-api-schemas/openapi.tar.gz";
const OPENAPI_JSON_PATH = "v1/cloudflare-api-schemas/openapi.json";

// --soft: warn and continue on failure instead of exiting non-zero.
//         Used by the predev hook so a network failure doesn't block local development.
// --force: re-fetch even if the schema already exists.
const soft = process.argv.includes("--soft");
const force = process.argv.includes("--force");

const fail = (message: string): never => {
	if (soft) {
		console.warn(
			`Warning: ${message} — API endpoint pages will not work without the schema`,
		);
		process.exit(0);
	}
	console.error(`Error: ${message}`);
	process.exit(1);
};

const extractDir = join(
	getDotTmpPath(),
	"middlecache",
	"v1",
	"cloudflare-api-schemas",
);
const openapiFile = join(extractDir, "openapi.json");

if (fs.existsSync(openapiFile) && !force) {
	console.log(
		"OpenAPI schema already exists, skipping fetch. (run `pnpm tsx bin/fetch-openapi.ts --force` to re-fetch)",
	);
	process.exit(0);
}

console.log("Fetching Cloudflare API OpenAPI schema from middlecache");

try {
	try {
		// Prefer the gzip-compressed archive (integrity-checkable via gzip
		// CRC32), falling back to the raw openapi.json.
		await downloadToDotTempIfNotPresent(
			`${MIDDLECACHE_BASE_URL}${OPENAPI_ARCHIVE_PATH}`,
			`middlecache/${OPENAPI_ARCHIVE_PATH}`,
			{
				validate: async (archivePath) => {
					// Extract + parse as the integrity check: a corrupt or truncated
					// download fails here (gzip CRC32 + JSON) and is re-downloaded.
					await extractTarGz(archivePath, extractDir);
					const raw = await readFile(join(extractDir, "openapi.json"), "utf8");
					void JSON.parse(raw);
				},
			},
		);
	} catch (err) {
		console.warn(
			`Failed to fetch OpenAPI archive, falling back to raw openapi.json: ${(err as Error).message}`,
		);
		await downloadToDotTempIfNotPresent(
			`${MIDDLECACHE_BASE_URL}${OPENAPI_JSON_PATH}`,
			`middlecache/${OPENAPI_JSON_PATH}`,
			{
				validate: async (filePath) => {
					const raw = await readFile(filePath, "utf8");
					void JSON.parse(raw);
				},
			},
		);
	}
} catch (err) {
	fail(`fetch failed: ${err}`);
}

console.log("OpenAPI schema ready");
