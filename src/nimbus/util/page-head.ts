// Pure, unit-tested helpers for PageHead.astro's <head> derivation.

import { formatContentType } from "./content-type";

export type SchemaType = "BlogPosting" | "WebPage" | "TechArticle";

/** `<title>`: `${base} · ${suffix}` when a suffix applies, else a raw
 *  head.title override or `${title} | ${siteTitle}`. */
export function resolvePageTitle({
	title,
	titleOverride,
	titleSuffix,
	siteTitle,
}: {
	title: string;
	titleOverride?: string;
	titleSuffix?: string;
	siteTitle: string;
}): string {
	const baseTitle = titleOverride ? titleOverride.split(" | ")[0] : title;
	return titleSuffix
		? `${baseTitle} · ${titleSuffix}`
		: (titleOverride ?? `${title} | ${siteTitle}`);
}

/** Favicon link: first of svg > ico > png that exists, else svg. */
export function resolveFavicon(exists: (file: string) => boolean): {
	file: string;
	type: string;
} {
	const candidates = [
		{ file: "favicon.svg", type: "image/svg+xml" },
		{ file: "favicon.ico", type: "image/x-icon" },
		{ file: "favicon.png", type: "image/png" },
	];
	return candidates.find((c) => exists(c.file)) ?? candidates[0];
}

const CHANGELOG_OG_IMAGE = "/og-changelog.png";

const DEFAULT_OG_IMAGE = "/og-docs.png";

/** OG image path: prop > changelog card > config > opengraph.png > logo.png >
 *  default docs card. */
export function resolveSocialImagePath({
	socialImage,
	configImage,
	isChangelog,
	exists,
}: {
	socialImage?: string;
	configImage?: string;
	isChangelog?: boolean;
	exists: (file: string) => boolean;
}): string {
	return (
		socialImage ??
		(isChangelog ? CHANGELOG_OG_IMAGE : undefined) ??
		configImage ??
		(exists("opengraph.png")
			? "/opengraph.png"
			: exists("logo.png")
				? "/logo.png"
				: DEFAULT_OG_IMAGE)
	);
}

/** Infer pcx_content_type for pages without one: model pages → "reference",
 *  changelog section → "changelog-entry". */
export function inferContentType(
	pathname: string,
	currentSection: string,
): string | undefined {
	if (/^\/(ai|workers-ai)\/models\/.+/.test(pathname)) return "reference";
	if (currentSection === "changelog") return "changelog-entry";
	return undefined;
}

export interface ContentClassification {
	contentType: string | null;
	isChangelog: boolean;
	schemaType: SchemaType;
}

/** Map a raw pcx_content_type to its display string + schema.org @type
 *  (changelog → BlogPosting; navigation/overview/ra-diagram → WebPage; else
 *  TechArticle). */
export function classifyContentType(
	rawContentType: string,
): ContentClassification {
	const contentType = formatContentType(rawContentType) || null;
	const isChangelog =
		rawContentType === "changelog" || rawContentType === "changelog-entry";
	const schemaType: SchemaType = isChangelog
		? "BlogPosting"
		: ["navigation", "overview", "reference-architecture-diagram"].includes(
					rawContentType,
			  )
			? "WebPage"
			: "TechArticle";
	return { contentType, isChangelog, schemaType };
}

export interface StructuredDataInput {
	schemaType: SchemaType;
	canonical: string | null;
	fullTitle: string;
	description?: string;
	lang: string;
	ogImage?: string | null;
	dateModified?: string;
	isChangelog: boolean;
	datePublished?: string;
	tags?: string[];
}

/** Serialize the page-entity JSON-LD (null when no canonical). Key order is
 *  load-bearing for byte parity — do not reorder. `image` is intentionally
 *  gated on ogImage (diverges from production). */
export function buildStructuredData({
	schemaType,
	canonical,
	fullTitle,
	description,
	lang,
	ogImage,
	dateModified,
	isChangelog,
	datePublished,
	tags,
}: StructuredDataInput): string | null {
	if (!canonical) return null;
	return JSON.stringify({
		"@context": "https://schema.org",
		"@type": schemaType,
		"@id": `${canonical}#page`,
		headline: fullTitle,
		...(description ? { description } : {}),
		url: canonical,
		inLanguage: lang,
		...(ogImage ? { image: ogImage } : {}),
		...(dateModified ? { dateModified } : {}),
		...(isChangelog && datePublished ? { datePublished } : {}),
		publisher: {
			"@type": "Organization",
			name: "Cloudflare",
			url: "https://www.cloudflare.com/",
		},
		isPartOf: {
			"@type": "WebSite",
			"@id": "https://developers.cloudflare.com/#website",
			name: "Cloudflare Docs",
			url: "https://developers.cloudflare.com/",
		},
		...(tags?.length ? { keywords: tags } : {}),
	}).replace(/</g, "\\u003c");
}
