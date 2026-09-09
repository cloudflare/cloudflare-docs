export function hasMoreCatalogModels(
	modelsSeen: number,
	totalCount: number,
	pageSize: number,
): boolean {
	return pageSize > 0 && modelsSeen < totalCount;
}

export async function mapConcurrentOrdered<T, R>(
	values: readonly T[],
	concurrency: number,
	mapper: (value: T, index: number) => Promise<R>,
	onComplete?: (completed: number) => void,
): Promise<R[]> {
	if (!Number.isInteger(concurrency) || concurrency < 1)
		throw new RangeError("concurrency must be a positive integer");
	const results = new Array<R>(values.length);
	let nextIndex = 0;
	let completed = 0;

	async function run(): Promise<void> {
		while (nextIndex < values.length) {
			const index = nextIndex++;
			results[index] = await mapper(values[index], index);
			onComplete?.(++completed);
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(concurrency, values.length) }, run),
	);
	return results;
}
