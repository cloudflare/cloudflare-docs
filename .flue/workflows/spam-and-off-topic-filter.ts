/**
 * Spam-and-off-topic-filter agent
 *
 * Evaluates a GitHub issue or PR and closes it (with a comment) if it is
 * clearly spam or off-topic for cloudflare/cloudflare-docs.
 *
 * Uses GitHub App auth — no long-lived PAT needed. The agent decides whether
 * to close; the actual API calls happen in trusted code, not in the sandbox.
 *
 * POST /workflows/spam-and-off-topic-filter
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { createAgent } from "@flue/runtime";
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import * as v from "valibot";
import {
	addLabels,
	closeIssue,
	getIssue,
	getInstallationToken,
	getPullRequest,
	getPullRequestFiles,
	postComment,
} from "../lib/github";

export const route: WorkflowRouteHandler = async (_c, next) => next();

const SpamVerdictSchema = v.object({
	is_spam: v.boolean(),
	confidence: v.picklist(["low", "medium", "high"]),
	reason: v.string(),
});

const SPAM_COMMENT =
	"Thank you for reaching out. This issue appears to be spam or " +
	"doesn't contain actionable documentation feedback, so we're closing " +
	"it. If you have a genuine documentation " +
	"question or suggestion, please open a new issue with details.";

const OFF_TOPIC_COMMENT =
	"Thank you for reaching out. We're closing this because it is unclear " +
	"how this issue relates to the Cloudflare developer documentation. " +
	"If you can clarify what you would like to see changed in the docs, " +
	"or how this issue relates to the docs, please open a new issue with " +
	"those details. For product support or feature requests, " +
	"please visit https://community.cloudflare.com or " +
	"https://support.cloudflare.com.";

const MAX_PR_FILES = 25;
const MAX_PATCH_CHARS = 2_000;

interface PullRequestDiffSummary {
	truncated: boolean;
	files: Array<{
		filename: string;
		status: string;
		additions: number;
		deletions: number;
		changes: number;
		patch?: string;
		patch_truncated?: boolean;
	}>;
}

interface SpamAndOffTopicFilterPayload {
	eventType: "issues" | "pull_request";
	number: number;
}

export async function run({ init, payload, env, runId }: FlueContext) {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as R2Bucket;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const workspace = getDefaultWorkspace();

	// Write skill from R2 into workspace at request time
	const skillObj = await bucket.get(
		".agents/skills/spam-and-off-topic-filter/SKILL.md",
	);
	if (!skillObj) {
		throw new Error(
			"Missing .agents/skills/spam-and-off-topic-filter/SKILL.md in DOCS_FLUE_BUCKET. " +
				"For local dev, run `pnpm run flue:sync-agents:local` before invoking the workflow.",
		);
	}
	if (skillObj) {
		await workspace.mkdir("/.agents/skills/spam-and-off-topic-filter", {
			recursive: true,
		});
		await workspace.writeFile(
			"/.agents/skills/spam-and-off-topic-filter/SKILL.md",
			await skillObj.text(),
		);
	}

	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.6",
	}));
	const harness = await init(agent);
	const session = await harness.session(
		`filter:${input.eventType}:${input.number}:${runId}`,
	);

	const token = await getInstallationToken(env as Record<string, string>);
	const { item, diff } = await getGitHubContext(token, input);
	const itemType = item.kind === "pull_request" ? "PR" : "Issue";
	const itemLabel = `${itemType} #${item.number} "${truncateLogValue(item.title)}"`;

	const { data } = await session.skill("spam-and-off-topic-filter", {
		args: { eventType: input.eventType, item, diff },
		result: SpamVerdictSchema,
	});

	if (!data) {
		console.log({
			message: `${itemType} Left open: ${itemLabel} (no verdict)`,
			event: "spam_and_off_topic_filter_verdict",
			eventType: input.eventType,
			kind: item.kind,
			number: item.number,
			url: item.url,
			is_spam: false,
			confidence: "low",
			action: "left_open",
			reason: "No verdict.",
		});
		return {
			is_spam: false,
			confidence: "low",
			reason: "No verdict.",
			closed: false,
		};
	}

	// Only act on medium/high confidence — trusted code makes the API calls,
	// not the agent, so there's no risk of hallucinated curl commands.
	if (data.is_spam && data.confidence !== "low") {
		if (item.state !== "open") {
			console.log({
				message: `${itemType} Skipped: ${itemLabel} already ${item.state}`,
				event: "spam_and_off_topic_filter_verdict",
				eventType: input.eventType,
				kind: item.kind,
				number: item.number,
				url: item.url,
				is_spam: data.is_spam,
				confidence: data.confidence,
				action: "skipped_not_open",
				reason: data.reason,
				state: item.state,
			});
			return {
				...data,
				closed: false,
				reason: `${data.reason} No action taken because the item is already ${item.state}.`,
			};
		}

		const isOffTopic =
			data.reason.toLowerCase().includes("support") ||
			data.reason.toLowerCase().includes("wrong repo") ||
			data.reason.toLowerCase().includes("feature");
		const comment = isOffTopic ? OFF_TOPIC_COMMENT : SPAM_COMMENT;
		const label = isOffTopic ? "off topic" : "spam";

		await addLabels(token, input.number, [label]);
		await postComment(token, input.number, comment);
		await closeIssue(token, input.number);

		console.log({
			message: `${itemType} Closed: ${itemLabel} (${data.confidence} confidence spam/off-topic)`,
			event: "spam_and_off_topic_filter_verdict",
			eventType: input.eventType,
			kind: item.kind,
			number: item.number,
			url: item.url,
			is_spam: data.is_spam,
			confidence: data.confidence,
			action: "closed",
			reason: data.reason,
		});

		return { ...data, closed: true };
	}

	console.log({
		message: `${itemType} Left open: ${itemLabel} (${data.confidence} confidence not spam/off-topic)`,
		event: "spam_and_off_topic_filter_verdict",
		eventType: input.eventType,
		kind: item.kind,
		number: item.number,
		url: item.url,
		is_spam: data.is_spam,
		confidence: data.confidence,
		action: "left_open",
		reason: data.reason,
	});

	return { ...data, closed: false };
}

function truncateLogValue(value: string) {
	return value.length > 100 ? `${value.slice(0, 97)}...` : value;
}

function parsePayload(payload: unknown): SpamAndOffTopicFilterPayload {
	const input = payload as Partial<SpamAndOffTopicFilterPayload>;
	if (
		(input.eventType !== "issues" && input.eventType !== "pull_request") ||
		typeof input.number !== "number"
	) {
		throw new Error(
			'[flue] spam-and-off-topic-filter requires payload { eventType: "issues" | "pull_request", number: number }.',
		);
	}
	return { eventType: input.eventType, number: input.number };
}

async function getGitHubContext(
	token: string,
	input: SpamAndOffTopicFilterPayload,
) {
	if (input.eventType === "pull_request") {
		const pullRequest = await getPullRequest(token, input.number);
		return {
			item: {
				kind: "pull_request",
				number: pullRequest.number,
				title: pullRequest.title,
				body: pullRequest.body,
				state: pullRequest.state,
				url: pullRequest.html_url,
				user: pullRequest.user,
				author_association: pullRequest.author_association,
				draft: pullRequest.draft,
				base: pullRequest.base.ref,
				head: pullRequest.head.ref,
			},
			diff: await getPullRequestDiffSummary(token, input.number),
		};
	}

	const issue = await getIssue(token, input.number);
	return {
		item: {
			kind: "issue",
			number: issue.number,
			title: issue.title,
			body: issue.body,
			state: issue.state,
			url: issue.html_url,
			user: issue.user,
			author_association: issue.author_association,
			labels: issue.labels.map((label) => label.name),
		},
		diff: undefined,
	};
}

async function getPullRequestDiffSummary(
	token: string,
	pullRequestNumber: number,
): Promise<PullRequestDiffSummary> {
	const files = await getPullRequestFiles(token, pullRequestNumber);
	return {
		truncated: files.length > MAX_PR_FILES,
		files: files.slice(0, MAX_PR_FILES).map((file) => {
			const patch = file.patch;
			return {
				filename: file.filename,
				status: file.status,
				additions: file.additions,
				deletions: file.deletions,
				changes: file.changes,
				patch: patch ? patch.slice(0, MAX_PATCH_CHARS) : undefined,
				patch_truncated: patch ? patch.length > MAX_PATCH_CHARS : undefined,
			};
		}),
	};
}
