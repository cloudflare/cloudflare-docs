/**
 * Review v2 domain contract.
 *
 * Shared by the diff libs (`lib/review/diff/**`), the review agents, the
 * judge, the renderer, the state module, and the orchestrator. Change this
 * file deliberately: every consumer depends on these shapes.
 */
import * as v from "valibot";

// ---------------------------------------------------------------------------
// Specialists
// ---------------------------------------------------------------------------

export const SPECIALISTS = ["code", "style", "conventions"] as const;
export type Specialist = (typeof SPECIALISTS)[number];

/** Finding id prefix per specialist. */
export const SPECIALIST_ID_PREFIX: Record<Specialist, string> = {
	code: "C",
	style: "S",
	conventions: "V",
};

// ---------------------------------------------------------------------------
// Model-facing schemas (validated at the submit tool and again by trusted code)
// ---------------------------------------------------------------------------

/** Required prose is preserved verbatim so findings never end mid-sentence. */
function requiredProse() {
	return v.pipe(v.string(), v.minLength(1));
}

// Diff line prefixes from `formatFilePatch`: `+ 12 │ `, `= 12 │ `, `  12 │ `,
// and `- (old 12) │ `, or a bare `+ ` / `= ` marker without the line number.
const NUMBERED_DIFF_PREFIX = /^(?:[+= ] \d+|- \(old \d+\)) │ ?/;
const BARE_DIFF_MARKER = /^[+=] /;

/**
 * Remove diff prefixes that models copy along with snippet lines. Prefixes
 * are removed only when every non-blank line has one, so code that happens
 * to start with `+ ` is left alone.
 */
export function stripDiffPrefixes(snippet: string): string {
	const lines = snippet.split("\n");
	const content = lines.filter((line) => line.trim() !== "");
	if (content.length === 0) return snippet;
	for (const prefix of [NUMBERED_DIFF_PREFIX, BARE_DIFF_MARKER]) {
		if (content.every((line) => prefix.test(line)))
			return lines.map((line) => line.replace(prefix, "")).join("\n");
	}
	return snippet;
}

/**
 * Text copied from the diff, with diff prefixes removed. It is dropped when
 * over `limit` characters, because a truncated copy no longer matches its
 * source.
 */
function diffSnippet(limit: number) {
	return v.optional(
		v.pipe(
			v.string(),
			v.description(
				`Exact code excerpt from the diff, without the diff marker and line number. At most ${limit} characters.`,
			),
			v.transform((value) => {
				const code = stripDiffPrefixes(value);
				return code.length <= limit ? code : undefined;
			}),
		),
	);
}

/**
 * One finding as a specialist submits it. Trusted code assigns the id,
 * specialist, fingerprint, and SHAs.
 */
export const SpecialistFindingSchema = v.object({
	/** Repository path, or null for a PR-level finding (conventions only). */
	path: v.nullable(v.pipe(v.string(), v.minLength(1))),
	/** New-file line number of a target (`+`) line. Omit for file-level findings. */
	line: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
	title: requiredProse(),
	explanation: requiredProse(),
	/** Shortest excerpt that pinpoints the problem, copied from the diff. */
	snippet: diffSnippet(500),
});
export type SpecialistFinding = v.InferOutput<typeof SpecialistFindingSchema>;

export const SpecialistResultSchema = v.object({
	findings: v.array(SpecialistFindingSchema),
	summary: v.string(),
});
export type SpecialistResult = v.InferOutput<typeof SpecialistResultSchema>;

export const JudgeResultSchema = v.object({
	/** One entry per new finding id: keep it or drop it. */
	new_findings: v.array(
		v.object({
			id: v.string(),
			decision: v.picklist(["keep", "drop"]),
			reason: v.string(),
		}),
	),
	/** One entry per touched prior finding id. */
	prior_findings: v.array(
		v.object({
			id: v.string(),
			decision: v.picklist(["active", "resolved", "dismissed"]),
			reason: v.string(),
		}),
	),
});
export type JudgeResult = v.InferOutput<typeof JudgeResultSchema>;

// ---------------------------------------------------------------------------
// Findings (trusted)
// ---------------------------------------------------------------------------

export interface Finding {
	/** Stable id: `${SPECIALIST_ID_PREFIX}-${hash8(specialist|path|normalizedTitle)}`. */
	id: string;
	specialist: Specialist;
	path: string | null;
	line?: number;
	title: string;
	explanation: string;
	snippet?: string;
	/** Fingerprint of the anchored added line where it was last located. */
	fingerprint?: LineFingerprint;
	firstSeenSha: string;
	lastSeenSha: string;
}

export type FindingStatus = "active" | "dismissed" | "resolved";

export interface TrackedFinding extends Finding {
	status: FindingStatus;
	/** Judge's one-line reason for the current status (dismissed/resolved/dropped). */
	statusReason?: string;
	/** False when published without a successful judge pass. */
	verified?: boolean;
}

// ---------------------------------------------------------------------------
// Diff model
// ---------------------------------------------------------------------------

/** GitHub file status values from the PR files API. */
export type FileStatus =
	| "added"
	| "modified"
	| "removed"
	| "renamed"
	| "copied"
	| "changed"
	| "unchanged";

export interface PatchLine {
	kind: "add" | "del" | "ctx";
	oldLine?: number;
	newLine?: number;
	text: string;
}

