import { createHash } from "node:crypto";

type IdLocals = { stableIdCounts?: Map<string, number> } | undefined;

function hash(input: string): string {
	return createHash("sha256").update(input).digest("hex");
}

/**
 * Build-stable element id for ARIA wiring: a short hash of `key`, so it only
 * changes when the component's props change (not on every build). A per-page
 * counter in `locals` suffixes repeats of the same key so ids stay unique;
 * repeats are identical components, so render order doesn't affect the HTML.
 */
export function stableId(
	locals: IdLocals,
	prefix: string,
	key: unknown,
): string {
	const id = `${prefix}-${hash(JSON.stringify(key) ?? "").slice(0, 8)}`;
	if (!locals) return id;
	const counts = (locals.stableIdCounts ??= new Map());
	const n = (counts.get(id) ?? 0) + 1;
	counts.set(id, n);
	return n === 1 ? id : `${id}-${n}`;
}

/**
 * Deterministic PRNG (mulberry32) seeded from a string, for choices that
 * should look random across pages but not change between builds.
 */
export function seededRandom(seed: string): () => number {
	let a = parseInt(hash(seed).slice(0, 8), 16);
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Fisher-Yates shuffle with a supplied random source. */
export function shuffle<T>(items: readonly T[], random: () => number): T[] {
	const out = [...items];
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[out[i], out[j]] = [out[j]!, out[i]!];
	}
	return out;
}
