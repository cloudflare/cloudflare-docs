/**
 * Helpers for changelog `updates` entries: material changes made to a post
 * after it was published. Kept free of `astro:content` imports so they can be
 * unit-tested in Node.
 */

export type ChangelogUpdate = {
	date: Date;
	summary: string;
};

/**
 * Stable fragment ID for an update, used both as the anchor on the post page
 * and in the update's RSS GUID (for example, `update-2026-10-21T12-34`).
 */
export function changelogUpdateAnchor(date: Date): string {
	return `update-${date.toISOString().slice(0, 16).replace(":", "-")}`;
}

/**
 * Display label for an update, in UTC: "October 21, 2026, 03:29 UTC".
 * Date-only entries (`2026-10-22`) parse as midnight UTC and show the date
 * alone, since they carry no time.
 */
export function formatUpdateDate(date: Date): string {
	const day = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	});
	const time = date.toISOString().slice(11, 16);
	return time === "00:00" ? day : `${day}, ${time} UTC`;
}

/**
 * Updates that should be visible now, newest first. Future-dated updates stay
 * hidden until their date, matching how future-dated posts are handled.
 */
export function publishedUpdates(
	updates: ChangelogUpdate[] | undefined,
	now: Date = new Date(),
): ChangelogUpdate[] {
	return (updates ?? [])
		.filter((update) => update.date.getTime() <= now.getTime())
		.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Feed date for an update: the later of the author's date and when the update
 * went live (`landedAt`, from git). Dating it when it went live puts it above
 * posts published in the meantime, so date-based feed tools still deliver it.
 */
export function updateFeedDate(authorDate: Date, landedAt?: Date): Date {
	return landedAt && landedAt > authorDate ? landedAt : authorDate;
}

/**
 * Sort feed items newest first by `pubDate`. The sort is stable, so items
 * with the same date keep their existing order.
 */
export function sortByPubDateDesc<T extends { pubDate?: Date }>(
	items: T[],
): T[] {
	return [...items].sort(
		(a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0),
	);
}
