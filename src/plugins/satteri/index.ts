import type { HastPluginDefinition, MdastPluginDefinition } from "satteri";

import validateImages from "./validate-images";
import mermaid from "./mermaid";
import externalLinks from "./external-links";
import headingSlugs from "./heading-slugs";
import autolinkHeadings from "./autolink-headings";
import titleFigure from "./title-figure";
import shiftHeadings from "./shift-headings";

// The plugins are authored as factories (`() => …PluginDefinition`) so that
// per-document state — most importantly the heading slugger — resets between
// pages. Sätteri's core `markdownToHtml` accepts these factories
// (`*PluginInput`) and invokes them once per compile, but
// `@astrojs/markdown-satteri` only re-exports the resolved `*PluginDefinition`
// shape, so the factory arrays are asserted to that type here.
export const mdastPlugins = [
	validateImages,
] as unknown as MdastPluginDefinition[];

export const hastPlugins = [
	mermaid,
	externalLinks,
	headingSlugs,
	autolinkHeadings,
	titleFigure,
	shiftHeadings,
] as unknown as HastPluginDefinition[];
