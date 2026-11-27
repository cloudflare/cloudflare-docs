import type {
	RenderInput,
	SectionStatus,
	Specialist,
	TrackedFinding,
} from "./types";

export const BOT_COMMENT_MARKER = "<!-- cloudflare-docs-flue-code-review -->";
export const MAX_COMMENT_LENGTH = 65_000;
export type RebaseStatus =
	| "in-progress"
	| "complete"
	| "halted-wrong-base"
	| "halted-fork"
	| "halted-confidence"
	| "failed";
const REBASE_START = "<!-- rebase-status:start -->";
const REBASE_END = "<!-- rebase-status:end -->";
const REBASE_BLOCK =
	/<!-- rebase-status:start -->[\s\S]*?<!-- rebase-status:end -->\n*/g;

function stripRebaseStatus(body: string): string {
	return body.replace(REBASE_BLOCK, "").replace(/\n{3,}/g, "\n\n");
}

export function renderRebaseStatus(
	status: RebaseStatus,
	detail: string | undefined,
	sender: string | undefined,
	previousBody: string | undefined,
): string {
	const by = sender ? ` (triggered by @${escapeProse(sender)})` : "";
	const safe = detail ? escapeProse(detail) : "";
	const lines: Record<RebaseStatus, string> = {
		"in-progress": `⏳ **Rebase:** Rebasing against \`production\`${by}...`,
		complete:
			"✅ **Rebase:** Rebased against `production` - full review triggered.",
		"halted-wrong-base": `⚠️ **Rebase:** Rebase skipped - this PR targets \`${safe || "a non-production branch"}\`, not \`production\`.`,
		"halted-fork":
			"⚠️ **Rebase:** Rebase skipped - cannot push to fork branches.",
		"halted-confidence": `⚠️ **Rebase:** AI conflict resolution stopped.${safe ? `\n> ${safe}` : ""}`,
		failed: `❌ **Rebase:** Failed unexpectedly. ${safe || "Check the worker logs."}`,
	};
	const body = previousBody?.startsWith(BOT_COMMENT_MARKER)
		? stripRebaseStatus(previousBody)
		: BOT_COMMENT_MARKER;
	const parts = body.split("\n");
	let index = 1;
	while (index < parts.length && parts[index].startsWith("<!--")) index++;
	parts.splice(index, 0, `${REBASE_START}\n${lines[status]}\n${REBASE_END}`);
	return parts.join("\n");
}

type RenderOptions = {
	includeSnippets?: boolean;
	visibleLimit?: number;
	includeAgentPrompt?: boolean;
};

const SPECIALIST_SECTIONS: Array<[Specialist, string]> = [
	["code", "Code Review"],
	["style", "Style Guide"],
	["conventions", "Conventions"],
];

function escapeProse(value: string): string {
	const marker = "cloudflare-docs-flue-code-review";
	return value
		.split(/(`+[^`]*`+)/g)
		.map((part, index) =>
			index % 2 === 1
				? part
				: part
						.replaceAll(
							marker,
							"cloudflare-docs-flue-code-review (marker removed)",
						)
						.replaceAll("<", "&lt;")
						.replaceAll(">", "&gt;"),
		)
		.join("");
}

/**
 * The comment is located by its marker, so model-supplied text (including
 * fenced snippets) must never introduce a second copy.
 */
function keepSingleMarker(body: string): string {
	const first = body.indexOf(BOT_COMMENT_MARKER);
	if (first === -1) return body;
	const head = body.slice(0, first + BOT_COMMENT_MARKER.length);
	return (
		head +
		body
			.slice(head.length)
			.replaceAll(BOT_COMMENT_MARKER, "[review marker removed]")
	);
}

function truncate(value: string, limit: number): string {
	if (value.length <= limit) return value;
	return `${value.slice(0, Math.max(0, limit - 3)).trimEnd()}...`;
}

function fence(...values: Array<string | undefined>): string {
	const longestRun = Math.max(
		0,
		...values
			.filter(Boolean)
			.flatMap((value) => value!.match(/`+/g)?.map((run) => run.length) ?? []),
	);
	return "`".repeat(Math.max(3, longestRun + 1));
}

function location(finding: TrackedFinding): string {
	if (!finding.path) return "PR";
	return finding.line ? `${finding.path}:${finding.line}` : finding.path;
}

/** Fenced snippet lines, indented by `indent` to stay inside a list item. */
function snippetBlock(snippet: string, indent: string): string[] {
	const delimiter = fence(snippet);
	return [
		`${indent}${delimiter}txt`,
		...snippet.split("\n").map((line) => `${indent}${line}`),
		`${indent}${delimiter}`,
	];
}

function renderFinding(
	finding: TrackedFinding,
	includeSnippets: boolean,
): string {
	const lines = [
		`- **\`${escapeProse(location(finding))}\`** · ${escapeProse(finding.title)}`,
		"",
		...escapeProse(finding.explanation)
			.split("\n")
			.map((line) => `  ${line}`),
	];
	if (includeSnippets && finding.specialist === "code" && finding.snippet)
		lines.push("", ...snippetBlock(finding.snippet, "  "));
	return lines.join("\n");
}

