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
import { getBreadcrumbs, getRouteNavigation } from "nimbus-docs";
import type { SectionTitleResolver } from "nimbus-docs";
import type { SidebarItem, SidebarTransform } from "nimbus-docs/types";

export const sectionTitleResolver: SectionTitleResolver = async ({ sectionSlug, module }) => {
  if (sectionSlug === "learning-paths") {
    if (!module) return undefined;
    const entry = await getEntry("learning-paths", module);
    return entry ? { rail: `${entry.data.title} (Learning Paths)` } : undefined;
  }

  const entry = await getEntry("directory", sectionSlug);
  return entry ? { rail: entry.data.entry.title } : undefined;
};

// Display title for a top-level product, from the `directory` collection — the
// same source the rail uses. Memoized: a build resolves each of the ~105 slugs
// once. (Not cleared by clearNavCaches, so dev edits to a title need a restart.)
const sectionTitleCache = new Map<string, string | undefined>();
async function directoryTitle(seg0: string): Promise<string | undefined> {
  if (sectionTitleCache.has(seg0)) return sectionTitleCache.get(seg0);
  const entry = await getEntry("directory", seg0);
  const title = entry?.data.entry.title;
  sectionTitleCache.set(seg0, title);
  return title;
}

function firstSegment(path: string): string | undefined {
  return path.replace(/^\/+|\/+$/g, "").split("/")[0] || undefined;
}

// Mirrors nimbus-docs' internal `nodeHref`.
function nodeHref(node: SidebarItem): string | undefined {
  if (node.type === "link") return node.href;
  if (node.type === "external") return undefined;
  return node.indexIsExternal ? undefined : node.indexHref;
}

/**
 * Breadcrumb `resolveLabel`: rewrite the product/section crumb from its raw dir
 * slug (`workers-ai`) to the directory title (`Workers AI`). Only the section
 * crumb is touched — identified by `href === /<seg0>/` or, for an index-less
 * section, a top-level group whose label is the slug. All other crumbs keep
 * `node.label` (page titles), short-circuiting before any lookup.
 */
async function breadcrumbLabelResolver({
  node,
  slug,
}: {
  node: SidebarItem;
  slug: string;
}): Promise<string | undefined> {
  const seg0 = firstSegment(slug);
  if (!seg0) return undefined;
  const href = nodeHref(node);
  const isSectionCrumb = href
    ? firstSegment(href) === seg0 && !href.replace(/^\/+|\/+$/g, "").includes("/")
    : node.type === "group" && node.label === seg0;
  if (!isSectionCrumb) return undefined;
  return directoryTitle(seg0);
}

/** `getBreadcrumbs` with the CF section-title resolver always applied. */
export function getCfBreadcrumbs(
  slug: Parameters<typeof getBreadcrumbs>[0],
  options?: Parameters<typeof getBreadcrumbs>[1],
): ReturnType<typeof getBreadcrumbs> {
  return getBreadcrumbs(slug, { ...options, resolveLabel: breadcrumbLabelResolver });
}

/** `getRouteNavigation` with the CF section-title resolver always applied. */
export function getCfRouteNavigation(
  options: Parameters<typeof getRouteNavigation>[0],
): ReturnType<typeof getRouteNavigation> {
  return getRouteNavigation({ ...options, resolveLabel: breadcrumbLabelResolver });
}

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

// Same-origin sibling apps that live OUTSIDE the docs build — separate
// deploys served at the same origin (today just the `/api/` OpenAPI
// reference). A link into one of these leaves the docs app entirely.
const EXTERNAL_APP_PREFIXES = ["/api/"];

function isExternalAppHref(href: string): boolean {
  return EXTERNAL_APP_PREFIXES.some(
    (prefix) => href === prefix || href.startsWith(prefix),
  );
}

/**
 * Re-mark sidebar leaves that point at a separate same-origin app (the
 * `/api/` reference) as **external** — new tab + `↗` arrow — matching
 * Starlight, which gives every `external_link` the external treatment.
 *
 * nimbus-docs classifies a *relative* `external_link` (`/api/`) as an
 * internal cross-section redirect (same tab, no arrow). That's correct for
 * in-docs redirects, but wrong for `/api/`, which is a separate application,
 * not another docs page. This transform restores the Starlight affordance
 * for those leaves only, leaving genuine in-docs redirects untouched.
 */
function markExternalAppLinks(items: SidebarItem[]): SidebarItem[] {
  return items.map((item) => {
    if (item.type === "group") {
      return { ...item, children: markExternalAppLinks(item.children) };
    }
    if (item.type === "link" && isExternalAppHref(item.href)) {
      return {
        type: "external",
        label: item.label.endsWith(EXTERNAL_LINK_ARROW)
          ? item.label
          : item.label + EXTERNAL_LINK_ARROW,
        href: item.href,
        badge: item.badge,
        order: item.order,
      };
    }
    return item;
  });
}

/**
 * Standalone transform for routes that don't append the Agent resources
 * group — just the external-app (`/api/`) re-marking.
 */
export const externalAppLinksTransform: SidebarTransform = ({ tree }) =>
  markExternalAppLinks(tree);

/**
 * The transform used by the main docs route: Agent resources group +
 * external-app (`/api/`) re-marking, applied to the full tree.
 */
export const docsSidebarTransform: SidebarTransform = async (ctx) => {
  const withAgentResources = await agentResourcesTransform(ctx);
  return markExternalAppLinks(withAgentResources);
};
