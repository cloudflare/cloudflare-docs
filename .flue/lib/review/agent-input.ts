import * as v from "valibot";
import { hash } from "./hash";
import { formatFileIndex, formatTargetDiff } from "./diff/format";
import type {
	EligibleComment,
	Finding,
	PatchFile,
	ReviewPlan,
	Specialist,
	TrackedFinding,
} from "./types";

const TierSchema = v.picklist(["inline", "tool", "too-large"]);

function specialistInitialData(specialist: Specialist) {
	return v.object({
		runId: v.pipe(v.string(), v.minLength(1)),
		pr: v.pipe(v.number(), v.integer(), v.minValue(1)),
		headSha: v.pipe(v.string(), v.minLength(1)),
		baseSha: v.pipe(v.string(), v.minLength(1)),
		specialist: v.literal(specialist),
		tier: TierSchema,
	});
}

export const CodeReviewerInitialDataSchema = specialistInitialData("code");
export const StyleGuideReviewerInitialDataSchema =
	specialistInitialData("style");
export const ConventionsReviewerInitialDataSchema =
	specialistInitialData("conventions");
export const ReviewJudgeInitialDataSchema = v.object({
	runId: v.pipe(v.string(), v.minLength(1)),
	pr: v.pipe(v.number(), v.integer(), v.minValue(1)),
	headSha: v.pipe(v.string(), v.minLength(1)),
	baseSha: v.pipe(v.string(), v.minLength(1)),
	specialist: v.literal("judge"),
	tier: TierSchema,
});

export type CodeReviewerInitialData = v.InferOutput<
	typeof CodeReviewerInitialDataSchema
>;
export type StyleGuideReviewerInitialData = v.InferOutput<
	typeof StyleGuideReviewerInitialDataSchema
>;
export type ConventionsReviewerInitialData = v.InferOutput<
	typeof ConventionsReviewerInitialDataSchema
>;
export type ReviewJudgeInitialData = v.InferOutput<
	typeof ReviewJudgeInitialDataSchema
>;

export interface PullRequestInput {
	number: number;
	title: string;
	body: string;
	author: string;
}

export interface BuildSpecialistMessageInput {
	specialist: Specialist;
	pr: PullRequestInput;
	plan: ReviewPlan;
	files: PatchFile[];
	repoAgentsMd?: string;
	prTemplate?: string;
}

function section(name: string, content: string): string {
	return `<${name}>\n${content || "(none)"}\n</${name}>`;
}

function specialistIndex(
	files: PatchFile[],
	plan: ReviewPlan,
	specialist: Specialist,
): string {
	const target = plan.targets[specialist];
	if (!target) return "(no target files)";
	return formatFileIndex(files, { ...plan, targets: { [specialist]: target } });
}

export function buildSpecialistMessage({
	specialist,
	pr,
	plan,
	files,
	repoAgentsMd,
	prTemplate,
}: BuildSpecialistMessageInput): string {
	const sections = [section("pull_request", JSON.stringify(pr, null, 2))];

	if (specialist === "conventions") {
		sections.push(section("pr_template", prTemplate ?? ""));
		sections.push(
			section(
				"changed_files",
				files
					.map(
						(file) =>
							`${file.path} (${file.status}, +${file.additions} -${file.deletions})`,
					)
					.join("\n"),
			),
		);
		return sections.join("\n\n");
	}

	if (repoAgentsMd) sections.push(section("repo_agents_md", repoAgentsMd));

	const target = plan.targets[specialist];
	if (plan.tier === "inline" && target) {
		sections.push(section("target_diff", formatTargetDiff(files, target)));
	} else {
		sections.push(
			section("file_index", specialistIndex(files, plan, specialist)),
		);
		sections.push(
			"Read every indexed file with target lines using read_patch before submitting.",
		);
	}

	return sections.join("\n\n");
}

export interface TouchedFinding {
	finding: TrackedFinding;
	currentHunk?: string;
}

export interface JudgeDiffInput {
	kind: "target_diff" | "file_index";
	content: string;
}

export interface BuildJudgeMessageInput {
	pr: PullRequestInput;
	newFindings: Finding[];
	touched: TouchedFinding[];
	dismissed: TrackedFinding[];
	comments: EligibleComment[];
	targetDiffOrIndex: JudgeDiffInput;
	maxChars?: number;
}

function findingJson(
	finding: Finding | TrackedFinding,
): Record<string, unknown> {
	return {
		id: finding.id,
		specialist: finding.specialist,
		path: finding.path,
		...(finding.line === undefined ? {} : { line: finding.line }),
		title: finding.title,
		explanation: finding.explanation,
		...(finding.snippet === undefined ? {} : { snippet: finding.snippet }),
		...("status" in finding ? { status: finding.status } : {}),
		...("statusReason" in finding && finding.statusReason
			? { status_reason: finding.statusReason }
			: {}),
	};
}

function renderComments(comments: EligibleComment[]): string {
	return comments
		.map((comment) =>
			JSON.stringify({
				id: comment.id,
				kind: comment.kind,
				author: comment.author,
				role: comment.role,
				created_at: comment.createdAt,
				...(comment.path === undefined ? {} : { path: comment.path }),
				...(comment.line === undefined ? {} : { line: comment.line }),
				body: comment.body,
			}),
		)
		.join("\n");
}

export function buildJudgeMessage({
	pr,
	newFindings,
	touched,
	dismissed,
	comments,
	targetDiffOrIndex,
	maxChars = 600_000,
}: BuildJudgeMessageInput): string {
	const stableSections = [
		section("pull_request", JSON.stringify(pr, null, 2)),
		section(
			"new_findings",
			JSON.stringify(newFindings.map(findingJson), null, 2),
		),
		section(
			"touched_prior_findings",
			JSON.stringify(
				touched.map(({ finding, currentHunk }) => ({
					...findingJson(finding),
					current_hunk: currentHunk ?? "location no longer in diff",
				})),
				null,
				2,
			),
		),
		section(
			"dismissed_findings",
			JSON.stringify(dismissed.map(findingJson), null, 2),
		),
	];
	const newestFirst = [...comments].sort((a, b) =>
		b.createdAt.localeCompare(a.createdAt),
	);
	let retainedComments = newestFirst;
	let diff = targetDiffOrIndex.content;
	let diffTruncated = false;
	let commentsTruncated = false;

	const render = () =>
		[
			...stableSections,
			section(
				"comments",
				`${commentsTruncated ? "[Older comments omitted for size.]\n" : ""}${renderComments(retainedComments)}`,
			),
			section(
				targetDiffOrIndex.kind,
				`${diffTruncated ? "[Diff truncated for size.]\n" : ""}${diff}`,
			),
		].join("\n\n");

	while (render().length > maxChars && diff.length > 0) {
		diff = diff.slice(0, Math.max(0, diff.length - 20_000));
		diffTruncated = true;
	}
	while (render().length > maxChars && retainedComments.length > 0) {
		retainedComments = retainedComments.slice(0, -1);
		commentsTruncated = true;
	}
	return render();
}

export interface ReadPatchArtifact {
	file: PatchFile;
	targetLines: Record<Specialist, number[]>;
}

export function readPatchArtifactName(path: string): string {
	return `files/${hash(path)}.json`;
}
