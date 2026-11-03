"use agent";

import type { AgentProps } from "@flue/runtime";
import { useInitialData, useModel, useTool } from "@flue/runtime";
import conventionsReviewerInstructions from "../prompts/conventions-reviewer.md";
import reviewerSharedInstructions from "../prompts/reviewer-shared.md";
import {
	ConventionsReviewerInitialDataSchema,
	type ConventionsReviewerInitialData,
} from "../lib/review/agent-input";
import { makeRunReadPatchTool } from "../lib/review/read-patch-r2";
import { SpecialistResultSchema } from "../lib/review/types";
import { useBotRole, useInstructions } from "../lib/agents/instructions";
import { SPECIALIST_DURABILITY } from "../lib/agents/durability";
import { DEEPSEEK_V4_FLASH } from "../lib/agents/models";
import { CONVENTIONS_RULE_INSTRUCTION } from "../lib/agents/review-rules";
import { useSubmitResult } from "../lib/agents/submit-result";

const MODEL = DEEPSEEK_V4_FLASH;
export const CONVENTIONS_REVIEW_DATA = "review";

export default function ConventionsReviewer(_props: AgentProps): string {
	useModel(MODEL);
	useInstructions(
		reviewerSharedInstructions,
		conventionsReviewerInstructions,
		CONVENTIONS_RULE_INSTRUCTION,
	);
	useBotRole();

	const input = useInitialData<ConventionsReviewerInitialData>();
	useTool(makeRunReadPatchTool(input));
	useSubmitResult(
		CONVENTIONS_REVIEW_DATA,
		"submit_review",
		SpecialistResultSchema,
		"Submit the completed conventions review exactly once with findings and a summary.",
	);
	return "Review the dispatched pull request evidence and submit the structured result.";
}

ConventionsReviewer.agentName = "conventions-reviewer";
ConventionsReviewer.initialData = ConventionsReviewerInitialDataSchema;
ConventionsReviewer.durability = SPECIALIST_DURABILITY;
