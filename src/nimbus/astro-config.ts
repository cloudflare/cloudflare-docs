import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import icon from "astro-icon";
import nimbus, { defineConfig as defineNimbusConfig } from "nimbus-docs";
import { rehypePlugins } from "./plugins/rehype";

// Resolved against this file (src/nimbus/). `~` → src/nimbus, `~/assets` →
// the shared root src/assets, partials → the shared root src/content/partials.
const here = (p: string) =>
	fileURLToPath(new URL(p, import.meta.url)).replace(/\/$/, "");
const partialsRoot = here("../content/partials");

const nimbusConfig = defineNimbusConfig({
	site: "https://developers.cloudflare.com",
	title: "Cloudflare Docs",
	description: "Cloudflare's documentation.",
	locale: "en",
	github: "https://github.com/cloudflare/cloudflare-docs",
	socialImageAlt: "Cloudflare documentation",
	// Search is Algolia DocSearch (wired in E4); Pagefind off.
	search: false,
	sidebar: {
		items: [
			{ label: "Agents", items: [{ autogenerate: { directory: "agents" } }] },
			{ label: "Queues", items: [{ autogenerate: { directory: "queues" } }] },
			{ label: "KV", items: [{ autogenerate: { directory: "kv" } }] },
			{
				label: "Workflows",
				items: [{ autogenerate: { directory: "workflows" } }],
			},
			{
				label: "Workers AI",
				items: [{ autogenerate: { directory: "workers-ai" } }],
			},
			{
				label: "AI",
				segment: "/ai",
				items: [
					{ label: "Overview", link: "/ai/" },
					{ label: "Models", link: "/ai/models/" },
				],
			},
			{
				label: "Learning paths",
				items: [{ autogenerate: { directory: "learning-paths" } }],
			},
		],
		overviewLabel: "Overview",
		scope: "section",
		isolate: { boundaries: ["learning-paths/*"] },
		defaultCollapsed: true,
	},
});

// Maps Starlight icon names used in shared content to the iconify sets we ship,
// without touching content on disk: a pre-stage, MDX-scoped string rewrite.
const iconAlias = {
	name: "cf-nimbus:icon-alias",
	enforce: "pre" as const,
	transform(code: string, id: string) {
		const [pathOnly] = id.split("?", 1);
		if (!pathOnly?.endsWith(".mdx") && !pathOnly?.endsWith(".md")) return null;
		if (!/icon\s*=/.test(code)) return null;

		const SETI: Record<string, string> = {
			javascript: "vscode-icons:file-type-js-official",
			typescript: "vscode-icons:file-type-typescript-official",
			python: "vscode-icons:file-type-python",
			shell: "vscode-icons:file-type-shell",
		};
		const BARE: Record<string, string> = {
			document: "ph:file-text",
			"open-book": "ph:book-open",
			pen: "ph:pencil-simple",
			discord: "simple-icons:discord",
			"x.com": "simple-icons:x",
		};

		let out = code;
		out = out.replace(/(["'])seti:([a-z0-9_-]+)\1/gi, (match, q, name) => {
			const mapped = SETI[name.toLowerCase()];
			return mapped ? `${q}${mapped}${q}` : match;
		});
		out = out.replace(
			/\bicon\s*=\s*(["'])([a-z0-9_.-]+)\1/gi,
			(match, q, name) => {
				if (name.includes(":")) return match;
				const mapped = BARE[name.toLowerCase()];
				return mapped ? `icon=${q}${mapped}${q}` : match;
			},
		);
		return out === code ? null : { code: out, map: null };
	},
};

// The Nimbus target's markdown / integrations / vite, branched into
// astro.config.ts when BUILD_TARGET=nimbus.
export const markdown = {
	syntaxHighlight: {
		type: "shiki" as const,
		excludeLangs: ["math", "mermaid"],
	},
	smartypants: false,
};

export const integrations = [
	icon(),
	react(),
	nimbus(nimbusConfig, {
		markdown: { hastPlugins: rehypePlugins },
		incrementalBuilds: false,
		// MDX validation gated until the component barrel covers the full tree (C2).
		validateMdx: false,
		partialResolver: (name: string, props: Record<string, unknown>) => {
			if (name !== "Render" || !props.file) return null;
			const path = props.product
				? `${props.product}/${props.file}.mdx`
				: `${props.file}.mdx`;
			return resolve(partialsRoot, path);
		},
		rules: {
			"nimbus/frontmatter-shape": "error",
			"nimbus/image-ref": [
				"error",
				{ aliases: { "~/assets/": "src/assets/" } },
			],
			"nimbus/internal-link": "off",
		},
	}),
];

// Make the Nimbus app aliases authoritatively beat Astro's tsconfig-derived
// `~` (the root `~/*`→`src/*` the Starlight target needs).
//
// Astro injects the root tsconfig paths into `vite.resolve.alias` via the
// `astro:tsconfig-alias` plugin's `config()` hook, where the per-entry
// customResolver returns the ROOT file whenever `src/<path>` exists on disk.
// Vite's built-in `vite:alias` plugin (resolve.alias) runs BEFORE user
// `enforce:"pre"` plugins, so a `resolveId` override can never win where the
// root file exists (e.g. `~/components/changelog/Header.astro`).
//
// Fix: contribute our OWN `resolve.alias` entries from a `config` hook with
// `order: "post"`. Vite's `mergeAlias` PREPENDS each later config's aliases
// (`[...newer, ...older]`), and config hooks ordered "post" run after
// `astro:tsconfig-alias`'s (unordered) hook — so our entries land FIRST in
// the final alias array and the built-in alias plugin matches them first.
// `~/assets` and `~/content` precede `~` so the shared root tree still wins.
//
// This only applies to the Nimbus target (this config is loaded solely when
// BUILD_TARGET=nimbus); the default Starlight build is untouched and keeps
// `~`→src via its own tsconfig alias.
const nimbusDir = here(".");
const rootAssets = here("../assets");
const rootContent = here("../content");

const aliasResolver = {
	name: "cf-nimbus:alias",
	enforce: "pre" as const,
	config: {
		order: "post" as const,
		handler() {
			return {
				resolve: {
					alias: [
						{ find: /^~\/assets(\/.*)?$/, replacement: `${rootAssets}$1` },
						{ find: /^~\/content(\/.*)?$/, replacement: `${rootContent}$1` },
						{ find: /^~(\/.*)?$/, replacement: `${nimbusDir}$1` },
						{ find: /^@(\/.*)?$/, replacement: `${nimbusDir}$1` },
					],
				},
			};
		},
	},
	// Defense-in-depth fallback for any context the alias array doesn't cover.
	async resolveId(
		this: { resolve: (s: string, i?: string, o?: object) => Promise<{ id: string } | null> },
		source: string,
		importer: string | undefined,
		options: object,
	) {
		let mapped: string | null = null;
		if (source === "~/assets" || source.startsWith("~/assets/"))
			mapped = rootAssets + source.slice("~/assets".length);
		else if (source === "~/content" || source.startsWith("~/content/"))
			mapped = rootContent + source.slice("~/content".length);
		else if (source === "~" || source.startsWith("~/"))
			mapped = nimbusDir + source.slice(1);
		else if (source === "@" || source.startsWith("@/"))
			mapped = nimbusDir + source.slice(1);
		if (mapped === null) return null;
		const resolved = await this.resolve(mapped, importer, { ...options, skipSelf: true });
		return resolved ?? { id: mapped };
	},
};

export const vite = {
	plugins: [aliasResolver, iconAlias],
};
