import type {
	PatchFile,
	ReviewPlan,
	Specialist,
	SpecialistTarget,
} from "../types";
import { TIER_LIMITS } from "../types";
import { hunkCodeLines } from "./code-lines";
import { addedLineFingerprints } from "./fingerprint";
import { formatTargetDiff } from "./format";

const STYLE_PATH = /^src\/content\/(docs|partials|changelog)\/.*\.mdx$/;

export interface BuildReviewPlanInput {
	files: PatchFile[];
	reviewed: Record<Specialist, string[]>;
	fullReview: boolean;
	conventionsInputHash: string;
	previousConventionsInputHash?: string;
	/**
	 * New-file lines inside code blocks or code components, per MDX path, read
	 * from the head file. Paths without an entry fall back to their hunks.
	 */
	mdxCodeLines?: Record<string, number[]>;
}

type LineFilter = (file: PatchFile, newLine: number) => boolean;

function target(
	specialist: Specialist,
	files: PatchFile[],
	reviewed: string[],
	fullReview: boolean,
	include: LineFilter,
): SpecialistTarget {
	const reviewedSet = new Set(reviewed);
	const selected = files.filter((file) => file.disposition === "reviewable");
	const targetLines = selected.flatMap((file) =>
		addedLineFingerprints(file)
			.filter(
				({ newLine, fingerprint }) =>
					include(file, newLine) &&
					(fullReview || !reviewedSet.has(fingerprint)),
			)
			.map(({ newLine, fingerprint }) => ({
				path: file.path,
				newLine,
				fingerprint,
			})),
	);
	const lines: Record<string, number[]> = {};
	for (const item of targetLines) (lines[item.path] ??= []).push(item.newLine);
	const target = {
		specialist,
		lines,
		files: [...new Set(targetLines.map((item) => item.path))],
		fingerprints: Object.fromEntries(
			targetLines.map((item) => [
				`${item.path}:${item.newLine}`,
				item.fingerprint,
			]),
		),
		estimatedTokens: 0,
	};
	target.estimatedTokens = Math.ceil(
		formatTargetDiff(selected, target).length / 4,
	);
	return target;
}

/** Build deterministic specialist targets and select the diff delivery tier. */
export function buildReviewPlan(input: BuildReviewPlanInput): ReviewPlan {
	const reviewable = input.files.filter(
		(file) => file.disposition === "reviewable",
	);
	// Code review covers every line of non-MDX files, but only the code blocks
	// and code components of MDX files; MDX prose belongs to style review.
	const mdxCodeLines = new Map<string, Set<number>>();
	const isCodeLine: LineFilter = (file, newLine) => {
		if (!file.path.endsWith(".mdx")) return true;
		let lines = mdxCodeLines.get(file.path);
		if (!lines) {
			lines = new Set(input.mdxCodeLines?.[file.path] ?? hunkCodeLines(file));
			mdxCodeLines.set(file.path, lines);
		}
		return lines.has(newLine);
	};
	const hasCodeLines = (file: PatchFile) =>
		file.hunks.some((hunk) =>
			hunk.lines.some(
				(line) => line.kind === "add" && isCodeLine(file, line.newLine!),
			),
		);
	const isStyleFile = (file: PatchFile) => STYLE_PATH.test(file.path);
	const code = target(
		"code",
		reviewable,
		input.reviewed.code,
		input.fullReview,
		isCodeLine,
	);
	const style = target(
		"style",
		reviewable,
		input.reviewed.style,
		input.fullReview,
		isStyleFile,
	);
	// "Nothing new" only makes sense when the PR has eligible files that an
	// earlier run already reviewed; otherwise the PR has no such changes at all.
	const skipReason = (eligible: boolean, kind: string) =>
		eligible && !input.fullReview
			? `no new ${kind} changes since the last review`
			: `no ${kind} changes to review`;
	const conventionsNeeded =
		input.fullReview ||
		input.conventionsInputHash !== input.previousConventionsInputHash;
	const conventions = target("conventions", reviewable, [], true, () => true);
	const unionLines: Record<string, number[]> = {};
	for (const target of [code, style]) {
		for (const [path, lines] of Object.entries(target.lines)) {
			unionLines[path] = [
				...new Set([...(unionLines[path] ?? []), ...lines]),
			].sort((a, b) => a - b);
		}
	}
	const unionTarget: SpecialistTarget = {
		specialist: "code",
		lines: unionLines,
		files: Object.keys(unionLines),
		fingerprints: {},
		estimatedTokens: 0,
	};
	const totalEstimatedTokens = Math.ceil(
		formatTargetDiff(reviewable, unionTarget).length / 4,
	);
	const tooLarge =
		reviewable.length > TIER_LIMITS.maxFiles ||
		totalEstimatedTokens > TIER_LIMITS.toolMaxTokens;
	const tier = tooLarge
		? "too-large"
		: totalEstimatedTokens > TIER_LIMITS.inlineMaxTokens
			? "tool"
			: "inline";
	const targets: ReviewPlan["targets"] = {};
	const skipped: ReviewPlan["skipped"] = {};
	if (tooLarge) {
		if (conventionsNeeded) targets.conventions = conventions;
		else skipped.conventions = "PR metadata unchanged";
		skipped.code = "diff too large";
		skipped.style = "diff too large";
	} else {
		if (code.files.length) targets.code = code;
		else skipped.code = skipReason(reviewable.some(hasCodeLines), "code");
		if (style.files.length) targets.style = style;
		else
			skipped.style = skipReason(reviewable.some(isStyleFile), "docs content");
		if (conventionsNeeded) targets.conventions = conventions;
		else skipped.conventions = "PR metadata unchanged";
	}
	const notReviewed = input.files
		.filter((file) => file.disposition !== "reviewable" || tooLarge)
		.map((file) => ({
			path: file.path,
			reason:
				tooLarge && file.disposition === "reviewable"
					? "diff too large"
					: file.reason!,
		}));
	return {
		tier,
		fullReview: input.fullReview,
		targets,
		skipped,
		notReviewed,
		totalEstimatedTokens,
		conventionsInputHash: input.conventionsInputHash,
	};
}
