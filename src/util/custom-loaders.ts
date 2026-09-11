/* Custom loaders not defined within src/content.config.ts, are found in this file */

import type { LoaderContext, Loader } from "astro/loaders";
import { file } from "astro/loaders";

import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import type { ReadableStream as WebReadableStream } from "node:stream/web";
import { writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import fs from "fs";
import { dirname, join } from "path";

import * as z from "zod";

const MAX_DOWNLOAD_ATTEMPTS = 3;

// Serialize concurrent downloads of the same destination. Prerender renders
// pages in parallel, so multiple callers can hit the same middlecache file at
// once; without this they race on the temp-file write/rename and a retry's
// cleanup can delete a sibling call's freshly-written output.
const inFlightDownloads = new Map<string, Promise<void>>();

/**
 * Resolve the repo-root `.tmp/` directory used for downloaded artifacts.
 *
 * The tsx prebuild scripts and the bundled prerender resolve `import.meta.url`
 * to different locations (source files vs `dist/.prerender/chunks/`), so the
 * repo root is found by walking up from the module location until a
 * `package.json` is found. Falls back to the current working directory for
 * runtimes where `import.meta.url` is not a `file://` URL (e.g. Vitest).
 */
export const getDotTmpPath = () => {
	try {
		const moduleDir = dirname(fileURLToPath(import.meta.url));
		const root = findRepoRoot(moduleDir);
		if (root) {
			return join(root, ".tmp");
		}
	} catch {
		// not a file:// URL (e.g. under Vitest)
	}
	return join(process.cwd(), ".tmp");
};

const findRepoRoot = (startDir: string): string | undefined => {
	let dir = startDir;
	for (;;) {
		if (fs.existsSync(join(dir, "package.json"))) {
			return dir;
		}
		const parent = dirname(dir);
		if (parent === dir) {
			return undefined;
		}
		dir = parent;
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

	const destination = join(getDotTmpPath(), universalRelativeDestination);

	const inFlight = inFlightDownloads.get(destination);
	if (inFlight) {
		return inFlight;
	}

	const promise = downloadWithRetry(source, url, destination, options.validate);
	inFlightDownloads.set(destination, promise);
	try {
		await promise;
	} finally {
		inFlightDownloads.delete(destination);
	}
}

const downloadWithRetry = async (
	source: string,
	url: string,
	destination: string,
	validate: ((filePath: string) => Promise<void>) | undefined,
) => {
	for (let attempt = 1; attempt <= MAX_DOWNLOAD_ATTEMPTS; attempt++) {
		try {
			if (fs.existsSync(destination)) {
				await validate?.(destination);
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

			if (!response.body) {
				throw new Error(`Missing response body for ${url}`);
			}

			// Stream file to destination to avoid storing in memory
			await writeFile(
				tmpDestination,
				Readable.fromWeb(response.body as WebReadableStream),
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
			await validate?.(destination);
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
};

/**
 * Extract a gzip-compressed tar archive into destinationDir.
 *
 * Member paths are validated before extraction: entries containing `..`
 * segments or leading `/` are rejected (zip-slip) so a network-downloaded
 * archive cannot write outside destinationDir. Extraction failures reject
 * with captured stderr instead of hanging.
 *
 * @param options.stripComponents - strip the given number of leading path
 *   components from each entry before extracting (matches the skills archive,
 *   which contains a top-level `skills/` directory).
 */
export async function extractTarGz(
	tarballPath: string,
	destinationDir: string,
	options: { stripComponents?: number } = {},
): Promise<void> {
	// Refuse archives whose members could escape destinationDir.
	const list = spawnSync("tar", ["-tzf", tarballPath], { encoding: "utf8" });
	if (list.status !== 0 || list.error) {
		throw new Error(
			`tar extraction failed for ${tarballPath}: not a valid archive${
				list.stderr ? `: ${list.stderr.trim()}` : ""
			}`,
		);
	}
	for (const member of list.stdout.split("\n")) {
		const name = member.trimEnd();
		if (!name) {
			continue;
		}
		if (name.startsWith("/") || name.split("/").includes("..")) {
			throw new Error(
				`tar extraction failed for ${tarballPath}: refusing unsafe member path "${name}"`,
			);
		}
	}

	fs.mkdirSync(destinationDir, { recursive: true });

	const args = ["-xz", "-C", destinationDir];
	if (options.stripComponents && options.stripComponents > 0) {
		args.push(`--strip-components=${options.stripComponents}`);
	}
	args.push("-f", tarballPath);

	const tar = spawn("tar", args, { stdio: ["ignore", "ignore", "pipe"] });
	const stderr: Buffer[] = [];
	tar.stderr?.on("data", (chunk: Buffer) => stderr.push(chunk));
	const exitCode = await new Promise<number | null>((resolve, reject) => {
		tar.on("error", reject);
		tar.on("close", resolve);
	});
	if (exitCode !== 0) {
		throw new Error(
			`tar extraction failed for ${tarballPath} (exit code ${exitCode})${
				stderr.length
					? `: ${Buffer.concat(stderr).toString("utf8").trim()}`
					: ""
			}`,
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
