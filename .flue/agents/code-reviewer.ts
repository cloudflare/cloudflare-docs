"use agent";

import type { AgentProps } from "@flue/runtime";
import { useInitialData, useModel, useTool } from "@flue/runtime";
import codeReviewerInstructions from "../prompts/code-reviewer.md";
import repoToolsInstructions from "../prompts/repo-tools.md";
import reviewerSharedInstructions from "../prompts/reviewer-shared.md";
import {
	CodeReviewerInitialDataSchema,
	type CodeReviewerInitialData,
} from "../lib/review/agent-input";
import { makeRunReadPatchTool } from "../lib/review/read-patch-r2";
import { SpecialistResultSchema } from "../lib/review/types";
import { useBotRole, useInstructions } from "../lib/agents/instructions";
import { SPECIALIST_DURABILITY } from "../lib/agents/durability";
import { DEEPSEEK_V4_FLASH } from "../lib/agents/models";
import { CODE_RULE_INSTRUCTION } from "../lib/agents/review-rules";
import { useSubmitResult } from "../lib/agents/submit-result";
import {
	makeReadRepoFileTool,
	makeSearchRepoTool,
} from "../lib/github-repo-tools";
import { getGitHubToken } from "../lib/token-provider";

const MODEL = DEEPSEEK_V4_FLASH;
export const CODE_REVIEW_DATA = "review";

export default function CodeReviewer(_props: AgentProps): string {
	useModel(MODEL);
	useInstructions(
		reviewerSharedInstructions,
		repoToolsInstructions,
		codeReviewerInstructions,
		CODE_RULE_INSTRUCTION,
	);
	useBotRole();

	const input = useInitialData<CodeReviewerInitialData>();
	useTool(makeRunReadPatchTool(input));
	useTool(makeReadRepoFileTool(getGitHubToken, input.headSha));
	useTool(makeSearchRepoTool(getGitHubToken));
	useSubmitResult(
		CODE_REVIEW_DATA,
		"submit_review",
		SpecialistResultSchema,
		"Submit the completed code review exactly once with findings and a summary.",
	);
	return "Review the dispatched pull request evidence and submit the structured result.";
}

CodeReviewer.agentName = "code-reviewer";
CodeReviewer.initialData = CodeReviewerInitialDataSchema;
CodeReviewer.durability = SPECIALIST_DURABILITY;
