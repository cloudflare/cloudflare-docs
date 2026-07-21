import { describe, expect, it } from "vitest";
import { diffManifests, fullReindexEvents, payloadFor } from "./diff";
import type { Manifest, PageHash } from "./types";

function page(overrides: Partial<PageHash> = {}): PageHash {
	return {
		path: "/workers/",
		key: "docs/workers/index.md",
		title: "Workers",
		description: "Build applications.",
		product: "Workers",
		hash: "page-hash",
		sections: [
			{
				anchor: "example",
				heading: "Example",
				text: "Unchanged section text",
				hash: "section-hash",
				key: "docs/workers/index.example.md",
			},
		],
		...overrides,
	};
}

function manifest(entry?: PageHash): Manifest {
	return {
		version: 1,
		generatedAt: "2026-07-15T12:00:00.000Z",
		pages: entry ? { [entry.path]: entry } : {},
	};
}

const indexSections = (entry: PageHash) =>
	entry.sections.map(({ anchor, heading, text, key }) => ({
		anchor,
		heading,
		text,
		key,
	}));

describe("AI Search manifest diff", () => {
	it("refreshes all sections when indexed page metadata changes", () => {
		const previous = page();
		const current = page({
			description: "A new description.",
			hash: "new-page-hash",
		});

		const [event] = diffManifests(manifest(previous), manifest(current));
		if (event.type !== "docs.page.changed")
			throw new Error("expected changed event");
		expect(event.changedSections).toEqual(indexSections(current));
		expect(event.page).toEqual({
			title: "Workers",
			description: "A new description.",
			product: "Workers",
		});
	});

	it("includes every prior section key when deleting a page", () => {
		const previous = page();
		const [event] = diffManifests(manifest(previous), manifest());

		expect(event.type).toBe("docs.page.deleted");
		expect(event.removedSectionKeys).toEqual(["docs/workers/index.example.md"]);
	});

	it("keeps removed section deletions while upserting every current page", () => {
		const section = page().sections[0];
		const previous = page({
			sections: [
				section,
				{
					...section,
					anchor: "removed",
					key: "docs/workers/index.removed.md",
				},
			],
		});
		const current = page({ hash: "new-page-hash" });
		const [event] = fullReindexEvents(manifest(previous), manifest(current));

		if (event.type !== "docs.page.changed")
			throw new Error("expected changed event");
		expect(event.changedSections).toEqual(indexSections(current));
		expect(event.removedSectionKeys).toEqual(["docs/workers/index.removed.md"]);
	});

	it("omits manifest-only hashes, complete sections, and summary from the request", () => {
		const current = page();
		const events = fullReindexEvents(null, manifest(current));
		const payload = payloadFor(manifest(current), events);

		expect(payload).toEqual({
			version: 1,
			generatedAt: "2026-07-15T12:00:00.000Z",
			events: [
				{
					type: "docs.page.changed",
					path: "/workers/",
					key: "docs/workers/index.md",
					page: {
						title: "Workers",
						description: "Build applications.",
						product: "Workers",
					},
					changedSections: indexSections(current),
				},
			],
		});
	});
});
