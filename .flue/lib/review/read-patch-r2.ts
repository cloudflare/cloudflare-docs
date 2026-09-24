import { env } from "cloudflare:workers";
import type {
	CodeReviewerInitialData,
	ConventionsReviewerInitialData,
	ReviewJudgeInitialData,
	StyleGuideReviewerInitialData,
} from "./agent-input";
import { makeR2ReadPatchLoader, makeReadPatchTool } from "./read-patch";

type RunInitialData =
	| CodeReviewerInitialData
	| ConventionsReviewerInitialData
	| ReviewJudgeInitialData
	| StyleGuideReviewerInitialData;

export function makeRunReadPatchTool(input: RunInitialData) {
	return makeReadPatchTool({
		load: makeR2ReadPatchLoader({
			bucket: (env as { DOCS_FLUE_BUCKET: R2Bucket }).DOCS_FLUE_BUCKET,
			pr: input.pr,
			runId: input.runId,
			specialist: input.specialist,
		}).load,
	});
}
