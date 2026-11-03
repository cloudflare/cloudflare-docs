export class R2Fake {
	private readonly values = new Map<string, { body: string; etag: string }>();
	private version = 0;

	async get(key: string) {
		const value = this.values.get(key);
		return (
			value && {
				etag: value.etag,
				json: async <T>() => JSON.parse(value.body) as T,
			}
		);
	}

	async put(
		key: string,
		value: string,
		options?: { onlyIf?: { etagMatches?: string; etagDoesNotMatch?: string } },
	) {
		const existing = this.values.get(key);
		if (
			options?.onlyIf?.etagMatches &&
			existing?.etag !== options.onlyIf.etagMatches
		)
			return null;
		if (options?.onlyIf?.etagDoesNotMatch === "*" && existing) return null;
		const etag = `etag-${++this.version}`;
		this.values.set(key, { body: value, etag });
		return { etag };
	}

	async delete(key: string) {
		this.values.delete(key);
	}

	async list({ prefix, cursor }: { prefix?: string; cursor?: string }) {
		const keys = [...this.values.keys()]
			.filter((key) => !prefix || key.startsWith(prefix))
			.sort();
		const start = cursor ? Number(cursor) : 0;
		const objects = keys.slice(start, start + 2).map((key) => ({ key }));
		const next = start + objects.length;
		return {
			objects,
			truncated: next < keys.length,
			cursor: next < keys.length ? String(next) : undefined,
		};
	}

	asBucket(): R2Bucket {
		return this as unknown as R2Bucket;
	}
}
