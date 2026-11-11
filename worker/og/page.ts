const ENTITIES: Record<string, string> = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	apos: "'",
};

const decodeEntities = (value: string) =>
	value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity: string) =>
		entity[0] !== "#"
			? (ENTITIES[entity.toLowerCase()] ?? match)
			: String.fromCodePoint(
					entity[1] === "x" || entity[1] === "X"
						? parseInt(entity.slice(2), 16)
						: Number(entity.slice(1)),
				),
	);

/** Where to read a value: an element's attribute, first match unless `last`. */
export interface PageField {
	selector: string;
	attribute: string;
	last?: boolean;
}

/** Reads entity-decoded attribute values from a built page in one pass. */
export async function readPage<K extends string>(
	page: Response,
	fields: Record<K, PageField>,
): Promise<Record<K, string | null>> {
	const values = {} as Record<K, string | null>;
	let rewriter = new HTMLRewriter();
	for (const key of Object.keys(fields) as K[]) {
		const { selector, attribute, last } = fields[key];
		values[key] = null;
		rewriter = rewriter.on(selector, {
			element(element) {
				const value = element.getAttribute(attribute);
				if (value !== null && (last || values[key] === null)) {
					values[key] = decodeEntities(value);
				}
			},
		});
	}
	await rewriter.transform(page).arrayBuffer();
	return values;
}
