// Adapted from cloudflare-docs (src/plugins/rehype/autolink-headings.ts).
//
// Wraps each heading that has an id in a `.heading-wrapper` div and appends an
// `.anchor-link`. Runs after heading-slugs (ids exist) and before the built-in
// heading-ids, which still finds the wrapped heading and honours its id.

import type { Element, HastPluginDefinition } from "./types";

function anchorIcon(): Element {
  return {
    type: "element",
    tagName: "span",
    properties: { ariaHidden: "true", className: ["anchor-icon"] },
    children: [
      {
        type: "element",
        tagName: "svg",
        properties: { width: 16, height: 16, viewBox: "0 0 24 24" },
        children: [
          {
            type: "element",
            tagName: "path",
            properties: {
              fill: "currentcolor",
              d: "m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z",
            },
            children: [],
          },
        ],
      },
    ],
  };
}

export default function rehypeAutolinkHeadings(): HastPluginDefinition {
  return {
    name: "cf-autolink-headings",
    element: {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      visit(node) {
        const id = node.properties?.id;
        if (typeof id !== "string" || id.length === 0) return;

        const anchor: Element = {
          type: "element",
          tagName: "a",
          properties: { className: ["anchor-link"], href: `#${id}` },
          children: [anchorIcon()],
        };

        // Return a replacement wrapper rather than wrapNode + insertAfter:
        // in this Sätteri version insertAfter places the anchor outside the
        // wrapper, breaking the `.heading-wrapper > h, a` structure.
        const heading: Element = {
          type: "element",
          tagName: node.tagName,
          properties: { ...node.properties },
          children: [...(node.children ?? [])],
        };
        return {
          type: "element",
          tagName: "div",
          properties: {
            tabIndex: -1,
            className: ["heading-wrapper", `level-${node.tagName}`],
          },
          children: [heading, anchor],
        };
      },
    },
  };
}
