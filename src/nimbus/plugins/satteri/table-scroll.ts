// Wrap every markdown table in a horizontally scrollable container so wide
// tables scroll within the content column instead of overflowing the layout.
// `tabindex`/`role`/`aria-label` make the region keyboard-scrollable (WCAG
// 2.1.1). Classed tables are component-owned (the `table:not([class])` prose
// convention) and left alone.

import type { HastPluginDefinition } from "./types";
import { classNames } from "./types";

export default function tableScroll(): HastPluginDefinition {
  return {
    name: "cf-table-scroll",
    element: {
      filter: ["table"],
      visit(node, ctx) {
        if (classNames(node).length > 0) return;
        ctx.wrapNode(node, {
          type: "element",
          tagName: "div",
          properties: {
            className: ["table-scroll"],
            tabIndex: 0,
            role: "region",
            "aria-label": "Table",
          },
          children: [],
        });
      },
    },
  };
}
