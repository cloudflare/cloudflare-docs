import type { WorkflowStep } from "cloudflare:workers";
import { agentStep } from "./agent-step";
import {
	getGitHubContext,
	SpamVerdictSchema,
	SPAM_COMMENT,
	OFF_TOPIC_COMMENT,
	type SpamFilterPayload,
} from "./spam-filter";
import {
	getInstallationToken,
	getIssue,
	getPullRequest,
	findBotComment,
	addLabels,
	closeIssue,
	postComment,
} from "./github";

/** Moderation output is checkpointed before any GitHub mutation. */
export async function moderate(
	step: WorkflowStep,
	env: Env,
	input: SpamFilterPayload,
	runId: string,
	expectedHead?: string,
): Promise<{ closed: boolean }> {
	const context = await step
		.do("moderation:context", () =>
			getInstallationToken(env).then((token) => getGitHubContext(token, input)),
		)
		.catch((error) => {
			console.error({ event: "moderation_unavailable", error: String(error) });
			return null;
		});
	if (!context) return { closed: false };
	const verdict = await agentStep(
		step,
		"moderation",
		"spam",
		`${runId}:spam`,
		{ eventType: input.eventType, ...context },
		"spam_verdict",
		SpamVerdictSchema,
	);
	if (
		!verdict.ok ||
		!verdict.value.is_spam ||
		verdict.value.confidence !== "high"
	)
		return { closed: false };
	if (env.DOCS_FLUE_REVIEW_MODE !== "comment") {
		console.log({
			event: "moderation_preview",
			number: input.number,
			verdict: verdict.value,
		});
		return { closed: false };
	}
	const offTopic = verdict.value.category === "off-topic";
	const marker = "<!-- docs-flue-moderation -->";
	return step.do("moderation:apply", async () => {
		const token = await getInstallationToken(env);
		const current =
			input.eventType === "pull_request"
				? await getPullRequest(token, input.number)
				: await getIssue(token, input.number);
		if (current.state !== "open") return { closed: true };
		if (
			expectedHead &&
			(!("head" in current) ||
				(current.head as { sha: string }).sha !== expectedHead)
		)
			return { closed: false };
		if (
			current.title !== context.item.title ||
			current.body !== context.item.body
		)
			return { closed: false };
		await addLabels(token, input.number, [offTopic ? "off topic" : "spam"]);
		if (
			!(await findBotComment(
				token,
				input.number,
				Number(env.DOCS_FLUE_GITHUB_APP_ID),
				marker,
			))
		) {
			await postComment(
				token,
				input.number,
				`${marker}\n${offTopic ? OFF_TOPIC_COMMENT : SPAM_COMMENT}`,
			);
		}
		await closeIssue(token, input.number);
		return { closed: true };
	});
}
