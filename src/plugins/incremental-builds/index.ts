import type { AstroConfig, AstroIntegration } from "astro";
import {
	computeDirtyPathnames,
	type IncrementalBuildResult,
} from "./incremental.ts";
import { copyCleanPages, persistBuildMetadata } from "./io.ts";

export interface IncrementalBuildOptions {
	/**
	 * Path to a previous build's dist/ directory (relative to project root).
	 * When provided, the integration compares the current content against
	 * the previous build's metadata to determine which pages need rebuilding.
	 */
	previousDist: string;

	/**
	 * Content collections whose entries map 1:1 to URL pathnames.
	 * Changes to entries in these collections mark individual pages dirty.
	 * @default ["docs"]
	 */
	pageCollections?: string[];

	/**
	 * Content collections that contain reusable partials/snippets.
	 * Changes to entries in these collections are expanded via the
	 * dependency map to find affected pages.
	 * @default ["partials"]
	 */
	partialCollections?: string[];

	/**
	 * A function that inspects a JSX node in an MDX file and returns the
	 * content file path it depends on, or null if the node is not a content
	 * reference. Used to build the partial→page reverse dependency map.
	 *
	 * Example for cloudflare-docs' `<Render>` component:
	 * ```ts
	 * (name, props) => {
	 *   if (name === 'Render' && props.file && props.product) {
	 *     return `src/content/partials/${props.product}/${props.file}.mdx`;
	 *   }
	 *   return null;
	 * }
	 * ```
	 */
	partialResolver?: (
		name: string,
		props: Record<string, string>,
	) => string | null;

	/**
	 * Maps a content collection entry ID to its URL pathname.
	 * Override this if your site uses a non-standard URL structure.
	 *
	 * @default Starlight-compatible: entryId "workers/guide" → "/workers/guide"
	 */
	entryIdToPathname?: (collection: string, entryId: string) => string;

	/**
	 * Content collections to ignore when diffing. Changes to entries in
	 * these collections will NOT trigger a full rebuild.
	 * Use this for collections that don't affect page output (e.g., skills,
	 * dynamically fetched data).
	 * @default []
	 */
	ignoredCollections?: string[];

	/**
	 * Glob patterns (relative to project root) that, if any matched file
	 * has changed, trigger a full rebuild instead of an incremental one.
	 * @default ["astro.config.*", "package.json"]
	 */
	globalFiles?: string[];

	/**
	 * Filename patterns for files in the dist root that should NOT be copied
	 * from the previous build. These are typically files regenerated fresh on
	 * every build by Astro or its integrations (sitemaps, redirects, etc.).
	 *
	 * Each entry can be a string (exact prefix match) or a RegExp
	 * (tested against the filename).
	 *
	 * @default ["_headers", "__redirects", /^sitemap.*\.xml$/, /^robots\.txt$/, /^llms.*\.txt$/]
	 */
	noCopyPatterns?: (string | RegExp)[];
}

/**
 * Astro integration for incremental/partial builds.
 *
 * Compares the current content against a previous build's metadata to
 * determine which pages need rebuilding. Only dirty pages are rendered;
 * clean pages are copied from the previous build output.
 *
 * Requires Phases 1+2 only — no Astro fork needed. Works with stock Astro
 * via the public `setPrerenderer` and `astro:build:done` hooks.
 */
export default function incrementalBuilds(
	options: IncrementalBuildOptions,
): AstroIntegration {
	let config: AstroConfig;
	let incrementalResult: IncrementalBuildResult | null = null;
	let isIncremental = false;

	return {
		name: "astro-incremental-builds",
		hooks: {
			"astro:config:done": ({ config: resolvedConfig }) => {
				config = resolvedConfig;
			},

			"astro:build:start": async ({ setPrerenderer, logger }) => {
				incrementalResult = await computeDirtyPathnames({
					config,
					options,
					logger,
				});

				if (incrementalResult === null) {
					logger.info("Full rebuild required.");
					return;
				}

				isIncremental = true;
				const { dirtyPathnames, cleanupPathnames } = incrementalResult;

				logger.info(
					`Incremental build: ${dirtyPathnames.size} page(s) to rebuild` +
						(cleanupPathnames.size > 0
							? `, ${cleanupPathnames.size} to remove`
							: ""),
				);

				// Wrap the prerenderer to filter getStaticPaths() to dirty pages only
				setPrerenderer((defaultPrerenderer) => ({
					...defaultPrerenderer,
					async getStaticPaths() {
						const all = await defaultPrerenderer.getStaticPaths();
						return all.filter(({ pathname }) =>
							dirtyPathnames.has(pathname),
						);
					},
				}));
			},

			"astro:build:done": async ({ dir, logger }) => {
				if (!isIncremental || !incrementalResult) {
					// Full build — still persist metadata for next incremental run
					await persistBuildMetadata({
						config,
						options,
						logger,
					});
					return;
				}

				// Copy unchanged HTML pages from previous build
				await copyCleanPages({
					previousDist: options.previousDist,
					outDir: dir,
					result: incrementalResult,
					config,
					logger,
					noCopyPatterns: options.noCopyPatterns,
				});

				// Persist metadata for next incremental build
				await persistBuildMetadata({
					config,
					options,
					logger,
				});
			},
		},
	};
}

export type { IncrementalBuildResult };
