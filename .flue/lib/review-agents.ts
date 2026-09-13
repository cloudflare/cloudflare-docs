import { ReviewChunk } from "../agents/review-chunk";
import ReviewValidator from "../agents/review-validator";
import ConventionsReviewer from "../agents/conventions-reviewer";
import DependabotReviewer from "../agents/dependabot-reviewer";
import SpamFilter from "../agents/spam-filter";
import RebaseConflictResolver from "../agents/rebase-conflict-resolver";
import { ReconcileFindings } from "../agents/reconcile-findings";

export const REVIEW_AGENTS = {
	chunk: ReviewChunk,
	validation: ReviewValidator,
	conventions: ConventionsReviewer,
	dependabot: DependabotReviewer,
	spam: SpamFilter,
	rebase: RebaseConflictResolver,
	reconcile: ReconcileFindings,
};
export type AgentKind = keyof typeof REVIEW_AGENTS;
