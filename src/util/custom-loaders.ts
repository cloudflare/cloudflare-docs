/* Custom loaders not defined within src/content.config.ts, are found in this file */

import type { LoaderContext, Loader } from "astro/loaders";
import { file } from "astro/loaders";

import { fileURLToPath } from "node:url";
import fs from "fs";
import { dirname } from "path";

/**
 * middlecache loader expects a middlecache path
 *
 * @param path - Data file path in the middlecache R2 bucket, example: "v1/products/maturity_compliance.json"
 * @param options - Additional options { url: override middlecache base url, parser: custom parser }
 */

type MiddlecacheOptions = {
	url?: string;
	parser?: (
		text: string,
	) =>
		| Record<string, Record<string, unknown>>
		| Array<Record<string, unknown>>
		| Record<string, string | null>;
};

export function middlecacheLoader(
	path: string,
	options: MiddlecacheOptions = {},
): Loader {
	return {
		name: "middlecache-loader",
		load: async (context: LoaderContext): Promise<void> => {
			let middlecacheBaseUrl = "https://middlecache.ced.cloudflare.com/";
			if (options.url) middlecacheBaseUrl = options.url;

			const tmpPath = fileURLToPath(new URL("../../.tmp", import.meta.url));

			const destination = `${tmpPath}/middlecache/${path}`;

			context.logger.debug(`Remote to local load from: ${destination}`);

			if (!fs.existsSync(destination)) {
				fs.mkdirSync(dirname(destination), { recursive: true });

				context.logger.debug(`Download of ${path} starting...`);

				const response = await fetch(middlecacheBaseUrl + path);
				const content = await response.text();

				fs.writeFileSync(destination, content);
				context.logger.debug(`Download of ${path} completed.`);
			}

			const fileLoader = file(destination, options as any);
			// re-use all the functionality of the built-in file loader
			return await fileLoader.load(context);
		},
	};
}
