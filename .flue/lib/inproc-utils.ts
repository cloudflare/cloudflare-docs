/**
 * Shared utilities for the in-process review fan-outs.
 */

/**
 * Run up to `limit` async tasks concurrently and return results in input order.
 * Tasks are expected not to reject — wrap per-task error handling at the call
 * site so one failure cannot abort the pool.
 */
export async function withConcurrency<T>(
	tasks: Array<() => Promise<T>>,
	limit: number,
): Promise<T[]> {
	const results: T[] = new Array(tasks.length);
	let index = 0;
	// Guard against non-positive or non-finite limits. Math.floor(NaN) === NaN
	// and Math.max(1, NaN) === NaN, which would cause Array.from({ length: NaN })
	// to throw a RangeError. Clamp to a safe positive integer.
	const effectiveLimit = Number.isFinite(limit)
		? Math.max(1, Math.floor(limit))
		: 1;

	async function worker() {
		while (index < tasks.length) {
			const current = index++;
			results[current] = await tasks[current]();
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(effectiveLimit, tasks.length) }, () =>
			worker(),
		),
	);
	return results;
}
