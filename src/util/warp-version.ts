/**
 * Compares two dotted WARP client versions (e.g. `2026.7.1384.0`) numerically,
 * part by part. Missing trailing parts count as `0`. Returns a negative number
 * if `a` is older than `b`, a positive number if newer, and `0` if equal.
 *
 * Used by WARPReleases to order releases by version, so a backport such as
 * 2026.7.1384.0 (shipped after 2026.8.2115.0) is not shown as the latest, and
 * by the changelog to decide which client name a release uses.
 */
export function compareWarpVersions(a: string, b: string): number {
	const aParts = a.split(".").map(Number);
	const bParts = b.split(".").map(Number);
	for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
		const diff = (aParts[i] ?? 0) - (bParts[i] ?? 0);
		if (diff !== 0) return diff;
	}
	return 0;
}
