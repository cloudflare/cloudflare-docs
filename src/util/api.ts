/**
 * OpenAPI schema loader for the APIRequest component.
 *
 * Downloads the Cloudflare API OpenAPI document from middlecache, preferring
 * the gzip-compressed tar (openapi.tar.gz) and falling back to the raw
 * openapi.json. Files are extracted/cached under `.tmp/middlecache/`
 * (gitignored) via `downloadToDotTempIfNotPresent`, so the fetch only happens
 * once per clean checkout. Downloads are validated (extract + parse) so a
 * corrupt transfer is retried rather than silently crashing the build.
 * Dereferenced result is memoized at module scope so the deref runs once per
 * build, not per component instance.
 */
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";
import {
	downloadToDotTempIfNotPresent,
	extractTarGz,
	getDotTmpPath,
} from "./custom-loaders";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const API_SCHEMAS_ARCHIVE_PATH = "v1/cloudflare-api-schemas/openapi.tar.gz";
const API_SCHEMAS_PATH = "v1/cloudflare-api-schemas/openapi.json";

let schema: OpenAPI.Document | undefined;

export const getSchema = async () => {
	if (!schema) {
		const dotTmpPath = getDotTmpPath();
		const extractDir = join(
			dotTmpPath,
			"middlecache",
			"v1",
			"cloudflare-api-schemas",
		);

		try {
			await downloadToDotTempIfNotPresent(
				`${MIDDLECACHE_BASE_URL}${API_SCHEMAS_ARCHIVE_PATH}`,
				`middlecache/${API_SCHEMAS_ARCHIVE_PATH}`,
				{
					validate: async (archivePath) => {
						// Extract + parse as the integrity check: a corrupt or truncated
						// download fails here (gzip CRC32 + JSON) and is re-downloaded
						// instead of producing garbage that crashes JSON.parse later.
						await extractTarGz(archivePath, extractDir);
						const raw = await readFile(
							join(extractDir, "openapi.json"),
							"utf8",
						);
						void JSON.parse(raw);
					},
				},
			);
		} catch (err) {
			// Fall back to the raw openapi.json if the archive is not available
			// yet (e.g. the middlecache pipeline has not shipped it).
			console.warn(
				`Failed to fetch OpenAPI archive, falling back to raw openapi.json: ${(err as Error).message}`,
			);
			await downloadToDotTempIfNotPresent(
				`${MIDDLECACHE_BASE_URL}${API_SCHEMAS_PATH}`,
				`middlecache/${API_SCHEMAS_PATH}`,
				{
					validate: async (filePath) => {
						const raw = await readFile(filePath, "utf8");
						void JSON.parse(raw);
					},
				},
			);
		}

		const raw = await readFile(join(extractDir, "openapi.json"), "utf8");

		schema = await SwaggerParser.dereference(JSON.parse(raw));
	}

	return schema;
};
