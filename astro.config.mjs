import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightImageZoom from "starlight-image-zoom";
import liveCode from "astro-live-code";
import rehypeSlug from "rehype-slug";
import rehypeMermaid from "rehype-mermaid";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import { h } from "hastscript";
import { readdir } from "fs/promises";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

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

const AnchorLinkIcon = h(
	"span",
	{ ariaHidden: "true", class: "anchor-icon" },
	h(
		"svg",
		{ width: 16, height: 16, viewBox: "0 0 24 24" },
		h("path", {
			fill: "currentcolor",
			d: "m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z",
		}),
	),
);

const autolinkConfig = {
	properties: { class: "anchor-link" },
	behavior: "after",
	group: ({ tagName }) =>
		h("div", { tabIndex: -1, class: `heading-wrapper level-${tagName}` }),
	content: () => [AnchorLinkIcon],
};

// https://astro.build/config
export default defineConfig({
	site: "https://developers.cloudflare.com",
	smartypants: false,
	markdown: {
		rehypePlugins: [
			[
				rehypeMermaid,
				{
					strategy: "pre-mermaid",
				},
			],
			[
				rehypeExternalLinks,
				{
					content: {
						type: "text",
						rel: "noopener",
						value: " ↗",
					},
					properties: {
						target: "_blank",
					},
				},
			],
			rehypeSlug,
			[rehypeAutolinkHeadings, autolinkConfig],
		],
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
			head: [
				{
					tag: "script",
					content:
						"(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NDGPDFZ');",
				},
				{
					tag: "meta",
					attrs: {
						name: "image",
						content: "https://developers.cloudflare.com/cf-twitter-card.png",
					},
				},
				{
					tag: "meta",
					attrs: {
						name: "og:image",
						content: "https://developers.cloudflare.com/cf-twitter-card.png",
					},
				},
				{
					tag: "meta",
					attrs: {
						name: "twitter:image",
						content: "https://developers.cloudflare.com/cf-twitter-card.png",
					},
				},
			],
			social: {
				github: "https://github.com/cloudflare/cloudflare-docs",
				twitter: "https://twitter.com/cloudflare",
				youtube: "https://www.youtube.com/cloudflare",
			},
			editLink: {
				baseUrl:
					"https://github.com/cloudflare/cloudflare-docs/edit/production/",
			},
			components: {
				Footer: "./src/components/overrides/Footer.astro",
				Head: "./src/components/overrides/Head.astro",
				Hero: "./src/components/overrides/Hero.astro",
				MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
				Sidebar: "./src/components/overrides/Sidebar.astro",
				PageSidebar: "./src/components/overrides/PageSidebar.astro",
				SiteTitle: "./src/components/overrides/SiteTitle.astro",
				PageTitle: "./src/components/overrides/PageTitle.astro",
				Pagination: "./src/components/overrides/Pagination.astro",
				SocialIcons: "./src/components/overrides/SocialIcons.astro",
				SkipLink: "./src/components/overrides/SkipLink.astro",
			},
			sidebar: await autogenSections(),
			customCss: [
				"./src/headings.css",
				"./src/input.css",
				"./src/kbd.css",
				"./src/littlefoot.css",
				"./src/mermaid.css",
				"./src/table.css",
				"./src/tailwind.css",
			],
			plugins: [
				starlightDocSearch({
					appId: "8MU1G3QO9P",
					apiKey: "4edb0a6cef3338ff4bcfbc6b3d2db56b",
					indexName: "TEST - Re-dev docs",
				}),
				starlightImageZoom(),
			],
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		liveCode({ layout: "~/components/live-code/Layout.astro" }),
		icon(),
		sitemap({
			serialize(item) {
				item.lastmod = new Date();
				return item;
			},
		}),
	],
});