function renderSection(
	specialist: Specialist,
	heading: string,
	status: SectionStatus,
	findings: TrackedFinding[],
	options: Required<Pick<RenderOptions, "includeSnippets" | "visibleLimit">>,
): string {
	const lines = [`### ${heading}`];
	if (status.failed) {
		lines.push(
			"",
			"⚠️ This review could not complete; results may be incomplete.",
		);
	} else if (!status.ran) {
		lines.push(
			"",
			`Skipped: ${escapeProse(status.skippedReason ?? "not needed for this change")}.`,
		);
	} else if (findings.length === 0) {
		lines.push("", "No findings.");
	}

	const visible = findings.slice(0, options.visibleLimit);
	if (visible.length > 0)
		lines.push(
			"",
			visible
				.map((finding) => renderFinding(finding, options.includeSnippets))
				.join("\n\n"),
		);
	if (findings.length > visible.length) {
		lines.push(
			"",
			`...${findings.length - visible.length} more (see the agent prompt).`,
		);
	}
	return lines.join("\n");
}

function renderPrompt(input: RenderInput): string {
	const lines = [
		`Fix the following review findings in PR #${input.pr} (https://github.com/cloudflare/cloudflare-docs/pull/${input.pr}).`,
		"",
		"Before making changes, review each finding and present a brief summary table:",
		"- For each finding, state whether you agree, disagree, or need clarification.",
		"- If you disagree, explain why.",
		"- If you need clarification before deciding, ask those questions.",
		"- Then share your plan for which issues to tackle and in what order.",
		"",
		"After triaging, follow this order:",
		"1. Post a comment on this PR for any findings you are skipping, with the finding ID and your reasoning.",
		"2. Then commit the fixes for the legitimate findings.",
		"",
		"The comment must come before the commit because the next review reads PR comments.",
	];
	for (const [specialist, heading] of SPECIALIST_SECTIONS) {
		const findings = input.active.filter(
			(finding) => finding.specialist === specialist,
		);
		if (findings.length === 0) continue;
		lines.push("", `## ${heading}`);
		for (const finding of findings) {
			lines.push(
				`- ${finding.id} | ${location(finding)} | ${finding.title}`,
				...finding.explanation.split("\n").map((line) => `  ${line}`),
			);
			if (finding.specialist === "code" && finding.snippet)
				lines.push(...snippetBlock(finding.snippet, "  "));
		}
	}
	return lines.join("\n");
}

function renderFixInAgent(input: RenderInput): string {
	const prompt = renderPrompt(input);
	const delimiter = fence(prompt);
	return [
		"<details>",
		"<summary>👉 Fix in your agent 👈</summary>",
		"",
		`${delimiter}markdown`,
		prompt,
		delimiter,
		"",
		"</details>",
	].join("\n");
}

function renderHistory(input: RenderInput): string | null {
	if (input.resolved.length === 0 && input.dismissed.length === 0) return null;
	const lines = [
		"<details>",
		`<summary>Resolved (${input.resolved.length}) · Dismissed (${input.dismissed.length})</summary>`,
		"",
	];
	for (const finding of input.resolved) {
		lines.push(
			`- Resolved: ${escapeProse(finding.title)}${finding.statusReason ? ` · ${escapeProse(finding.statusReason)}` : ""}`,
		);
	}
	for (const finding of input.dismissed) {
		lines.push(
			`- Dismissed: ${escapeProse(finding.title)}${finding.statusReason ? ` · ${escapeProse(finding.statusReason)}` : ""}`,
		);
	}
	lines.push("", "</details>");
	return lines.join("\n");
}

