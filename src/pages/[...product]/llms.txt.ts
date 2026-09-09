import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import dedent from "dedent";
import {
	assertLlmsIndexLinkBudget,
	compareLlmsSidebarOrderPath,
	getDelegatedIndexes,
	getLlmsSidebarOrderComparator,
	isDelegatingIndexNavigationAlias,
	isDelegatingLlmsIndex,
	isCoveredByDelegatedIndex,
	type LlmsIndex,
	type LlmsSidebarOrderPart,
} from "../../util/llms-delegation";
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
	const documentIds = new Set(docs.map((page) => page.id));

	const mapped = directory
		.map((entry) => {
			const productUrl = entry.data.entry?.url;
			if (!productUrl || productUrl === "/" || productUrl.includes("#")) {
				return null;
			}

			if (isDisallowedByRobots(productUrl)) return null;

			const urlPath = productUrl.slice(1, -1);
			if (!urlPath) return null;

			const prefix = urlPath;
			const productPages = docs.filter(
				(e) =>
					(e.id.startsWith(prefix + "/") || e.id === prefix) &&
					!isDisallowedByRobots(`/${e.id}/`) &&
					!isExternalRedirect(`/${e.id}/`) &&
					(!e.data.external_link || e.data.external_link.startsWith("/")),
			);
			const pages: typeof productPages = [];
			const navigationPages: typeof productPages = [];
			for (const page of productPages) {
				const navigationOnly =
					isDirectoryOnlyPage(page.body ?? "") ||
					isDelegatingIndexNavigationAlias(
						productUrl,
						page.data.external_link,
						documentIds,
					);
				(navigationOnly ? navigationPages : pages).push(page);
			}

			if (pages.length === 0) return null;

			return {
				params: { product: urlPath },
				props: { entry, pages, navigationPages },
			};
		})
		.filter((p): p is NonNullable<typeof p> => p !== null);

	// Multiple directory entries can share the same entry.url (e.g. sdk,
	// go-sdk, typescript-sdk, python-sdk all point at
	// /fundamentals/api/reference/sdks/). Pick the most generic entry
	// (shortest name) as the canonical representative for each URL.
	const byProduct = new Map<string, (typeof mapped)[number]>();
	for (const p of mapped) {
		const existing = byProduct.get(p.params.product);
		const nameLen = (name: string | undefined) =>
			name === undefined ? Infinity : name.length;

		if (
			!existing ||
			nameLen(p.props.entry.data.name) < nameLen(existing.props.entry.data.name)
		) {
			byProduct.set(p.params.product, p);
		}
	}

	const products = [...byProduct.values()];
	const indexes: LlmsIndex[] = products.map(({ params, props }) => {
		const indexPage = docs.find((page) => page.id === params.product);
		const sidebar = indexPage?.data.sidebar;

		return {
			title:
				props.entry.data.entry?.title ??
				props.entry.data.name ??
				props.entry.id,
			url: `/${params.product}/`,
			description: props.entry.data.meta?.description,
			order: sidebar && typeof sidebar === "object" ? sidebar.order : undefined,
		};
	});

	return products.map((product) => ({
		...product,
		props: {
			...product.props,
			delegatedIndexes: getDelegatedIndexes(
				`/${product.params.product}/`,
				indexes,
			),
		},
	}));
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

function formatIndex(base: string, index: LlmsIndex) {
	const line = `- [${index.title} documentation](${base}${index.url}llms.txt)`;
	return index.description ? line.concat(`: ${index.description}`) : line;
}

interface Section {
	id: string;
	label: string;
	order: number | undefined;
	indexPage: Page | undefined;
	children: Page[];
	delegatedIndexes: LlmsIndex[];
}

function getSidebarOrder(page: Page): number | undefined {
	return page.data.sidebar && typeof page.data.sidebar === "object"
		? page.data.sidebar.order
		: undefined;
}

function getSidebarGroupLabel(page: Page): string | undefined {
	const sidebar = page.data.sidebar;
	if (!sidebar || typeof sidebar !== "object") return undefined;
	const group = sidebar.group;
	return group && typeof group === "object" ? group.label : undefined;
}

function getSidebarOrderPath(
	pageId: string,
	metadataPages: Map<string, Page>,
	fallbackOrder?: number,
): LlmsSidebarOrderPart[] {
	const segments = pageId.split("/");
	return segments.map((_, index) => {
		const id = segments.slice(0, index + 1).join("/");
		const page = metadataPages.get(id);
		const order = page ? getSidebarOrder(page) : undefined;
		const sidebar = page?.data.sidebar;
		const label =
			(page ? getSidebarGroupLabel(page) : undefined) ??
			(sidebar && typeof sidebar === "object" ? sidebar.label : undefined) ??
			page?.data.title ??
			segments[index];

		return {
			order:
				order ??
				(index === segments.length - 1 ? fallbackOrder : undefined) ??
				Number.MAX_SAFE_INTEGER,
			label,
			id,
		};
	});
}

