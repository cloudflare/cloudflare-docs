/**
 * OpenAPI schema loader for the APIRequest component.
 *
 * The schema is fetched by `bin/fetch-openapi.ts` from the `prebuild` and
 * `prebuild:incremental` hooks (see package.json). `getSchema` reads the local
 * copy and fails loudly if it is missing, so a build invoked without the
 * pre-step is caught early instead of silently downloading mid-render. The
 * dereferenced result is memoized so the deref runs once per build, not per
 * component instance.
 */
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";
import { readFile } from "node:fs/promises";
import { getOpenApiJsonPath } from "./openapi-schema";

let schemaPromise: Promise<OpenAPI.Document> | undefined;

const loadSchema = async (): Promise<OpenAPI.Document> => {
	const openapiFile = getOpenApiJsonPath();

	let raw: string;
	try {
		raw = await readFile(openapiFile, "utf8");
	} catch (cause) {
		throw new Error(
			`OpenAPI schema not found at ${openapiFile}. Run \`pnpm run build\` (or \`pnpm run build:incremental\`) so the prebuild hook fetches it first.`,
			{ cause },
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