function renderComment(
	input: RenderInput,
	options: Required<RenderOptions>,
): string {
	const unverified = input.active.some((finding) => finding.verified === false);
	const judgeNote =
		input.judge === "failed" || unverified ? " · findings not verified" : "";
	const failedSections = SPECIALIST_SECTIONS.filter(
		([specialist]) => input.sections[specialist].failed,
	).map(([specialist]) =>
		specialist === "style"
			? "style guide review failed"
			: `${specialist} review failed`,
	);
	const mode = input.fullReview ? "full" : "incremental";
	const statusEmoji =
		failedSections.length > 0 || input.judge === "failed" ? "⚠️" : "✅";
	const lines = [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${input.headSha} -->`,
		"<!-- status: complete -->",
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## AI Review",
		"",
		`${statusEmoji} Reviewed \`${input.headSha.slice(0, 7)}\` · ${input.active.length} finding${input.active.length === 1 ? "" : "s"} · ${mode}${failedSections.length > 0 ? ` · ${failedSections.join(" · ")}` : ""}${judgeNote}`,
	];
	if (input.active.length > 0 && options.includeAgentPrompt)
		lines.push("", renderFixInAgent(input));
	for (const [specialist, heading] of SPECIALIST_SECTIONS) {
		const findings = input.active.filter(
			(finding) => finding.specialist === specialist,
		);
		if (findings.length === 0) continue;
		lines.push(
			"",
			renderSection(
				specialist,
				heading,
				input.sections[specialist],
				findings,
				options,
			),
		);
	}
	if (input.notReviewed.length > 0) {
		lines.push(
			"",
			"<details>",
			`<summary>Not reviewed (${input.notReviewed.length})</summary>`,
			"",
		);
		for (const file of input.notReviewed)
			lines.push(
				`- \`${escapeProse(file.path)}\` — ${escapeProse(file.reason)}`,
			);
		lines.push("", "</details>");
	}
	const history = renderHistory(input);
	if (history) lines.push("", history);
	lines.push(
		"",
		"<details>",
		"<summary>Commands</summary>",
		"",
		"- `/review` Run a review now.",
		"- `/full-review` Review the entire PR diff.",
		"- `/disable-auto-review` Stop automatic reviews.",
		"- `/rebase` Rebase against `production`.",
		"",
		"</details>",
	);
	return lines.join("\n");
}

/** Render the v2 summary comment while keeping it below GitHub's body limit. */
export function renderReview(input: RenderInput): string {
	const attempts: Required<RenderOptions>[] = [
		{
			includeSnippets: true,
			visibleLimit: Infinity,
			includeAgentPrompt: true,
		},
		{
			includeSnippets: false,
			visibleLimit: Infinity,
			includeAgentPrompt: true,
		},
		{
			includeSnippets: false,
			visibleLimit: Infinity,
			includeAgentPrompt: false,
		},
	];
	for (const options of attempts) {
		const body = keepSingleMarker(renderComment(input, options));
		if (body.length <= MAX_COMMENT_LENGTH) return stripRebaseStatus(body);
	}
	return truncate(
		stripRebaseStatus(
			truncate(
				keepSingleMarker(renderComment(input, attempts.at(-1)!)),
				MAX_COMMENT_LENGTH,
			),
		),
		MAX_COMMENT_LENGTH,
	);
}

const PREVIOUS_REVIEW_MARKER = "<!-- previous-review -->";

function preserveComplete(previousBody?: string): string | null {
	if (previousBody) previousBody = stripRebaseStatus(previousBody);
	if (!previousBody) return null;
	const status = parseStatus(previousBody);
	const separatorIndex = previousBody.indexOf(PREVIOUS_REVIEW_MARKER);
	// Only transient bodies carry a preserved section; a complete body may
	// quote the separator text inside a finding snippet.
	if (status !== "complete" && separatorIndex !== -1) {
		return (
			previousBody
				.slice(separatorIndex + PREVIOUS_REVIEW_MARKER.length)
				.replace(/^\n+/, "") || null
		);
	}
	if (status !== "complete") return null;
	return (
		previousBody
			.split("\n")
			.filter(
				(line) =>
					!/^<!--.*-->$/.test(line.trim()) &&
					line !== "## Review" &&
					line !== "## AI Review",
			)
			.join("\n")
			.replace(/^\n+/, "") || null
	);
}

function renderTransient(
	status: "pending" | "failure",
	headSha: string,
	previousCompleteBody: string | undefined,
	message: (hasPrevious: boolean) => string,
): string {
	const previous = preserveComplete(previousCompleteBody);
	const lines = [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${headSha} -->`,
		`<!-- status: ${status} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## AI Review",
		"",
		`${status === "pending" ? "⏳" : "❌"} ${message(!!previous)} commit \`${headSha.slice(0, 7)}\`.`,
	];
	if (previous) lines.push("", PREVIOUS_REVIEW_MARKER, "", previous);
	return keepSingleMarker(lines.join("\n"));
}

/**
 * The in-progress note. A full review says so; an incremental review over an
 * earlier completed review says it is reviewing new changes.
 */
export function renderPending(
	headSha: string,
	previousCompleteBody?: string,
	options: { fullReview?: boolean } = {},
): string {
	return renderTransient(
		"pending",
		headSha,
		previousCompleteBody,
		(hasPrevious) =>
			options.fullReview
				? "Full review in progress for"
				: hasPrevious
					? "Reviewing new changes in"
					: "Review in progress for",
	);
}

export function renderFailure(
	headSha: string,
	previousCompleteBody?: string,
): string {
	return renderTransient(
		"failure",
		headSha,
		previousCompleteBody,
		() => "Review failed; it will retry on the next push for",
	);
}

export function parseStatus(
	body: string | null | undefined,
): "complete" | "pending" | "failure" | null {
	return (
		(body?.match(/<!-- status: (complete|pending|failure) -->/)?.[1] as
			"complete" | "pending" | "failure" | undefined) ?? null
	);
}
