// Shared by the build (versioned og:image URLs) and the Worker (cache keys),
// so both agree on when a changelog card's content changed.

import { ogHash } from "./hash";

export interface ChangelogCard {
	title: string;
	/** YYYY-MM-DD */
	date: string;
	product: string;
}

// Bump whenever the card design changes so every image URL changes.
export const CHANGELOG_OG_TEMPLATE_VERSION = 1;

export const changelogOgVersion = (
	{ title, date, product }: ChangelogCard,
	templateVersion = CHANGELOG_OG_TEMPLATE_VERSION,
) => ogHash([templateVersion, title, date, product]);
