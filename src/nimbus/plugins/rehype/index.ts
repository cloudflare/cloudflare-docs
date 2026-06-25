// The cf-nimbus rehype pipeline, mirroring cloudflare-docs'
// `markdown.rehypePlugins` order. Sätteri runs these as user hast plugins in
// array order (shiki → these → image-marker → built-in heading-ids).
//
// `externalLinks` and `titleFigure` are the framework's general passes, from
// `nimbus-docs/markdown`. The rest are CF-specific and stay local.
//
// Order is load-bearing:
//   - external-links before heading-slugs: the arrow must exist so it can be
//     stripped before slugging.
//   - heading-slugs before autolink-headings: ids must exist before anchors
//     link to them.
//   - shift-headings last: it operates on the `.heading-wrapper` autolink
//     produces.

import { externalLinks, titleFigure } from "nimbus-docs/markdown";
import rehypeMermaid from "./mermaid";
import rehypeHeadingSlugs from "./heading-slugs";
import rehypeAutolinkHeadings from "./autolink-headings";
import rehypeShiftHeadings from "./shift-headings";
import rehypeEmptyTableHeaders from "./empty-table-headers";
import type { HastPluginDefinition } from "./types";

export {
  rehypeMermaid,
  rehypeHeadingSlugs,
  rehypeAutolinkHeadings,
  rehypeShiftHeadings,
  rehypeEmptyTableHeaders,
};

// Local entries are factory functions: Sätteri invokes each per document, so
// per-document state (e.g. heading-slugs' GithubSlugger) resets between pages.
// The framework passes are stateless definitions, safe to instantiate once.
export const rehypePlugins: HastPluginDefinition[] = [
  rehypeMermaid,
  externalLinks(),
  rehypeHeadingSlugs,
  rehypeAutolinkHeadings,
  titleFigure(),
  rehypeShiftHeadings,
  rehypeEmptyTableHeaders,
] as unknown as HastPluginDefinition[];
