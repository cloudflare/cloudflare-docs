import type {
  HastPluginDefinition,
  HastVisitorContext,
} from "satteri";
import type { Element, ElementContent, Text } from "hast";

export type { HastPluginDefinition, HastVisitorContext };
export type { Element, ElementContent, Text };

export const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

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

export function classNames(node: Element): string[] {
  const cn = node.properties?.className;
  if (Array.isArray(cn)) return cn.map(String);
  if (typeof cn === "string") return cn.split(/\s+/).filter(Boolean);
  return [];
}
