import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as devalue from "devalue";
import fg from "fast-glob";
const { glob } = fg;
import { createHash } from "node:crypto";
import type { AstroConfig, AstroIntegrationLogger } from "astro";
import type { IncrementalBuildOptions } from "./index.ts";
import type { IncrementalBuildResult } from "./incremental.ts";
import { buildDependencyMapForPersist } from "./dep-map-persist.ts";

const DATA_STORE_FILE = "data-store.json";
const DEP_MAP_FILE = "dep-map.json";

// ---------------------------------------------------------------------------
// copyCleanPages
// ---------------------------------------------------------------------------

/**
 * Copy unchanged HTML pages from the previous dist into the current outDir.
 * Skips regenerated assets (_headers, __redirects, sitemaps, etc.) and dirty/deleted pages.
 */
const DEFAULT_NO_COPY_PATTERNS: (string | RegExp)[] = [
	"_headers",
	"__redirects",
	/^sitemap.*\.xml$/,
	/^robots\.txt$/,
	/^llms.*\.txt$/,
];

export async function copyCleanPages(opts: {
	previousDist: string;
	outDir: URL;
	result: IncrementalBuildResult;
	config: AstroConfig;
	logger: AstroIntegrationLogger;
	noCopyPatterns?: (string | RegExp)[];
}): Promise<void> {
	const { previousDist, outDir, result, config, logger } = opts;
	const root = fileURLToPath(config.root);
	const previousDistAbs = path.resolve(root, previousDist);
	const outDirPath = fileURLToPath(outDir);

	if (!fs.existsSync(previousDistAbs)) {
		logger.warn("previousDist does not exist — skipping copy.");
		return;
	}

	const noCopyPatterns = opts.noCopyPatterns ?? DEFAULT_NO_COPY_PATTERNS;

	let copiedCount = 0;
	let assetsCopiedCount = 0;
	let skippedCount = 0;

	await walkDir(previousDistAbs, async (absPath) => {
		const relPath = path.relative(previousDistAbs, absPath);

		const shouldSkip = noCopyPatterns.some((p) =>
			typeof p === "string" ? relPath.startsWith(p) : p.test(relPath),
		);
		if (shouldSkip) return;

		// Copy missing _astro/ assets from previous build (images, fonts, etc.)
		// The new Vite build only emits assets referenced by pages it rendered.
		// Copied (clean) pages still reference assets from the previous build.
		if (relPath.startsWith("_astro/")) {
			const destPath = path.join(outDirPath, relPath);
			if (!fs.existsSync(destPath)) {
				const destDir = path.dirname(destPath);
				fs.mkdirSync(destDir, { recursive: true });
				fs.copyFileSync(absPath, destPath);
				assetsCopiedCount++;
			}
			return;
		}

		if (!relPath.endsWith(".html")) return;

		const pathname = htmlFileToPathname(relPath);

		if (result.dirtyPathnames.has(pathname)) {
			skippedCount++;
			return;
		}

		if (result.cleanupPathnames.has(pathname)) {
			skippedCount++;
			return;
		}

		// Don't overwrite files the new build already wrote
		const destPath = path.join(outDirPath, relPath);
		if (fs.existsSync(destPath)) {
			return;
		}

		const destDir = path.dirname(destPath);
		fs.mkdirSync(destDir, { recursive: true });
		fs.copyFileSync(absPath, destPath);
		copiedCount++;
	});

	logger.info(
		`Copied ${copiedCount} clean pages and ${assetsCopiedCount} assets from previous build (skipped ${skippedCount} dirty/deleted).`,
	);
}

// ---------------------------------------------------------------------------
// persistBuildMetadata
// ---------------------------------------------------------------------------

/**
 * Persist metadata artifacts for the next incremental build:
 * - data-store.json (copy from cache dir)
 * - component-manifest.json (hashes of all src/ files)
 * - dep-map.json (if partialResolver was configured)
 */
