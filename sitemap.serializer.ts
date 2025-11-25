import { spawn } from "node:child_process";
import * as readline from "node:readline";
import type { SitemapItem } from "@astrojs/sitemap";
import { existsSync } from "fs";
import { green, blue, dim } from "kleur/colors";

/**
 * Meant to mimic how Astro prints duration during logging
 * (i.e. build/util.ts from astro/core).
 */
export function readableMsDuration(duration: number) {
	return duration < 1000
		? `${Math.round(duration)}ms`
		: `${(duration / 1000).toFixed(2)}s`;
}

/**
 * A helper function that uses git shell commands to get last modified dates.
 * Note: it is important that this is only called once with all relevant paths as opposed to calling this separately for individual paths.
 */
async function getLastmodViaGitShell(...dirs: string[]) {
	const gitArgs = [
		"log",
		"--pretty=format:DATE: %cI",
		"--diff-filter=AMR",
		"--name-only",
		...dirs,
	];

	return new Promise<Map<string, Date>>((resolve, reject) => {
		const git = spawn("git", gitArgs, { cwd: process.cwd() });
		// Use readline to process output to reduce memory usage since output will be large.
		const rl = readline.createInterface({
			input: git.stdout!,
			crlfDelay: Infinity,
		});

		const lastmodMetadata = new Map<string, Date>();
		let currentDate: Date;

		rl.on("line", (rawLine) => {
			const line = rawLine.trim();
			if (!line) return;
			if (line.startsWith("DATE: ")) {
				// Cut off the 'DATE: ' prefix and use Date class to handle time zones
				currentDate = new Date(line.slice(6));
				return;
			}
			const file = line;
			if (!lastmodMetadata.has(file) && currentDate) {
				lastmodMetadata.set(file, currentDate);
			}
		});

		let stderr = "";
		git.stderr?.on("data", (chunk) => (stderr += chunk.toString()));
		git.on("error", reject);

		git.on("close", (code) => {
			rl.close();
			if (code !== 0)
				return reject(new Error(`git exited with code ${code}: ${stderr}`));
			resolve(lastmodMetadata);
		});
	});
}

/**
 * Attempt to find corresponding source file path for a sitemap item.
 * This only looks for Starlight files in `src/content/docs`.
 * @todo Leverage Astro's IntegrationResolvedRoute.entrypoint to account for pages in `src/pages`.
 * @returns Relative file path or null if not found
 */
function getSourceFile(item: SitemapItem) {
	const url = new URL(item.url);
	// Remove trailing slash
	const pathname = url.pathname.replace(/\/$/, "");

	// Try different file extensions and paths
	const possiblePaths = [
		`src/content/docs${pathname}.md`,
		`src/content/docs${pathname}.mdx`,
		`src/content/docs${pathname}/index.md`,
		`src/content/docs${pathname}/index.mdx`,
	];

	for (const path of possiblePaths) {
		if (existsSync(path)) {
			return path;
		}
	}

	return null;
}

export function createSitemapLastmodSerializer() {
	let lastModMetadata: Map<string, Date> | undefined = undefined;
	const currentDateString = new Date().toISOString();
	return async (item: SitemapItem) => {
		const filePath = getSourceFile(item);
		// Only calculate metadata once
		if (lastModMetadata === undefined) {
			const startTime = performance.now();
			lastModMetadata = await getLastmodViaGitShell(
				"src/content/docs",
				"src/pages/*.astro",
			);
			const endTime = performance.now();

			// Mimic the Astro logger output
			console.log(
				dim(new Date().toLocaleTimeString("en-US", { hour12: false })),
				blue("[@cloudflare/lastmod-serializer]"),
				green(
					`✓ Lastmod metadata calculated in ${readableMsDuration(endTime - startTime)}.`,
				),
			);
		}
		if (filePath && lastModMetadata.has(filePath)) {
			item.lastmod = lastModMetadata.get(filePath)!.toISOString();
		} else {
			item.lastmod = currentDateString;
		}
		return item;
	};
}
