import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightImageZoom from "starlight-image-zoom";
import liveCode from "astro-live-code";
import starlightLinksValidator from "starlight-links-validator";
import starlightScrollToTop from "starlight-scroll-to-top";
import icon from "astro-icon";
import sitemap, { type SitemapItem } from "@astrojs/sitemap";
import react from "@astrojs/react";

import { readdir } from "fs/promises";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { existsSync } from "fs";

import remarkValidateImages from "./src/plugins/remark/validate-images";

import rehypeTitleFigure from "rehype-title-figure";
import rehypeMermaid from "./src/plugins/rehype/mermaid.ts";
import rehypeAutolinkHeadings from "./src/plugins/rehype/autolink-headings.ts";
import rehypeExternalLinks from "./src/plugins/rehype/external-links.ts";
import rehypeHeadingSlugs from "./src/plugins/rehype/heading-slugs.ts";
import rehypeShiftHeadings from "./src/plugins/rehype/shift-headings.ts";

async function autogenSections() {
	const sections = (
		await readdir("./src/content/docs/", {
			withFileTypes: true,
		})
	)
		.filter((x) => x.isDirectory())
		.map((x) => x.name);
	return sections.map((x) => {
		return {
			label: x,
			autogenerate: {
				directory: x,
				collapsed: true,
			},
		};
	});
}

async function autogenStyles() {
	const styles = (
		await readdir("./src/styles/", {
			withFileTypes: true,
			recursive: true,
		})
	)
		.filter((x) => x.isFile())
		.map((x) => x.parentPath + x.name)
		.sort((a) => (a === "./src/styles/tailwind.css" ? -1 : 1));

	return styles;
}

const sidebar = await autogenSections();
const customCss = await autogenStyles();

const RUN_LINK_CHECK =
	process.env.RUN_LINK_CHECK?.toLowerCase() === "true" || false;

/**
 * Build a cache of all git last-modified dates in one batch
 */
function buildGitDateCache(): Map<string, string> | null {
	try {
		console.time("[sitemap] Building git date cache");

		// Use git log with --name-only and --diff-filter to get all files with their last commit
		// The format outputs the commit date followed by the list of files changed in that commit
		// e.g.
		//  2025-10-01T12:34:56-07:00
		//  src/content/docs/file1.mdx
		//  src/content/docs/file2.mdx
		//
		//  2025-09-25T09:15:30-07:00
		//  src/content/docs/file3.mdx

		const result = execSync(
			'git log --pretty=format:"%cI" --name-only --diff-filter=AMR src/content/docs',
			{
				encoding: "utf-8",
				maxBuffer: 100 * 1024 * 1024,
			},
		);

		const cache = new Map<string, string>();
		const lines = result.split("\n");

		let currentDate: string | null = null;
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed) {
				continue;
			}
			// Lines are either dates or file paths
			// Date lines match ISO format
			if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
				currentDate = trimmed;
			} else if (currentDate) {
				const filePath = `./${trimmed}`; // fileURLToPath includes leading ./, so we do the same here
				if (!cache.has(filePath)) {
					cache.set(filePath, currentDate); // e.g., "src/content/docs/file.mdx"
				}
			}
		}

		console.timeEnd("[sitemap] Building git date cache");
		console.log(`[sitemap] Loaded git dates for ${cache.size} files`);
		return cache;
	} catch (error) {
		console.warn("[sitemap] Failed to build git date cache:", error);
		return null;
	}
}

const gitDateCache = buildGitDateCache();

/**
 * Get the last Git modification date for a file (from cache)
 * @param filePath - Path to the file
 * @returns ISO date string or null if not available
 */
function getGitLastModified(filePath: string): string | undefined {
	if (!gitDateCache) {
		console.warn("[sitemap] Git date cache is not initialized");
		return undefined;
	}

	const result = gitDateCache.get(filePath);

	if (!result) {
		console.log(`[sitemap] Last modified not found in git for: "${filePath}"`);
	}

	return result ?? undefined;
}

/**
 * Convert a sitemap URL to the corresponding source file path
 * @param url - The full URL from the sitemap
 * @returns Absolute file path or null if not found
 */
function urlToFilePath(url: string): string | null {
	try {
		const urlObj = new URL(url);
		const pathname = urlObj.pathname.replace(/\/$/, ""); // Remove trailing slash

		// Try different file extensions and paths
		const possiblePaths = [
			`./src/content/docs${pathname}.md`,
			`./src/content/docs${pathname}.mdx`,
			`./src/content/docs${pathname}/index.md`,
			`./src/content/docs${pathname}/index.mdx`,
		];

		for (const path of possiblePaths) {
			if (existsSync(path)) {
				return path;
			}
		}

		return null;
	} catch (_error) {
		return null;
	}
}

