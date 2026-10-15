/**
 * Effort assessment: gather the issue's context from GitHub, ask the model the
 * questions in prompts/effort-label.md (through AI Gateway when configured),
 * and validate the answer. Scoring and labeling stay in trusted code
 * (effort-label.ts); nothing here writes to GitHub.
 */
import * as v from "valibot";
import type { AiRunner } from "./clef";
import {
	REPO,
	getIssueComments,
	getRepoFileContent,
	listCrossReferencedPullRequests,
	type GitHubCrossReferencedPullRequest,
	type GitHubIssueComment,
} from "./github";
import {
	docsSourcePath,
	docsUrlsIn,
	parseCodeowners,
	productCodeownerAreas,
} from "./codeowners";
import {
	DECISIONS,
	EFFORT_LEVELS,
	ISSUE_TYPES,
	OWNERS,
	REQUIREMENT_STATUSES,
	type EffortAssessment,
} from "./effort-label";
import { EFFORT_MODEL } from "./agents/models";
import {
	collectDocsPages,
	collectPullRequestDiffs,
	type DocsPage,
	type PullRequestDiff,
} from "./docs-evidence";

const MAX_BODY_CHARS = 6_000;
const MAX_COMMENT_CHARS = 1_200;
const MAX_COMMENTS = 15;
const MAX_PRS = 10;

export interface EffortIssue {
	number: number;
	title: string;
	body: string | null;
	state: string;
	author: string;
	authorAssociation: string;
	labels: string[];
	createdAt: string;
	commentsCount: number;
	isPullRequest: boolean;
}

export interface EffortContext {
	issue: EffortIssue;
	comments: Array<{
		author: string;
		association: string;
		date: string;
		body: string;
	}>;
	/** Bot comments left out of `comments`. */
	botComments: number;
	pullRequests: GitHubCrossReferencedPullRequest[];
	/** developers.cloudflare.com URLs found in the issue and comments. */
	docsPages: string[];
	/** The first few of those pages, read live (excerpt, quote checks, commits). */
	livePages: DocsPage[];
	/** Files and diff excerpts for the most relevant docs PRs. */
	prDiffs: PullRequestDiff[];
}

/** Hide our delimiter tags inside untrusted text so it cannot close a block. */
export function neutralize(text: string): string {
	return text.replace(
		/<(\/?)(issue|comments|comment|pull_requests|docs_pages|docs_page)\b/gi,
		"<$1_$2",
	);
}

const clip = (text: string, max: number) =>
	text.length > max ? `${text.slice(0, max)}… [truncated]` : text;

const isBot = (c: GitHubIssueComment) =>
	c.user?.type === "Bot" || /\[bot\]$/.test(c.user?.login ?? "");

/** Read the issue's comments and linked PRs. Throws on GitHub errors. */
export async function getEffortContext(
	token: string,
	issue: EffortIssue,
): Promise<EffortContext> {
	const [allComments, pullRequests] = await Promise.all([
		issue.commentsCount > 0
			? getIssueComments(token, issue.number)
			: Promise.resolve([]),
		listCrossReferencedPullRequests(token, issue.number),
	]);
	const human = allComments.filter(
		(c) => !isBot(c) && !/^\s*\/\w/.test(c.body ?? ""),
	);
	// The opening discussion and the latest state matter most.
	const kept =
		human.length > MAX_COMMENTS
			? [...human.slice(0, 5), ...human.slice(-(MAX_COMMENTS - 5))]
			: human;
	const docsPages = docsUrlsIn(
		[issue.body ?? "", ...human.map((c) => c.body ?? "")].join("\n"),
	).slice(0, 10);
	const prs = pullRequests.slice(0, MAX_PRS);
	const [livePages, prDiffs] = await Promise.all([
		collectDocsPages(token, docsPages, issue),
		collectPullRequestDiffs(token, prs),
	]);
	return {
		issue,
		comments: kept.map((c) => ({
			author: c.user?.login ?? "unknown",
			association: c.author_association ?? "NONE",
			date: c.created_at.slice(0, 10),
			body: c.body ?? "",
		})),
		botComments: allComments.length - human.length,
		pullRequests: prs,
		docsPages,
		livePages,
		prDiffs,
	};
}

function prStatus(pr: GitHubCrossReferencedPullRequest): string {
	if (pr.merged) return "MERGED";
	return pr.state === "open" ? "OPEN" : "CLOSED WITHOUT MERGING";
}

