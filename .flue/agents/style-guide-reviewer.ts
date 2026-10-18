"use agent";

import type { AgentProps } from "@flue/runtime";
import { useInitialData, useModel, useTool } from "@flue/runtime";
import repoToolsInstructions from "../prompts/repo-tools.md";
import reviewerSharedInstructions from "../prompts/reviewer-shared.md";
import styleGuideReviewerInstructions from "../prompts/style-guide-reviewer.md";
import {
	StyleGuideReviewerInitialDataSchema,
	type StyleGuideReviewerInitialData,
} from "../lib/review/agent-input";
import { makeRunReadPatchTool } from "../lib/review/read-patch-r2";
import { SpecialistResultSchema } from "../lib/review/types";
import { useBotRole, useInstructions } from "../lib/agents/instructions";
import { SPECIALIST_DURABILITY } from "../lib/agents/durability";
import { DEEPSEEK_V4_FLASH } from "../lib/agents/models";
import { STYLE_RULE_INSTRUCTIONS } from "../lib/agents/review-rules";
import { useSubmitResult } from "../lib/agents/submit-result";
import {
	makeReadRepoFileTool,
	makeSearchRepoTool,
} from "../lib/github-repo-tools";
import { getGitHubToken } from "../lib/token-provider";

const MODEL = DEEPSEEK_V4_FLASH;
export const STYLE_GUIDE_REVIEW_DATA = "review";

export default function StyleGuideReviewer(_props: AgentProps): string {
	useModel(MODEL);
	useInstructions(
		reviewerSharedInstructions,
		repoToolsInstructions,
		styleGuideReviewerInstructions,
		...STYLE_RULE_INSTRUCTIONS,
	);
	useBotRole();

	const input = useInitialData<StyleGuideReviewerInitialData>();
	useTool(makeRunReadPatchTool(input));
	useTool(makeReadRepoFileTool(getGitHubToken, input.headSha));
	useTool(makeSearchRepoTool(getGitHubToken));
	useSubmitResult(
		STYLE_GUIDE_REVIEW_DATA,
		"submit_review",
		SpecialistResultSchema,
		"Submit the completed style-guide review exactly once with findings and a summary.",
	);
	return "Review the dispatched pull request evidence and submit the structured result.";
}

StyleGuideReviewer.agentName = "style-guide-reviewer";
StyleGuideReviewer.initialData = StyleGuideReviewerInitialDataSchema;
StyleGuideReviewer.durability = SPECIALIST_DURABILITY;
