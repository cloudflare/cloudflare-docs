import type { FlueFs } from "@flue/sdk/client";

export async function seedR2Context(bucket: R2Bucket, fs: FlueFs) {
	await seedFileIfExists(bucket, fs, "AGENTS.md");
	await seedPrefix(bucket, fs, ".agents/");
}

async function seedPrefix(bucket: R2Bucket, fs: FlueFs, prefix: string) {
	let cursor: string | undefined;
	for (;;) {
		const listed = await bucket.list({ prefix, cursor });
		for (const obj of listed.objects) {
			if (obj.key.endsWith("/")) continue;
			await seedFileIfExists(bucket, fs, obj.key);
		}
		if (!listed.truncated) break;
		cursor = listed.cursor;
	}
}

async function seedFileIfExists(bucket: R2Bucket, fs: FlueFs, key: string) {
	const got = await bucket.get(key);
	if (!got) return;

	const path = `/workspace/${key}`;
	const parent = path.slice(0, path.lastIndexOf("/"));
	if (parent.length > "/workspace".length) {
		await fs.mkdir(parent, { recursive: true });
	}
	await fs.writeFile(path, await got.text());
}
