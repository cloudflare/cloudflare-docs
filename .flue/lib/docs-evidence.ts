/**
 * Live docs evidence for the effort assessment: page excerpts, quote checks,
 * source commits since the issue opened, and docs PR diffs. Failed fetches
 * degrade to "unknown" and never throw.
 */
import {
	REPO,
	getPullRequestFiles,
	listCommitsForPath,
	type GitHubCrossReferencedPullRequest,
} from "./github";

const DOCS_HOST = "developers.cloudflare.com";
const SOURCE_ROOT = "src/content/docs";

export const DOCS_BUDGET = {
	maxPages: 3,
	pagesTotal: 12_000,
	pageMax: 7_000,
	rawPageBytes: 400_000,
	commitsPerPage: 6,
	maxPrDiffs: 2,
	prFiles: 10,
	prPatch: 1_200,
};

export interface QuoteCheck {
	quote: string;
	found: boolean;
}

export interface DocsPage {
	requestedUrl: string;
	/** Final URL after redirects; null when the page does not exist. */
	url: string | null;
	status: "ok" | "moved" | "not_found" | "error";
	title: string;
	lastUpdated: string;
	excerpt: string;
	sectionsShown: number;
	sectionsTotal: number;
	/** Repo path of the page's .mdx file, when found. */
	sourcePath: string | null;
	/** false = no .mdx matched (a generated page), so commits could not be checked. */
	sourceFound: boolean;
	commits: Array<{ sha: string; message: string; date: string }>;
	quoteChecks: QuoteCheck[];
}

export interface PullRequestDiff {
	number: number;
	files: Array<{
		filename: string;
		status: string;
		additions: number;
		deletions: number;
	}>;
	patch: string;
}

export function clip(text: string, max: number): string {
	const t = text.trim();
	return t.length <= max ? t : `${t.slice(0, max)}… [truncated]`;
}

function tidyMarkdown(text: string): string {
	return text
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/<img[^>]*>/gi, "[image]")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, "[image]")
		.replace(/\r/g, "")
		.replace(/\n{3,}/g, "\n\n");
}

/* ---------- Quoted text ---------- */

