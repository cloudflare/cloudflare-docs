#!/usr/bin/env tsx

import fs from "fs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, join } from "path";
import YAML from "yaml";

import {
	downloadToDotTempIfNotPresent,
	extractTarGz,
	getDotTmpPath,
} from "../src/util/custom-loaders";

const MIDDLECACHE_BASE_URL = `${(
	process.env.MIDDLECACHE_BASE_URL ?? "https://middlecache.ced.cloudflare.com"
).replace(/\/+$/, "")}/`;
const ARCHIVE_MIDDLECACHE_PATH = "v1/logpush-datasets/datasets.tar.gz";
const ARCHIVE_DOT_TMP_PATH = `middlecache/${ARCHIVE_MIDDLECACHE_PATH}`;
const MARKDOWN_PAGE_GLOB = "**/*.md";
const DOT_TMP_DIR = getDotTmpPath();
const REPO_ROOT = dirname(DOT_TMP_DIR);
const DATASETS_GIT_PATH = "src/content/docs/logs/logpush/logpush-job/datasets";
const DATASETS_DIR = join(REPO_ROOT, DATASETS_GIT_PATH);
const EXTRACTED_DIR = join(DOT_TMP_DIR, "logpush-datasets-extracted");
const SYNC_STATE_PATH = join(DOT_TMP_DIR, "logpush-datasets.state");
const PENDING_STATE_PATH = `${SYNC_STATE_PATH}.pending`;
const TRANSACTION_DIR = join(DOT_TMP_DIR, "logpush-datasets-transaction");
const STAGING_DIR = join(TRANSACTION_DIR, "staging");
const BACKUP_DIR = join(TRANSACTION_DIR, "backup");

const validatePage = (page: string) => {
	const content = fs.readFileSync(join(EXTRACTED_DIR, page), "utf8");
	const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(
		content,
	)?.[1];
	const metadata = frontmatter
		? (YAML.parse(frontmatter) as unknown)
		: undefined;
	if (
		!metadata ||
		typeof metadata !== "object" ||
		!("title" in metadata) ||
		typeof metadata.title !== "string" ||
		metadata.title.trim() === ""
	) {
		throw new Error(`Logpush dataset page has invalid frontmatter: ${page}`);
	}
};

const getMarkdownPages = (directory: string) =>
	fs.globSync(MARKDOWN_PAGE_GLOB, { cwd: directory });

const isManagedPagePath = (page: string) => page.split(/[\\/]/).length === 2;
const pageScope = (page: string) => page.split(/[\\/]/)[0];

const assertManagedPageLayout = (pages: string[]) => {
	const nestedPages = pages.filter((page) => !isManagedPagePath(page));
	if (nestedPages.length > 0) {
		throw new Error(
			`Logpush dataset pages must use <scope>/<page>.md paths: ${nestedPages.join(", ")}`,
		);
	}
	return pages;
};

const getManagedPages = (directory: string) =>
	assertManagedPageLayout(getMarkdownPages(directory));

const directoryDigest = (directory: string) => {
	const hash = createHash("sha256");
	const files = getManagedPages(directory)
		.filter((file) => fs.statSync(join(directory, file)).isFile())
		.sort();
	for (const file of files) {
		hash.update(file);
		hash.update("\0");
		hash.update(fs.readFileSync(join(directory, file)));
		hash.update("\0");
	}
	return hash.digest("hex");
};

const directoryMatchesState = (directory: string, statePath: string) =>
	fs.existsSync(statePath) &&
	directoryDigest(directory) === fs.readFileSync(statePath, "utf8");

const writeState = (statePath: string, digest: string) => {
	const temporaryPath = `${statePath}.${process.pid}.tmp`;
	fs.writeFileSync(temporaryPath, digest);
	fs.renameSync(temporaryPath, statePath);
};

const promotePendingState = () => {
	writeState(SYNC_STATE_PATH, fs.readFileSync(PENDING_STATE_PATH, "utf8"));
	fs.rmSync(PENDING_STATE_PATH, { force: true });
};

