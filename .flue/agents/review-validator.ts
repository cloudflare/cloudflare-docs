"use agent";

import { env } from "cloudflare:workers";
import { useResult } from "../lib/agent-output";
import { AGENT_TIMEOUT_MS } from "../lib/review-domain";
import type { AgentProps } from "@flue/runtime";
import { useInitialData, useModel, useSkill, useTool } from "@flue/runtime";
import * as v from "valibot";
import reviewValidationSkill from "../.agents/skills/review-validation/SKILL.md";
import { useBotRole } from "../lib/bot-role";
import {
	makeReadRepoFileTool,
	makeSearchRepoTool,
} from "../lib/github-repo-tools";
import { getGitHubToken } from "../lib/token-provider";
import type { Finding } from "../lib/review-domain";
type ReconcileFinding = Omit<Finding, "category"> & {
	category?: Finding["category"];
};

const MODEL = "cloudflare/@cf/zai-org/glm-5.2";

/** Name of the data part the structured result is written to. */
export const REVIEW_VALIDATION_DATA = "review_validation";

const SUBMIT_TOOL = "submit_review_validation";

/** Input handed to the agent at dispatch time as `initialData`. */
export interface ReviewValidatorInput {
	baseSha?: string;
	prBaseSha?: string;
	pullRequest: { number: number; title: string; base: string; head: string };
	headSha: string;
	streamLabel: string;
	findings: ReconcileFinding[];
	prBody: string;
	prTemplate: string;
	changedFiles: Array<{
		filename: string;
		status: string;
		additions?: number;
		deletions?: number;
	}>;
}

/** Structured result the model must submit. */
export const ReviewValidationSchema = v.object({
	decisions: v.array(
		v.object({
			id: v.string(),
			verdict: v.picklist(["valid", "invalid", "unverified"]),
			reason: v.string(),
		}),
	),
	summary: v.string(),
});

export type ReviewValidationData = v.InferOutput<typeof ReviewValidationSchema>;

function buildPrompt(input: ReviewValidatorInput): string {
	const findingsJson = JSON.stringify(input.findings, null, 2);
	const changedFiles =
		input.changedFiles.length > 0
			? input.changedFiles
					.map(
						(f) =>
							`- ${f.filename} [${f.status}]${f.additions === undefined || f.deletions === undefined ? "" : ` +${f.additions}/-${f.deletions}`}`,
					)
					.join("\n")
			: "(none)";

	return [
		`For side:base findings, inspect deleted lines at ${input.baseSha ?? input.headSha}; for side:head, inspect ${input.headSha}.`,
		`The full PR comparison base is ${input.prBaseSha ?? input.baseSha ?? input.pullRequest.base}. Suppress issues inherited unchanged from this base (including changes brought in by merging upstream).`,
		`Validate the following review findings for the "${input.streamLabel}" stream.`,
		"Apply the review-validation skill's rules. Use read_repo_file to read the",
		"actual file content at the PR head and verify each finding.",
		"",
		`args.pullRequest: ${JSON.stringify(input.pullRequest)}`,
		`args.headSha: ${input.headSha}`,
		`args.streamLabel: ${input.streamLabel}`,
		"",
		`args.findings (${input.findings.length}):`,
		findingsJson,
		"",
		"args.prBody:",
		JSON.stringify(input.prBody || ""),
		"",
		"args.prTemplate:",
		JSON.stringify(input.prTemplate || ""),
		"",
		`args.changedFiles (${input.changedFiles.length}):`,
		changedFiles,
		"",
		`When finished, call ${SUBMIT_TOOL} exactly once with a decision for each`,
		'finding. Use "unverified" when evidence cannot be checked; only mark "invalid" for',
		"clear false positives with a specific reason.",
	].join("\n");
}

export default function ReviewValidator(_props: AgentProps): string {
	useModel(env.DOCS_FLUE_VALIDATION_MODEL || MODEL);
	useSkill(reviewValidationSkill);
	useBotRole();

	const input = useInitialData<ReviewValidatorInput>();

	useTool(makeReadRepoFileTool(getGitHubToken, input.headSha));
	useTool(makeSearchRepoTool(getGitHubToken));

	useResult(REVIEW_VALIDATION_DATA, ReviewValidationSchema, (data) => {
		const expected = new Set(input.findings.map((finding) => finding.id));
		if (
			data.decisions.length !== expected.size ||
			new Set(data.decisions.map((d) => d.id)).size !== expected.size ||
			data.decisions.some((d) => !expected.has(d.id))
		)
			throw new Error("Submit exactly one decision per finding ID.");
	});

	return buildPrompt(input);
}

ReviewValidator.agentName = "review-validator";

ReviewValidator.durability = { maxAttempts: 5, timeoutMs: AGENT_TIMEOUT_MS };
