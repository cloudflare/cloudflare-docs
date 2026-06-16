import type { HastPluginDefinition, MdastPluginDefinition } from "satteri";

import validateImages from "./validate-images";
import mermaid from "./mermaid";
import externalLinks from "./external-links";
import headingSlugs from "./heading-slugs";
import autolinkHeadings from "./autolink-headings";
import titleFigure from "./title-figure";
import shiftHeadings from "./shift-headings";

// Authored as factories so per-document state (the heading slugger) resets per
// page; Sätteri invokes them once per compile. `@astrojs/markdown-satteri` types
// only the resolved definition shape, hence the cast.
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
