// Drop a markdown table's header row when every header cell is empty. Some CF
// content uses "headerless" GFM tables (`| | |`), which render as a styled but
// empty <thead> band; remove it so no blank header shows. Markdown tables only
// — component (.astro) tables aren't in this pipeline. Emptiness is by text
// content, so a header whose cells hold only an image/<br> counts as empty.

import type { HastPluginDefinition } from "./types";

export default function rehypeEmptyTableHeaders(): HastPluginDefinition {
  return {
    name: "cf-empty-table-headers",
    element: {
      filter: ["thead"],
      visit(node, ctx) {
        if (ctx.textContent(node).trim() === "") {
          ctx.removeNode(node);
        }
      },
    },
  };
}
