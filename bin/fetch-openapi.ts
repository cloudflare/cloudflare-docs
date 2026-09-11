#!/usr/bin/env tsx

import fs from "fs";

import {
	fetchOpenApiSchema,
	getOpenApiJsonPath,
} from "../src/util/openapi-schema";

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

const openapiFile = getOpenApiJsonPath();

if (fs.existsSync(openapiFile) && !force) {
	console.log(
		"OpenAPI schema already exists, skipping fetch. (run `pnpm tsx bin/fetch-openapi.ts --force` to re-fetch)",
	);
	process.exit(0);
}

console.log("Fetching Cloudflare API OpenAPI schema from middlecache");

try {
	await fetchOpenApiSchema();
} catch (err) {
	fail(`fetch failed: ${err}`);
}

console.log("OpenAPI schema ready");
