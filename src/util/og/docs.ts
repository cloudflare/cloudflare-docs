// The docs card as resolved by the build. The page emits it verbatim in an
// `og-card` meta tag, and the Worker renders exactly that, so the build and
// the Worker can't disagree about a card's fields.

import { ogHash } from "./hash";

export const OG_CARD_META = "og-card";
export const MAX_PILLS = 4;

export interface DocsCard {
	type: "docs";
	title: string;
	pills: string[];
}

// Bump whenever the docs card design, or anything it shares with other cards
// (title layout, logo, fonts), changes so every image URL changes.
export const DOCS_OG_TEMPLATE_VERSION = 1;

export const docsOgVersion = (
	{ type, title, pills }: DocsCard,
	templateVersion = DOCS_OG_TEMPLATE_VERSION,
) => ogHash([type, templateVersion, title, ...pills]);

/**
 * Tutorials show difficulty then products; other pages show the primary
 * product. Labels are trimmed, empty ones dropped, and duplicates removed
 * case-insensitively, keeping the first.
 */
export function resolveDocsCard({
	title,
	tutorial,
	difficulty,
	primaryProduct,
	products = [],
}: {
	title: string;
	tutorial: boolean;
	difficulty?: string;
	primaryProduct?: string;
	products?: string[];
}): DocsCard {
	const candidates = tutorial
		? [difficulty, primaryProduct, ...products]
		: [primaryProduct];
	const seen = new Set<string>();
	const pills: string[] = [];
	for (const candidate of candidates) {
		const label = candidate?.trim();
		if (!label || seen.has(label.toLowerCase())) continue;
		seen.add(label.toLowerCase());
		pills.push(label);
	}
	return {
		type: "docs",
		title: title.trim(),
		pills: pills.slice(0, MAX_PILLS),
	};
}

/** The Worker's side of the contract: a well-formed card or `null`. */
export function parseDocsCard(json: string): DocsCard | null {
	try {
		const card: unknown = JSON.parse(json);
		if (typeof card !== "object" || card === null) return null;
		const { type, title, pills } = card as Record<string, unknown>;
		const valid =
			type === "docs" &&
			typeof title === "string" &&
			title.trim() !== "" &&
			Array.isArray(pills) &&
			pills.length <= MAX_PILLS &&
			pills.every((pill) => typeof pill === "string" && pill.trim() !== "");
		return valid ? { type, title, pills: pills as string[] } : null;
	} catch {
		return null;
	}
}
