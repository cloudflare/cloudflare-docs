#!/usr/bin/env tsx

import fs from "fs";
import { randomUUID } from "crypto";
import { join } from "path";

import {
	downloadToDotTempIfNotPresent,
	extractTarGz,
} from "../src/util/custom-loaders";

const MIDDLECACHE_BASE_URL =
	process.env.MIDDLECACHE_BASE_URL ?? "https://middlecache.ced.cloudflare.com/";
const ARCHIVE_MIDDLECACHE_PATH = "v1/logpush-datasets/datasets.tar.gz";
const ARCHIVE_DOT_TMP_PATH = `middlecache/${ARCHIVE_MIDDLECACHE_PATH}`;
const DATASETS_DIR =
	process.env.LOGPUSH_DATASETS_DIR ??
	"src/content/docs/logs/logpush/logpush-job/datasets";
const EXTRACTED_DIR = join(".tmp", "logpush-datasets");

// Builds soft-fail so middlecache availability cannot block unrelated docs changes.
const soft = process.argv.includes("--soft");
const force = process.argv.includes("--force");

const fail = (message: string): never => {
	if (soft) {
		console.warn(
			`Warning: ${message} - continuing with checked-in Logpush dataset pages`,
		);
		process.exit(0);
	}
	console.error(`Error: ${message}`);
	process.exit(1);
};

const archivePath = join(".tmp", ...ARCHIVE_DOT_TMP_PATH.split("/"));
if (!fs.existsSync(DATASETS_DIR) || !fs.statSync(DATASETS_DIR).isDirectory()) {
	fail(`Logpush dataset directory does not exist: ${DATASETS_DIR}`);
}
if (force) {
	fs.rmSync(archivePath, { force: true });
}

console.log("Fetching Logpush dataset pages from middlecache");

let mutationStarted = false;
try {
	await downloadToDotTempIfNotPresent(
		`${MIDDLECACHE_BASE_URL}${ARCHIVE_MIDDLECACHE_PATH}`,
		ARCHIVE_DOT_TMP_PATH,
	);

	fs.rmSync(EXTRACTED_DIR, { recursive: true, force: true });
	await extractTarGz(archivePath, EXTRACTED_DIR);

	const preparedScopes: Array<{
		destination: string;
		pageNames: Set<string>;
		stagedPages: Array<{ source: string; destination: string }>;
	}> = [];
	const stagedPaths: string[] = [];
	try {
		for (const scope of fs.readdirSync(EXTRACTED_DIR, {
			withFileTypes: true,
		})) {
			if (!scope.isDirectory()) continue;

			const destination = join(DATASETS_DIR, scope.name);
			if (
				!fs.existsSync(destination) ||
				!fs.statSync(destination).isDirectory()
			) {
				console.log(`Skipping ${scope.name} scope: no destination directory`);
				continue;
			}

			const source = join(EXTRACTED_DIR, scope.name);
			for (const page of fs.readdirSync(destination)) {
				if (page.startsWith(".logpush-") && page.endsWith(".tmp")) {
					fs.rmSync(join(destination, page), { force: true });
				}
			}
			const pages = fs
				.readdirSync(source, { withFileTypes: true })
				.filter((page) => page.isFile() && page.name.endsWith(".md"));
			if (pages.length === 0) {
				throw new Error(`Logpush dataset scope is empty: ${scope.name}`);
			}

			const stagedPages = pages.map((page) => {
				const stagedPath = join(destination, `.logpush-${randomUUID()}.tmp`);
				stagedPaths.push(stagedPath);
				fs.copyFileSync(join(source, page.name), stagedPath);
				return {
					source: stagedPath,
					destination: join(destination, page.name),
				};
			});
			preparedScopes.push({
				destination,
				pageNames: new Set(pages.map((page) => page.name)),
				stagedPages,
			});
		}

		if (preparedScopes.length === 0) {
			throw new Error(
				"No Logpush dataset scopes matched destination directories",
			);
		}

		mutationStarted = true;
		for (const scope of preparedScopes) {
			for (const page of scope.stagedPages) {
				fs.renameSync(page.source, page.destination);
			}
		}
		for (const scope of preparedScopes) {
			for (const page of fs.readdirSync(scope.destination)) {
				if (page.endsWith(".md") && !scope.pageNames.has(page)) {
					fs.rmSync(join(scope.destination, page));
				}
			}
		}
	} finally {
		for (const stagedPath of stagedPaths) {
			fs.rmSync(stagedPath, { force: true });
		}
	}
	console.log("Logpush dataset pages ready");
} catch (err) {
	if (mutationStarted) {
		console.error(
			`Error: Logpush dataset replacement failed: ${(err as Error).message}`,
		);
		process.exit(1);
	}
	fail(`Logpush dataset fetch failed: ${(err as Error).message}`);
}
