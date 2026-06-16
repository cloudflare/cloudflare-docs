/**
 * Style-guide workspace hydration.
 *
 * Loads diff objects and reference files from R2 and writes them into the
 * Flue workspace so the style-guide-review skill has all necessary context.
 *
 * Two modes:
 *   targeted — a specific filename is requested (child fan-out run):
 *              only loads manifest.json, pr.json (from memory), comments, and
 *              the single patch file for that filename.
 *   full     — no filename: loads all objects under the diffDir prefix.
 *
 * Structured logs are emitted by the caller (workflow) for clarity.
 */
import type { getDefaultWorkspace } from "../connectors/cloudflare-shell";

export interface ManifestEntry {
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	patch_key: string | null;
}

export interface PullRequestMetadata {
	number: number;
	title: string;
	base: string;
	head: string;
}

export interface HydrateStyleGuideWorkspaceInput {
	diffDir: string;
	commentsPath: string;
	/** When set, hydrate only the files needed for this single file review. */
	filename?: string;
	prNumber: number;
}

export interface HydrateStyleGuideWorkspaceResult {
	pullRequest: PullRequestMetadata;
	reviewedFiles: string[];
	diffObjects: number;
	referenceObjects: number;
}

// Only review docs/partials/changelog MDX.
export const REVIEWABLE_PATH_RE =
	/^src\/content\/(docs|partials|changelog)\/.+\.mdx$/;

/**
 * Hydrate a Flue workspace with everything the style-guide-review skill needs.
 *
 * Returns metadata the workflow can use for logging and agent args.
 * Throws if the R2 skill file is missing (dev environment not synced).
 *
 * Returns `null` when there are no reviewable files (caller should early-return
 * with an empty result).
 */
export async function hydrateStyleGuideWorkspace(
	bucket: R2Bucket,
	workspace: ReturnType<typeof getDefaultWorkspace>,
	input: HydrateStyleGuideWorkspaceInput,
): Promise<HydrateStyleGuideWorkspaceResult | null> {
	// ── 1. Fetch manifest ─────────────────────────────────────────────────────
	const manifestObj = await bucket.get(`${input.diffDir}/manifest.json`);
	if (!manifestObj) {
		return null;
	}
	const manifestText = await manifestObj.text();
	const manifest = JSON.parse(manifestText) as ManifestEntry[];

	const reviewedFiles = input.filename
		? manifest.some(
				(f) =>
					f.filename === input.filename && REVIEWABLE_PATH_RE.test(f.filename),
			)
			? [input.filename]
			: []
		: manifest
				.filter((f) => REVIEWABLE_PATH_RE.test(f.filename))
				.map((f) => f.filename);

	if (reviewedFiles.length === 0) {
		return null;
	}

	// ── 2. Fetch PR metadata ──────────────────────────────────────────────────
	const prObj = await bucket.get(`${input.diffDir}/pr.json`);
	const prText = prObj ? await prObj.text() : null;
	const pullRequest: PullRequestMetadata = prText
		? (JSON.parse(prText) as PullRequestMetadata)
		: { number: input.prNumber, title: "", base: "", head: "" };

	// ── 3. Determine which diff objects to load ───────────────────────────────
	// Targeted mode: manifest.json and pr.json are already in memory — reuse
	// their text. Only fetch comments and the single patch_key fresh.
	// Full mode: load all objects under the diffDir prefix.
	let diffKeysToLoad: string[];
	let cachedDiffResults: { key: string; text: string }[] = [];

	if (input.filename) {
		const entry = manifest.find((f) => f.filename === input.filename);
		const patchKey = entry?.patch_key ?? null;

		cachedDiffResults = [
			{ key: `${input.diffDir}/manifest.json`, text: manifestText },
			...(prText !== null
				? [{ key: `${input.diffDir}/pr.json`, text: prText }]
				: []),
		];
		diffKeysToLoad = [input.commentsPath, ...(patchKey ? [patchKey] : [])];
	} else {
		// Full mode: manifest.json and pr.json are already in memory from steps
		// 1 and 2 — cache them and exclude them from the fetch list to avoid
		// redundant R2 GETs.
		const all = await bucket.list({ prefix: `${input.diffDir}/` });
		const manifestKey = `${input.diffDir}/manifest.json`;
		const prKey = `${input.diffDir}/pr.json`;
		cachedDiffResults = [
			{ key: manifestKey, text: manifestText },
			...(prText !== null ? [{ key: prKey, text: prText }] : []),
		];
		diffKeysToLoad = all.objects
			.map((o) => o.key)
			.filter((k) => k !== manifestKey && k !== prKey);
	}

	// ── 4. Fetch reference files and skill in parallel with remaining diff ────
	const [referenceObjects, skillObj] = await Promise.all([
		bucket.list({ prefix: ".agents/reference/style-guide/" }),
		bucket.get(".agents/skills/style-guide-review/SKILL.md"),
	]);

	if (!skillObj) {
		throw new Error(
			"Missing .agents/skills/style-guide-review/SKILL.md in DOCS_FLUE_BUCKET. " +
				"For local dev, run `pnpm run flue:sync-agents:local` before invoking the workflow.",
		);
	}

	const [referenceResults, ...fetchedDiffResults] = await Promise.all([
		Promise.all(
			referenceObjects.objects.map(async (obj) => ({
				key: obj.key,
				text: (await (await bucket.get(obj.key))?.text()) ?? "",
			})),
		),
		...diffKeysToLoad.map(async (key) => ({
			key,
			text: (await (await bucket.get(key))?.text()) ?? "",
		})),
	]);

	const diffResults = [...cachedDiffResults, ...fetchedDiffResults];

	// ── 5. Pre-create directories to avoid SQLite race on concurrent writes ───
	for (const dir of [
		"/.agents/skills/style-guide-review",
		"/.agents/reference/style-guide/always",
		"/.agents/reference/style-guide/conditional",
		"/.agents/reference/style-guide/components",
		`/${input.diffDir}`,
	]) {
		await workspace.mkdir(dir, { recursive: true });
	}

	// ── 6. Write everything in parallel ──────────────────────────────────────
	await Promise.all([
		workspace.writeFile(
			"/.agents/skills/style-guide-review/SKILL.md",
			await skillObj.text(),
		),
		...referenceResults.map((r) =>
			r.text ? workspace.writeFile(`/${r.key}`, r.text) : Promise.resolve(),
		),
		...diffResults.map((r) =>
			r.text ? workspace.writeFile(`/${r.key}`, r.text) : Promise.resolve(),
		),
	]);

	return {
		pullRequest,
		reviewedFiles,
		diffObjects: cachedDiffResults.length + diffKeysToLoad.length,
		referenceObjects: referenceObjects.objects.length,
	};
}
