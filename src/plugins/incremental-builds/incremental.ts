import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as devalue from "devalue";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
interface MdxJsxNode {
	name: string | null;
	attributes: Array<{
		type: string;
		name: string;
		value: unknown;
	}>;
}
import { mdxjs } from "micromark-extension-mdxjs";
import fg from "fast-glob";
const { glob } = fg;
import { visit } from "unist-util-visit";
import { createHash } from "node:crypto";
import type { AstroConfig, AstroIntegrationLogger } from "astro";
import type { IncrementalBuildOptions } from "./index.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface IncrementalBuildResult {
	/** Pathnames that need to be rebuilt. */
	dirtyPathnames: Set<string>;
	/** Pathnames that were deleted and should NOT be copied from previous dist. */
	cleanupPathnames: Set<string>;
	/** Dependency map (if partialResolver was configured). */
	depMap?: DepMap | null;
}

/** Minimal shape of an entry in the Astro data store. */
interface DataEntry {
	id?: string;
	digest?: string;
	filePath?: string;
	[key: string]: unknown;
}

interface ComponentManifest {
	[relativePath: string]: string; // hash
}

interface DepMap {
	version?: number;
	partialToPages: Record<string, string[]>;
	partialToPartials: Record<string, string[]>;
	scannedDigests: Record<string, string>;
}

const DATA_STORE_FILE = "data-store.json";
const DEP_MAP_FILE = "dep-map.json";
const DEP_MAP_VERSION = 2;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Determine which pathnames need rebuilding by comparing the current data
 * store against the previous build's data store.
 *
 * Returns `null` when a full rebuild is required.
 */
