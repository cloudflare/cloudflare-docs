// Types for the cf-nimbus rehype pipeline, reimplemented as Sätteri hast
// plugins (the framework's supported extension point — `mdx()`-attached
// remark/rehype plugins are dropped by Sätteri).
//
// Pipeline order inside Sätteri: shiki → these plugins (array order) →
// image-marker → heading-ids. The built-in heading-ids honours a pre-set
// string `node.properties.id`, so `heading-slugs` only needs to set it.

import type {
  HastPluginDefinition,
  HastVisitorContext,
} from "satteri";
import type { Element, ElementContent, Text } from "hast";

export type { HastPluginDefinition, HastVisitorContext };
export type { Element, ElementContent, Text };

export const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

/** Narrow a hast node to an Element, optionally of a given tagName. */
export function isElement(
  node: { type: string; tagName?: string } | null | undefined,
  tagName?: string,
): node is Element {
  return (
    !!node &&
    node.type === "element" &&
    (tagName === undefined || node.tagName === tagName)
  );
}

/** Normalise a hast `className` property to a string[]. */
export function classNames(node: Element): string[] {
  const cn = node.properties?.className;
  if (Array.isArray(cn)) return cn.map(String);
  if (typeof cn === "string") return cn.split(/\s+/).filter(Boolean);
  return [];
}