const ensureDatasetsUnmodified = () => {
	const status = spawnSync(
		"git",
		[
			"status",
			"--porcelain",
			"--untracked-files=all",
			"--",
			`:(glob)${DATASETS_GIT_PATH}/**/*.md`,
		],
		{ cwd: REPO_ROOT, encoding: "utf8" },
	);
	if (status.error) {
		throw status.error;
	}
	if (status.status !== 0) {
		throw new Error(`git status failed: ${status.stderr.trim()}`);
	}
	if (
		status.stdout.trim() &&
		!directoryMatchesState(DATASETS_DIR, SYNC_STATE_PATH)
	) {
		throw new Error(
			`Logpush dataset pages have uncommitted changes and do not match sync state ${SYNC_STATE_PATH}; commit or restore the managed pages before rebuilding`,
		);
	}
};

const validateArchive = async (filePath: string) => {
	const archive = spawnSync("tar", ["-tzf", filePath], { encoding: "utf8" });
	if (archive.error) {
		throw archive.error;
	}
	if (archive.status !== 0) {
		throw new Error(
			`cached Logpush dataset archive is invalid: ${archive.stderr.trim()}`,
		);
	}
};

const archivePath = join(DOT_TMP_DIR, ...ARCHIVE_DOT_TMP_PATH.split("/"));
const previousArchivePath = `${archivePath}.previous`;