/** The per-issue user message (the system prompt is the static .md file). */
export function buildEffortMessage(ctx: EffortContext): string {
	const { issue } = ctx;
	const comments = ctx.comments.length
		? ctx.comments
				.map(
					(c) =>
						`<comment author="${c.author}" association="${c.association}" date="${c.date}">\n${neutralize(clip(c.body, MAX_COMMENT_CHARS))}\n</comment>`,
				)
				.join("\n")
		: "(no human comments)";
	const diffs = new Map(ctx.prDiffs.map((d) => [d.number, d]));
	const prs = ctx.pullRequests.length
		? ctx.pullRequests
				.map((p) => {
					const line = `- ${p.repo}#${p.number} STATUS: ${prStatus(p)}${p.repo === REPO ? "" : " (other repository)"}: ${neutralize(p.title)}`;
					const d = p.repo === REPO ? diffs.get(p.number) : undefined;
					if (!d) return line;
					const files = d.files
						.map(
							(f) =>
								`  ${f.status} ${f.filename} (+${f.additions} -${f.deletions})`,
						)
						.join("\n");
					return `${line}\n  Files:\n${files}${d.patch ? `\n  Diff excerpt:\n${neutralize(d.patch)}` : ""}`;
				})
				.join("\n")
		: "(none)";
	const live = new Set(ctx.livePages.map((p) => p.requestedUrl));
	const otherPages = ctx.docsPages.filter((u) => !live.has(u));
	return [
		`<issue number="${issue.number}" author="${issue.author}" association="${issue.authorAssociation}" opened="${issue.createdAt.slice(0, 10)}">`,
		`Title: ${neutralize(issue.title)}`,
		`Labels: ${issue.labels.join(", ") || "(none)"}`,
		"",
		neutralize(clip(issue.body ?? "", MAX_BODY_CHARS)),
		"</issue>",
		"",
		`<comments total="${issue.commentsCount}" bot_comments_hidden="${ctx.botComments}">`,
		comments,
		"</comments>",
		"",
		"<pull_requests>",
		prs,
		"</pull_requests>",
		"",
		"<docs_pages>",
		ctx.livePages.length || otherPages.length
			? [
					...ctx.livePages.map(renderDocsPage),
					...(otherPages.length
						? [`Also linked (not read): ${otherPages.join(", ")}`]
						: []),
				].join("\n\n")
			: "(none found)",
		"</docs_pages>",
	].join("\n");
}

/** One live page as the model sees it. */
export function renderDocsPage(p: DocsPage): string {
	const head = `<docs_page url="${p.url ?? p.requestedUrl}" status="${p.status}">`;
	if (p.status === "not_found")
		return `${head}\nPAGE NOT FOUND: ${p.requestedUrl} no longer exists (it may have been removed or merged into another page).\n</docs_page>`;
	if (!p.excerpt)
		return `${head}\nThe page could not be read, so requirements about its content are "cant_tell".\n</docs_page>`;
	const lines = [head];
	if (p.status === "moved")
		lines.push(`MOVED: ${p.requestedUrl} now redirects here.`);
	lines.push(
		`Title: ${p.title || "(untitled)"}${p.lastUpdated ? ` · Last updated ${p.lastUpdated}` : ""}`,
		`Excerpt: ${p.sectionsShown} of ${p.sectionsTotal} section(s) shown${p.sectionsShown < p.sectionsTotal ? " (the rest was omitted; missing text may be in an omitted section)" : ""}.`,
	);
	if (p.quoteChecks.length) {
		lines.push(
			"Text quoted in the issue, checked against the whole live page:",
		);
		for (const q of p.quoteChecks)
			lines.push(
				`- ${q.found ? "STILL ON THE PAGE" : "NO LONGER ON THE PAGE"}: "${neutralize(q.quote)}"`,
			);
	}
	if (!p.sourceFound)
		lines.push(
			"Source file not found (generated page): commit history could not be checked.",
		);
	else
		lines.push(
			p.commits.length
				? `Commits to ${p.sourcePath} since the issue was opened:\n${p.commits.map((c) => `- ${c.sha} ${c.date} ${neutralize(c.message)}`).join("\n")}`
				: `No commits to ${p.sourcePath} since the issue was opened.`,
		);
	lines.push("", neutralize(p.excerpt), "</docs_page>");
	return lines.join("\n");
}

const AssessmentSchema = v.object({
	decision: v.picklist(DECISIONS),
	issue_type: v.picklist(ISSUE_TYPES),
	// Long lists are trimmed after parsing rather than rejected.
	requirements: v.pipe(
		v.array(
			v.object({
				text: v.string(),
				status: v.picklist(REQUIREMENT_STATUSES),
			}),
		),
		v.transform((list) => list.slice(0, 8)),
	),
	owner: v.picklist(OWNERS),
	pages: v.pipe(
		v.array(v.string()),
		v.transform((list) => list.slice(0, 10)),
	),
	effort_estimate: v.picklist(EFFORT_LEVELS),
	reason: v.string(),
});

