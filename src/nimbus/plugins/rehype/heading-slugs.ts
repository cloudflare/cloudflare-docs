// Adapted from cloudflare-docs (src/plugins/rehype/heading-slugs.ts).
//
//   ## foo {/* bar */}  ->  <h2 id="bar">foo</h2>
//
// Runs after external-links, so the arrow on any external link inside a
// heading is stripped before slugging. One GithubSlugger per document (factory
// form: Sätteri invokes the factory per compile) for deterministic -1/-2
// dedupe. Sets `properties.id`; the built-in heading-ids honours it.
//
// A trailing `{/* id */}` arrives as an `mdxTextExpression` child in the .mdx
// pipeline; the literal-text form is handled as a fallback for .md.

import GithubSlugger from "github-slugger";
import type {
  Element,
  HastPluginDefinition,
  HastVisitorContext,
  Text,
} from "./types";
import { EXTERNAL_LINK_ARROW } from "nimbus-docs/markdown";

const LITERAL_COMMENT_ID = /\{\/\*\s*([\s\S]*?)\s*\*\/\}\s*$/;

function setSlug(
  ctx: HastVisitorContext,
  node: Element,
  slug: string,
): void {
  ctx.setProperty(node, "id", slug);
}

export default function rehypeHeadingSlugs(): HastPluginDefinition {
  const slugger = new GithubSlugger();

  return {
    name: "cf-heading-slugs",
    element: {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      visit(node, ctx) {
        const children = node.children ?? [];
        const last = children.at(-1);
        if (!last) return;

        if (
          (last as { type: string }).type === "mdxTextExpression" &&
          typeof (last as { value?: unknown }).value === "string"
        ) {
          const value = (last as { value: string }).value;
          if (value.startsWith("/*") && value.endsWith("*/")) {
            const id = value.slice(2, -2).trim();
            setSlug(ctx, node, slugger.slug(id));

            const prev = children.at(-2);
            if (prev && (prev as { type: string }).type === "text") {
              const text = prev as Text;
              ctx.setProperty(text, "value", text.value.trimEnd());
            }
          }
          return;
        }

        if ((last as { type: string }).type === "text") {
          const text = last as Text;
          const m = text.value.match(LITERAL_COMMENT_ID);
          if (m) {
            const id = m[1].trim();
            setSlug(ctx, node, slugger.slug(id));
            ctx.setProperty(
              text,
              "value",
              text.value.slice(0, m.index).trimEnd(),
            );
            return;
          }
        }

        if (!node.properties?.id) {
          const string = ctx
            .textContent(node)
            .split(EXTERNAL_LINK_ARROW)
            .join("")
            .trimEnd();
          setSlug(ctx, node, slugger.slug(string));
        }
      },
    },
  };
}
