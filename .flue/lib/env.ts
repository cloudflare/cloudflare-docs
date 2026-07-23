/**
 * Small environment-variable helpers.
 */

/**
 * Parse a positive integer from an env value, falling back when it is missing,
 * non-numeric, zero, or negative. Used for per-environment tuning knobs (e.g.
 * review concurrency and per-file timeouts) that default to a prod-safe constant
 * but can be lowered locally via `.env.local`.
 */
export function envPositiveInt(value: unknown, fallback: number): number {
	const parsed = typeof value === "string" ? Number.parseInt(value, 10) : NaN;
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
