import { getCollection } from "astro:content";

export async function getGlossaryEntries(product?: string) {
	const glossaries = await getCollection("glossary");

	if (!product) {
		return glossaries.flatMap((x) => {
			return x.data.entries.map((y) => {
				return {
					product: x.data.productName,
					...y,
				};
			});
		});
	}

	return glossaries.flatMap((x) => {
		if (x.id !== product) {
			return [];
		}
		return x.data.entries.map((y) => {
			return {
				product: x.data.productName,
				...y,
			};
		});
	});
}

export async function getGlossaryEntry(term: string) {
	const terms = await getGlossaryEntries();

	const entry = terms.find((x) => x.term === term);

	if (!entry) {
		throw new Error(`[GetGlossaryEntry] Unable to find entry for ${term}`);
	}

	return entry;
}
