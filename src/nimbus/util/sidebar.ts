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
import { getCollection, getEntry } from "astro:content";
import { getBreadcrumbs, getRouteNavigation } from "nimbus-docs";
import type { SectionTitleResolver } from "nimbus-docs";
import type {
	SidebarBadge,
	SidebarGroupItem,
	SidebarItem,
	SidebarTransform,
} from "nimbus-docs/types";

export const sectionTitleResolver: SectionTitleResolver = async ({
	sectionSlug,
	module,
}) => {
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

// Resolve a sidebar node to its href (internal links only).
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

	const product = await getEntry("directory", sectionSlug);
	if (!product) return tree;

	const baseUrl = product.data.entry.url ?? `/${sectionSlug}/`;
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

// Isolate the rail to the current learning path's modules. Replaces the
// framework's `sidebar.isolate`, whose boundary check drops any module holding
// a cross-section `external_link`, collapsing the rail to one wrong module.
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

// Same-origin sibling apps that live OUTSIDE the docs build — separate
// deploys served at the same origin (today just the `/api/` OpenAPI
// reference). A link into one of these leaves the docs app entirely.
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

// External-app (`/api/`) re-marking + internal-redirect arrows, without the
// Agent resources group. The "Overview" convention is applied by nimbus-docs
// via `sidebar.indexDisplay: "overview-leaf"`.
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
			if (avail?.data.availability?.toLowerCase() === "beta") {
				map.set(dirEntry.data.entry.url, { text: "Beta", variant: "caution" });
			}
		}
		return map;
	})();
	return betaBadgeUrlsPromise;
}

/**
 * Walk the tree: remap an existing badge's variant, or inject the auto-Beta
 * badge when a node has none and its URL is a beta product. A group keys off
 * its landing (`indexHref`); links/externals off `href`.
 */
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

// Agent resources + external-app re-marking + badges. The "Overview" convention
// (leaf lift + section-root pinning) is applied downstream by nimbus-docs via
// `sidebar.indexDisplay: "overview-leaf"`, which runs after this transform — so
// `applyBadges` still keys group badges off `indexHref` before it is cleared.
export const docsSidebarTransform: SidebarTransform = async (ctx) => {
	const tree = isolateLearningPath(ctx.tree, ctx.currentSlug);
	const withAgentResources = await agentResourcesTransform({ ...ctx, tree });
	const withExternal = markExternalAppLinks(withAgentResources);
	const withRedirects = markInternalRedirects(withExternal);
	const betaUrls = await getBetaBadgeUrls();
	return applyBadges(withRedirects, betaUrls);
};
