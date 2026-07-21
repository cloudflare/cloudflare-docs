/**
 * Trusted-code driver for the spam-and-off-topic filter agent.
 *
 * Ports the 0.11 `workflows/spam-and-off-topic-filter.ts` `run()` to the 2.0
 * `init().dispatch().read()` contract. Trusted code owns the round trip and all
 * GitHub side effects: it fetches the item, dispatches it to the agent as
 * `initialData`, reads the structured verdict, and — only on a medium/high
 * confidence spam verdict — labels, comments, and closes the item. The agent
 * only reasons and submits; it never calls GitHub.
 */
import { init } from "@flue/runtime";
import * as v from "valibot";
import SpamFilter, {
	SPAM_VERDICT_DATA,
	type SpamFilterInput,
} from "../agents/spam-filter";
import {
	addLabels,
	closeIssue,
	getInstallationToken,
	postComment,
} from "./github";
import { truncateLogValue } from "./github-webhook";
import {
	OFF_TOPIC_COMMENT,
	SPAM_COMMENT,
	SpamVerdictSchema,
	getGitHubContext,
	type SpamFilterPayload,
	type SpamVerdict,
} from "./spam-filter";

export interface SpamFilterResult extends SpamVerdict {
	closed: boolean;
}

const DISPATCH_MESSAGE =
	"Evaluate this GitHub item for spam/off-topic and submit your verdict.";

/**
 * Per-run hard timeout on the verdict read. The spam filter is fast (usually
 * < 30s); this generous 3-minute bound (matching the 0.11 poll timeout) stops a
 * wedged read from hanging the INGEST workflow step indefinitely.
 */
const SPAM_FILTER_TIMEOUT_MS = 3 * 60_000;

/**
 * Run the spam filter for one issue/PR: dispatch the agent, read the verdict,
 * and act on a confident spam verdict. Returns the verdict plus whether the
 * item was closed so the orchestrator can decide whether to continue.
 *
 * @param env         Worker bindings (GitHub App auth).
 * @param input       The issue/PR to evaluate.
 * @param instanceId  Stable per-item/run agent instance address.
 */
export async function runSpamFilter(
	env: Record<string, string>,
	input: SpamFilterPayload,
	instanceId: string,
): Promise<SpamFilterResult> {
	const token = await getInstallationToken(env);
	const { item, diff } = await getGitHubContext(token, input);
	const itemType = item.kind === "pull_request" ? "PR" : "Issue";
	const itemLabel = `${itemType} #${item.number} "${truncateLogValue(item.title)}"`;

	const agent = init(SpamFilter, { id: instanceId });
	const receipt = await agent.dispatch({
		message: DISPATCH_MESSAGE,
		initialData: {
			eventType: input.eventType,
			item,
			diff,
		} satisfies SpamFilterInput,
	});
	let reply;
	try {
		reply = await agent.read(receipt, {
			signal: AbortSignal.timeout(SPAM_FILTER_TIMEOUT_MS),
		});
	} catch (err) {
		// The read signal only cancels observation; durably stop the instance so a
		// wedged filter does not keep burning model calls after we gave up.
		await Promise.resolve(agent.abort()).catch(() => {});
		throw err;
	}

	const raw = reply.data[SPAM_VERDICT_DATA]?.[0];
	if (raw === undefined) {
		// `useAgentFinish` enforces submission, so a missing verdict is
		// unexpected — degrade gracefully like the 0.11 workflow did.
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

	const verdict = v.parse(SpamVerdictSchema, raw);

	// Only act on medium/high confidence — trusted code makes the API calls,
	// not the agent, so there's no risk of hallucinated curl commands.
	if (verdict.is_spam && verdict.confidence !== "low") {
		if (item.state !== "open") {
			console.log({
				message: `${itemType} Skipped: ${itemLabel} already ${item.state}`,
				event: "spam_and_off_topic_filter_verdict",
				eventType: input.eventType,
				kind: item.kind,
				number: item.number,
				url: item.url,
				is_spam: verdict.is_spam,
				confidence: verdict.confidence,
				action: "skipped_not_open",
				reason: verdict.reason,
				state: item.state,
			});
			return {
				...verdict,
				closed: false,
				reason: `${verdict.reason} No action taken because the item is already ${item.state}.`,
			};
		}

		const isOffTopic =
			verdict.reason.toLowerCase().includes("support") ||
			verdict.reason.toLowerCase().includes("wrong repo") ||
			verdict.reason.toLowerCase().includes("feature");
		const comment = isOffTopic ? OFF_TOPIC_COMMENT : SPAM_COMMENT;
		const label = isOffTopic ? "off topic" : "spam";

		await addLabels(token, input.number, [label]);
		await postComment(token, input.number, comment);
		await closeIssue(token, input.number);

		console.log({
			message: `${itemType} Closed: ${itemLabel} (${verdict.confidence} confidence spam/off-topic)`,
			event: "spam_and_off_topic_filter_verdict",
			eventType: input.eventType,
			kind: item.kind,
			number: item.number,
			url: item.url,
			is_spam: verdict.is_spam,
			confidence: verdict.confidence,
			action: "closed",
			reason: verdict.reason,
		});

		return { ...verdict, closed: true };
	}

	console.log({
		message: `${itemType} Left open: ${itemLabel} (${verdict.confidence} confidence not spam/off-topic)`,
		event: "spam_and_off_topic_filter_verdict",
		eventType: input.eventType,
		kind: item.kind,
		number: item.number,
		url: item.url,
		is_spam: verdict.is_spam,
		confidence: verdict.confidence,
		action: "left_open",
		reason: verdict.reason,
	});

	return { ...verdict, closed: false };
}