function addLastModDate(item: SitemapItem) {
	const filePath = urlToFilePath(item.url);
	if (filePath) {
		const gitDate = getGitLastModified(filePath);
		if (gitDate) {
			item.lastmod = gitDate;
		} else {
			console.warn(
				`[sitemap] No git last mod date found for ${filePath} (${item.url}) - setting to now`,
			);
			item.lastmod = new Date().toISOString();
		}
	} else {
		console.warn(
			`[sitemap] Could not find source file for ${item.url} - setting last modified to now`,
		);
		item.lastmod = new Date().toISOString();
	}
	return item;
}

// https://astro.build/config
export default defineConfig({
	site: "https://developers.cloudflare.com",
	markdown: {
		smartypants: false,
		remarkPlugins: [remarkValidateImages],
		rehypePlugins: [
			rehypeMermaid,
			rehypeExternalLinks,
			rehypeHeadingSlugs,
			rehypeAutolinkHeadings,
			// @ts-expect-error plugins types are outdated but functional
			rehypeTitleFigure,
			rehypeShiftHeadings,
		],
	},
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {
				limitInputPixels: false,
			},
		},
	},
	experimental: {
		contentIntellisense: true,
	},
	server: {
		port: 1111,
	},
	integrations: [
		starlight({
			title: "Cloudflare Docs",
			logo: {
				src: "./src/assets/logo.svg",
			},
			favicon: "/favicon.png",
			social: [
				{
					label: "GitHub",
					icon: "github",
					href: "https://github.com/cloudflare/cloudflare-docs",
				},
				{ label: "X.com", icon: "x.com", href: "https://x.com/cloudflare" },
				{
					label: "YouTube",
					icon: "youtube",
					href: "https://www.youtube.com/cloudflare",
				},
			],
			editLink: {
				baseUrl:
					"https://github.com/cloudflare/cloudflare-docs/edit/production/",
			},
			components: {
				Banner: "./src/components/overrides/Banner.astro",
				Footer: "./src/components/overrides/Footer.astro",
				Head: "./src/components/overrides/Head.astro",
				Header: "./src/components/overrides/Header.astro",
				Hero: "./src/components/overrides/Hero.astro",
				MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
				Sidebar: "./src/components/overrides/Sidebar.astro",
				PageTitle: "./src/components/overrides/PageTitle.astro",
				TableOfContents: "./src/components/overrides/TableOfContents.astro",
			},
			sidebar,
			customCss,
			pagination: false,
			plugins: [
				...(RUN_LINK_CHECK
					? [
							starlightLinksValidator({
								errorOnInvalidHashes: false,
								errorOnLocalLinks: false,
								exclude: [
									"/api/",
									"/api/**",
									"/changelog/**",
									"/http/resources/**",
									"/llms.txt",
									"/llms-full.txt",
									"{props.*}",
									"/",
									"/glossary/",
									"/directory/",
									"/rules/snippets/examples/?operation=*",
									"/rules/transform/examples/?operation=*",
									"/ruleset-engine/rules-language/fields/reference/**",
									"/workers/examples/?languages=*",
									"/workers/examples/?tags=*",
									"/workers/llms-full.txt",
									"/workers-ai/models/**",
									"**index.md",
									"/markdown.zip",
									"/style-guide/index.md",
									"/style-guide/fixtures/markdown/index.md",
								],
							}),
						]
					: []),
				starlightDocSearch({
					clientOptionsModule: "./src/plugins/docsearch/index.ts",
				}),
				starlightImageZoom(),
				starlightScrollToTop({
					tooltipText: "Back to top",
					showTooltip: true,
					svgPath: "M12 6L6 12M12 6L18 12M12 12L6 18M12 12L18 18",
					showProgressRing: true,
					progressRingColor: "white",
					showOnHomepage: false, // Hide on homepage (default)
				}),
			],
			lastUpdated: true,
			markdown: {
				headingLinks: false,
			},
			routeMiddleware: "./src/plugins/starlight/route-data.ts",
			disable404Route: true,
		}),
		liveCode({}),
		icon(),
		sitemap({
			filter(page) {
				if (page.includes("/style-guide/")) {
					return false;
				}

				if (page.endsWith("/404/")) {
					return false;
				}

				return true;
			},
			serialize(item) {
				return addLastModDate(item);
			},
		}),
		react(),
	],
	vite: {
		resolve: {
			alias: {
				"./Page.astro": fileURLToPath(
					new URL("./src/components/overrides/Page.astro", import.meta.url),
				),
				"../components/Page.astro": fileURLToPath(
					new URL("./src/components/overrides/Page.astro", import.meta.url),
				),
			},
		},
	},
});
