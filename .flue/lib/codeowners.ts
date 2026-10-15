/**
 * CODEOWNERS matching: which product teams review changes to the given pages.
 * Owners on almost every rule are ignored.
 */

export interface CodeownersRule {
	pattern: string;
	re: RegExp;
	owners: string[];
}

const GENERIC_OWNERS = new Set([
	"@cloudflare/product-owners",
	"@cloudflare/content-engineering",
	"@cloudflare/pm-changelogs",
]);

/** CODEOWNERS pattern to RegExp (the gitignore-style subset GitHub supports). */
function toRegExp(pattern: string): RegExp {
	let p = pattern;
	const anchored = p.startsWith("/");
	if (anchored) p = p.slice(1);
	if (p.endsWith("/")) p = p.slice(0, -1);
	const body = p
		.split("/")
		.map((seg) =>
			seg === "**"
				? ".*"
				: seg
						.replace(/[.+^${}()|[\]\\]/g, "\\$&")
						.replace(/\*/g, "[^/]*")
						.replace(/\?/g, "[^/]"),
		)
		.join("/")
		.replace(/\.\*\//g, "(?:.*/)?");
	const start = anchored || p.includes("/") ? "^" : "(?:^|/)";
	// A directory (or bare name) matches everything below it.
	return new RegExp(`${start}${body}(?:/.*)?$`);
}

export function parseCodeowners(text: string): CodeownersRule[] {
	const rules: CodeownersRule[] = [];
	for (const raw of text.split("\n")) {
		const line = raw.replace(/#.*$/, "").trim();
		if (!line) continue;
		const [pattern, ...owners] = line.split(/\s+/);
		if (owners.length === 0) continue;
		try {
			rules.push({ pattern, re: toRegExp(pattern), owners });
		} catch {
			// Skip patterns that do not compile.
		}
	}
	return rules;
}

/**
 * Distinct CODEOWNERS patterns with a named product owner for the given repo
 * paths. The last matching rule wins, as on GitHub.
 */
export function productCodeownerAreas(
	rules: CodeownersRule[],
	paths: string[],
): string[] {
	const areas = new Set<string>();
	for (const path of paths) {
		let match: CodeownersRule | null = null;
		for (const rule of rules) if (rule.re.test(path)) match = rule;
		if (match && match.owners.some((o) => !GENERIC_OWNERS.has(o)))
			areas.add(match.pattern);
	}
	return [...areas];
}

/** Repo path (no extension) for a docs page URL, or null if not a docs page. */
export function docsSourcePath(page: string): string | null {
	let path: string;
	try {
		const url = new URL(page, "https://developers.cloudflare.com");
		if (url.hostname !== "developers.cloudflare.com") return null;
		path = url.pathname;
	} catch {
		return null;
	}
	const trimmed = path.replace(/^\/+|\/+$/g, "").replace(/\/index\.md$/, "");
	if (!trimmed) return null;
	return `src/content/docs/${trimmed}`;
}

/** developers.cloudflare.com page URLs mentioned in free text. */
export function docsUrlsIn(text: string): string[] {
	const urls = new Set<string>();
	for (const match of text.matchAll(
		/https?:\/\/developers\.cloudflare\.com\/[^\s)\]>"'`]*/g,
	)) {
		urls.add(match[0].replace(/[.,;:]+$/, "").replace(/#.*$/, ""));
	}
	return [...urls];
}
