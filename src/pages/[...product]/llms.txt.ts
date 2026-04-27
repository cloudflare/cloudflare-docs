import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import dedent from "dedent";
import { isExternalRedirect, resolveRedirect } from "~/util/redirects";
import { isDisallowedByRobots } from "~/util/robots";

/**
 * Maximum number of prose characters allowed alongside a DirectoryListing
 * component before a page is considered to have real standalone content.
 * Pages at or below this threshold are treated as pure navigation containers
 * and excluded from llms.txt — their child pages are already listed individually.
 */
const DIRECTORY_PROSE_THRESHOLD = 250;

/**
 * Returns true if the page body consists of a DirectoryListing component with
 * DIRECTORY_PROSE_THRESHOLD characters or fewer of surrounding prose. These
 * pages are pure section index/navigation containers with no standalone content
 * worth including in llms.txt — the child pages are already listed individually.
 */
function isDirectoryOnlyPage(body: string): boolean {
	if (!body.includes("DirectoryListing")) return false;
	// Strip import lines
	let prose = body.replace(/^import\s+.*?from\s+['"].*?['"];?\s*\n?/gm, "");
	// Strip self-closing component tags e.g. <DirectoryListing />
	prose = prose.replace(/<[A-Z][^>]*\/>/g, "");
	// Strip paired component tags and their children e.g. <Description>...</Description>
	prose = prose.replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "");
	// Strip JSX comments
	prose = prose.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
	return prose.trim().length <= DIRECTORY_PROSE_THRESHOLD;
}

export const getStaticPaths = (async () => {
	const directory = await getCollection("directory");

	const docs = await getCollection("docs");

	return directory
		.map((entry) => {
			const productUrl = entry.data.entry.url;
			// Derive route segments from the product's canonical URL.
			// e.g. /cloudflare-for-platforms/cloudflare-for-saas/ → ["cloudflare-for-platforms", "cloudflare-for-saas"]
			// e.g. /workers/ → ["workers"]
			// Skip the root URL "/" (home entry) and fragment-only anchors (e.g. /path/#anchor)
			if (!productUrl || productUrl === "/" || productUrl.includes("#"))
				return null;

			// Skip products whose top-level URL is disallowed by robots.txt
			if (isDisallowedByRobots(productUrl)) return null;

			const urlPath = productUrl.slice(1, -1); // strip leading/trailing slashes
			if (!urlPath) return null;

			const prefix = urlPath;
			const pages = docs.filter(
				(e) =>
					(e.id.startsWith(prefix + "/") || e.id === prefix) &&
					!isDirectoryOnlyPage(e.body ?? "") &&
					!isDisallowedByRobots(`/${e.id}/`) &&
					!isExternalRedirect(`/${e.id}/`) &&
					(!e.data.external_link || e.data.external_link.startsWith("/")),
			);

			if (pages.length === 0) return null;

			return {
				params: { product: urlPath },
				props: { entry, pages },
			};
		})
		.filter((p): p is NonNullable<typeof p> => p !== null);
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

type Page = InferGetStaticPropsType<typeof getStaticPaths>["pages"][number];

function formatPage(base: string, e: Page) {
	const path = e.data.external_link?.startsWith("/")
		? resolveRedirect(e.data.external_link)
		: resolveRedirect(`/${e.id}/`);
	const line = `- [${e.data.title}](${base}${path}index.md)`;
	return e.data.description ? line.concat(`: ${e.data.description}`) : line;
}

interface Section {
	label: string;
	order: number | undefined;
	indexPage: Page | undefined;
	children: Page[];
}

function buildSections(prefix: string, pages: Page[]): Section[] | null {
	const childPages = pages.filter((e) => e.id !== prefix);

	// Find section index pages: pages that are exactly one directory level
	// below the prefix and have children under them.
	// e.g., for prefix "workers", find "workers/get-started", "workers/configuration", etc.
	const sectionMap = new Map<string, Section>();

	for (const page of childPages) {
		const relative = page.id.slice(prefix.length + 1); // e.g., "get-started" or "get-started/guide"
		const firstSegment = relative.split("/")[0];
		const sectionId = `${prefix}/${firstSegment}`;

		if (!sectionMap.has(sectionId)) {
			sectionMap.set(sectionId, {
				label: firstSegment,
				order: undefined,
				indexPage: undefined,
				children: [],
			});
		}

		const section = sectionMap.get(sectionId)!;

		if (page.id === sectionId) {
			// This is the section index page
			section.indexPage = page;
			section.label = page.data.title;
			section.order = page.data.sidebar?.order;
		} else {
			section.children.push(page);
		}
	}

	const sections = [...sectionMap.values()];

	// Check if any sections have explicit sidebar ordering
	const hasOrdering = sections.some((s) => s.order !== undefined);
	if (!hasOrdering) return null;

	// Sort sections: those with order first (by order), then those without (alphabetically by label)
	sections.sort((a, b) => {
		if (a.order !== undefined && b.order !== undefined)
			return a.order - b.order;
		if (a.order !== undefined) return -1;
		if (b.order !== undefined) return 1;
		return a.label.localeCompare(b.label);
	});

	return sections;
}

export const GET: APIRoute<Props> = async ({ props, url }) => {
	const base = url.origin;
	const { entry, pages } = props;
	const { title, url: productUrl } = entry.data.entry;
	const description = entry.data.meta?.description;

	const prefix = productUrl.slice(1, -1);
	const rootPage = pages.find((e) => e.id === prefix);
	const resolvedProductUrl = resolveRedirect(productUrl);
	const rootLink = rootPage
		? formatPage(base, rootPage)
		: `- [${title}](${base}${resolvedProductUrl}index.md)`;

	const sections = buildSections(prefix, pages);

	let pageContent: string;

	if (sections) {
		// Grouped output with section headers
		pageContent = sections
			.map((section) => {
				const heading = `## ${section.label}`;
				const lines: string[] = [];
				if (section.indexPage) {
					lines.push(formatPage(base, section.indexPage));
				}
				for (const child of section.children) {
					lines.push(formatPage(base, child));
				}
				return `${heading}\n\n${lines.join("\n")}`;
			})
			.join("\n\n");
	} else {
		// Flat fallback
		const childPages = pages.filter((e) => e.id !== prefix);
		pageContent = childPages.map((e) => formatPage(base, e)).join("\n");
	}

	const pagesSection = sections
		? `## Overview\n\n${rootLink}\n\n${pageContent}`
		: `## ${title} documentation pages\n\n${rootLink}\n\n${pageContent}`;

	const markdown = dedent(`
		# ${title}

		${description ?? ""}

		> Links below point directly to Markdown versions of each page. Any page can also be retrieved as Markdown by sending an \`Accept: text/markdown\` header to the page's URL without the \`index.md\` suffix (for example, \`curl -H "Accept: text/markdown" ${base}${productUrl}\`).
		>
		> For other Cloudflare products, see the [Cloudflare documentation directory](${base}/llms.txt).
		>
		> Use [${title} llms-full.txt](${base}${productUrl}llms-full.txt) for the complete ${title} documentation in a single file, intended for offline indexing, bulk vectorization, or large-context models.

		${pagesSection}
	`);

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};
