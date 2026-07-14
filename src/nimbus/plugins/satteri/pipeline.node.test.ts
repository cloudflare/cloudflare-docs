import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";

import { hastPlugins } from "./index";
import headingSlugs from "./heading-slugs";

function render(markdown: string, pathname = "/repo/src/content/docs/test.mdx") {
  return markdownToHtml(markdown, {
    features: { gfm: true, smartPunctuation: false },
    hastPlugins,
    filename: pathname,
  }).html;
}

function anchor(id: string) {
  return `<a class="anchor-link" href="#${id}">`;
}

function fragment(html: string) {
  const el = document.createElement("div");
  el.innerHTML = html;
  return el;
}

function expectWrappedHeading(html: string, level: number, id: string, text: string) {
  const root = fragment(html);
  const heading = root.querySelector(`h${level}#${id}`);
  const wrapper = heading?.parentElement;
  const link = Array.from(wrapper?.children ?? []).find(
    (child) =>
      child.tagName.toLowerCase() === "a" &&
      child.classList.contains("anchor-link") &&
      child.getAttribute("href") === `#${id}`,
  );

  expect(wrapper).not.toBeNull();
  expect(wrapper?.tagName.toLowerCase()).toBe("div");
  expect(wrapper?.getAttribute("tabindex")).toBe("-1");
  expect(wrapper?.classList.contains("heading-wrapper")).toBe(true);
  expect(wrapper?.classList.contains(`level-h${level}`)).toBe(true);
  expect(heading?.textContent).toBe(text);
  expect(link).toBeDefined();
  expect(wrapper?.children[0]).toBe(heading);
  expect(wrapper?.children[1]).toBe(link);
}

