// Order is load-bearing:
//   - external-links before heading-slugs: the arrow must exist so it can be
//     stripped before slugging.
//   - heading-slugs before autolink-headings: ids must exist before anchors
//     link to them.
//   - shift-headings last: it operates on the `.heading-wrapper` autolink
//     produces.

import { externalLinks, titleFigure } from "nimbus-docs/markdown";
import mermaid from "./mermaid";
import headingSlugs from "./heading-slugs";
import autolinkHeadings from "./autolink-headings";
import shiftHeadings from "./shift-headings";
import emptyTableHeaders from "./empty-table-headers";
import tableScroll from "./table-scroll";
import type { HastPluginDefinition } from "./types";

export {
  mermaid,
  headingSlugs,
  autolinkHeadings,
  shiftHeadings,
  emptyTableHeaders,
  tableScroll,
};

export const hastPlugins: HastPluginDefinition[] = [
  mermaid,
  externalLinks(),
  headingSlugs,
  autolinkHeadings,
  titleFigure(),
  shiftHeadings,
  emptyTableHeaders,
  tableScroll,
] as unknown as HastPluginDefinition[];
