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
import {
	addLabels,
	closeIssue,
	getInstallationToken,
	postComment,
} from "../lib/github";
import {
	getGitHubContext,
	OFF_TOPIC_COMMENT,
	SPAM_COMMENT,
	SpamVerdictSchema,
	type SpamFilterPayload,
} from "../lib/spam-filter";
import { truncateLogValue } from "../lib/github-webhook";

export const route: WorkflowRouteHandler = async (_c, next) => next();

export async function run({ id: runId, init, payload, env }: FlueContext) {
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
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
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

function parsePayload(payload: unknown): SpamFilterPayload {
	const input = payload as Partial<SpamFilterPayload>;
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
