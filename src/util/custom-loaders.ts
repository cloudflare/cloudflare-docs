/* Custom loaders not defined within src/content.config.ts, are found in this file */

import type { LoaderContext, Loader } from "astro/loaders";
import { file } from "astro/loaders";

import { fileURLToPath } from "node:url";
import fs from "fs";
import { dirname, join } from "path";

import * as z from "zod";

/**
 * downloadToDotTempIfNotPresent is a convenience function for handling downloads to a .tmp directory
 * within the source repo
 *
 * @param url - source URL
 * @param dotTmpDestination - path relative to .tmp/ as destination for downloaded file
 */

export async function downloadToDotTempIfNotPresent(
	url: string,
	dotTmpDestination: string,
) {
	const source = z.string().url().parse(url);
	const relativeDestination = z
		.string()
		.refine((val) => !val.includes("\\"), {
			message: "dotTmpDestination paths should only contain forward slashes.",
		})
		.refine((val) => !val.startsWith("/"), {
			message: "dotTmpDestination must be a relative path.",
		})
		.parse(dotTmpDestination);

	const destinationParts = relativeDestination.split("/");
	const universalRelativeDestination = join(...destinationParts);

	const dotTmpPath = fileURLToPath(new URL("../../.tmp", import.meta.url));

	const destination = join(dotTmpPath, universalRelativeDestination);

	if (!fs.existsSync(destination)) {
		fs.mkdirSync(dirname(destination), { recursive: true });

		const response = await fetch(source);
		const content = await response.text();

		fs.writeFileSync(destination, content);
	}
}

/**
 * middlecache loader expects a middlecache path
 *
 * @param path - Data file path in the middlecache R2 bucket, example: "v1/products/maturity_compliance.json"
 * @param options - Additional options { url: override middlecache base url, parser: custom parser }
 */

type FileOptions = Parameters<typeof file>[1];
// extend the file loader options with an optional url to override the default middlecache base url
type MiddlecacheOptions = FileOptions & { url?: string };

export function middlecacheLoader(
	path: string,
	options: MiddlecacheOptions = {},
): Loader {
	return {
		name: "middlecache-loader",
		load: async (context: LoaderContext): Promise<void> => {
			let middlecacheBaseUrl = "https://middlecache.ced.cloudflare.com/";
			if (options.url) middlecacheBaseUrl = options.url;

			context.logger.debug(
				`Remote to local load from: ${middlecacheBaseUrl}${path}`,
			);
			await downloadToDotTempIfNotPresent(
				`${middlecacheBaseUrl}${path}`,
				`middlecache/${path}`,
			);

			const fileLoader = file(`.tmp/middlecache/${path}`, options as any);

			// re-use all the functionality of the built-in file loader
			return await fileLoader.load(context);
		},
	};
}