export interface PatchHunk {
	header: string;
	oldStart: number;
	newStart: number;
	lines: PatchLine[];
}

/**
 * - `reviewable`: has hunks; eligible for specialists.
 * - `collapsed`: listed on one line (deleted file, rename only).
 * - `excluded`: noise (lockfile, generated, binary, vendored).
 * - `no-patch`: GitHub omitted the patch (file too large) — cannot be reviewed.
 */
export type FileDisposition =
	"reviewable" | "collapsed" | "excluded" | "no-patch";

export interface PatchFile {
	path: string;
	previousPath?: string;
	status: FileStatus;
	additions: number;
	deletions: number;
	disposition: FileDisposition;
	/** Human-readable reason for non-reviewable dispositions. */
	reason?: string;
	hunks: PatchHunk[];
}

/** Hash of path + normalized added line + normalized neighbouring new-file lines. */
export type LineFingerprint = string;

// ---------------------------------------------------------------------------
// Review plan
// ---------------------------------------------------------------------------

export type ReviewTier = "inline" | "tool" | "too-large";

export const TIER_LIMITS = {
	inlineMaxTokens: 250_000,
	toolMaxTokens: 1_000_000,
	maxFiles: 1_000,
} as const;

export interface SpecialistTarget {
	specialist: Specialist;
	/** path → sorted new-file line numbers eligible for new findings. */
	lines: Record<string, number[]>;
	/** Paths with at least one target line (conventions: all changed paths). */
	files: string[];
	/**
	 * Fingerprint of every target line, keyed `${path}:${line}`. Used to anchor
	 * accepted findings; `Object.values()` is committed on success.
	 */
	fingerprints: Record<string, LineFingerprint>;
	estimatedTokens: number;
}

export interface NotReviewedFile {
	path: string;
	reason: string;
}

export interface ReviewPlan {
	tier: ReviewTier;
	fullReview: boolean;
	/** Only the specialists that should be dispatched this run. */
	targets: Partial<Record<Specialist, SpecialistTarget>>;
	/** Specialists not dispatched, with the reason (shown in the comment). */
	skipped: Partial<Record<Specialist, string>>;
	notReviewed: NotReviewedFile[];
	totalEstimatedTokens: number;
	conventionsInputHash: string;
}

// ---------------------------------------------------------------------------
// Comments (dismissal evidence)
// ---------------------------------------------------------------------------

export type CommenterRole = "author" | "maintainer";

export interface EligibleComment {
	id: number;
	kind: "issue" | "review" | "review_comment";
	author: string;
	role: CommenterRole;
	createdAt: string;
	body: string;
	/** Present for inline review comments. */
	path?: string;
	line?: number;
}

// ---------------------------------------------------------------------------
// Persistent state (R2, reviews/v2/pr-<n>/state.json)
// ---------------------------------------------------------------------------

export interface ActiveRun {
	runId: string;
	/** Workflow instance id, used to terminate a superseded run. */
	workflowInstanceId: string;
	headSha: string;
	startedAt: string;
	/** Agent instance ids to abort if this run is superseded. */
	agentIds: string[];
}

export interface ReviewStateV2 {
	version: 2;
	pr: number;
	activeRun?: ActiveRun;
	/** Fingerprints of lines each specialist has successfully reviewed. */
	reviewed: Record<Specialist, LineFingerprint[]>;
	/** Active, dismissed, and recently resolved findings. */
	findings: TrackedFinding[];
	/** Hash of title + body + sorted changed paths the conventions reviewer last saw. */
	conventionsInputHash?: string;
	/** createdAt of the newest eligible comment already shown to the judge. */
	commentsSeenThrough?: string;
	commentId?: number;
	lastCompleted?: { runId: string; headSha: string; completedAt: string };
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

export interface SectionStatus {
	ran: boolean;
	failed: boolean;
	/** Why the specialist did not run (e.g. "no docs content changes"). */
	skippedReason?: string;
}

export interface RenderInput {
	pr: number;
	headSha: string;
	fullReview: boolean;
	tier: ReviewTier;
	sections: Record<Specialist, SectionStatus>;
	active: TrackedFinding[];
	/** Findings resolved in this run. */
	resolved: TrackedFinding[];
	/** All currently dismissed findings. */
	dismissed: TrackedFinding[];
	notReviewed: NotReviewedFile[];
	judge: "ok" | "failed" | "skipped";
}

// ---------------------------------------------------------------------------
// Run summary (ReviewOrchestrator return value; read by bin/replay.ts)
// ---------------------------------------------------------------------------

export interface SpecialistRunSummary {
	ok: boolean;
	accepted: number;
	droppedOffTarget: number;
	error?: string;
}

export interface ReviewRunSummary {
	outcome: "published" | "logged" | "skipped" | "superseded" | "failed";
	reason?: string;
	pr: number;
	headSha: string;
	runId: string;
	replay?: boolean;
	/** Run artifact name of the rendered comment markdown; replays keep it for bin/replay.ts. */
	commentArtifact?: string;
	tier?: ReviewTier;
	fullReview?: boolean;
	specialists?: Partial<Record<Specialist, SpecialistRunSummary>>;
	judge?: "ok" | "failed" | "skipped";
	findings?: {
		active: number;
		resolved: number;
		dismissed: number;
		newKept: number;
		newDropped: number;
	};
	notReviewed?: number;
	startedAt: string;
	finishedAt: string;
}