export async function computeDirtyPathnames(opts: {
	config: AstroConfig;
	options: IncrementalBuildOptions;
	logger: AstroIntegrationLogger;
}): Promise<IncrementalBuildResult | null> {
	const { config, options, logger } = opts;
	const root = fileURLToPath(config.root);

	const pageCollections = options.pageCollections ?? ["docs"];
	const partialCollections = options.partialCollections ?? ["partials"];
	const ignoredCollections = new Set(options.ignoredCollections ?? []);
	const entryIdToPathname =
		options.entryIdToPathname ?? defaultEntryIdToPathname;

	// Resolve dist-meta/ sibling of previousDist
	const previousDistAbs = path.resolve(root, options.previousDist);
	const distMetaDir = path.join(path.dirname(previousDistAbs), "dist-meta");

	if (!fs.existsSync(distMetaDir)) {
		logger.info("No dist-meta/ found — full rebuild.");
		return null;
	}

	const prevDataStorePath = path.join(distMetaDir, DATA_STORE_FILE);
	const prevManifestPath = path.join(distMetaDir, "component-manifest.json");

	if (!fs.existsSync(prevDataStorePath) || !fs.existsSync(prevManifestPath)) {
		logger.info("Missing metadata files — full rebuild.");
		return null;
	}

	try {
		const hashFn = (data: string) =>
			createHash("sha256").update(data).digest("hex").slice(0, 16);

		// 1. Load previous state
		const prevDataStoreRaw = fs.readFileSync(prevDataStorePath, "utf-8");
		const prevDataStore: Map<
			string,
			Map<string, DataEntry>
		> = devalue.unflatten(JSON.parse(prevDataStoreRaw));
		const prevManifest: ComponentManifest = JSON.parse(
			fs.readFileSync(prevManifestPath, "utf-8"),
		);

		// 2. Load current data store
		const currentDataStorePath = path.join(
			fileURLToPath(config.cacheDir),
			DATA_STORE_FILE,
		);
		if (!fs.existsSync(currentDataStorePath)) {
			logger.info("No current data store — full rebuild.");
			return null;
		}
		const currentDataStoreRaw = fs.readFileSync(currentDataStorePath, "utf-8");
		const currentDataStore: Map<
			string,
			Map<string, DataEntry>
		> = devalue.unflatten(JSON.parse(currentDataStoreRaw));

		// 3. Compute current component manifest
		const srcDir = fileURLToPath(config.srcDir);
		const currentManifest = await computeComponentManifest(
			root,
			srcDir,
			options,
			hashFn,
		);

		// 4. Global files check
		const globalPatterns = options.globalFiles ?? [
			"astro.config.*",
			"package.json",
		];
		for (const pattern of globalPatterns) {
			const files = await glob(pattern, { cwd: root, absolute: false });
			for (const file of files) {
				const prevHash = prevManifest[file];
				const currentHash = currentManifest[file];
				if (prevHash !== currentHash) {
					logger.info(`Global file changed (${file}) — full rebuild.`);
					return null;
				}
			}
		}

		// 5. Non-content source file check
		const contentDirs = getContentCollectionDirs(currentDataStore);
		for (const [relPath, currentHash] of Object.entries(currentManifest)) {
			if (isUnderContentDir(relPath, contentDirs)) continue;
			if (globalPatterns.some((p) => matchesGlobPattern(relPath, p))) continue;

			const prevHash = prevManifest[relPath];
			if (prevHash !== currentHash) {
				logger.info(`Source file changed (${relPath}) — full rebuild.`);
				return null;
			}
		}

		// Check for deleted source files
		for (const relPath of Object.keys(prevManifest)) {
			if (isUnderContentDir(relPath, contentDirs)) continue;
			if (globalPatterns.some((p) => matchesGlobPattern(relPath, p))) continue;
			if (!(relPath in currentManifest)) {
				logger.info(`Source file deleted (${relPath}) — full rebuild.`);
				return null;
			}
		}

		// 6. Build dependency map (if partialResolver is configured)
		let depMap: DepMap | null = null;
		if (options.partialResolver) {
			depMap = await buildDependencyMap({
				root,
				currentDataStore,
				distMetaDir,
				partialResolver: options.partialResolver,
				pageCollections,
				partialCollections,
				logger,
			});
		}

		// 7. Content entry diff
		const dirtyPathnames = new Set<string>();
		const cleanupPathnames = new Set<string>();

		for (const [collectionName, currentEntries] of currentDataStore) {
			if (collectionName.startsWith("meta:")) continue;

			const prevEntries = prevDataStore.get(collectionName);

			// Handle partial collections via dep map
			if (partialCollections.includes(collectionName) && depMap) {
				const changedPartialPaths = new Set<string>();
				for (const [entryId, entry] of currentEntries) {
					const prevEntry = prevEntries?.get(entryId);
					if (!prevEntry || entry.digest !== prevEntry.digest) {
						if (entry.filePath) changedPartialPaths.add(entry.filePath);
					}
				}
				if (prevEntries) {
					for (const [entryId, prevEntry] of prevEntries) {
						if (!currentEntries.has(entryId) && prevEntry.filePath) {
							changedPartialPaths.add(prevEntry.filePath);
						}
					}
				}
				if (changedPartialPaths.size > 0) {
					const allAffected = expandTransitive(changedPartialPaths, depMap);
					for (const partialPath of allAffected) {
						const qualifiedPageIds = depMap.partialToPages[partialPath] ?? [];
						for (const qualifiedId of qualifiedPageIds) {
							const sepIdx = qualifiedId.indexOf(":");
							const col =
								sepIdx >= 0 ? qualifiedId.slice(0, sepIdx) : pageCollections[0];
							const eid =
								sepIdx >= 0 ? qualifiedId.slice(sepIdx + 1) : qualifiedId;
							dirtyPathnames.add(entryIdToPathname(col, eid));
						}
					}
					logger.info(
						`${changedPartialPaths.size} partial(s) changed → ${dirtyPathnames.size} page(s) affected.`,
					);
				}
				continue;
			}

			// Page collections: diff entry-by-entry
			if (pageCollections.includes(collectionName)) {
				if (!prevEntries) {
					for (const [entryId] of currentEntries) {
						dirtyPathnames.add(entryIdToPathname(collectionName, entryId));
					}
					continue;
				}

				for (const [entryId, entry] of currentEntries) {
					const prevEntry = prevEntries.get(entryId);
					if (!prevEntry || entry.digest !== prevEntry.digest) {
						dirtyPathnames.add(entryIdToPathname(collectionName, entryId));
					}
				}

				for (const [entryId] of prevEntries) {
					if (!currentEntries.has(entryId)) {
						cleanupPathnames.add(entryIdToPathname(collectionName, entryId));
					}
				}
				continue;
			}

			// Ignored collections: skip entirely
			if (ignoredCollections.has(collectionName)) {
				continue;
			}

			// Other collections: any change triggers full rebuild
			if (hasCollectionChanged(currentEntries, prevEntries)) {
				logger.info(`Collection "${collectionName}" changed — full rebuild.`);
				return null;
			}
		}

		// Check for entirely deleted collections
		for (const [collectionName] of prevDataStore) {
			if (collectionName.startsWith("meta:")) continue;
			if (ignoredCollections.has(collectionName)) continue;
			if (!currentDataStore.has(collectionName)) {
				if (pageCollections.includes(collectionName)) {
					const prevEntries = prevDataStore.get(collectionName)!;
					for (const [entryId] of prevEntries) {
						cleanupPathnames.add(entryIdToPathname(collectionName, entryId));
					}
				} else {
					logger.info(`Collection "${collectionName}" deleted — full rebuild.`);
					return null;
				}
			}
		}

		return { dirtyPathnames, cleanupPathnames, depMap };
	} catch (err) {
		logger.warn(`Error during dirty computation — full rebuild. ${err}`);
		return null;
	}
}

