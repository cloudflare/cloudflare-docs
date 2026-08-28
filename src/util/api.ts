/**
 * OpenAPI schema loader for the APIRequest component.
 *
 * The schema is fetched and extracted by `bin/fetch-openapi.ts`, which runs
 * from the `prebuild`/`predev` hooks (see package.json), so the prerender only
 * reads the local copy at `.tmp/middlecache/v1/cloudflare-api-schemas/`.
 * Dereferenced result is memoized so the deref runs once per build, not per
 * component instance.
 */
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";
import { getDotTmpPath } from "./custom-loaders";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const OPENAPI_JSON_PATH = join(
	getDotTmpPath(),
	"middlecache",
	"v1",
	"cloudflare-api-schemas",
	"openapi.json",
);

let schemaPromise: Promise<OpenAPI.Document> | undefined;

const loadSchema = async (): Promise<OpenAPI.Document> => {
	let raw: string;
	try {
		raw = await readFile(OPENAPI_JSON_PATH, "utf8");
	} catch (err) {
		throw new Error(
			`OpenAPI schema not found at ${OPENAPI_JSON_PATH} — run \`pnpm run build\` (or \`pnpm prebuild\`) first. ${(err as Error).message}`,
		);
	}
	return await SwaggerParser.dereference(JSON.parse(raw));
};

/**
 * Load (and cache) the Cloudflare API OpenAPI document. Prerender renders
 * pages in parallel, so this is single-flighted to avoid duplicate derefs.
 */
export const getSchema = (): Promise<OpenAPI.Document> => {
	if (!schemaPromise) {
		schemaPromise = loadSchema();
	}
	return schemaPromise;
};
