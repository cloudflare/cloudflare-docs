// Shared by the build (versioned og:image URLs) and the Worker (cache keys),
// so both agree on when a changelog card's content changed.

export interface ChangelogCard {
	title: string;
	/** YYYY-MM-DD */
	date: string;
	product: string;
}

// Bump whenever the card design changes so every image URL changes.
export const CHANGELOG_OG_TEMPLATE_VERSION = 1;

export async function changelogOgVersion(
	{ title, date, product }: ChangelogCard,
	templateVersion = CHANGELOG_OG_TEMPLATE_VERSION,
) {
	const input = JSON.stringify([templateVersion, title, date, product]);
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(input),
	);
	return Array.from(new Uint8Array(digest).subarray(0, 8), (byte) =>
		byte.toString(16).padStart(2, "0"),
	).join("");
}
