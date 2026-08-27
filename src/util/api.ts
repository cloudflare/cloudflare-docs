/**
 * OpenAPI schema loader for the APIRequest component.
 *
 * Fetches the Cloudflare API OpenAPI document from middlecache and dereferences
 * all `$ref`s. The file is cached to `.tmp/middlecache/` (gitignored) via
 * `downloadToDotTempIfNotPresent`, so the fetch only happens once per clean
 * checkout. Dereferenced result is memoized at module scope so the deref runs
 * once per build, not per component instance.
 */
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";
import { downloadToDotTempIfNotPresent } from "./custom-loaders";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const API_SCHEMAS_PATH = "v1/cloudflare-api-schemas/openapi.json";

let schema: OpenAPI.Document | undefined;

export const getSchema = async () => {
	if (!schema) {
		await downloadToDotTempIfNotPresent(
			`${MIDDLECACHE_BASE_URL}${API_SCHEMAS_PATH}`,
			`middlecache/${API_SCHEMAS_PATH}`,
		);
		const dotTmpPath = fileURLToPath(new URL("../../.tmp", import.meta.url));
		const filePath = join(dotTmpPath, "middlecache", API_SCHEMAS_PATH);
		const raw = await readFile(filePath, "utf8");

		schema = await SwaggerParser.dereference(JSON.parse(raw));
	}

	return schema;
};
