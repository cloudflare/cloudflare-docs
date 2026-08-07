/**
 * Directory helpers — product metadata + group membership, read from the
 * `directory` collection. Drives the changelog product/group views and the
 * Header filter.
 *
 * CF source: cloudflare-docs/src/util/directory.ts (faithful port).
 */
import { getCollection, type CollectionEntry } from "astro:content";

export const directory = await getCollection("directory");

// Map from URL first segment → directory entry, so route-section lookups
// resolve products whose collection ID differs from their public URL (e.g.
// `access.yaml` → `/cloudflare-one/`). Also includes the collection ID as
// a key for `frontmatter.products` string refs. Entries without an `entry.url`
// are indexed by their collection ID only.
const directoryBySection = new Map<string, CollectionEntry<"directory">>();
for (const entry of directory) {
	directoryBySection.set(entry.id, entry);
	if (entry.data.entry?.url) {
		const section = entry.data.entry.url.split("/").filter(Boolean)[0];
		if (section && !directoryBySection.has(section)) {
			directoryBySection.set(section, entry);
		}
	}
}

// Non-product routes that should never trigger a directory lookup.
const NON_PRODUCT_SECTIONS = new Set([
	"404",
	"directory",
	"glossary",
	"plans",
	"resources",
	"sponsorships",
	"videos",
]);

/**
 * Resolve a directory entry by URL path section. Returns `undefined`
 * silently for non-product routes and unknown sections.
 */
export async function getDirectoryEntryBySection(
	section: string | undefined,
): Promise<CollectionEntry<"directory"> | undefined> {
	if (!section || NON_PRODUCT_SECTIONS.has(section)) return undefined;
	return directoryBySection.get(section);
}

export const directoryByGroup = Object.entries(
	directory
		.filter((entry) => Boolean(entry.data.entry?.group))
		.reduce(
			(groups, entry) => {
				const primaryGroup = entry.data.entry!.group!;
				const additionalGroups = entry.data.entry!.additional_groups ?? [];
				const allGroups = [primaryGroup, ...additionalGroups];
				for (const group of allGroups) {
					if (!groups[group]) groups[group] = [];
					groups[group].push(entry);
				}
				return groups;
			},
			{} as Record<string, typeof directory>,
		),
);

export const groups = [
	...new Set(
		directory.flatMap((entry) =>
			[
				entry.data.entry?.group,
				...(entry.data.entry?.additional_groups ?? []),
			].filter(Boolean),
		),
	),
].sort() as string[];
