// Cloudflare nav conventions for the nimbus-docs nav surface: section titles,
// breadcrumb relabeling, sidebar transforms, and badges.
import { getCollection, getEntry } from "astro:content";
import { getBreadcrumbs, getRouteNavigation } from "@cloudflare/nimbus-docs";
import type { SectionTitleResolver } from "@cloudflare/nimbus-docs";
import type {
	SidebarBadge,
	SidebarGroupItem,
	SidebarItem,
	SidebarTransform,
} from "@cloudflare/nimbus-docs/types";
import { getDirectoryEntryBySection } from "~/util/directory";

export const sectionTitleResolver: SectionTitleResolver = async ({
	sectionSlug,
	module,
}) => {
	if (sectionSlug === "learning-paths") {
		if (!module) return undefined;
		const entry = await getEntry("learning-paths", module);
		return entry ? { rail: `${entry.data.title} (Learning Paths)` } : undefined;
	}

	const entry = await getDirectoryEntryBySection(sectionSlug);
	return entry ? { rail: entry.data.entry?.title } : undefined;
};

// Product title from `directory`. Memoized per build (dev title edits need a restart).
const sectionTitleCache = new Map<string, string | undefined>();
async function directoryTitle(seg0: string): Promise<string | undefined> {
	if (sectionTitleCache.has(seg0)) return sectionTitleCache.get(seg0);
	const entry = await getDirectoryEntryBySection(seg0);
	const title = entry?.data.entry?.title;
	sectionTitleCache.set(seg0, title);
	return title;
}

function firstSegment(path: string): string | undefined {
	return path.replace(/^\/+|\/+$/g, "").split("/")[0] || undefined;
}

// Resolve a sidebar node to its href (internal links only).
function nodeHref(node: SidebarItem): string | undefined {
	if (node.type === "link") return node.href;
	if (node.type === "external") return undefined;
	return node.indexIsExternal ? undefined : node.indexHref;
}

// Breadcrumb label: rewrite the section crumb from dir slug (`workers-ai`) to
// its directory title (`Workers AI`); all other crumbs keep node.label.
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
		? firstSegment(href) === seg0 &&
			!href.replace(/^\/+|\/+$/g, "").includes("/")
		: node.type === "group" && node.label === seg0;
	if (!isSectionCrumb) return undefined;
	return directoryTitle(seg0);
}

/** `getBreadcrumbs` with the CF section-title resolver always applied. */
export function getCfBreadcrumbs(
	slug: Parameters<typeof getBreadcrumbs>[0],
	options?: Parameters<typeof getBreadcrumbs>[1],
): ReturnType<typeof getBreadcrumbs> {
	return getBreadcrumbs(slug, {
		...options,
		resolveLabel: breadcrumbLabelResolver,
	});
}

/** `getRouteNavigation` with the CF section-title resolver always applied. */
export function getCfRouteNavigation(
	options: Parameters<typeof getRouteNavigation>[0],
): ReturnType<typeof getRouteNavigation> {
	return getRouteNavigation({
		...options,
		resolveLabel: breadcrumbLabelResolver,
	});
}

const EXTERNAL_LINK_ARROW = " \u2197";

// Append the external-link arrow, unless already present.
function appendExternalArrow(label: string): string {
	return label.endsWith(EXTERNAL_LINK_ARROW)
		? label
		: label + EXTERNAL_LINK_ARROW;
}

// `docs-for-agents` is itself the agent-facing surface, so it gets no group.
const NO_LLM_RESOURCES = new Set(["docs-for-agents"]);

