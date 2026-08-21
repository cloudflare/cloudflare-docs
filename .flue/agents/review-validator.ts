"use agent";

/**
 * Review validator (Flue 2.0 agent).
 *
 * Receives active findings from the reconcile step and validates each one
 * by reading the actual repo file content at the PR head SHA. Suppresses
 * false positives — does not add new findings. Uses a more capable model
 * (GLM-5.2) than the specialist agents for higher-fidelity validation.
 *
 * Structured output: the model's only way to return a result is the
 * `submit_review_validation` tool (typed by `ReviewValidationSchema`) →
 * `useDataWriter`; `useAgentFinish` enforces the call.
 */
import type { AgentProps } from "@flue/runtime";
import {
	defineTool,
	useAgentFinish,
	useDataWriter,
	useInitialData,
	useModel,
	useSkill,
	useTool,
} from "@flue/runtime";
import * as v from "valibot";
import reviewValidationSkill from "../.agents/skills/review-validation/SKILL.md";
import { useBotRole } from "../lib/bot-role";
import {
	makeReadRepoFileTool,
	makeSearchRepoTool,
} from "../lib/github-repo-tools";
import { getGitHubToken } from "../lib/token-provider";
import type { ReconcileFinding } from "./reconcile-reviewer";

const MODEL = "cloudflare/@cf/zai-org/glm-5.2";

/** Name of the data part the structured result is written to. */
export const REVIEW_VALIDATION_DATA = "review_validation";

const SUBMIT_TOOL = "submit_review_validation";

/** Input handed to the agent at dispatch time as `initialData`. */
export interface ReviewValidatorInput {
	pullRequest: { number: number; title: string; base: string; head: string };
	headSha: string;
	streamLabel: string;
	findings: ReconcileFinding[];
	prBody: string;
	prTemplate: string;
	changedFiles: Array<{
		filename: string;
		status: string;
		additions: number;
		deletions: number;
	}>;
}

/** Structured result the model must submit. */
export const ReviewValidationSchema = v.object({
	decisions: v.array(
		v.object({
			id: v.string(),
			verdict: v.picklist(["valid", "invalid"]),
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
							`- ${f.filename} [${f.status}] +${f.additions}/-${f.deletions}`,
					)
					.join("\n")
			: "(none)";

	return [
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
		'finding. Default to "valid" when uncertain; only mark "invalid" for',
		"clear false positives with a specific reason.",
	].join("\n");
}

export default function ReviewValidator(_props: AgentProps): string {
	useModel(MODEL);
	useSkill(reviewValidationSkill);
	useBotRole();

	const input = useInitialData<ReviewValidatorInput>();

	useTool(makeReadRepoFileTool(getGitHubToken, input.headSha));
	useTool(makeSearchRepoTool(getGitHubToken));

	const writeResult = useDataWriter(REVIEW_VALIDATION_DATA, {
		schema: ReviewValidationSchema,
	});

	useTool(
		defineTool({
			name: SUBMIT_TOOL,
			description:
				"Submit the validation result. Call exactly once with a decision (valid or invalid) for each finding and a one-line summary. This is the only way to return your result.",
			input: ReviewValidationSchema,
			run: ({ data }) => {
				const findingIds = new Set(input.findings.map((f) => f.id));
				const seenIds = new Set<string>();

				if (data.decisions.length !== input.findings.length) {
					throw new Error(
						`Expected ${input.findings.length} decisions (one per finding), got ${data.decisions.length}. Submit exactly one decision for each finding.`,
					);
				}

				for (const d of data.decisions) {
					if (!findingIds.has(d.id)) {
						throw new Error(
							`Decision id "${d.id}" does not match any finding. Valid ids: ${[...findingIds].join(", ")}.`,
						);
					}
					if (seenIds.has(d.id)) {
						throw new Error(
							`Duplicate decision for finding "${d.id}". Each finding must have exactly one decision.`,
						);
					}
					seenIds.add(d.id);
				}

				writeResult(data);
				return "Validation recorded.";
			},
		}),
	);

	useAgentFinish(({ response, append }) => {
		const submitted = response.toolCalls.some(
			(call) => call.tool === SUBMIT_TOOL && !call.isError,
		);
		if (submitted) return;
		append({
			kind: "signal",
			type: "reminder",
			body: `You ended without calling ${SUBMIT_TOOL} — nothing was recorded. Call it now with a decision for each finding and a summary.`,
		});
	});

	return buildPrompt(input);
}

ReviewValidator.agentName = "review-validator";