// ---------------------------------------------------------------------------
// Dependency map (Phase 2)
// ---------------------------------------------------------------------------

async function buildDependencyMap(opts: {
	root: string;
	currentDataStore: Map<string, Map<string, DataEntry>>;
	distMetaDir: string;
	partialResolver: (
		name: string,
		props: Record<string, string>,
	) => string | null;
	pageCollections: string[];
	partialCollections: string[];
	logger: AstroIntegrationLogger;
}): Promise<DepMap> {
	const {
		root,
		currentDataStore,
		distMetaDir,
		partialResolver,
		pageCollections,
		partialCollections,
		logger,
	} = opts;
	const pageColSet = new Set(pageCollections);
	const partialColSet = new Set(partialCollections);

	// Load previous dep map
	let prevDepMap: DepMap | null = null;
	const depMapPath = path.join(distMetaDir, DEP_MAP_FILE);
	if (fs.existsSync(depMapPath)) {
		try {
			const parsed = JSON.parse(fs.readFileSync(depMapPath, "utf-8"));
			if (parsed.version === DEP_MAP_VERSION) {
				prevDepMap = parsed;
			}
		} catch {
			// ignore parse errors
		}
	}

	// Collect MDX files to scan
	const filesToScan: {
		filePath: string;
		digest: string;
		collection: string;
		entryId: string;
	}[] = [];
	for (const collectionName of [...pageCollections, ...partialCollections]) {
		const entries = currentDataStore.get(collectionName);
		if (!entries) continue;
		for (const [entryId, entry] of entries) {
			if (entry.filePath?.endsWith(".mdx") && entry.digest) {
				filesToScan.push({
					filePath: entry.filePath,
					digest: String(entry.digest),
					collection: collectionName,
					entryId,
				});
			}
		}
	}

	const forwardDeps = new Map<string, string[]>();
	const scannedDigests: Record<string, string> = {};
	let rescannedCount = 0;
	let cachedCount = 0;

	for (const { filePath, digest, collection, entryId } of filesToScan) {
		scannedDigests[filePath] = digest;

		// Reuse cached deps if digest unchanged
		if (prevDepMap?.scannedDigests[filePath] === digest) {
			const deps: string[] = [];
			if (pageColSet.has(collection)) {
				const qualifiedId = `${collection}:${entryId}`;
				for (const [partialPath, pageIds] of Object.entries(
					prevDepMap.partialToPages,
				)) {
					if (pageIds.includes(qualifiedId)) {
						deps.push(partialPath);
					}
				}
			} else if (partialColSet.has(collection)) {
				const p2p = prevDepMap.partialToPartials[filePath];
				if (p2p) deps.push(...p2p);
			}
			if (deps.length > 0) forwardDeps.set(filePath, deps);
			cachedCount++;
			continue;
		}

		// Re-scan this file
		const absPath = path.join(root, filePath);
		if (!fs.existsSync(absPath)) continue;

		try {
			const content = fs.readFileSync(absPath, "utf-8");
			const deps = scanMdxDependencies(content, partialResolver);
			if (deps.length > 0) forwardDeps.set(filePath, deps);
			rescannedCount++;
		} catch {
			rescannedCount++;
		}
	}

	logger.info(
		`Dep map — scanned ${rescannedCount} file(s), reused cache for ${cachedCount}.`,
	);

	// Build reverse maps
	const directPartialToPages: Record<string, Set<string>> = {};
	const partialToPartials: Record<string, string[]> = {};

	for (const { filePath, collection, entryId } of filesToScan) {
		const deps = forwardDeps.get(filePath);
		if (!deps) continue;

		if (pageColSet.has(collection)) {
			const qualifiedId = `${collection}:${entryId}`;
			for (const partialPath of deps) {
				if (!directPartialToPages[partialPath]) {
					directPartialToPages[partialPath] = new Set();
				}
				directPartialToPages[partialPath].add(qualifiedId);
			}
		} else if (partialColSet.has(collection)) {
			partialToPartials[filePath] = deps;
		}
	}

	// Compute transitive closure
	const finalPartialToPages: Record<string, string[]> = {};
	for (const [partialPath, pageSet] of Object.entries(directPartialToPages)) {
		finalPartialToPages[partialPath] = [...pageSet];
	}

	const renderedBy = new Map<string, Set<string>>();
	for (const [parent, children] of Object.entries(partialToPartials)) {
		for (const child of children) {
			if (!renderedBy.has(child)) renderedBy.set(child, new Set());
			renderedBy.get(child)!.add(parent);
		}
	}

	for (const [partialPath, pages] of Object.entries(directPartialToPages)) {
		const visited = new Set<string>([partialPath]);
		const queue = [partialPath];
		while (queue.length > 0) {
			const current = queue.shift()!;
			const parents = renderedBy.get(current);
			if (!parents) continue;
			for (const parent of parents) {
				if (visited.has(parent)) continue;
				visited.add(parent);
				queue.push(parent);
				if (!finalPartialToPages[parent]) {
					finalPartialToPages[parent] = [];
				}
				for (const page of pages) {
					if (!finalPartialToPages[parent].includes(page)) {
						finalPartialToPages[parent].push(page);
					}
				}
			}
		}
	}

	return {
		version: DEP_MAP_VERSION,
		partialToPages: finalPartialToPages,
		partialToPartials,
		scannedDigests,
	};
}

