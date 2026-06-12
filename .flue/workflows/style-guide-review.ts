/**
 * Style-guide review specialist
 *
 * Reads skill and reference files from R2 at request time and writes them
 * directly into the workspace via harness.fs — no bulk hydration or caching.
 * This ensures the agent always runs with the latest synced content.
 *
 * This agent is a pure analysis component — it never posts to GitHub.
 * All mutations are handled by code-review-orchestrator.
 *
 * POST /workflows/style-guide-review
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { createAgent } from "@flue/runtime";
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import * as v from "valibot";

export const route: WorkflowRouteHandler = async (_c, next) => next();

// Only review docs/partials/changelog MDX
const REVIEWABLE_PATH_RE = /^src\/content\/(docs|partials|changelog)\/.+\.mdx$/;

// Model returns findings without IDs — trusted code assigns them after.
const StyleGuideFindingFromModelSchema = v.object({
	severity: v.picklist(["warning", "suggestion"]),
	path: v.string(),
	line: v.optional(v.number()),
	rule: v.string(),
	evidence: v.string(),
	suggestion: v.string(),
});

const StyleGuideResultFromModelSchema = v.object({
	findings: v.array(StyleGuideFindingFromModelSchema),
	summary: v.string(),
});

// Public types always include the trusted-code-assigned id.
export type StyleGuideFinding = v.InferOutput<
	typeof StyleGuideFindingFromModelSchema
> & {
	id: string;
};
export type StyleGuideResult = {
	findings: StyleGuideFinding[];
	summary: string;
	/** Files the specialist actually reviewed — used by the reconciler to resolve findings. */
	reviewedFiles: string[];
};

async function assignFindingIds(
	findings: v.InferOutput<typeof StyleGuideFindingFromModelSchema>[],
): Promise<StyleGuideFinding[]> {
	const encoder = new TextEncoder();
	return Promise.all(
		findings.map(async (f) => {
			// Exclude line number from the hash so IDs remain stable when surrounding
			// lines shift after partial fixes. Rule + path + evidence is specific enough.
			const key = `${f.rule}:${f.path}:${f.evidence.trim()}`;
			const buf = await crypto.subtle.digest("SHA-256", encoder.encode(key));
			const hex = Array.from(new Uint8Array(buf))
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("");
			return { ...f, id: `SG-${hex.slice(0, 6)}` };
		}),
	);
}

interface StyleGuideReviewPayload {
	number: number;
	diffDir: string;
	commentsPath: string;
	/** When set, review only this file. Used by orchestrator fan-out. */
	filename?: string;
}

interface ManifestEntry {
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	patch_key: string | null;
}

interface PullRequestMetadata {
	number: number;
	title: string;
	base: string;
	head: string;
}

