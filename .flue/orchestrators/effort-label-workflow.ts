/**
 * EffortLabelWorkflow (`EFFORT_LABEL`): gives an open issue one `effort:*` label.
 * Steps: wait for the spam gate, read the issue, gather context, assess, read
 * CODEOWNERS, then score and reconcile the label. A model error changes nothing.
 */
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import { getInstallationToken, getIssue } from "../lib/github";
import type { AiRunner } from "../lib/clef";
import {
	assessEffort,
	codeownerAreasFor,
	getEffortContext,
	type EffortContext,
	type EffortIssue,
} from "../lib/effort-assessment";
import {
	reconcileEffortLabel,
	scoreEffort,
	type EffortAssessment,
} from "../lib/effort-label";
import { docsSourcePath } from "../lib/codeowners";
import { reviewMode } from "../lib/review/run-context";
import effortPrompt from "../prompts/effort-label.md";

export interface EffortLabelParams {
	number: number;
	/** Webhook action; `opened` and `reopened` wait for the spam gate. */
	action?: string;
	/** Dev replay: follows DOCS_FLUE_REVIEW_MODE (`log` is a dry run). */
	replay?: boolean;
}

interface EffortLabelEnv {
	AI: AiRunner;
	DOCS_FLUE_AI_GATEWAY_ID?: string;
	DOCS_FLUE_REVIEW_MODE?: string;
	DOCS_FLUE_EFFORT_LABEL_MODE?: string;
	[key: string]: unknown;
}

/** Labels that mean the spam gate handled the item. */
const SKIP_LABELS = ["spam", "off topic"];

/** Webhooks write when DOCS_FLUE_EFFORT_LABEL_MODE is `label`; replays follow DOCS_FLUE_REVIEW_MODE. */
export function effortLabelWrites(
	env: Pick<
		EffortLabelEnv,
		"DOCS_FLUE_REVIEW_MODE" | "DOCS_FLUE_EFFORT_LABEL_MODE"
	>,
	replay: boolean,
): boolean {
	return replay
		? reviewMode(env) === "comment"
		: env.DOCS_FLUE_EFFORT_LABEL_MODE === "label";
}

type IssueRead = EffortIssue | { skip: string };

export class EffortLabelWorkflow extends WorkflowEntrypoint<
	EffortLabelEnv,
	EffortLabelParams
> {
	async run(
		event: Readonly<WorkflowEvent<EffortLabelParams>>,
		step: WorkflowStep,
	): Promise<Record<string, unknown>> {
		const { number, action, replay = false } = event.payload;
		const ghEnv = this.env as unknown as Record<string, string>;
		const writes = effortLabelWrites(this.env, replay);

		if ((action === "opened" || action === "reopened") && !replay) {
			await step.sleep("wait-for-spam-gate", "3 minutes");
		}

		const issue = await step.do<IssueRead>("issue", async () => {
			const token = await getInstallationToken(ghEnv);
			const raw = (await getIssue(token, number)) as Awaited<
				ReturnType<typeof getIssue>
			> & {
				comments?: number;
				created_at?: string;
				pull_request?: unknown;
			};
			const labels = raw.labels.map((l) => l.name);
			if (raw.pull_request != null) return { skip: "pull_request" };
			if (raw.state !== "open") return { skip: "closed" };
			if (labels.some((l) => SKIP_LABELS.includes(l.toLowerCase())))
				return { skip: "spam_or_off_topic" };
			return {
				number,
				title: raw.title,
				body: raw.body,
				state: raw.state,
				author: raw.user?.login ?? "unknown",
				authorAssociation: raw.author_association,
				labels,
				createdAt: raw.created_at ?? "",
				commentsCount: raw.comments ?? 0,
				isPullRequest: false,
			};
		});
		if ("skip" in issue) {
			log(number, `skipped_${issue.skip}`);
			return { number, skipped: issue.skip };
		}

		const context = await step.do<EffortContext>("context", async () => {
			const token = await getInstallationToken(ghEnv);
			return getEffortContext(token, issue);
		});

		const assessed = await step.do<
			{ ok: true; value: EffortAssessment } | { ok: false; error: string }
		>("assess", async () => {
			try {
				const value = await assessEffort(
					this.env.AI,
					effortPrompt,
					context,
					this.env.DOCS_FLUE_AI_GATEWAY_ID,
				);
				return { ok: true, value };
			} catch (error) {
				return {
					ok: false,
					error: error instanceof Error ? error.message : String(error),
				};
			}
		});
		if (!assessed.ok) {
			// Fail safe: a model error never changes labels.
			log(number, "assess_failed", { error: assessed.error });
			return { number, error: assessed.error };
		}
		const assessment = assessed.value;

		const pages = [
			...new Set(
				[...assessment.pages, ...context.docsPages].filter(
					(p) => docsSourcePath(p) !== null,
				),
			),
		];
		const areas = await step.do<string[]>("codeowners", async () => {
			const token = await getInstallationToken(ghEnv);
			const sources = context.livePages
				.map((p) => p.sourcePath)
				.filter((p): p is string => p !== null);
			return codeownerAreasFor(token, pages, sources);
		});

		const score = scoreEffort(
			{
				...assessment,
				pages: assessment.pages.filter((p) => docsSourcePath(p) !== null),
			},
			{
				labels: issue.labels,
				commentsCount: issue.commentsCount,
				codeownerAreas: areas,
			},
		);

		const result = await step.do("label", async () => {
			const token = await getInstallationToken(ghEnv);
			// Fresh labels: someone may have changed them while the model ran.
			const live = await getIssue(token, number);
			if (live.state !== "open")
				return { target: null, added: false, removed: [], dryRun: !writes };
			return reconcileEffortLabel(
				token,
				number,
				live.labels.map((l) => l.name),
				score.level,
				{ dryRun: !writes },
			);
		});

		const output = {
			number,
			level: score.level,
			score: score.score,
			reasons: score.reasons,
			assessment,
			codeownerAreas: areas,
			...result,
		};
		log(number, result.dryRun ? "would_label" : "labeled", {
			level: score.level,
			score: score.score,
			target: result.target,
			added: result.added,
			removed: result.removed,
		});
		return output;
	}
}

function log(
	number: number,
	action: string,
	extra: Record<string, unknown> = {},
): void {
	console.log({
		message: `Effort label: #${number} → ${action}`,
		event: "effort_label",
		number,
		action,
		...extra,
	});
}
