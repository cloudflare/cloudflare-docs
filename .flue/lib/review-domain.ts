import * as v from "valibot";

export const REVIEW_VERSION = "2.0.3-1";
export const PAGE_SIZE = 12;
export const REVIEW_CONCURRENCY = 3;
export const COMMENT_LIMIT = 55_000;
export const AGENT_TIMEOUT_MS = 12 * 60_000;

const text = (length: number) => v.pipe(v.string(), v.maxLength(length));
export const FindingSchema = v.object({
	category: v.picklist(["code", "style", "conventions"]),
	severity: v.picklist(["critical", "warning", "suggestion"]),
	path: text(4096),
	line: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
	side: v.optional(v.picklist(["head", "base"])),
	rule: text(200),
	evidence: text(2000),
	suggestion: text(2000),
});
export const FindingsSchema = v.object({
	findings: v.pipe(v.array(FindingSchema), v.maxLength(50)),
	summary: text(2000),
});
export type Finding = v.InferOutput<typeof FindingSchema> & {
	id: string;
	status?: "active" | "ignored";
	reviewerNote?: string;
	commitSha?: string;
};

export interface ReviewUnit {
	index: number;
	filename: string;
	status: string;
	style: boolean;
	/** Numbered diff, including additions, deletions, and surrounding context. */
	patch: string;
	/** Exact changed line numbers on each side, for validating model locations. */
	headLines: number[];
	baseLines: number[];
}

export interface Snapshot {
	files: number;
	changedFiles: number;
	units: number;
	excluded: number;
	mergeBase: string;
	diffBase: string;
	/** The previous reviewed commit could not be fetched. */
	incrementalFallback?: boolean;
}

export interface Baseline {
	runId: string;
	headSha: string;
	baseSha: string;
	batches: number;
	reviewedAt: string;
	title: string;
	body: string;
}

export interface ReviewJob {
	number: number;
	runId: string;
	headSha: string;
	baseSha: string;
	baseRef: string;
	title: string;
	body: string;
	author: string;
	moderate: boolean;
	force?: boolean;
	full?: boolean;
	baseline?: Baseline;
	triggerCommentId?: number;
}

export interface ReviewPageParams {
	job: ReviewJob;
	/** A fresh Workflow instance for each bounded page. */
	page: number;
	phase: "prepare" | "review" | "publish" | "deliver";
}

export interface UnitResult {
	index: number;
	path: string;
	findings: Finding[];
	status: "complete" | "failed";
	validation: "complete" | "failed" | "unnecessary";
	message?: string;
}

export interface FindingDecision {
	id: string;
	status: "active" | "ignored" | "resolved";
	reason: string;
	reopened?: boolean;
}

/** The model cannot resolve unchanged issues or silently revoke a dismissal. */
export function applyReconciliation(
	findings: Finding[],
	decisions: FindingDecision[],
	changedPaths: string[],
	metadataChanged: boolean,
): Finding[] {
	const byId = new Map(decisions.map((decision) => [decision.id, decision]));
	if (
		decisions.length !== findings.length ||
		byId.size !== findings.length ||
		findings.some((finding) => !byId.has(finding.id))
	)
		throw new Error("Incomplete reconciliation decisions");
	return findings.flatMap((finding) => {
		const decision = byId.get(finding.id)!;
		if (finding.status === "ignored" && !decision.reopened) return [finding];
		if (
			decision.status === "resolved" &&
			(changedPaths.includes(finding.path) ||
				(finding.path === "pr" && metadataChanged))
		)
			return [];
		return [
			{
				...finding,
				status:
					decision.status === "ignored"
						? ("ignored" as const)
						: ("active" as const),
				reviewerNote: decision.reason,
			},
		];
	});
}

export function artifactPrefix(job: ReviewJob): string {
	return `reviews/${REVIEW_VERSION}/pr-${job.number}/${job.runId}/`;
}

export async function identifyFindings(
	findings: v.InferOutput<typeof FindingSchema>[],
	unit?: ReviewUnit,
): Promise<Finding[]> {
	const valid = findings.filter((finding) => {
		if (!unit) return finding.path === "pr";
		if (finding.path !== unit.filename || finding.category === "conventions")
			return false;
		if (
			finding.category === "style" &&
			(!unit.style || finding.side === "base")
		)
			return false;
		const lines = finding.side === "base" ? unit.baseLines : unit.headLines;
		return finding.line !== undefined && lines.includes(finding.line);
	});
	const identified = await Promise.all(
		valid.map(async (finding) => {
			const bytes = new TextEncoder().encode(
				`${finding.category}:${finding.path}:${finding.rule}:${finding.path === "pr" ? "" : finding.evidence}`,
			);
			const digest = await crypto.subtle.digest("SHA-256", bytes);
			const id = Array.from(new Uint8Array(digest), (b) =>
				b.toString(16).padStart(2, "0"),
			)
				.join("")
				.slice(0, 16);
			return { ...finding, id };
		}),
	);
	return [
		...new Map(identified.map((finding) => [finding.id, finding])).values(),
	];
}

/** Escape model/PR text before placing it inside a GitHub comment. */
export function escapeMarkdown(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/([\\`*_{}\[\]()#+.!|~-])/g, "\\$1")
		.replace(/@/g, "&#64;");
}

export function renderFinding(
	finding: Finding,
	job: ReviewJob,
	mergeBase: string,
): string {
	const sha =
		finding.commitSha ?? (finding.side === "base" ? mergeBase : job.headSha);
	const path = finding.path.split("/").map(encodeURIComponent).join("/");
	const location =
		finding.path === "pr"
			? "Pull request"
			: `[${escapeMarkdown(finding.path)}${finding.line ? `:${finding.line}` : ""}](https://github.com/cloudflare/cloudflare-docs/blob/${sha}/${path}${finding.line ? `#L${finding.line}` : ""})`;
	return `<!-- finding:${finding.id} -->\n### ${escapeMarkdown(finding.rule)}\n\n${finding.category} · ${finding.severity} · ${location} · ID: \`${finding.id}\`\n\n${escapeMarkdown(finding.evidence)}\n\n${finding.status === "ignored" ? `Acknowledged: ${escapeMarkdown(finding.reviewerNote ?? "Dismissed by reviewer")}` : escapeMarkdown(finding.suggestion)}\n\n`;
}

/** Never split a finding or silently discard overflow. */
export function appendReport(
	buffer: string,
	block: string,
): { flush?: string; buffer: string } {
	if (block.length > COMMENT_LIMIT)
		throw new Error("Report block exceeds comment limit");
	return buffer.length + block.length > COMMENT_LIMIT
		? { flush: buffer, buffer: block }
		: { buffer: buffer + block };
}
