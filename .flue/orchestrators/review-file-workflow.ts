import { init } from "@flue/runtime";
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import * as v from "valibot";
import CodeReviewFile, {
	CODE_REVIEW_FILE_DATA,
	codeReviewMessage,
	type CodeReviewFileInput,
} from "../agents/code-review-file";
import StyleGuideFile, {
	STYLE_GUIDE_FILE_DATA,
	styleGuideMessage,
	type StyleGuideFileInput,
} from "../agents/style-guide-file";
import {
	assignCodeReviewFindingIds,
	CodeReviewResultFromModelSchema,
	type CodeReviewResult,
} from "../lib/code-review-results";
import {
	assignFindingIds,
	StyleGuideResultFromModelSchema,
	type StyleGuideResult,
} from "../lib/style-guide-results";
import { FILE_CONTENT_MAX_BYTES } from "../lib/code-review-files";
import { getInstallationToken, getRepoFileContent } from "../lib/github";

export type ReviewFileWorkflowParams = {
	parentInstanceId: string;
	eventType: string;
	resultKey: string;
	stream: "code" | "style";
	input: CodeReviewFileInput | StyleGuideFileInput;
};

type ReviewFileWorkflowEnv = {
	DOCS_FLUE_BUCKET: R2Bucket;
	REVIEW_ORCHESTRATOR: Workflow;
};

type ReviewFileResult = {
	stream: "code" | "style";
	result: CodeReviewResult | StyleGuideResult;
	failed: boolean;
};

const CODE_TIMEOUT_MS = 10 * 60_000;
const STYLE_TIMEOUT_MS = 10 * 60_000;

function emptyResult(
	stream: "code" | "style",
	summary: string,
): ReviewFileResult {
	return {
		stream,
		result: { findings: [], summary, reviewedFiles: [] },
		failed: true,
	};
}

/**
 * Runs exactly one file-specialist agent. Keeping this work in a child Workflow
 * prevents a large PR's Flue settlement reads from exhausting the parent run.
 */
export class ReviewFileWorkflow extends WorkflowEntrypoint<
	ReviewFileWorkflowEnv,
	ReviewFileWorkflowParams
> {
	async run(
		event: Readonly<WorkflowEvent<ReviewFileWorkflowParams>>,
		step: WorkflowStep,
	): Promise<ReviewFileResult> {
		const { eventType, input, parentInstanceId, resultKey, stream } =
			event.payload;
		const preparedInput = await step.do("prepare", async () => {
			if (stream !== "code") return input;
			const codeInput = input as CodeReviewFileInput;
			const token = await getInstallationToken(
				this.env as unknown as Record<string, string>,
			);
			const raw = await getRepoFileContent(
				token,
				codeInput.filename,
				codeInput.headSha,
				AbortSignal.timeout(30_000),
			).catch(() => null);
			const fileContent =
				raw === null
					? ""
					: raw.length > FILE_CONTENT_MAX_BYTES
						? `${raw.slice(0, FILE_CONTENT_MAX_BYTES)}\n\n[...truncated at ${FILE_CONTENT_MAX_BYTES / 1024} KB - file is ${raw.length} bytes total]`
						: raw;
			return { ...codeInput, fileContent };
		});
		const agent =
			stream === "code"
				? init(CodeReviewFile, { id: `${event.instanceId}:agent` })
				: init(StyleGuideFile, { id: `${event.instanceId}:agent` });

		try {
			const receipt = await step.do("dispatch", () =>
				stream === "code"
					? agent.dispatch({
							message: codeReviewMessage(preparedInput as CodeReviewFileInput),
							initialData: preparedInput as CodeReviewFileInput,
						})
					: agent.dispatch({
							message: styleGuideMessage(preparedInput as StyleGuideFileInput),
							initialData: preparedInput as StyleGuideFileInput,
						}),
			);

			const replyDataJson = await step.do("read", async () => {
				try {
					const reply = await agent.read(receipt, {
						signal: AbortSignal.timeout(
							stream === "code" ? CODE_TIMEOUT_MS : STYLE_TIMEOUT_MS,
						),
					});
					return JSON.stringify(reply.data);
				} catch (error) {
					await agent.abort().catch(() => {});
					throw error;
				}
			});
			const replyData = JSON.parse(replyDataJson) as Record<string, unknown[]>;

			const result = await step.do(
				"parse-result",
				async (): Promise<ReviewFileResult> => {
					if (stream === "code") {
						const raw = replyData[CODE_REVIEW_FILE_DATA]?.[0];
						if (raw === undefined)
							return emptyResult(stream, "Code review produced no result.");
						const parsed = v.parse(CodeReviewResultFromModelSchema, raw);
						return {
							stream,
							result: {
								findings: await assignCodeReviewFindingIds(parsed.findings),
								summary: parsed.summary,
								reviewedFiles: [
									(preparedInput as CodeReviewFileInput).filename,
								],
							},
							failed: false,
						};
					}

					const raw = replyData[STYLE_GUIDE_FILE_DATA]?.[0];
					if (raw === undefined)
						return emptyResult(
							stream,
							"Style-guide review produced no result.",
						);
					const parsed = v.parse(StyleGuideResultFromModelSchema, raw);
					return {
						stream,
						result: {
							findings: await assignFindingIds(parsed.findings),
							summary: parsed.summary,
							reviewedFiles: [(preparedInput as StyleGuideFileInput).filename],
						},
						failed: false,
					};
				},
			);

			await step.do("persist-result", () =>
				this.env.DOCS_FLUE_BUCKET.put(resultKey, JSON.stringify(result)),
			);
			await step.do("signal-parent", async () =>
				(await this.env.REVIEW_ORCHESTRATOR.get(parentInstanceId)).sendEvent({
					type: eventType,
					payload: { resultKey },
				}),
			);
			return result;
		} catch (error) {
			const result = emptyResult(
				stream,
				`${stream === "code" ? "Code" : "Style-guide"} review could not complete for this file.`,
			);
			await step.do("persist-failure", () =>
				this.env.DOCS_FLUE_BUCKET.put(resultKey, JSON.stringify(result)),
			);
			await step.do("signal-parent-failure", async () =>
				(await this.env.REVIEW_ORCHESTRATOR.get(parentInstanceId)).sendEvent({
					type: eventType,
					payload: { resultKey },
				}),
			);
			console.error("File review failed", error);
			return result;
		}
	}
}
