/**
 * Download and extract the Cloudflare API OpenAPI schema from middlecache.
 *
 * Used by `bin/fetch-openapi.ts`, which runs from the `prebuild`,
 * `prebuild:incremental`, and `predev` hooks (see package.json).
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
	downloadToDotTempIfNotPresent,
	extractTarGz,
	getDotTmpPath,
} from "./custom-loaders";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const OPENAPI_ARCHIVE_PATH = "v1/cloudflare-api-schemas/openapi.tar.gz";
const OPENAPI_JSON_PATH = "v1/cloudflare-api-schemas/openapi.json";

export const getOpenApiExtractDir = () =>
	join(getDotTmpPath(), "middlecache", "v1", "cloudflare-api-schemas");

export const getOpenApiJsonPath = () =>
	join(getOpenApiExtractDir(), "openapi.json");

/**
 * Download the schema into `.tmp` and return the path to `openapi.json`.
 *
 * Prefers the gzip-compressed archive (integrity-checkable via gzip CRC32),
 * falling back to the raw openapi.json. Downloads are validated (extract +
 * parse) and retried by `downloadToDotTempIfNotPresent`.
 */
export const fetchOpenApiSchema = async (): Promise<string> => {
	const extractDir = getOpenApiExtractDir();

	try {
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

	return getOpenApiJsonPath();
};