function normalizeForMatch(text: string): string {
	return text
		.toLowerCase()
		.replace(/[`*_>#[\]()|"“”'‘’]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

/** Up to 3 blockquotes from the issue (25 to 300 characters, no headings). */
export function extractQuotes(body: string): string[] {
	const quotes: string[] = [];
	let current: string[] = [];
	const flush = () => {
		const q = current.join(" ").replace(/\s+/g, " ").trim();
		current = [];
		if (q.length >= 25 && !quotes.includes(q)) quotes.push(q.slice(0, 300));
	};
	for (const line of body.replace(/\r/g, "").split("\n")) {
		const m = /^\s*(?:>\s*)+(.*)$/.exec(line);
		const text = m?.[1].trim();
		if (!text || /^#{1,6}\s/.test(text)) {
			flush();
			continue;
		}
		current.push(text);
	}
	flush();
	return quotes.slice(0, 3);
}

export function checkQuotes(
	quotes: string[],
	pageMarkdown: string,
): QuoteCheck[] {
	const page = normalizeForMatch(pageMarkdown);
	return quotes.map((quote) => ({
		quote,
		found: page.includes(normalizeForMatch(quote)),
	}));
}

/* ---------- Page excerpts ---------- */

const STOP = new Set(
	"this that with from have been will would should could there their what when which page docs documentation cloudflare https http about into also just like does more only other some than then they your here were using used".split(
		" ",
	),
);

export function keywords(text: string): Set<string> {
	const words = text.toLowerCase().match(/[a-z][a-z0-9_-]{3,}/g) ?? [];
	return new Set(words.filter((w) => !STOP.has(w)));
}

function slugify(heading: string): string {
	return heading
		.toLowerCase()
		.replace(/`/g, "")
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

/** Intro, anchored section, then the best keyword matches, within `budget`. */
export function excerptPage(
	markdown: string,
	anchor: string,
	kw: Set<string>,
	budget: number,
): {
	title: string;
	lastUpdated: string;
	excerpt: string;
	shown: number;
	total: number;
} {
	const body = markdown.replace(/^---[\s\S]*?\n---\n/, "");
	const title = /^# (.+)$/m.exec(body)?.[1]?.trim() ?? "";
	const lastUpdated =
		/Last updated ([A-Z][a-z]{2} \d{1,2}, \d{4})/.exec(body)?.[1] ?? "";
	const cleaned = body
		.replace(/\[Skip to content\][^\n]*\n/, "")
		.replace(
			/> Documentation Index[\s\S]*?pages before exploring further\.\n/,
			"",
		)
		.replace(/^Last updated[^\n]*\n/m, "")
		.replace(/^Was this helpful\?[\s\S]*$/m, "")
		.replace(/```json\n\{"@context"[\s\S]*?```/g, "");

	const sections = cleaned.split(/\n(?=#{2,4} )/).map((text, idx) => {
		const heading = /^#{1,4} (.+)$/m.exec(text)?.[1] ?? "";
		const words = keywords(text);
		let score = 0;
		for (const w of kw) if (words.has(w)) score++;
		if (anchor && slugify(heading) === anchor) score += 1000;
		if (idx === 0) score += 500;
		return { text: text.trim(), score, idx };
	});

	const chosen: typeof sections = [];
	let used = 0;
	for (const s of [...sections].sort((a, b) => b.score - a.score)) {
		const text =
			s.text.length > budget * 0.6
				? clip(s.text, Math.floor(budget * 0.6))
				: s.text;
		if (used + text.length > budget) continue;
		chosen.push({ ...s, text });
		used += text.length;
	}
	chosen.sort((a, b) => a.idx - b.idx);
	const omitted = sections.length - chosen.length;
	const excerpt =
		chosen.map((s) => s.text).join("\n\n…\n\n") +
		(omitted ? `\n\n[${omitted} less relevant section(s) omitted]` : "");
	return {
		title,
		lastUpdated,
		excerpt: tidyMarkdown(excerpt),
		shown: chosen.length,
		total: sections.length,
	};
}

/** Fetch `<page>/index.md`, following redirects by hand (they drop `index.md`). */
export async function fetchDocsMarkdown(pageUrl: string): Promise<{
	finalUrl: string | null;
	markdown: string | null;
	moved: boolean;
}> {
	let url = new URL(pageUrl);
	let moved = false;
	for (let hop = 0; hop < 3; hop++) {
		const path = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
		const res = await fetch(`https://${DOCS_HOST}${path}index.md`, {
			redirect: "manual",
		});
		if (res.status >= 300 && res.status < 400) {
			const location = res.headers.get("location");
			if (!location) return { finalUrl: null, markdown: null, moved };
			url = new URL(location, `https://${DOCS_HOST}`);
			if (url.hostname !== DOCS_HOST)
				return { finalUrl: null, markdown: null, moved };
			moved = true;
			continue;
		}
		if (res.status === 404) return { finalUrl: null, markdown: null, moved };
		const finalUrl = `https://${DOCS_HOST}${path}`;
		if (
			!res.ok ||
			!(res.headers.get("content-type") ?? "").includes("markdown")
		) {
			await res.body?.cancel();
			return { finalUrl, markdown: null, moved };
		}
		const text = await res.text();
		return {
			finalUrl,
			markdown: text.slice(0, DOCS_BUDGET.rawPageBytes),
			moved,
		};
	}
	return { finalUrl: null, markdown: null, moved };
}

/** Whether a source file exists on `production` (public raw read, first bytes only). */
export async function sourceFileExists(path: string): Promise<boolean> {
	const res = await fetch(
		`https://raw.githubusercontent.com/${REPO}/production/${path}`,
		{
			headers: {
				range: "bytes=0-1499",
				"user-agent": "cloudflare-docs-agents",
			},
		},
	);
	await res.body?.cancel();
	return res.ok;
}

/** Fetch one page with its excerpt, quote checks, and source commits. */
export async function collectDocsPage(
	token: string,
	requested: string,
	opts: { kw: Set<string>; budget: number; since: string; quotes: string[] },
): Promise<DocsPage> {
	const page: DocsPage = {
		requestedUrl: requested,
		url: null,
		status: "error",
		title: "",
		lastUpdated: "",
		excerpt: "",
		sectionsShown: 0,
		sectionsTotal: 0,
		sourcePath: null,
		sourceFound: false,
		commits: [],
		quoteChecks: [],
	};
	let anchor = "";
	try {
		anchor = decodeURIComponent(new URL(requested).hash.slice(1)).toLowerCase();
	} catch {
		// No usable anchor.
	}
	try {
		const { finalUrl, markdown, moved } = await fetchDocsMarkdown(requested);
		page.url = finalUrl;
		if (!finalUrl) {
			page.status = "not_found";
			return page;
		}
		if (markdown) {
			const ex = excerptPage(markdown, anchor, opts.kw, opts.budget);
			page.title = ex.title;
			page.lastUpdated = ex.lastUpdated;
			page.excerpt = ex.excerpt;
			page.sectionsShown = ex.shown;
			page.sectionsTotal = ex.total;
			page.status = moved ? "moved" : "ok";
			page.quoteChecks = checkQuotes(opts.quotes, markdown);
		}
		// The source is `<path>.mdx` or `<path>/index.mdx`.
		const rel = new URL(finalUrl).pathname.replace(/^\/|\/$/g, "");
		if (rel) {
			const candidates = [
				`${SOURCE_ROOT}/${rel}.mdx`,
				`${SOURCE_ROOT}/${rel}/index.mdx`,
			];
			for (const path of candidates) {
				const list = await listCommitsForPath(
					token,
					path,
					opts.since,
					DOCS_BUDGET.commitsPerPage,
				);
				if (list.length) {
					page.sourcePath = path;
					page.sourceFound = true;
					page.commits = list.map((c) => ({
						sha: c.sha.slice(0, 7),
						message: c.commit.message.split("\n")[0].slice(0, 140),
						date: (
							c.commit.committer?.date ??
							c.commit.author?.date ??
							""
						).slice(0, 10),
					}));
					break;
				}
			}
			// No recent commits: check the file exists, so it isn't taken for a generated page.
			if (!page.sourceFound) {
				for (const path of candidates) {
					if (await sourceFileExists(path)) {
						page.sourcePath = path;
						page.sourceFound = true;
						break;
					}
				}
			}
		}
	} catch {
		page.status = page.url ? page.status : "error";
	}
	return page;
}

/** Live pages for up to DOCS_BUDGET.maxPages docs URLs, sharing the character budget. */
export async function collectDocsPages(
	token: string,
	urls: string[],
	issue: { title: string; body: string | null; createdAt: string },
): Promise<DocsPage[]> {
	const picked = urls.slice(0, DOCS_BUDGET.maxPages);
	if (picked.length === 0) return [];
	const budget = Math.min(
		DOCS_BUDGET.pageMax,
		Math.floor(DOCS_BUDGET.pagesTotal / picked.length),
	);
	const kw = keywords(`${issue.title} ${issue.body ?? ""}`);
	// Quotes come from the issue body: that is where the reporter cites the text.
	const quotes = extractQuotes(issue.body ?? "");
	return Promise.all(
		picked.map((u) =>
			collectDocsPage(token, u, { kw, budget, since: issue.createdAt, quotes }),
		),
	);
}

/** Files and a short docs diff for same-repo PRs, merged first, then open. */
export async function collectPullRequestDiffs(
	token: string,
	prs: GitHubCrossReferencedPullRequest[],
): Promise<PullRequestDiff[]> {
	const picked = prs
		.filter((p) => p.repo === REPO && (p.merged || p.state === "open"))
		.sort((a, b) => Number(b.merged) - Number(a.merged))
		.slice(0, DOCS_BUDGET.maxPrDiffs);
	const out = await Promise.all(
		picked.map(async (p): Promise<PullRequestDiff | null> => {
			try {
				const files = await getPullRequestFiles(token, p.number);
				let patch = "";
				for (const f of files) {
					if (!f.patch || !/\.(mdx?|ya?ml|json)$/.test(f.filename)) continue;
					patch += `--- ${f.filename}\n${f.patch}\n`;
					if (patch.length > DOCS_BUDGET.prPatch) break;
				}
				return {
					number: p.number,
					files: files
						.slice(0, DOCS_BUDGET.prFiles)
						.map(({ filename, status, additions, deletions }) => ({
							filename,
							status,
							additions,
							deletions,
						})),
					patch: clip(patch, DOCS_BUDGET.prPatch),
				};
			} catch {
				return null;
			}
		}),
	);
	return out.filter((d): d is PullRequestDiff => d !== null);
}
