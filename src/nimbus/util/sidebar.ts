/**
 * Cloudflare navigation conventions, expressed as call-site callbacks for
 * the nimbus-docs nav surface:
 *
 *   - `sectionTitleResolver` — the rail header title, passed to
 *     `getSectionTitle`. Learning paths get the per-module title suffixed
 *     with "(Learning Paths)"; every other product uses its `directory`
 *     entry title.
 *   - `agentResourcesTransform` — appends the "Agent resources" group to a
 *     module's rail when that module has a `directory` entry, passed to
 *     `getSidebar`.
 */
import { getEntry } from "astro:content";
import type { SectionTitleResolver } from "nimbus-docs";
import type { SidebarItem, SidebarTransform } from "nimbus-docs/types";

export const sectionTitleResolver: SectionTitleResolver = async ({ sectionSlug, module }) => {
  if (sectionSlug === "learning-paths") {
    if (!module) return undefined;
    const entry = await getEntry("learning-paths", module);
    return entry ? { rail: `${entry.data.title} (Learning Paths)` } : undefined;
  }

  if (sectionSlug === "1.1.1.1") {
    const entry = await getEntry("directory", "1111");
    return entry ? { rail: entry.data.entry.title } : undefined;
  }

  const entry = await getEntry("directory", sectionSlug);
  return entry ? { rail: entry.data.entry.title } : undefined;
};

const EXTERNAL_LINK_ARROW = " \u2197";

export const agentResourcesTransform: SidebarTransform = async ({ tree, module }) => {
  if (!module) return tree;

  const product = await getEntry("directory", module);
  if (!product) return tree;

  const baseUrl = product.data.entry.url ?? `/${module}/`;
  const links: Array<[string, string]> = [
    ["Agent setup", "/agent-setup/"],
    ["Cloudflare Skills", "https://github.com/cloudflare/skills"],
    ["Code Mode MCP Server", "https://github.com/cloudflare/mcp"],
    ["Domain-specific MCP Servers", "https://github.com/cloudflare/mcp-server-cloudflare"],
    [`${product.data.name} llms.txt`, `${baseUrl}llms.txt`],
    [`${product.data.name} llms-full.txt`, `${baseUrl}llms-full.txt`],
    ["Cloudflare Docs llms.txt", "/llms.txt"],
    ["Cloudflare Docs llms-full.txt", "/llms-full.txt"],
  ];

  const agentResources: SidebarItem = {
    type: "group",
    label: "Agent resources",
    order: Number.MAX_VALUE,
    collapsed: true,
    children: links.map(([label, href], i) => ({
      type: "external",
      label: label + EXTERNAL_LINK_ARROW,
      href,
      order: i,
    })),
  };

  return [...tree, agentResources];
};