export async function persistBuildMetadata(opts: {
	config: AstroConfig;
	options: IncrementalBuildOptions;
	logger: AstroIntegrationLogger;
	depMap?: IncrementalBuildResult["depMap"];
}): Promise<void> {
	const { config, options, logger } = opts;
	let { depMap } = opts;
	const root = fileURLToPath(config.root);
	const outDirPath = fileURLToPath(config.outDir);
	const srcDir = fileURLToPath(config.srcDir);

	const hashFn = (data: string) =>
		createHash("sha256").update(data).digest("hex").slice(0, 16);
	const manifest = await computeManifest(root, srcDir, options, hashFn);
	const manifestJson = JSON.stringify(manifest, null, 2);

	const currentDataStorePath = path.join(
		fileURLToPath(config.cacheDir),
		DATA_STORE_FILE,
	);
	if (!fs.existsSync(currentDataStorePath)) {
		logger.warn("No data store found to persist.");
		return;
	}

	// Build dep map if partialResolver is configured but no dep map was provided
	if (!depMap && options.partialResolver) {
		const currentDataStoreRaw = fs.readFileSync(currentDataStorePath, "utf-8");
		const currentDataStore = devalue.unflatten(
			JSON.parse(currentDataStoreRaw),
		) as Map<string, Map<string, any>>;

		depMap = await buildDependencyMapForPersist({
			root,
			currentDataStore,
			distMetaDir: path.join(path.dirname(outDirPath), "dist-meta"),
			partialResolver: options.partialResolver,
			pageCollections: options.pageCollections ?? ["docs"],
			partialCollections: options.partialCollections ?? ["partials"],
			logger,
		});
	}

	const depMapJson = depMap ? JSON.stringify(depMap) : null;

	// Write to dist-meta/ directories
	const distMetaDirs = new Set<string>();
	distMetaDirs.add(path.join(path.dirname(outDirPath), "dist-meta"));

	if (options.previousDist) {
		const previousDistAbs = path.resolve(root, options.previousDist);
		distMetaDirs.add(path.join(path.dirname(previousDistAbs), "dist-meta"));
	}

	for (const distMetaDir of distMetaDirs) {
		fs.mkdirSync(distMetaDir, { recursive: true });
		fs.copyFileSync(
			currentDataStorePath,
			path.join(distMetaDir, DATA_STORE_FILE),
		);
		fs.writeFileSync(
			path.join(distMetaDir, "component-manifest.json"),
			manifestJson,
		);
		if (depMapJson) {
			fs.writeFileSync(path.join(distMetaDir, DEP_MAP_FILE), depMapJson);
		}
		logger.debug(`Persisted metadata to ${distMetaDir}`);
	}
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function computeManifest(
	root: string,
	srcDir: string,
	options: IncrementalBuildOptions,
	hashFn: (data: string) => string,
): Promise<Record<string, string>> {
	const manifest: Record<string, string> = {};

	if (fs.existsSync(srcDir)) {
		const files = await glob("**/*", {
			cwd: srcDir,
			absolute: false,
			onlyFiles: true,
			ignore: ["**/node_modules/**", "**/.git/**"],
		});

		for (const file of files) {
			const absPath = path.join(srcDir, file);
			const relPath = path.relative(root, absPath);
			try {
				const contents = fs.readFileSync(absPath, "utf-8");
				manifest[relPath] = hashFn(contents);
			} catch {
				try {
					const buffer = fs.readFileSync(absPath);
					manifest[relPath] = hashFn(buffer.toString("base64"));
				} catch {
					// skip
				}
			}
		}
	}

	const globalPatterns = options.globalFiles ?? [
		"astro.config.*",
		"package.json",
	];
	for (const pattern of globalPatterns) {
		const files = await glob(pattern, { cwd: root, absolute: false });
		for (const file of files) {
			if (file in manifest) continue;
			const absPath = path.join(root, file);
			try {
				const contents = fs.readFileSync(absPath, "utf-8");
				manifest[file] = hashFn(contents);
			} catch {
				try {
					const buffer = fs.readFileSync(absPath);
					manifest[file] = hashFn(buffer.toString("base64"));
				} catch {
					// skip
				}
			}
		}
	}

	return manifest;
}

function htmlFileToPathname(relPath: string): string {
	const normalized = relPath.replace(/\\/g, "/");

	if (normalized === "index.html") return "/";
	if (normalized.endsWith("/index.html")) {
		return "/" + normalized.slice(0, -"/index.html".length);
	}
	if (normalized.endsWith(".html")) {
		return "/" + normalized.slice(0, -".html".length);
	}
	return "/" + normalized;
}

async function walkDir(
	dir: string,
	callback: (absPath: string) => Promise<void>,
): Promise<void> {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const absPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walkDir(absPath, callback);
		} else if (entry.isFile()) {
			await callback(absPath);
		}
	}
}
