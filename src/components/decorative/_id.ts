// Deterministic, unique-per-render ids for decorative SVG pattern defs.
let counter = 0;

export function nextDecorId(prefix: string): string {
	return `${prefix}-${(counter++).toString(36)}`;
}
