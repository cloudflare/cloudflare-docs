/* Custom loaders not defined within src/content.config.ts, are found in this file */

import type { LoaderContext, Loader } from "astro/loaders";
import { file } from "astro/loaders";

import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import type { ReadableStream as WebReadableStream } from "node:stream/web";
import { writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import fs from "fs";
import { dirname, join } from "path";

import * as z from "zod";

const MAX_DOWNLOAD_ATTEMPTS = 3;

/**
 * Resolve the repo-root `.tmp/` directory used for downloaded artifacts.
 * Prefers the file-relative path (how Astro/tsx resolve it) and falls back to
 * the current working directory (needed under Vitest, where `import.meta.url`
 * is not a `file://` URL).
 */
export const getDotTmpPath = () => {
	try {
		return fileURLToPath(new URL("../../.tmp", import.meta.url));
	} catch {
		return join(process.cwd(), ".tmp");
	}
};

/**
 * downloadToDotTempIfNotPresent is a convenience function for handling downloads to a .tmp directory
 * within the source repo
 *
 * @param url - source URL
 * @param dotTmpDestination - path relative to .tmp/ as destination for downloaded file
 * @param options - { validate: optional async check run against the downloaded file; a rejected
 *   promise discards the file and triggers a re-download }
 */

export async function downloadToDotTempIfNotPresent(
	url: string,
	dotTmpDestination: string,
	options: { validate?: (filePath: string) => Promise<void> } = {},
) {
	const source = z.url().parse(url);
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

	const dotTmpPath = getDotTmpPath();

	const destination = join(dotTmpPath, universalRelativeDestination);

	for (let attempt = 1; attempt <= MAX_DOWNLOAD_ATTEMPTS; attempt++) {
		try {
			if (fs.existsSync(destination)) {
				await options.validate?.(destination);
				return;
			}

			fs.mkdirSync(dirname(destination), { recursive: true });

			// Write to a temp file first so a partial/failed download never
			// leaves a file that looks "present".
			const tmpDestination = `${destination}.tmp`;
			fs.rmSync(tmpDestination, { force: true });

			// Request the identity encoding so middlecache serves the bytes
			// as-is rather than on-the-fly brotli, which has no integrity check
			// and can silently decompress a truncated transfer into garbage.
			const response = await fetch(source, {
				headers: { "Accept-Encoding": "identity" },
			});

			if (!response.ok) {
				throw new Error(
					`Failed to download ${url}: HTTP ${response.status} ${response.statusText}`,
				);
			}

			// Stream file to destination to avoid storing in memory
			await writeFile(
				tmpDestination,
				Readable.fromWeb(response.body! as WebReadableStream),
			);

			const expectedLength = Number(response.headers.get("content-length"));
			if (Number.isFinite(expectedLength) && expectedLength > 0) {
				const actualLength = fs.statSync(tmpDestination).size;
				if (actualLength !== expectedLength) {
					throw new Error(
						`Downloaded file size mismatch for ${url}: expected ${expectedLength} bytes, got ${actualLength}`,
					);
				}
			}

			fs.renameSync(tmpDestination, destination);
			await options.validate?.(destination);
			return;
		} catch (err) {
			fs.rmSync(destination, { force: true });
			fs.rmSync(`${destination}.tmp`, { force: true });
			if (attempt === MAX_DOWNLOAD_ATTEMPTS) {
				throw err;
			}
			console.warn(
				`Retrying download of ${url} (attempt ${attempt}/${MAX_DOWNLOAD_ATTEMPTS}): ${(err as Error).message}`,
			);
		}
	}
}

/**
 * Extract a gzip-compressed tar archive into destinationDir.
 */
export async function extractTarGz(
	tarballPath: string,
	destinationDir: string,
): Promise<void> {
	fs.mkdirSync(destinationDir, { recursive: true });
	const tar = spawn("tar", ["-xzf", tarballPath, "-C", destinationDir], {
		stdio: "ignore",
	});
	const exitCode = await new Promise<number | null>((resolve) =>
		tar.on("close", resolve),
	);
	if (exitCode !== 0) {
		throw new Error(
			`tar extraction failed for ${tarballPath} (exit code ${exitCode})`,
		);
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