function scanMdxDependencies(
	content: string,
	partialResolver: (
		name: string,
		props: Record<string, string>,
	) => string | null,
): string[] {
	const deps: string[] = [];

	const tree = fromMarkdown(content, {
		extensions: [mdxjs()],
		mdastExtensions: [mdxFromMarkdown()],
	});

	visit(tree, ["mdxJsxFlowElement", "mdxJsxTextElement"], (node) => {
		const jsxNode = node as MdxJsxNode;
		if (!jsxNode.name) return;

		const props: Record<string, string> = {};
		for (const attr of jsxNode.attributes) {
			if (attr.type === "mdxJsxAttribute" && typeof attr.value === "string") {
				props[attr.name] = attr.value;
			}
		}

		const resolved = partialResolver(jsxNode.name, props);
		if (resolved && !deps.includes(resolved)) {
			deps.push(resolved);
		}
	});

	return deps;
}

function expandTransitive(
	changedPartials: Set<string>,
	depMap: DepMap,
): Set<string> {
	const renderedBy = new Map<string, Set<string>>();
	for (const [parent, children] of Object.entries(depMap.partialToPartials)) {
		for (const child of children) {
			if (!renderedBy.has(child)) renderedBy.set(child, new Set());
			renderedBy.get(child)!.add(parent);
		}
	}

	const visited = new Set(changedPartials);
	const queue = [...changedPartials];
	while (queue.length > 0) {
		const current = queue.shift()!;
		const parents = renderedBy.get(current);
		if (!parents) continue;
		for (const parent of parents) {
			if (!visited.has(parent)) {
				visited.add(parent);
				queue.push(parent);
			}
		}
	}

	return visited;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function computeComponentManifest(
	root: string,
	srcDir: string,
	options: IncrementalBuildOptions,
	hashFn: (data: string) => string,
): Promise<ComponentManifest> {
	const manifest: ComponentManifest = {};

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
					// Skip unreadable files
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
					// Skip
				}
			}
		}
	}

	return manifest;
}

function defaultEntryIdToPathname(
	_collection: string,
	entryId: string,
): string {
	if (entryId === "" || entryId === "index") return "/";
	const normalized = entryId.endsWith("/index")
		? entryId.slice(0, -6)
		: entryId;
	return "/" + normalized;
}

function hasCollectionChanged(
	current: Map<string, DataEntry>,
	previous: Map<string, DataEntry> | undefined,
): boolean {
	if (!previous) return current.size > 0;
	if (current.size !== previous.size) return true;

	for (const [id, entry] of current) {
		const prevEntry = previous.get(id);
		if (!prevEntry) return true;
		if (entry.digest !== prevEntry.digest) return true;
	}

	for (const id of previous.keys()) {
		if (!current.has(id)) return true;
	}

	return false;
}

function getContentCollectionDirs(
	dataStore: Map<string, Map<string, DataEntry>>,
): Set<string> {
	const dirs = new Set<string>();
	for (const [collectionName, entries] of dataStore) {
		if (collectionName.startsWith("meta:")) continue;
		for (const [, entry] of entries) {
			if (entry.filePath) {
				const parts = entry.filePath.split("/");
				const contentIdx = parts.indexOf("content");
				if (contentIdx >= 0 && contentIdx + 2 <= parts.length) {
					dirs.add(parts.slice(0, contentIdx + 2).join("/"));
				}
				break;
			}
		}
	}
	return dirs;
}

function isUnderContentDir(relPath: string, contentDirs: Set<string>): boolean {
	for (const dir of contentDirs) {
		if (relPath.startsWith(dir + "/") || relPath === dir) return true;
	}
	return false;
}

function matchesGlobPattern(filePath: string, pattern: string): boolean {
	const escaped = pattern
		.replace(/[.+^${}()|[\]\\]/g, "\\$&")
		.replace(/\*\*/g, "<<<GLOBSTAR>>>")
		.replace(/\*/g, "[^/]*")
		.replace(/<<<GLOBSTAR>>>/g, ".*")
		.replace(/\?/g, ".");

	const regex = new RegExp(`^${escaped}$`);
	return regex.test(filePath);
}
