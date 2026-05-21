/**
 * Style-guide review specialist
 *
 * Hydrates the workspace from R2, then runs the style-guide-review skill
 * which uses the code tool to read the manifest and patch files directly.
 *
 * This agent is a pure analysis component — it never posts to GitHub.
 * All mutations are handled by code-review-orchestrator.
 *
 * POST /agents/style-guide-review/:id
 */
import type { FlueContext } from "@flue/runtime";
import {
	getDefaultWorkspace,
	getShellSandbox,
	hydrateFromBucket,
} from "@flue/runtime/cloudflare";
import * as v from "valibot";
import { getInstallationToken, getPullRequest } from "../lib/github";

export const triggers = { webhook: true };

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
export type StyleGuideFinding = v.InferOutput<typeof StyleGuideFindingFromModelSchema> & {
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
}

interface ManifestEntry {
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	patch_key: string | null;
}

export default async function ({ init, payload, env, runId }: FlueContext) {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as R2Bucket;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];

	console.log({
		message: `Style-guide review started: PR #${input.number}`,
		event: "style_guide_review",
		number: input.number,
		diffDir: input.diffDir,
		runId,
		action: "started",
	});

	const workspace = getDefaultWorkspace();
	if (!(await workspace.exists("/.hydrated"))) {
		await hydrateFromBucket(workspace, bucket);
		await workspace.writeFile("/.hydrated", new Date().toISOString());
	}

	// ── 0. Write diff files to workspace ──────────────────────────────────────
	// hydrateFromBucket only runs once (cached via /.hydrated), so diff files
	// written to R2 after the initial hydration won't be in the workspace.
	// Write the manifest and all patch files for this PR explicitly.
	const prObjects = await bucket.list({ prefix: `${input.diffDir}/` });
	await Promise.all(
		prObjects.objects.map(async (obj) => {
			const data = await bucket.get(obj.key);
			if (data) {
				await workspace.writeFile(`/${obj.key}`, await data.text());
			}
		}),
	);

	// ── 1. Fast-fail if no diff in R2 ─────────────────────────────────────────
	const manifestObj = await bucket.get(`${input.diffDir}/manifest.json`);
	if (!manifestObj) {
		console.log({
			message: `Style-guide review: no diff files found in R2 for PR #${input.number}`,
			event: "style_guide_review",
			number: input.number,
			diffDir: input.diffDir,
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
	const reviewedFiles = manifest
		.filter((f) => REVIEWABLE_PATH_RE.test(f.filename))
		.map((f) => f.filename);
	if (reviewedFiles.length === 0) {
		return {
			findings: [],
			summary: "No reviewable documentation files changed.",
			reviewedFiles: [],
		} satisfies StyleGuideResult;
	}

	// ── 4. Fetch PR metadata ───────────────────────────────────────────────────
	const token = await getInstallationToken(env as Record<string, string>);
	const pullRequest = await getPullRequest(token, input.number);

	// ── 5. Run the skill ───────────────────────────────────────────────────────
	const harness = await init({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.6",
		role: "cloudflare-docs-bot",
		// kimi-k2.6 uses reasoning tokens that count against the output cap.
		// The flue default of 20K is too small — raise to 64K to match the
		// AI CI repo's configuration for kimi.
		compaction: { reserveTokens: 64_000 },
	});
	const session = await harness.session(
		`style-guide-review:${input.number}:${runId}`,
	);

	const skillResult = await session.skill("style-guide-review/SKILL.md", {
		args: {
			pullRequest: {
				number: pullRequest.number,
				title: pullRequest.title,
				base: pullRequest.base.ref,
				head: pullRequest.head.ref,
			},
			diffDir: input.diffDir,
			commentsPath: input.commentsPath,
		},
	});
	const text = skillResult.text;

	// Parse the JSON block from the model's text response.
	// Use brace extraction instead of fence regex so backticks inside JSON
	// string values (e.g. evidence containing ```) don't truncate the match.
	let rawData: v.InferOutput<typeof StyleGuideResultFromModelSchema> | null =
		null;
	try {
		const braceStart = text.indexOf("{");
		const braceEnd = text.lastIndexOf("}");
		const jsonStr =
			braceStart !== -1 && braceEnd > braceStart
				? text.slice(braceStart, braceEnd + 1)
				: text;
		const parsed = JSON.parse(jsonStr);
		const result = v.safeParse(StyleGuideResultFromModelSchema, parsed);
		if (result.success) {
			rawData = result.output;
		} else {
			console.log({
				message: `Style-guide review: schema validation failed`,
				event: "style_guide_review",
				number: input.number,
				issues: result.issues.map((i) => i.message).join("; "),
				runId,
				action: "schema_validation_failed",
			});
		}
	} catch (err) {
		console.log({
			message: `Style-guide review: failed to parse model output`,
			event: "style_guide_review",
			number: input.number,
			error: err instanceof Error ? err.message : String(err),
			text_sample: text?.slice(0, 300),
			runId,
			action: "parse_failed",
		});
	}

	if (!rawData) {
		console.log({
			message: `Style-guide review: no result for PR #${input.number}`,
			event: "style_guide_review",
			number: input.number,
			text_length: text?.length ?? 0,
			text_sample: text?.slice(0, 500) ?? "(empty)",
			runId,
			action: "no_result",
		});
		return {
			findings: [],
			summary: "Style-guide review produced no result.",
			reviewedFiles,
		} satisfies StyleGuideResult;
	}

	const findings = await assignFindingIds(rawData.findings);
	const data: StyleGuideResult = { findings, summary: rawData.summary, reviewedFiles };

	console.log({
		message: `Style-guide review complete: PR #${input.number} — ${data.findings.length} finding(s) (${data.findings.filter((f) => f.severity === "warning").length} warning(s), ${data.findings.filter((f) => f.severity === "suggestion").length} suggestion(s))`,
		event: "style_guide_review",
		number: input.number,
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
	};
}
