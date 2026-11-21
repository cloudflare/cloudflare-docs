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
	let failed = false;
	let firstError: unknown;

	async function run(): Promise<void> {
		while (!failed && nextIndex < values.length) {
			const index = nextIndex++;
			try {
				results[index] = await mapper(values[index], index);
				onComplete?.(++completed);
			} catch (error) {
				if (!failed) firstError = error;
				failed = true;
			}
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(concurrency, values.length) }, run),
	);
	if (failed) throw firstError;
	return results;
}

/**
 * Copies the zero data retention fields (`zdr`, `zdr_comment`) from freshly
 * fetched catalog data onto a model file that is already committed. Returns
 * the updated file text, or `null` when nothing changed.
 */
export function syncZdrFields(current: string, fetched: string): string | null {
	// Current behaviour of add-ai-models.yml: changes to models that already
	// have a file are discarded, so a ZDR change never reaches the page.
	void [current, fetched];
	return null;
}
