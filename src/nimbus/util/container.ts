/**
 * entryToString — render a content-collection entry to an HTML string.
 *
 * CF source: cloudflare-docs/src/util/container.ts
 *
 * Used only by the `individual_page` changelog path (ProductReleaseNotes +
 * the RSS route), where a release-notes entry points at a full docs page and
 * that page's rendered body is inlined. None of the YAML in this app uses
 * `individual_page` today, so this is contract-fidelity plumbing: it keeps
 * the upstream behaviour available the moment such an entry is added.
 *
 * If a renderer is already attached (`entry.rendered.html`) it's returned
 * directly; otherwise the entry is rendered through an experimental Astro
 * container with the MDX + React server renderers (the two this app ships).
 */
import { experimental_AstroContainer } from "astro/container";
import reactRenderer from "@astrojs/react/server.js";
import mdxRenderer from "@astrojs/mdx/server.js";
import { render, type CollectionEntry } from "astro:content";
import { components } from "~/mdx-components";

export async function entryToString(
  entry: CollectionEntry<"docs" | "changelog">,
  locals: App.Locals,
) {
  if (entry.rendered?.html) {
    return entry.rendered.html;
  }

  const container = await experimental_AstroContainer.create({});
  container.addServerRenderer({ name: "astro:jsx", renderer: mdxRenderer });
  container.addServerRenderer({
    name: "@astrojs/react",
    renderer: reactRenderer,
  });

  const { Content } = await render(entry);

  // Pass the global MDX component registry so entries that use components
  // without an explicit import (e.g. <Aside>) resolve, matching how the
  // docs pipeline renders `<Content components={components} />`.
  const html = await container.renderToString(Content, {
    props: { components },
    params: { slug: entry.id },
    locals,
  });

  return html;
}
