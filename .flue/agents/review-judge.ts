"use agent";

import type { AgentProps } from "@flue/runtime";
import { useInitialData, useModel, useTool } from "@flue/runtime";
import repoToolsInstructions from "../prompts/repo-tools.md";
import reviewJudgeInstructions from "../prompts/review-judge.md";
import {
	ReviewJudgeInitialDataSchema,
	type ReviewJudgeInitialData,
} from "../lib/review/agent-input";
import { makeRunReadPatchTool } from "../lib/review/read-patch-r2";
import { JudgeResultSchema } from "../lib/review/types";
import { useBotRole, useInstructions } from "../lib/agents/instructions";
import { JUDGE_DURABILITY } from "../lib/agents/durability";
import { GLM_5_3 } from "../lib/agents/models";
import {
	CODE_RULE_INSTRUCTION,
	CONVENTIONS_RULE_INSTRUCTION,
	STYLE_RULE_INSTRUCTIONS,
} from "../lib/agents/review-rules";
import { useSubmitResult } from "../lib/agents/submit-result";
import {
	makeReadRepoFileTool,
	makeSearchRepoTool,
} from "../lib/github-repo-tools";
import { getGitHubToken } from "../lib/token-provider";

const MODEL = GLM_5_3;
export const REVIEW_JUDGE_DATA = "judgement";

export default function ReviewJudge(_props: AgentProps): string {
	useModel(MODEL);
	useInstructions(
		reviewJudgeInstructions,
		repoToolsInstructions,
		CODE_RULE_INSTRUCTION,
		CONVENTIONS_RULE_INSTRUCTION,
		...STYLE_RULE_INSTRUCTIONS,
	);
	useBotRole();

	const input = useInitialData<ReviewJudgeInitialData>();
	useTool(makeRunReadPatchTool(input));
	useTool(makeReadRepoFileTool(getGitHubToken, input.headSha));
	useTool(makeSearchRepoTool(getGitHubToken));
	useSubmitResult(
		REVIEW_JUDGE_DATA,
		"submit_judgement",
		JudgeResultSchema,
		"Submit the completed review judgement exactly once with every required decision.",
	);
	return "Judge the dispatched review findings and submit the structured result.";
}

ReviewJudge.agentName = "review-judge";
ReviewJudge.initialData = ReviewJudgeInitialDataSchema;
ReviewJudge.durability = JUDGE_DURABILITY;
