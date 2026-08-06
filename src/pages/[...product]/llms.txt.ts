import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import dedent from "dedent";
import { isExternalRedirect, resolveRedirect } from "../../util/redirects";
import { isDisallowedByRobots } from "../../util/robots";

const DIRECTORY_PROSE_THRESHOLD = 250;

function isDirectoryOnlyPage(body: string): boolean {
	if (!body.includes("DirectoryListing")) return false;
	let prose = body.replace(/^import\s+.*?from\s+['"].*?['"];?\s*\n?/gm, "");
	prose = prose.replace(/<[A-Z][^>]*\/>/g, "");
	prose = prose.replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "");
	prose = prose.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
	return prose.trim().length <= DIRECTORY_PROSE_THRESHOLD;
}

export const getStaticPaths = (async () => {
	const directory = await getCollection("directory");
	const docs = await getCollection("docs");

	// Deduplicate by URL path: multiple directory entries may share the same
	// entry.url (e.g. SDK variants). Keep only the first per URL.
	const seen = new Set<string>();

	return directory
		.map((entry) => {
			const productUrl = entry.data.entry?.url;
			if (!productUrl || productUrl === "/" || productUrl.includes("#")) {
				return null;
			}

			if (isDisallowedByRobots(productUrl)) return null;

			const urlPath = productUrl.slice(1, -1);
			if (!urlPath) return null;

			if (seen.has(urlPath)) return null;
			seen.add(urlPath);

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

function getSidebarOrder(page: Page): number | undefined {
	return page.data.sidebar && typeof page.data.sidebar === "object"
		? page.data.sidebar.order
		: undefined;
}

function buildSections(prefix: string, pages: Page[]): Section[] | null {
	const childPages = pages.filter((e) => e.id !== prefix);
	const sectionMap = new Map<string, Section>();

	for (const page of childPages) {
		const relative = page.id.slice(prefix.length + 1);
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
			section.indexPage = page;
			section.label = page.data.title;
			section.order = getSidebarOrder(page);
		} else {
			section.children.push(page);
		}
	}

	const sections = [...sectionMap.values()];
	const hasOrdering = sections.some((s) => s.order !== undefined);
	if (!hasOrdering) return null;

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
	const title = entry.data.entry?.title ?? entry.data.name ?? entry.id;
	const productUrl = entry.data.entry?.url ?? `/${entry.id}/`;
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

		${pagesSection}
	`);

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};
