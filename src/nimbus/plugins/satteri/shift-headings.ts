// In changelog entries only, demotes h1–h3 to h4 (inside the `.heading-wrapper`
// autolink-headings produces) and rewrites the wrapper's `level-h${n}` class.

import type { Element, HastPluginDefinition } from "./types";
import { classNames, isElement } from "./types";

const CHANGELOG_PATH = "/content/changelog/";
const HEADING = /^h([1-6])$/;

export default function shiftHeadings(): HastPluginDefinition {
  return {
    name: "cf-shift-headings",
    element: {
      filter: ["div"],
      visit(node, ctx) {
        if (!ctx.filename || !ctx.filename.includes(CHANGELOG_PATH)) return;

        const classes = classNames(node);
        if (!classes.includes("heading-wrapper")) return;

        const children = node.children ?? [];
        const heading = children.find(
          (c): c is Element => isElement(c) && HEADING.test(c.tagName),
        );
        if (!heading) return;

        const level = Number(heading.tagName.slice(1));
        if (!(level >= 1 && level < 4)) return;

        ctx.replaceNode(heading, { ...heading, tagName: "h4" });
        ctx.setProperty(
          node,
          "className",
          classes.map((c) => (c === `level-h${level}` ? "level-h4" : c)),
        );
      },
    },
  };
}