// Package scripts invoke one sync at a time; concurrent processes are unsupported.
let archiveRefreshStarted = false;
try {
	if (!fs.existsSync(DATASETS_DIR) && fs.existsSync(BACKUP_DIR)) {
		fs.renameSync(BACKUP_DIR, DATASETS_DIR);
	}
	if (
		!fs.existsSync(DATASETS_DIR) ||
		!fs.statSync(DATASETS_DIR).isDirectory()
	) {
		throw new Error(
			`Logpush dataset directory does not exist: ${DATASETS_DIR}`,
		);
	}
	if (fs.existsSync(PENDING_STATE_PATH)) {
		if (directoryMatchesState(DATASETS_DIR, PENDING_STATE_PATH)) {
			promotePendingState();
		} else {
			if (fs.existsSync(BACKUP_DIR)) {
				ensureDatasetsUnmodified();
			}
			fs.rmSync(PENDING_STATE_PATH, { force: true });
		}
	}
	fs.rmSync(STAGING_DIR, { recursive: true, force: true });
	if (fs.existsSync(BACKUP_DIR)) {
		console.warn(
			`Warning: removing stale Logpush dataset backup: ${BACKUP_DIR}`,
		);
		fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
	}
	if (fs.existsSync(archivePath)) {
		try {
			await validateArchive(archivePath);
		} catch {
			fs.rmSync(archivePath, { force: true });
		}
	}
	if (fs.existsSync(archivePath)) {
		fs.rmSync(previousArchivePath, { force: true });
		fs.renameSync(archivePath, previousArchivePath);
	}

	archiveRefreshStarted = true;
	await downloadToDotTempIfNotPresent(
		`${MIDDLECACHE_BASE_URL}${ARCHIVE_MIDDLECACHE_PATH}`,
		ARCHIVE_DOT_TMP_PATH,
		{ validate: validateArchive },
	);
	console.log("Fetched Logpush dataset archive from middlecache");

	fs.rmSync(EXTRACTED_DIR, { recursive: true, force: true });
	await extractTarGz(archivePath, EXTRACTED_DIR);

	const destinationPages = getManagedPages(DATASETS_DIR);
	if (destinationPages.length === 0) {
		throw new Error("Logpush dataset directory contains no managed pages");
	}
	const destinationScopes = new Set(
		destinationPages.map((page) => dirname(page)),
	);
	const archivePages = getMarkdownPages(EXTRACTED_DIR);
	const skippedArchiveScopes = [
		...new Set(
			archivePages
				.filter(isManagedPagePath)
				.map(pageScope)
				.filter((scope) => !destinationScopes.has(scope)),
		),
	];
	if (skippedArchiveScopes.length > 0) {
		console.warn(
			`Warning: skipping Logpush dataset scopes not seeded in the docs: ${skippedArchiveScopes.join(", ")}`,
		);
	}
	// Validate layout drift within managed scopes, but ignore unrelated archive files.
	const pagesToCopy = assertManagedPageLayout(
		archivePages.filter((page) => destinationScopes.has(pageScope(page))),
	);
	for (const page of pagesToCopy) {
		validatePage(page);
	}
	const sourcePages = new Set(pagesToCopy);
	// Destination pages missing from the filtered archive are stale.
	const pagesToRemove = destinationPages.filter(
		(page) => !sourcePages.has(page),
	);
	const sourceScopes = new Set(pagesToCopy.map((page) => dirname(page)));
	const missingScopes = [...destinationScopes].filter(
		(scope) => !sourceScopes.has(scope),
	);

	if (missingScopes.length > 0) {
		throw new Error(
			`Logpush dataset archive is missing scopes: ${missingScopes.join(", ")}. If intentional, remove those scopes' checked-in generated pages in the same change`,
		);
	}
	const unsafeScopes = [...destinationScopes].filter((scope) => {
		const scopePageCount = destinationPages.filter(
			(page) => dirname(page) === scope,
		).length;
		const scopeRemovalCount = pagesToRemove.filter(
			(page) => dirname(page) === scope,
		).length;
		return scopeRemovalCount > scopePageCount * 0.25;
	});
	if (unsafeScopes.length > 0) {
		throw new Error(
			`Logpush dataset sync would remove more than 25% of pages in scopes: ${unsafeScopes.join(", ")}. If intentional, delete the affected checked-in generated pages first and commit them with this change`,
		);
	}

	fs.mkdirSync(TRANSACTION_DIR, { recursive: true });
	fs.cpSync(DATASETS_DIR, STAGING_DIR, { recursive: true });
	for (const page of pagesToCopy) {
		fs.copyFileSync(join(EXTRACTED_DIR, page), join(STAGING_DIR, page));
	}
	for (const page of pagesToRemove) {
		fs.rmSync(join(STAGING_DIR, page));
	}

	ensureDatasetsUnmodified();
	const stagingDigest = directoryDigest(STAGING_DIR);
	writeState(PENDING_STATE_PATH, stagingDigest);
	if (directoryDigest(DATASETS_DIR) === stagingDigest) {
		promotePendingState();
		fs.rmSync(STAGING_DIR, { recursive: true });
	} else {
		fs.renameSync(DATASETS_DIR, BACKUP_DIR);
		try {
			fs.renameSync(STAGING_DIR, DATASETS_DIR);
		} catch (err) {
			try {
				fs.renameSync(BACKUP_DIR, DATASETS_DIR);
			} catch {
				throw new Error(
					`Logpush dataset swap failed; original pages remain at ${BACKUP_DIR}`,
					{ cause: err },
				);
			}
			throw err;
		}
		promotePendingState();
		try {
			fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
		} catch (err) {
			console.warn(
				`Warning: failed to remove Logpush dataset backup: ${(err as Error).message}`,
			);
		}
	}
	console.log("Logpush dataset pages ready");
} catch (err) {
	if (archiveRefreshStarted) {
		try {
			fs.rmSync(archivePath, { force: true });
			if (fs.existsSync(previousArchivePath)) {
				fs.renameSync(previousArchivePath, archivePath);
			}
		} catch {
			// Preserve the original error.
		}
	}
	try {
		fs.rmSync(STAGING_DIR, { recursive: true, force: true });
	} catch {
		// Preserve the original error.
	}
	if (!fs.existsSync(DATASETS_DIR) && fs.existsSync(BACKUP_DIR)) {
		console.error(
			`Error: Logpush dataset replacement failed; original pages remain at ${BACKUP_DIR}`,
		);
		process.exit(1);
	}
	console.error(
		`Error: Logpush dataset fetch failed: ${(err as Error).message}`,
	);
	process.exit(1);
}