export async function run({ id: runId, init, payload, env }: FlueContext) {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as R2Bucket;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const workspace = getDefaultWorkspace();

	console.log({
		message: `Style-guide review started: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
		event: "style_guide_review",
		number: input.number,
		diffDir: input.diffDir,
		filename: input.filename ?? null,
		runId,
		action: "started",
	});

	// ── 1. Fast-fail if no diff in R2 ─────────────────────────────────────────
	const manifestObj = await bucket.get(`${input.diffDir}/manifest.json`);
	if (!manifestObj) {
		console.log({
			message: `Style-guide review: no diff files found in R2 for PR #${input.number}`,
			event: "style_guide_review",
			number: input.number,
			diffDir: input.diffDir,
			filename: input.filename ?? null,
			runId,
			action: "no_diff_files",
		});
		return {
			findings: [],
			summary: "No diff files found in R2.",
			reviewedFiles: [],
		} satisfies StyleGuideResult;
	}
	const manifest = JSON.parse(await manifestObj.text()) as ManifestEntry[];
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
		return {
			findings: [],
			summary: "No reviewable documentation files changed.",
			reviewedFiles: [],
		} satisfies StyleGuideResult;
	}

	// ── 2. Read PR metadata from R2 ────────────────────────────────────────────
	const prObj = await bucket.get(`${input.diffDir}/pr.json`);
	const pullRequest = prObj
		? ((await prObj.json()) as PullRequestMetadata)
		: {
				number: input.number,
				title: "",
				base: "",
				head: "",
			};

	// ── 3. Populate workspace from R2 before init ─────────────────────────────
	// When a specific filename is requested, load only what that child run
	// needs: the manifest, pr.json, comments, and the single patch file.
	// This avoids duplicating every sibling patch into each concurrent DO.
	// When no filename is given (full-PR mode), fall back to bulk hydration.

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

	// Determine which diff objects to load.
	// Targeted mode (filename set): manifest.json and pr.json are already in
	// memory from steps 1 and 2 — reuse their text rather than re-fetching.
	// Only fetch comments and the single patch_key for the requested file.
	// Full mode (no filename): load everything under the diffDir prefix.
	//
	// diffResults shape: { key, text }[]  (same as the full-mode path below)
	let diffKeysToLoad: string[];
	let cachedDiffResults: { key: string; text: string }[] = [];
	if (input.filename) {
		const entry = manifest.find((f) => f.filename === input.filename);
		const patchKey = entry?.patch_key ?? null;

		// Reuse already-fetched R2 objects — avoid redundant GETs.
		const manifestText = await manifestObj.text();
		const prText = prObj ? await prObj.text() : null;
		cachedDiffResults = [
			{ key: `${input.diffDir}/manifest.json`, text: manifestText },
			...(prText !== null
				? [{ key: `${input.diffDir}/pr.json`, text: prText }]
				: []),
		];

		// Only fetch comments + the patch file fresh.
		diffKeysToLoad = [
			input.commentsPath,
			...(patchKey ? [patchKey] : []),
		];
	} else {
		const all = await bucket.list({ prefix: `${input.diffDir}/` });
		diffKeysToLoad = all.objects.map((o) => o.key);
	}

	// Read all reference files and any remaining diff files in parallel.
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

	// Merge cached (already-fetched) entries with freshly-fetched ones.
	const diffResults = [...cachedDiffResults, ...fetchedDiffResults];

	console.log({
		message: `Style-guide review hydrating workspace: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
		event: "style_guide_review",
		number: input.number,
		filename: input.filename ?? null,
		diffDir: input.diffDir,
		diffObjects: cachedDiffResults.length + diffKeysToLoad.length,
		referenceObjects: referenceObjects.objects.length,
		runId,
		action: "hydration_start",
	});

	// Pre-create common parent directories before parallel writes. Otherwise
	// concurrent writeFile calls can race while creating the same directory rows
	// in the cf-shell workspace SQLite table.
	for (const dir of [
		"/.agents/skills/style-guide-review",
		"/.agents/reference/style-guide/always",
		"/.agents/reference/style-guide/conditional",
		"/.agents/reference/style-guide/components",
		`/${input.diffDir}`,
	]) {
		await workspace.mkdir(dir, { recursive: true });
	}

	// Write everything to workspace in parallel.
	await Promise.all([
		// Skill file
		workspace.writeFile(
			"/.agents/skills/style-guide-review/SKILL.md",
			await skillObj.text(),
		),
		// All reference files (preserving subdirectory structure)
		...referenceResults.map((r) =>
			r.text ? workspace.writeFile(`/${r.key}`, r.text) : Promise.resolve(),
		),
		// Selected diff files (manifest, pr.json, comments, and patch)
		...diffResults.map((r) =>
			r.text ? workspace.writeFile(`/${r.key}`, r.text) : Promise.resolve(),
		),
	]);

	console.log({
		message: `Style-guide review workspace ready: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
		event: "style_guide_review",
		number: input.number,
		filename: input.filename ?? null,
		diffDir: input.diffDir,
		diffObjects: cachedDiffResults.length + diffKeysToLoad.length,
		referenceObjects: referenceObjects.objects.length,
		runId,
		action: "hydration_complete",
	});

	// ── 4. Init harness ───────────────────────────────────────────────────────
	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.6",
		compaction: { reserveTokens: 64_000 },
	}));
	const harness = await init(agent);

	// ── 5. Run the skill ───────────────────────────────────────────────────────
	const session = await harness.session(
		`style-guide-review:${input.number}:${runId}`,
	);

	// Use structured result mode so flue injects finish/give_up tools and loops until the
	// model calls finish — works reliably across models that don't self-terminate.
	const skillResult = await session.skill("style-guide-review", {
		result: StyleGuideResultFromModelSchema,
		args: {
			pullRequest: {
				number: pullRequest.number,
				title: pullRequest.title,
				base: pullRequest.base,
				head: pullRequest.head,
			},
			diffDir: input.diffDir,
			commentsPath: input.commentsPath,
			filename: input.filename,
		},
	});

	const rawData = skillResult.data;

	if (!rawData) {
		console.log({
			message: `Style-guide review: no result for PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
			event: "style_guide_review",
			number: input.number,
			filename: input.filename ?? null,
			runId,
			action: "no_result",
		});
		return {
			findings: [],
			summary: "Style-guide review produced no result.",
			reviewedFiles,
		} satisfies StyleGuideResult;
	}

	const mergedFindings = await assignFindingIds(rawData.findings);
	const data: StyleGuideResult = {
		findings: mergedFindings,
		summary:
			mergedFindings.length === rawData.findings.length
				? rawData.summary
				: `${mergedFindings.length} finding(s) found across ${reviewedFiles.length} file(s).`,
		reviewedFiles,
	};

	console.log({
		message: `Style-guide review complete: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""} — ${data.findings.length} finding(s) (${data.findings.filter((f) => f.severity === "warning").length} warning(s), ${data.findings.filter((f) => f.severity === "suggestion").length} suggestion(s))`,
		event: "style_guide_review",
		number: input.number,
		filename: input.filename ?? null,
		findings: data.findings.length,
		warnings: data.findings.filter((f) => f.severity === "warning").length,
		suggestions: data.findings.filter((f) => f.severity === "suggestion")
			.length,
		runId,
		action: "complete",
	});

	return data;
}

function parsePayload(payload: unknown): StyleGuideReviewPayload {
	const input = payload as Partial<StyleGuideReviewPayload>;
	if (
		typeof input.number !== "number" ||
		typeof input.diffDir !== "string" ||
		typeof input.commentsPath !== "string"
	) {
		throw new Error(
			"[flue] style-guide-review requires payload { number: number, diffDir: string, commentsPath: string }.",
		);
	}
	return {
		number: input.number,
		diffDir: input.diffDir,
		commentsPath: input.commentsPath,
		filename: typeof input.filename === "string" ? input.filename : undefined,
	};
}
