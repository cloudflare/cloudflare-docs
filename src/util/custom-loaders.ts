/* Custom loaders not defined within src/content.config.ts, are found in this file */

import type { LoaderContext, Loader } from "astro/loaders";
import { file } from "astro/loaders";

import { fileURLToPath } from "node:url";
import fs from "fs";
import * as path from "path";

/**
 * middlecache loader expects a middlecache path, the name of content collection to be built with the
 *
 * @param path - data file path in the middlecache R2 bucket (required)
 *
 */

function middlecacheLoader(pathOnMiddlecache: string, options = {}): Loader {
	return {
		name: "middlecache-loader",
		load: async (context: LoaderContext): Promise<void> => {
			const MIDDLECACHE_URL = "https://middlecache.ced.cloudflare.com/";
			const tmpPath = fileURLToPath(new URL("../../.tmp", import.meta.url));

			const destination = `${tmpPath}/middlecache/${pathOnMiddlecache}`;

			context.logger.debug(`Remote to local load from: ${destination}`);

			if (!fs.existsSync(destination)) {
				fs.mkdirSync(path.dirname(destination), { recursive: true });

				context.logger.debug(`Download of ${pathOnMiddlecache} starting...`);

				const response = await fetch(MIDDLECACHE_URL + pathOnMiddlecache);
				const content = await response.text();

				fs.writeFileSync(destination, content);
				context.logger.debug(`Download of ${pathOnMiddlecache} completed.`);
			}

			const fileLoader = file(destination, options);
			// re-use all the functionality of the built-in file loader
			return await fileLoader.load(context);
		},
	};
}

export { middlecacheLoader as middlecache };
