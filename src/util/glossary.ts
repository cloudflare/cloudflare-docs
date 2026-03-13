import { getCollection } from "astro:content";

type GlossaryEntry = {
	product: string;
	term: string;
	general_definition: string;
};

let allEntries: GlossaryEntry[];
let termMap: Map<string, GlossaryEntry>;
let productIndex: Map<string, GlossaryEntry[]>;

async function ensureLoaded() {
	if (allEntries) return;

	const glossaries = await getCollection("glossary");

	allEntries = [];
	productIndex = new Map();

	for (const g of glossaries) {
		const entries = g.data.entries.map((y) => ({
			product: g.data.productName,
			...y,
		}));
		allEntries.push(...entries);
		productIndex.set(g.id, entries);
	}

	termMap = new Map();
	for (const entry of allEntries) {
		if (!termMap.has(entry.term)) {
			termMap.set(entry.term, entry);
		}
	}
}

export async function getGlossaryEntries(product?: string) {
	await ensureLoaded();

	if (!product) {
		return [...allEntries];
	}

	return [...(productIndex.get(product) ?? [])];
}

export async function getGlossaryEntry(term: string) {
	await ensureLoaded();

	const entry = termMap.get(term);

	if (!entry) {
		throw new Error(`[GetGlossaryEntry] Unable to find entry for ${term}`);
	}

	return entry;
}
