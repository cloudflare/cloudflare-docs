/**
 * Re-exports the buildDependencyMap logic for use by persistBuildMetadata
 * on full builds (where computeDirtyPathnames returned null before building
 * the dep map).
 *
 * This avoids circular imports between io.ts and incremental.ts.
 */

import fs from "node:fs";
import path from "node:path";
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
import { visit } from "unist-util-visit";
import type { AstroIntegrationLogger } from "astro";

interface DepMap {
	version?: number;
	partialToPages: Record<string, string[]>;
	partialToPartials: Record<string, string[]>;
	scannedDigests: Record<string, string>;
}

const DEP_MAP_FILE = "dep-map.json";
const DEP_MAP_VERSION = 2;

export async function buildDependencyMapForPersist(opts: {
	root: string;
	currentDataStore: Map<string, Map<string, any>>;
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

	let prevDepMap: DepMap | null = null;
	const depMapPath = path.join(distMetaDir, DEP_MAP_FILE);
	if (fs.existsSync(depMapPath)) {
		try {
			const parsed = JSON.parse(fs.readFileSync(depMapPath, "utf-8"));
			if (parsed.version === DEP_MAP_VERSION) prevDepMap = parsed;
		} catch {
			// ignore
		}
	}

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
			const filePath = entry.filePath as string | undefined;
			const digest = entry.digest as string | undefined;
			if (filePath?.endsWith(".mdx") && digest) {
				filesToScan.push({
					filePath,
					digest: String(digest),
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

		if (prevDepMap?.scannedDigests[filePath] === digest) {
			const deps: string[] = [];
			if (pageColSet.has(collection)) {
				const qualifiedId = `${collection}:${entryId}`;
				for (const [partialPath, pageIds] of Object.entries(
					prevDepMap.partialToPages,
				)) {
					if (pageIds.includes(qualifiedId)) deps.push(partialPath);
				}
			} else if (partialColSet.has(collection)) {
				const p2p = prevDepMap.partialToPartials[filePath];
				if (p2p) deps.push(...p2p);
			}
			if (deps.length > 0) forwardDeps.set(filePath, deps);
			cachedCount++;
			continue;
		}

		const absPath = path.join(root, filePath);
		if (!fs.existsSync(absPath)) continue;

		try {
			const content = fs.readFileSync(absPath, "utf-8");
			const deps = scanMdxDeps(content, partialResolver);
			if (deps.length > 0) forwardDeps.set(filePath, deps);
			rescannedCount++;
		} catch {
			rescannedCount++;
		}
	}

	logger.info(
		`Dep map — scanned ${rescannedCount} file(s), reused cache for ${cachedCount}.`,
	);

	const directPartialToPages: Record<string, Set<string>> = {};
	const partialToPartials: Record<string, string[]> = {};

	for (const { filePath, collection, entryId } of filesToScan) {
		const deps = forwardDeps.get(filePath);
		if (!deps) continue;
		if (pageColSet.has(collection)) {
			const qualifiedId = `${collection}:${entryId}`;
			for (const dep of deps) {
				if (!directPartialToPages[dep]) directPartialToPages[dep] = new Set();
				directPartialToPages[dep].add(qualifiedId);
			}
		} else if (partialColSet.has(collection)) {
			partialToPartials[filePath] = deps;
		}
	}

	const finalPartialToPages: Record<string, string[]> = {};
	for (const [p, s] of Object.entries(directPartialToPages)) {
		finalPartialToPages[p] = [...s];
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
				if (!finalPartialToPages[parent]) finalPartialToPages[parent] = [];
				for (const page of pages) {
					if (!finalPartialToPages[parent].includes(page))
						finalPartialToPages[parent].push(page);
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

function scanMdxDeps(
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
			if (attr.type === "mdxJsxAttribute" && typeof attr.value === "string")
				props[attr.name] = attr.value;
		}
		const resolved = partialResolver(jsxNode.name, props);
		if (resolved && !deps.includes(resolved)) deps.push(resolved);
	});

	return deps;
}
