import { init, type Agent } from "@flue/runtime";
import CodeReviewer from "../../agents/code-reviewer";
import ConventionsReviewer from "../../agents/conventions-reviewer";
import ReviewJudge from "../../agents/review-judge";
import StyleGuideReviewer from "../../agents/style-guide-reviewer";
import type { AgentKey } from "./run-context";

export const REVIEW_AGENTS: Record<AgentKey, Agent> = {
	code: CodeReviewer,
	style: StyleGuideReviewer,
	conventions: ConventionsReviewer,
	judge: ReviewJudge,
};

function agentKey(id: string): AgentKey | undefined {
	const key = id.slice(id.lastIndexOf(":") + 1);
	return key in REVIEW_AGENTS ? (key as AgentKey) : undefined;
}

/** Best-effort cancellation: a superseding run must not be blocked by one DO. */
export async function abortRunAgents(agentIds: string[]): Promise<void> {
	await Promise.all(
		agentIds.map(async (id) => {
			const key = agentKey(id);
			if (!key) return;
			try {
				await init(REVIEW_AGENTS[key], { id }).abort();
			} catch {
				// The agent may already have completed or been removed.
			}
		}),
	);
}
