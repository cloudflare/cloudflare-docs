import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightImageZoom from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import starlightScrollToTop from "starlight-scroll-to-top";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

import remarkValidateImages from "./src/plugins/remark/validate-images";

import rehypeTitleFigure from "rehype-title-figure";
import rehypeMermaid from "./src/plugins/rehype/mermaid.ts";
import rehypeAutolinkHeadings from "./src/plugins/rehype/autolink-headings.ts";
import rehypeExternalLinks from "./src/plugins/rehype/external-links.ts";
import rehypeHeadingSlugs from "./src/plugins/rehype/heading-slugs.ts";
import rehypeShiftHeadings from "./src/plugins/rehype/shift-headings.ts";
import { createSitemapLastmodSerializer } from "./sitemap.serializer.ts";

import skills from "astro-skills";

import { isDisallowedByRobots } from "./src/util/robots.ts";

async function autogenSections() {
	const sections = (
		await readdir("./src/content/docs/", {
			withFileTypes: true,
		})
	)
		.filter((x) => x.isDirectory())
		.filter((x) => !["agent-setup"].includes(x.name))
		.map((x) => x.name);
	return sections.map((x) => {
		return {
			label: x,
			items: [
				{
					autogenerate: {
						directory: x,
						collapsed: true,
					},
				},
			],
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
		.filter((x) => x !== "./src/styles/landing.css")
		.sort((a) => (a === "./src/styles/tailwind.css" ? -1 : 1));

	return styles;
}

async function getExternalLinkPaths(dir: string): Promise<Set<string>> {
	const paths = new Set<string>();
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			for (const p of await getExternalLinkPaths(full)) {
				paths.add(p);
			}
		} else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
			const content = await readFile(full, "utf-8");
			const match = content.match(/^---\n([\s\S]*?)\n---/);
			if (match?.[1].includes("external_link:")) {
				let rel = full.slice("src/content/docs".length);
				rel = rel.replace(/\.(mdx|md)$/, "");
				rel = rel.replace(/\/index$/, "/");
				if (!rel.endsWith("/")) rel += "/";
				paths.add(rel.toLowerCase());
			}
		}
	}
	return paths;
}

const sidebar = await autogenSections();
const customCss = await autogenStyles();
const externalLinkPaths = await getExternalLinkPaths("src/content/docs");

const RUN_LINK_CHECK =
	process.env.RUN_LINK_CHECK?.toLowerCase() === "true" || false;

// Second build target, shared in place. Nimbus reads src/nimbus while
// Starlight stays at src; content/assets stay at src/content / src/assets.
const isNimbus = process.env.BUILD_TARGET === "nimbus";

// Nimbus markdown/integrations/vite, loaded only when active so the default
// Starlight build never pulls nimbus-docs or src/nimbus into its graph.
const nimbus = isNimbus ? await import("./src/nimbus/astro-config.ts") : null;

// https://astro.build/config
export default defineConfig({
	site: "https://developers.cloudflare.com",
	// Separate cache dir so the two targets' content stores never collide.
	...(isNimbus
		? {
				srcDir: "./src/nimbus",
				outDir: "./dist-nimbus",
				cacheDir: ".astro-cache-nimbus",
			}
		: { cacheDir: ".astro-cache" }),
	markdown: (nimbus
		? nimbus.markdown
		: {
				gfm: true,
				smartypants: false,
				remarkPlugins: [remarkValidateImages],
				rehypePlugins: [
					rehypeMermaid,
					rehypeExternalLinks,
					rehypeHeadingSlugs,
					rehypeAutolinkHeadings,
					rehypeTitleFigure,
					rehypeShiftHeadings,
				],
			}) as Parameters<typeof defineConfig>[0]["markdown"],
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
	integrations: nimbus
		? nimbus.integrations
		: [
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
						SkipLink: "./src/components/overrides/SkipLink.astro",
						TableOfContents: "./src/components/overrides/TableOfContents.astro",
					},
					sidebar,
					customCss,
					pagination: false,
					plugins: [
						...(RUN_LINK_CHECK
							? [
									starlightLinksValidator({
										failOnError: false,
										errorOnInvalidHashes: false,
										errorOnLocalLinks: false,
										reporters: {
											json: true,
										},
										exclude: [
											"/api/",
											"/api/**",
											"/changelog/**",
											"/http/resources/**",
											"/llms.txt",
											"/llms-full.txt",
											"**/llms.txt",
											"**/index.md",
											"{props.*}",
											"/",
											"/glossary/",
											"/directory/",
											"/rules/snippets/examples/?operation=*",
											"/rules/transform/examples/?operation=*",
											"/ruleset-engine/rules-language/fields/reference/**",
											"/workers/examples/?languages=*",
											"/workers/llms-full.txt",
											"/workers-ai/models/**",
											"/markdown.zip",
											"/style-guide/index.md",
											"/agent-setup/",
											"/videos/**",
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
						processedDirs: [
							"./src/content/partials/",
							"./src/content/changelog/",
						],
					},
					disable404Route: true,
				}),
				icon(),
				sitemap({
					filter(page) {
						if (page.includes("/style-guide/")) {
							return false;
						}

						if (page.endsWith("/404/")) {
							return false;
						}

						const pathname = new URL(page).pathname;

						// Exclude external_link pages
						if (externalLinkPaths.has(pathname)) {
							return false;
						}

						// Exclude pages disallowed in robots.txt
						if (isDisallowedByRobots(pathname)) {
							return false;
						}

						return true;
					},
					serialize: createSitemapLastmodSerializer(),
				}),
				react(),
				skills(),
			],
	vite: {
		...(nimbus
			? nimbus.vite
			: {
					resolve: {
						alias: {
							"./Page.astro": fileURLToPath(
								new URL(
									"./src/components/overrides/Page.astro",
									import.meta.url,
								),
							),
							"../components/Page.astro": fileURLToPath(
								new URL(
									"./src/components/overrides/Page.astro",
									import.meta.url,
								),
							),
							"./SidebarSublist.astro": fileURLToPath(
								new URL(
									"./src/components/overrides/SidebarSublist.astro",
									import.meta.url,
								),
							),
						},
					},
				}),
		// Priming-only: both targets' outputs live in the repo root, so each
		// target's dev watcher would otherwise enumerate the other's ~8.5k build
		// files. Astro auto-ignores the active target's outDir; this adds the
		// inactive one. Revisit at cutover (single target). Dev-watcher only —
		// does not affect the production build.
		server: {
			watch: {
				ignored: [
					"**/dist-nimbus/**",
					"**/.astro-cache-nimbus/**",
					"**/dist/**",
					"**/.astro-cache/**",
				],
			},
		},
	},
});
