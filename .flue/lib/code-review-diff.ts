/**
 * Code-review diff helpers.
 *
 * Writes the PR diff (patch files + manifest + pr.json) directly into the
 * shared Workspace so the style-guide review sessions — which run in the same
 * Durable Object — can read the context with the `code` tool. No R2 round-trip.
 */
import type { getDefaultWorkspace } from "../connectors/cloudflare-shell";
import type { getPullRequestFiles, GitHubPullRequest } from "./github";

export interface DiffManifestEntry {
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	/** Workspace key for the patch file, or null if no patch is available. */
	patch_key: string | null;
}

/**
 * Write all PR diff objects into the Workspace under `diffDir`:
 *   - `{diffDir}/{safe_filename}.patch` — raw patch for each file that has one
 *   - `{diffDir}/manifest.json`         — DiffManifestEntry[] for the diff
 *   - `{diffDir}/pr.json`               — PR metadata for agent context
 *
 * Paths are written absolute (leading slash) to match how the `code` tool
 * resolves `args.diffDir + "/..."` reads. The diffDir is run-scoped
 * (`diffs/pr-{n}/runs/{runId}`) and the Workspace is the orchestrator's own
 * Durable Object storage, so concurrent reviews never collide.
 */
export async function writeDiffToWorkspace(
	workspace: ReturnType<typeof getDefaultWorkspace>,
	diffDir: string,
	files: Awaited<ReturnType<typeof getPullRequestFiles>>,
	pr: GitHubPullRequest,
): Promise<void> {
	const manifest: DiffManifestEntry[] = files.map((file) => {
		const safeName = file.filename.replace(/\//g, "__");
		return {
			filename: file.filename,
			status: file.status,
			additions: file.additions,
			deletions: file.deletions,
			changes: file.changes,
			patch_key: file.patch ? `${diffDir}/${safeName}.patch` : null,
		};
	});

	await workspace.mkdir(`/${diffDir}`, { recursive: true });

	await Promise.all([
		...files.map((file) => {
			const safeName = file.filename.replace(/\//g, "__");
			return file.patch
				? workspace.writeFile(`/${diffDir}/${safeName}.patch`, file.patch)
				: Promise.resolve();
		}),
		workspace.writeFile(
			`/${diffDir}/manifest.json`,
			JSON.stringify(manifest, null, 2),
		),
		workspace.writeFile(
			`/${diffDir}/pr.json`,
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
