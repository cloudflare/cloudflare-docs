// Adapted from cloudflare-docs (src/plugins/rehype/mermaid.ts) — the
// "pre-mermaid" strategy. A ```mermaid fence reaches hast as
// `<pre><code class="language-mermaid">…</code></pre>` (mermaid must be in
// `markdown.syntaxHighlight.excludeLangs`, or shiki tokenises it first) and is
// replaced with `<pre class="mermaid">…</pre>` for the client to render.

import type { Element, HastPluginDefinition } from "./types";
import { classNames, isElement } from "./types";

const NON_WHITESPACE = /\S/;

function mermaidCodeChild(pre: Element): Element | null {
  let found: Element | null = null;
  for (const child of pre.children ?? []) {
    if (child.type === "text") {
      if (NON_WHITESPACE.test(child.value)) return null;
      continue;
    }
    if (isElement(child, "code") && classNames(child).includes("language-mermaid")) {
      if (found) return null;
      found = child;
      continue;
    }
    return null;
  }
  return found;
}

export default function rehypeMermaid(): HastPluginDefinition {
  return {
    name: "cf-mermaid",
    element: {
      filter: ["pre"],
      visit(node, ctx) {
        const code = mermaidCodeChild(node);
        if (!code) return;

        return {
          type: "element",
          tagName: "pre",
          properties: { className: ["mermaid"] },
          children: [{ type: "text", value: ctx.textContent(code) }],
        };
      },
    },
  };
}
