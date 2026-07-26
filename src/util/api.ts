/**
 * OpenAPI schema loader for the APIRequest component.
 *
 * CF source: cloudflare-docs/src/util/api.ts — 1:1 port.
 *
 * Fetches the Cloudflare API OpenAPI document from the gh-code worker at a
 * PINNED commit (same reproducibility model as cf/GitHubCode.astro) and
 * dereferences all `$ref`s. Memoized at module scope so the fetch + deref run
 * once per build, not per component instance.
 *
 * Reproducibility (migration WS9): the COMMIT below MUST match upstream's pin
 * for byte-parity. Bumping it is a manual step — keep it in lockstep with
 * cloudflare-docs/src/util/api.ts.
 */
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";

const COMMIT = "d3a1cc5218498a0c0be061d7fd925d4e8c7f9e3b";
let schema: OpenAPI.Document | undefined;

export const getSchema = async () => {
	if (!schema) {
		const response = await fetch(
			`https://gh-code.developers.cloudflare.com/cloudflare/api-schemas/${COMMIT}/openapi.json`,
		);
		const obj = await response.json();

		schema = await SwaggerParser.dereference(obj);
	}

	return schema;
};
