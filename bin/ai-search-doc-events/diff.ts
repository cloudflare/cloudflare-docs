import { readFile } from "node:fs/promises";
import type {
	DiffPayload,
	IndexPage,
	IndexSection,
	Manifest,
	PageChangeEvent,
	PageHash,
	Section,
	Summary,
} from "./types";

export async function readManifest(path: string): Promise<Manifest | null> {
	try {
		return JSON.parse(await readFile(path, "utf8")) as Manifest;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
		throw error;
	}
}

function indexPage(page: PageHash): IndexPage {
	const { title, description, product } = page;
	return { title, description, product };
}

function indexSection(section: Section): IndexSection {
	const { anchor, heading, text, key } = section;
	return { anchor, heading, text, key };
}

type ChangedPageEvent = Extract<PageChangeEvent, { type: "docs.page.changed" }>;

export function initialEvents(current: Manifest): ChangedPageEvent[] {
	return Object.values(current.pages).map((page): ChangedPageEvent => {
		return {
			type: "docs.page.changed",
			path: page.path,
			key: page.key,
			page: indexPage(page),
			changedSections: page.sections.map(indexSection),
		};
	});
}

export function fullReindexEvents(
	previous: Manifest | null,
	current: Manifest,
): PageChangeEvent[] {
	const upserts = initialEvents(current);
	if (!previous) return upserts;

	const incremental = diffManifests(previous, current);
	const changesByPath = new Map(
		incremental
			.filter((event) => event.type === "docs.page.changed")
			.map((event) => [event.path, event]),
	);
	const deletions = incremental.filter(
		(event) => event.type === "docs.page.deleted",
	);

	return [
		...deletions,
		...upserts.map((event) => ({
			...event,
			// Full upserts replace every current item, but sections removed since the
			// previous manifest still need explicit deletion.
			removedSectionKeys: changesByPath.get(event.path)?.removedSectionKeys,
		})),
	];
}

export function diffManifests(previous: Manifest, current: Manifest) {
	const events: PageChangeEvent[] = [];

	for (const page of Object.values(current.pages)) {
		const oldPage = previous.pages[page.path];
		if (oldPage?.hash === page.hash) continue;

		const oldSectionHashes = new Map(
			oldPage?.sections.map((section) => [section.key, section.hash]) ?? [],
		);
		const metadataChanged =
			oldPage !== undefined &&
			JSON.stringify(indexPage(oldPage)) !== JSON.stringify(indexPage(page));
		// Section items duplicate page-level title, description, and product, so
		// refresh every section when that shared metadata changes.
		const changedSections = page.sections
			.filter(
				(section) =>
					metadataChanged || oldSectionHashes.get(section.key) !== section.hash,
			)
			.map(indexSection);
		const newSectionKeys = new Set(page.sections.map((section) => section.key));
		const removedSectionKeys = (oldPage?.sections ?? [])
			.map((section) => section.key)
			.filter((key) => !newSectionKeys.has(key));

		events.push({
			type: "docs.page.changed",
			path: page.path,
			key: page.key,
			page: indexPage(page),
			changedSections,
			removedSectionKeys,
		});
	}

	for (const oldPage of Object.values(previous.pages)) {
		if (current.pages[oldPage.path]) continue;
		events.push({
			type: "docs.page.deleted",
			path: oldPage.path,
			key: oldPage.key,
			// Give the worker explicit item keys so every deletion is independently
			// retryable and protected by its per-item generation guard.
			removedSectionKeys: oldPage.sections.map((section) => section.key),
		});
	}

	return events;
}

export function summarize(
	current: Manifest,
	events: PageChangeEvent[],
	baseline: boolean,
): Omit<Summary, "sent" | "committed"> {
	return {
		pages: Object.keys(current.pages).length,
		changed: events.filter((event) => event.type === "docs.page.changed")
			.length,
		deleted: events.filter((event) => event.type === "docs.page.deleted")
			.length,
		baseline,
	};
}

export function payloadFor(
	current: Manifest,
	events: PageChangeEvent[],
): DiffPayload {
	return {
		version: 1,
		generatedAt: current.generatedAt,
		events,
	};
}
