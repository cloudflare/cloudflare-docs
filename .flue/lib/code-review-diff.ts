/**
 * Code-review diff helpers.
 *
 * Writes the PR diff (patch files + manifest + pr.json) to R2 so that
 * specialist Durable Objects running in separate isolates can read context
 * into their own workspaces.
 */
import type { getPullRequestFiles, GitHubPullRequest } from "./github";

export interface DiffManifestEntry {
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	/** R2 key for the patch file, or null if no patch is available. */
	patch_key: string | null;
}

/**
 * Write all PR diff objects to R2 under `diffDir`:
 *   - `{diffDir}/{safe_filename}.patch` — raw patch for each file that has one
 *   - `{diffDir}/manifest.json`         — DiffManifestEntry[] for the diff
 *   - `{diffDir}/pr.json`               — PR metadata for agent context
 *
 * The diffDir should be run-scoped (`diffs/pr-{n}/runs/{runId}`) so that
 * concurrent reviews for the same PR do not overwrite each other.
 */
export async function writeDiffToR2(
	bucket: R2Bucket,
	diffDir: string,
	files: Awaited<ReturnType<typeof getPullRequestFiles>>,
	pr: GitHubPullRequest,
): Promise<void> {
	const manifest: DiffManifestEntry[] = [];

	await Promise.all(
		files.map(async (file) => {
			// Encode the filename into a safe flat key: replace slashes with __
			const safeName = file.filename.replace(/\//g, "__");
			const patchKey = file.patch ? `${diffDir}/${safeName}.patch` : null;

			if (file.patch && patchKey) {
				await bucket.put(patchKey, file.patch);
			}

			manifest.push({
				filename: file.filename,
				status: file.status,
				additions: file.additions,
				deletions: file.deletions,
				changes: file.changes,
				patch_key: patchKey,
			});
		}),
	);

	await Promise.all([
		bucket.put(`${diffDir}/manifest.json`, JSON.stringify(manifest, null, 2)),
		bucket.put(
			`${diffDir}/pr.json`,
			JSON.stringify(
				{
					number: pr.number,
					title: pr.title,
					description: pr.body ?? "",
					author: pr.user?.login ?? "",
					base: pr.base.ref,
					head: pr.head.ref,
					labels: pr.labels.map((l) => l.name),
					files: manifest.map((f) => ({
						filename: f.filename,
						status: f.status,
						additions: f.additions,
						deletions: f.deletions,
						changes: f.changes,
					})),
				},
				null,
				2,
			),
		),
	]);
}