/**
 * JSON schema for strict decoding; mirrors AssessmentSchema. No `maxItems`:
 * with it, Gemma's constrained decoding skipped `requirements` and ran away
 * on whitespace until the token limit.
 */
export const EFFORT_JSON_SCHEMA = {
	type: "object",
	additionalProperties: false,
	required: [
		"decision",
		"issue_type",
		"requirements",
		"owner",
		"pages",
		"effort_estimate",
		"reason",
	],
	properties: {
		decision: { type: "string", enum: [...DECISIONS] },
		issue_type: { type: "string", enum: [...ISSUE_TYPES] },
		requirements: {
			type: "array",
			items: {
				type: "object",
				additionalProperties: false,
				required: ["text", "status"],
				properties: {
					text: { type: "string" },
					status: { type: "string", enum: [...REQUIREMENT_STATUSES] },
				},
			},
		},
		owner: { type: "string", enum: [...OWNERS] },
		pages: { type: "array", items: { type: "string" } },
		effort_estimate: { type: "string", enum: [...EFFORT_LEVELS] },
		reason: { type: "string" },
	},
} as const;

/**
 * Validate a model reply. Tolerates code fences or prose around the object.
 * Enforces "Docs fix needed" never pairs with owner product_team. Throws when
 * malformed.
 */
export function parseEffortAssessment(text: string): EffortAssessment {
	const start = text.indexOf("{");
	const end = text.lastIndexOf("}");
	if (start < 0 || end <= start)
		throw new Error("effort reply contained no JSON object");
	const result = v.safeParse(
		AssessmentSchema,
		JSON.parse(text.slice(start, end + 1)),
	);
	if (!result.success) {
		const issue = result.issues[0];
		throw new Error(
			`effort reply failed validation: ${v.getDotPath(issue) ?? "root"}: ${issue.message}`,
		);
	}
	const out = result.output as EffortAssessment;
	if (out.decision === "Docs fix needed" && out.owner === "product_team")
		return { ...out, decision: "Needs owner or SME input" };
	return out;
}

interface ChatResult {
	choices?: Array<{ message?: { content?: string | null } }>;
	response?: unknown;
}

function replyText(result: unknown): string {
	const r = result as ChatResult | null;
	const content = r?.choices?.[0]?.message?.content;
	if (typeof content === "string") return content;
	if (typeof r?.response === "string") return r.response;
	return r?.response ? JSON.stringify(r.response) : "";
}

/**
 * Ask the model. Strict JSON-schema decoding first; one retry in plain JSON
 * mode if the reply is malformed. Goes through AI Gateway when `gatewayId` is
 * set. Throws when both attempts fail.
 */
export async function assessEffort(
	ai: AiRunner,
	systemPrompt: string,
	ctx: EffortContext,
	gatewayId?: string,
): Promise<EffortAssessment> {
	const messages = [
		{ role: "system", content: systemPrompt },
		{ role: "user", content: buildEffortMessage(ctx) },
	];
	const options = gatewayId ? { gateway: { id: gatewayId } } : undefined;
	let lastError: unknown;
	for (const strict of [true, false]) {
		try {
			const result = await ai.run(
				EFFORT_MODEL,
				{
					messages,
					temperature: strict ? 0.2 : 0.4,
					max_completion_tokens: 1200,
					chat_template_kwargs: { enable_thinking: false },
					response_format: strict
						? {
								type: "json_schema",
								json_schema: {
									name: "effort_assessment",
									strict: true,
									schema: EFFORT_JSON_SCHEMA,
								},
							}
						: { type: "json_object" },
				},
				options,
			);
			return parseEffortAssessment(replyText(result));
		} catch (error) {
			lastError = error;
		}
	}
	throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

/** Product codeowner areas for the pages involved. Empty if CODEOWNERS can't be read. */
export async function codeownerAreasFor(
	token: string,
	pages: string[],
	sourcePaths: string[] = [],
): Promise<string[]> {
	const paths = [
		...new Set([
			...sourcePaths,
			...pages.map(docsSourcePath).filter((p): p is string => p !== null),
		]),
	];
	if (paths.length === 0) return [];
	const text = await getRepoFileContent(
		token,
		".github/CODEOWNERS",
		"production",
	).catch(() => null);
	if (!text) return [];
	return productCodeownerAreas(parseCodeowners(text), paths);
}
