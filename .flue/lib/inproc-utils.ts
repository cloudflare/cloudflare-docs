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

	async function worker() {
		while (index < tasks.length) {
			const current = index++;
			results[current] = await tasks[current]();
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(limit, tasks.length) }, () => worker()),
	);
	return results;
}
