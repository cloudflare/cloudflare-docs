#!/usr/bin/env tsx

import {
	fetchOpenApiSchema,
	getEffectiveSchemaId,
	getSchemaMode,
	readLock,
} from "../src/util/openapi-schema";

// --soft: warn and continue on failure instead of exiting non-zero.
//         Used by the predev hook so a network failure doesn't block local development.
const soft = process.argv.includes("--soft");

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

// The archive is cached in .tmp and verified on every run, so re-invoking this
// script never re-downloads unless the cache is missing or corrupted.
try {
	const mode =
		getSchemaMode() === "latest"
			? "OPENAPI_SCHEMA=latest"
			: `pinned ${(await readLock()).sha}`;

	console.log(
		`Fetching Cloudflare API OpenAPI schema from middlecache (${mode})`,
	);
	await fetchOpenApiSchema();
	console.log(`OpenAPI schema ready (${await getEffectiveSchemaId()})`);
} catch (err) {
	fail(`fetch failed: ${err}`);
}
