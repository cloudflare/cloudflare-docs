/**
 * Eval-only mock of `read_repo_file`.
 *
 * Replaces the GitHub API call with a lookup against a fixture map keyed by
 * `ref` (the headSha passed in eval initialData). This lets eval cases provide
 * synthetic file content without touching production agent or tool code.
 *
 * Wired via Vite alias only when `DOCS_FLUE_AGENT_EVALS=1` — see `vite.config.ts`.
 * Production and normal dev builds import the real `../lib/github-repo-tools`.
 */
import { defineTool, type ToolDefinition } from "@flue/runtime";
import type { TokenProvider } from "../../lib/token-provider";
import * as v from "valibot";

/** Shared fixture: file with an <img> tag inside a fenced HTML code block. */
const FENCED_IMG_FIXTURE = {
	"src/content/docs/workers/example.mdx": [
		"---",
		"title: Example",
		"---",
		"",
		"Here is an example:",
		"",
		"```html",
		'<img src="/static/logo.png" alt="Logo" />',
		"```",
		"",
		"That's it.",
	].join("\n"),
};

/** Fixtures keyed by ref (eval headSha) → path → file content. */
const FIXTURES: Record<string, Record<string, string>> = {
	// Style-guide eval: raw <img> tag not inside a code block.
	"eval-style-raw-img": {
		"src/content/docs/cloudflare-challenges/precursor.mdx": [
			"---",
			"pcx_content_type: concept",
			"title: Precursor",
			"description: Precursor detection.",
			"products:",
			"  - cloudflare-challenges",
			"sidebar:",
			"  order: 4",
			"---",
			"",
			"## Get started",
			"",
			"1. Turn on Precursor.",
			"",
			'<img src="/images/precursor/precursor-rules.png" alt="Precursor mode selector" style="border:1px solid #e5e7eb;" />',
			"",
			"For most customers, selecting a mode is the only configuration required.",
		].join("\n"),
	},

	// Style-guide eval: <img> inside a fenced code block.
	"eval-style-fenced-img": FENCED_IMG_FIXTURE,

	// Style-guide eval: Markdown image with /images/ path.
	"eval-style-images-path": {
		"src/content/docs/cloudflare-challenges/precursor.mdx": [
			"---",
			"title: Precursor",
			"---",
			"",
			"![Precursor mode selector](/images/precursor/precursor-rules.png)",
		].join("\n"),
	},

	// Style-guide eval: correct Markdown image syntax.
	"eval-style-correct-img": {
		"src/content/docs/cloudflare-challenges/precursor.mdx": [
			"---",
			"title: Precursor",
			"---",
			"",
			"![Precursor mode selector](~/assets/images/cloudflare-challenges/precursor-rules.png)",
		].join("\n"),
	},

	// Review-validator eval: file with an unhandled promise rejection.
	"eval-val-unhandled-promise": {
		"src/handler.ts": [
			"export default {",
			"  async fetch(request, env) {",
			"    const url = 'https://api.example.com/data';",
			"    fetch(url).then((r) => r.json()).then((d) => new Response(d));",
			"    return new Response('ok');",
			"  },",
			"};",
		].join("\n"),
	},

	// Review-validator eval: style-guide false positive (img inside code block).
	"eval-val-fenced-img": FENCED_IMG_FIXTURE,
};

/** Mock `read_repo_file` — drop-in replacement for the real tool in evals. */
export function makeReadRepoFileTool(
	_getToken: TokenProvider,
	defaultRef: string = "production",
): ToolDefinition {
	return defineTool({
		name: "read_repo_file",
		description: `Read any text file from the cloudflare/cloudflare-docs repo. Use for package.json, tsconfig, source files, etc. The default ref is "${defaultRef}".`,
		input: v.object({
			path: v.pipe(
				v.string(),
				v.description(
					"File path relative to repo root, e.g. 'package.json' or 'src/util/algolia.ts'",
				),
			),
			ref: v.optional(
				v.pipe(
					v.string(),
					v.description(`Git ref. Defaults to "${defaultRef}".`),
				),
			),
		}),
		run({ data }) {
			const path = data.path;
			const ref = data.ref ?? defaultRef;
			const refFixtures = FIXTURES[ref];
			if (refFixtures && path in refFixtures) {
				return refFixtures[path];
			}
			return `File not found: ${path}`;
		},
	});
}

/** Mock `search_repo` — returns no results in evals. */
export function makeSearchRepoTool(_getToken: TokenProvider): ToolDefinition {
	return defineTool({
		name: "search_repo",
		description:
			"Search the cloudflare/cloudflare-docs repo for a string or pattern. Returns matching file paths and line snippets.",
		input: v.object({
			query: v.pipe(v.string(), v.description("Search term.")),
			path: v.optional(v.string()),
		}),
		run() {
			return "No results found.";
		},
	});
}