describe("Nimbus Satteri HAST pipeline", () => {
  test("adds external-link attributes and keeps the arrow out of heading slugs", () => {
    const html = render("## Has [link](https://example.com)");

    expect(html).toContain(
      `<a href="https://example.com" target="_blank" rel="noopener">link<span class="external-link"> ↗</span></a>`,
    );
    expect(html).toContain(`<h2 id="has-link">`);
    expectWrappedHeading(html, 2, "has-link", "Has link ↗");
    expect(html).not.toContain(`id="has-link-"`);
  });

  test("does not add the external-link arrow to image-only links", () => {
    const html = render("[![Cloudflare](/logo.png)](https://example.com)");

    expect(html).toContain(
      `<a href="https://example.com" target="_blank" rel="noopener"><img src="/logo.png" alt="Cloudflare"></a>`,
    );
    expect(html).not.toContain(`<span class="external-link">`);
  });

  test("leaves internal links untouched", () => {
    const html = render("[Workers](/workers/)");

    expect(html).toContain(`<a href="/workers/">Workers</a>`);
    expect(html).not.toContain(`target="_blank"`);
    expect(html).not.toContain(`<span class="external-link">`);
  });

  test("deduplicates generated heading ids per document and links each wrapper", () => {
    const html = render("## Repeat\n\n## Repeat");

    expect(html).toContain(`<h2 id="repeat">Repeat</h2>`);
    expect(html).toContain(`<h2 id="repeat-1">Repeat</h2>`);
    expectWrappedHeading(html, 2, "repeat", "Repeat");
    expectWrappedHeading(html, 2, "repeat-1", "Repeat");
  });

  test("resets heading slug deduplication between documents", () => {
    const first = render("## Repeat");
    const second = render("## Repeat");

    expect(first).toContain(`<h2 id="repeat">Repeat</h2>`);
    expect(second).toContain(`<h2 id="repeat">Repeat</h2>`);
    expect(second).not.toContain(`id="repeat-1"`);
  });

  test("uses trailing comment ids, trims the visible heading, and autolinks the custom id", () => {
    const html = render("### Visible title {/* stable-id */}");

    expect(html).toContain(`<h3 id="stable-id">Visible title</h3>`);
    expectWrappedHeading(html, 3, "stable-id", "Visible title");
    expect(html).not.toContain("{/* stable-id */}");
  });

  test("uses MDX expression comment ids and trims the preceding text node", () => {
    const plugin = headingSlugs() as {
      element: {
        visit: (node: {
          type: "element";
          tagName: "h2";
          properties: Record<string, unknown>;
          children: Array<{ type: string; value?: string }>;
        }, ctx: {
          setProperty: (
            node: Record<string, unknown>,
            key: string,
            value: unknown,
          ) => void;
        }) => void;
      };
    };
    const text = { type: "text", value: "Visible title " };
    const node = {
      type: "element" as const,
      tagName: "h2" as const,
      properties: {},
      children: [text, { type: "mdxTextExpression", value: "/* stable-id */" }],
    };

    plugin.element.visit(node, {
      setProperty(target, key, value) {
        if (key === "id" && "properties" in target) {
          (target.properties as Record<string, unknown>)[key] = value;
          return;
        }
        target[key] = value;
      },
    });

    expect(node.properties.id).toBe("stable-id");
    expect(text.value).toBe("Visible title");
  });

  test("turns mermaid fences into raw pre.mermaid blocks instead of highlighted code", () => {
    const diagram = "graph TD\n  A --> B\n";
    const html = render("```mermaid\n" + diagram + "```");

    expect(html).toContain(`<pre class="mermaid">graph TD`);
    expect(html).toContain(`A --&gt; B`);
    expect(html).not.toContain("astro-code");
    expect(html).not.toContain("language-mermaid");
  });

  test("does not transform non-mermaid code fences", () => {
    const html = render("```js\nconsole.log('ok')\n```");

    expect(html).toContain("<pre>");
    expect(html).toContain("<code");
    expect(html).not.toContain(`class="mermaid"`);
  });

  test("escapes raw HTML inside mermaid diagrams", () => {
    const html = render(
      "```mermaid\ngraph TD\n  A[<script>alert(1)</script> & value] --> B[<img src=x onerror=1>]\n```",
    );

    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("&amp; value");
    expect(html).toContain("&lt;img src=x onerror=1&gt;");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
  });

  test("wraps titled images in figures and leaves untitled images as images", () => {
    const titled = render('![Dashboard](/dash.png "Dashboard view")');
    const untitled = render("![Dashboard](/dash.png)");
    const titledRoot = fragment(titled);

    expect(titledRoot.querySelector("figure > img")?.getAttribute("src")).toBe(
      "/dash.png",
    );
    expect(titledRoot.querySelector("figure > img")?.getAttribute("alt")).toBe(
      "Dashboard",
    );
    expect(titledRoot.querySelector("figcaption")?.textContent).toBe(
      "Dashboard view",
    );
    expect(untitled).toBe(`<img src="/dash.png" alt="Dashboard">\n`);
    expect(untitled).not.toContain("<figure>");
    expect(untitled).not.toContain("<figcaption>");
  });

  test("drops entirely empty table headers without removing real headers", () => {
    const emptyHeader = render("|  |  |\n| --- | --- |\n| OS | iOS 11+ |");
    const realHeader = render("| Name | Value |\n| --- | --- |\n| OS | iOS 11+ |");

    expect(emptyHeader).not.toContain("<thead>");
    expect(emptyHeader).toContain("<tbody>");
    expect(emptyHeader).toContain("iOS 11+");
    expect(realHeader).toContain("<thead>");
    expect(realHeader).toContain("Name");
  });

  test("wraps each markdown table in a single keyboard-focusable scroll region", () => {
    const root = fragment(render("| A | B |\n| --- | --- |\n| 1 | 2 |"));
    const wrappers = root.querySelectorAll("div.table-scroll");

    expect(wrappers.length).toBe(1);
    expect(wrappers[0].children.length).toBe(1);
    expect(wrappers[0].firstElementChild?.tagName.toLowerCase()).toBe("table");
    expect(root.querySelectorAll(".table-scroll .table-scroll").length).toBe(0);
    expect(wrappers[0].getAttribute("tabindex")).toBe("0");
    expect(wrappers[0].getAttribute("role")).toBe("region");
    expect(wrappers[0].getAttribute("aria-label")).toBe("Table");
  });

  test("wraps every markdown table on the page", () => {
    const html = render("| A |\n| - |\n| 1 |\n\nprose\n\n| B |\n| - |\n| 2 |");
    expect(fragment(html).querySelectorAll("div.table-scroll > table").length).toBe(2);
  });

  test.each([
    ["h1", "# Release notes"],
    ["h2", "## Release notes"],
    ["h3", "### Release notes"],
  ])("demotes changelog %s headings after autolink wrapping", (_label, markdown) => {
    const changelog = render(markdown, "/repo/src/content/changelog/x.mdx");

    expectWrappedHeading(changelog, 4, "release-notes", "Release notes");
    expect(changelog).not.toContain("<h1");
    expect(changelog).not.toContain("<h2");
    expect(changelog).not.toContain("<h3");
  });

  test("does not demote non-changelog headings or changelog h4+ headings", () => {
    const docs = render(
      "## Release notes",
      "/repo/src/content/docs/workers/release-notes.mdx",
    );
    const changelogH4 = render("#### Release notes", "/repo/src/content/changelog/x.mdx");

    expectWrappedHeading(docs, 2, "release-notes", "Release notes");
    expectWrappedHeading(changelogH4, 4, "release-notes", "Release notes");
  });

  test("registers order-dependent plugins in the expected sequence", () => {
    const names = hastPlugins.map((plugin) =>
      typeof plugin === "function" ? plugin.name : plugin.name,
    );

    expect(names.indexOf("nimbus:external-links")).toBeLessThan(
      names.indexOf("headingSlugs"),
    );
    expect(names.indexOf("headingSlugs")).toBeLessThan(
      names.indexOf("autolinkHeadings"),
    );
    expect(names.indexOf("autolinkHeadings")).toBeLessThan(
      names.indexOf("shiftHeadings"),
    );
  });

  test("keeps smart punctuation disabled", () => {
    const html = render('He said "hello" -- it\'s a test...');

    expect(html).toBe(`<p>He said "hello" -- it's a test...</p>\n`);
  });
});