function buildSections(
	prefix: string,
	pages: Page[],
	metadataPages: Map<string, Page>,
	delegatedIndexes: LlmsIndex[],
): Section[] | null {
	const hasDelegation = delegatedIndexes.length > 0;
	const childPages = pages.filter(
		(e) =>
			e.id !== prefix && !isCoveredByDelegatedIndex(e.id, delegatedIndexes),
	);
	const sectionMap = new Map<string, Section>();

	for (const page of childPages) {
		const relative = page.id.slice(prefix.length + 1);
		const firstSegment = relative.split("/")[0];
		const sectionId = `${prefix}/${firstSegment}`;

		if (!sectionMap.has(sectionId)) {
			sectionMap.set(sectionId, {
				id: sectionId,
				label: firstSegment,
				order: undefined,
				indexPage: undefined,
				children: [],
				delegatedIndexes: [],
			});
		}

		const section = sectionMap.get(sectionId)!;

		if (page.id === sectionId) {
			section.indexPage = page;
			section.label = hasDelegation
				? (getSidebarGroupLabel(page) ?? page.data.title)
				: page.data.title;
			section.order = getSidebarOrder(page);
		} else {
			section.children.push(page);
		}
	}

	for (const index of delegatedIndexes) {
		const indexPrefix = index.url.slice(1, -1);
		const relative = indexPrefix.slice(prefix.length + 1);
		const firstSegment = relative.split("/")[0];
		const sectionId = `${prefix}/${firstSegment}`;

		if (!sectionMap.has(sectionId)) {
			sectionMap.set(sectionId, {
				id: sectionId,
				label: indexPrefix === sectionId ? index.title : firstSegment,
				order: indexPrefix === sectionId ? index.order : undefined,
				indexPage: undefined,
				children: [],
				delegatedIndexes: [],
			});
		}

		sectionMap.get(sectionId)!.delegatedIndexes.push(index);
	}

	if (hasDelegation) {
		for (const [sectionId, section] of sectionMap) {
			const metadataPage = metadataPages.get(sectionId);
			if (metadataPage) {
				section.label =
					getSidebarGroupLabel(metadataPage) ?? metadataPage.data.title;
				section.order = getSidebarOrder(metadataPage);
			}
		}
	}

	const sections = [...sectionMap.values()];
	const hasOrdering = sections.some((s) => s.order !== undefined);
	if (!hasOrdering) return null;

	sections.sort(getLlmsSidebarOrderComparator(hasDelegation));

	return sections;
}

export const GET: APIRoute<Props> = async ({ props, url }) => {
	const base = url.origin;
	const { entry, pages, navigationPages, delegatedIndexes } = props;
	const title = entry.data.entry?.title ?? entry.data.name ?? entry.id;
	const productUrl = entry.data.entry?.url ?? `/${entry.id}/`;
	const description = entry.data.meta?.description;

	const prefix = productUrl.slice(1, -1);
	const hasDelegation = delegatedIndexes.length > 0;
	const metadataPages = new Map(
		[...pages, ...navigationPages].map((page) => [page.id, page]),
	);
	const rootPage = pages.find((e) => e.id === prefix);
	const navigationRoot = navigationPages.some((e) => e.id === prefix);
	const resolvedProductUrl = resolveRedirect(productUrl);
	const rootLink = rootPage
		? formatPage(base, rootPage)
		: isDelegatingLlmsIndex(productUrl) && navigationRoot
			? undefined
			: `- [${title}](${base}${resolvedProductUrl}index.md)`;

	const sections = buildSections(
		prefix,
		pages,
		metadataPages,
		delegatedIndexes,
	);

	let pageContent: string;

	if (sections) {
		pageContent = sections
			.map((section) => {
				const heading = `## ${section.label}`;
				const lines: string[] = [];
				if (section.indexPage) {
					lines.push(formatPage(base, section.indexPage));
				}
				if (hasDelegation) {
					const children = [
						...section.delegatedIndexes.map((index) => ({
							label: index.title,
							orderPath: getSidebarOrderPath(
								index.url.slice(1, -1),
								metadataPages,
								index.order,
							),
							line: formatIndex(base, index),
						})),
						...section.children.map((child) => ({
							label: child.data.title,
							orderPath: getSidebarOrderPath(child.id, metadataPages),
							line: formatPage(base, child),
						})),
					].sort(compareLlmsSidebarOrderPath);
					lines.push(...children.map((child) => child.line));
				} else {
					lines.push(
						...section.children.map((child) => formatPage(base, child)),
					);
				}
				return `${heading}\n\n${lines.join("\n")}`;
			})
			.join("\n\n");
	} else {
		const childPages = pages.filter(
			(e) =>
				e.id !== prefix && !isCoveredByDelegatedIndex(e.id, delegatedIndexes),
		);
		pageContent = [
			...delegatedIndexes.map((index) => formatIndex(base, index)),
			...childPages.map((e) => formatPage(base, e)),
		].join("\n");
	}

	const pagesContent = [rootLink, pageContent].filter(Boolean).join("\n\n");
	const pagesSection = sections
		? [rootLink ? `## Overview\n\n${rootLink}` : undefined, pageContent]
				.filter(Boolean)
				.join("\n\n")
		: `## ${title} documentation pages\n\n${pagesContent}`;
	const linksDescription =
		delegatedIndexes.length > 0
			? "Links below point directly to Markdown versions of pages or to a more detailed `llms.txt` index for a section."
			: "Links below point directly to Markdown versions of each page.";

	const markdown = dedent(`
		# ${title}

		${description ?? ""}

		> ${linksDescription} Any page can also be retrieved as Markdown by sending an \`Accept: text/markdown\` header to the page's URL without the \`index.md\` suffix (for example, \`curl -H "Accept: text/markdown" ${base}${productUrl}\`).
		>
		> For other Cloudflare products, see the [Cloudflare documentation directory](${base}/llms.txt).

		${pagesSection}
	`);
	assertLlmsIndexLinkBudget(productUrl, markdown);

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};