// `sectionSlug` is seg0 (the product); key off its `directory` entry.
export const agentResourcesTransform: SidebarTransform = async ({
	tree,
	sectionSlug,
}) => {
	if (!sectionSlug || NO_LLM_RESOURCES.has(sectionSlug)) return tree;

	const product = await getDirectoryEntryBySection(sectionSlug);
	if (!product) return tree;

	const baseUrl = product.data.entry?.url ?? `/${sectionSlug}/`;
	const links: Array<[string, string]> = [
		["Agent setup", "/agent-setup/"],
		["Cloudflare Skills", "https://github.com/cloudflare/skills"],
		["Code Mode MCP Server", "https://github.com/cloudflare/mcp"],
		[
			"Domain-specific MCP Servers",
			"https://github.com/cloudflare/mcp-server-cloudflare",
		],
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

const LEARNING_PATHS_SECTION = "learning-paths";

const trimSlashes = (href: string): string => href.replace(/^\/+|\/+$/g, "");

function someInternalHref(
	item: SidebarItem,
	pred: (href: string) => boolean,
): boolean {
	if (item.type === "external") return false;
	if (item.type === "link") {
		return !item._neverActive && pred(item.href);
	}
	const ownIndexMatches =
		!!item.indexHref &&
		!item.indexIsExternal &&
		!item._indexNeverActive &&
		pred(item.indexHref);
	return (
		ownIndexMatches ||
		item.children.some((child) => someInternalHref(child, pred))
	);
}

// Isolate the rail to the current learning path's modules. The framework's
// `sidebar.isolate` mishandles cross-section external_links, so we do it here.
export function isolateLearningPath(
	tree: SidebarItem[],
	currentSlug: string,
): SidebarItem[] {
	const segs = currentSlug.split("/").filter(Boolean);
	if (segs[0] !== LEARNING_PATHS_SECTION || !segs[1]) return tree;
	const prefix = `/${segs[0]}/${segs[1]}/`;
	const currentKey = trimSlashes(`/${segs.join("/")}`);

	const groups = tree.filter(
		(item): item is SidebarGroupItem => item.type === "group",
	);
	const owner =
		groups.find((g) =>
			someInternalHref(g, (href) => trimSlashes(href) === currentKey),
		) ??
		groups.find((g) => someInternalHref(g, (href) => href.startsWith(prefix)));

	return owner ? owner.children : tree;
}

// Same-origin sibling apps outside the docs build (today just `/api/`).
const EXTERNAL_APP_PREFIXES = ["/api/"];

function isExternalAppHref(href: string): boolean {
	return EXTERNAL_APP_PREFIXES.some(
		(prefix) => href === prefix || href.startsWith(prefix),
	);
}

// Mark leaves pointing at a separate same-origin app (`/api/`) as external:
// new tab + `↗` arrow. In-docs redirects are left as same-tab links.
function markExternalAppLinks(items: SidebarItem[]): SidebarItem[] {
	return items.map((item) => {
		if (item.type === "group") {
			return { ...item, children: markExternalAppLinks(item.children) };
		}
		if (item.type === "link" && isExternalAppHref(item.href)) {
			return {
				type: "external",
				label: appendExternalArrow(item.label),
				href: item.href,
				badge: item.badge,
				order: item.order,
			};
		}
		return item;
	});
}

// Append the external-link arrow to internal cross-section redirects
// (relative `external_link` → same-tab `type: "link"` flagged `_neverActive`).
function markInternalRedirects(items: SidebarItem[]): SidebarItem[] {
	return items.map((item) => {
		if (item.type === "group") {
			return { ...item, children: markInternalRedirects(item.children) };
		}
		if (item.type === "link" && item._neverActive) {
			return {
				...item,
				label: appendExternalArrow(item.label),
			};
		}
		return item;
	});
}

// External-app re-marking + internal-redirect arrows (no Agent resources group).
export const externalAppLinksTransform: SidebarTransform = ({ tree }) =>
	markInternalRedirects(markExternalAppLinks(tree));

// --- Badges -----------------------------------------------------------------

// Map a default-variant badge's text to its variant; non-default variants and
// unmapped text pass through unchanged.
function inferBadgeVariant(badge: SidebarBadge): SidebarBadge {
	const text = typeof badge === "string" ? badge : badge.text;
	const variant =
		typeof badge === "string" ? "default" : (badge.variant ?? "default");
	if (variant !== "default") return badge;
	switch (text) {
		case "Beta":
			return { text, variant: "caution" };
		case "New":
			return { text, variant: "note" };
		case "Deprecated":
		case "Legacy":
			return { text, variant: "danger" };
		default:
			return badge;
	}
}

// Fixed badge for external-app links by URL shape (`/api` → "API", MCP server
// repo → "MCP"). Takes precedence over authored/auto-Beta badges.
function getExternalBadge(href: string): SidebarBadge | undefined {
	if (href.startsWith("/api")) return { text: "API", variant: "note" };
	if (href.includes("/mcp-server-cloudflare"))
		return { text: "MCP", variant: "note" };
	return undefined;
}

// URL → "Beta" badge, from directory entries whose product-availability is
// "beta". Built once per build (the collections don't change mid-build).
let betaBadgeUrlsPromise: Promise<Map<string, SidebarBadge>> | undefined;
function getBetaBadgeUrls(): Promise<Map<string, SidebarBadge>> {
	betaBadgeUrlsPromise ??= (async () => {
		const [directory, productAvailability] = await Promise.all([
			getCollection("directory"),
			getCollection("product-availability"),
		]);
		const map = new Map<string, SidebarBadge>();
		for (const dirEntry of directory) {
			const avail = productAvailability.find((e) => e.id === dirEntry.data.id);
			if (
				avail?.data.availability?.toLowerCase() === "beta" &&
				dirEntry.data.entry?.url
			) {
				map.set(dirEntry.data.entry.url, { text: "Beta", variant: "caution" });
			}
		}
		return map;
	})();
	return betaBadgeUrlsPromise;
}

// Remap a badge's variant, or inject an auto-Beta badge for beta-product URLs.
// Groups key off `indexHref`; links/externals off `href`.
function applyBadges(
	items: SidebarItem[],
	betaUrls: Map<string, SidebarBadge>,
): SidebarItem[] {
	return items.map((item) => {
		if (item.type === "group") {
			const badge = item.badge
				? inferBadgeVariant(item.badge)
				: item.indexHref
					? betaUrls.get(item.indexHref)
					: undefined;
			return { ...item, badge, children: applyBadges(item.children, betaUrls) };
		}
		const badge =
			getExternalBadge(item.href) ??
			(item.badge ? inferBadgeVariant(item.badge) : betaUrls.get(item.href));
		return { ...item, badge };
	});
}

// Isolate learning paths + agent resources + external-app re-marking + badges.
// Runs before nimbus-docs' overview-leaf pass, so group badges still see `indexHref`.
export const docsSidebarTransform: SidebarTransform = async (ctx) => {
	const tree = isolateLearningPath(ctx.tree, ctx.currentSlug);
	const withAgentResources = await agentResourcesTransform({ ...ctx, tree });
	const withExternal = markExternalAppLinks(withAgentResources);
	const withRedirects = markInternalRedirects(withExternal);
	const betaUrls = await getBetaBadgeUrls();
	return applyBadges(withRedirects, betaUrls);
};
