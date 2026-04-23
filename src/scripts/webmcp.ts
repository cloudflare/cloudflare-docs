/**
 * WebMCP — exposes Cloudflare Docs site tools to AI agents via the browser.
 * Spec: https://webmachinelearning.github.io/webmcp/
 */

import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX } from "~/util/algolia";
const LLMS_TXT_URL = "https://developers.cloudflare.com/llms.txt";

// Cache for list-directories results — fetched once per session.
let directoriesCache: DirectoryEntry[] | null = null;

interface DirectoryEntry {
	name: string;
	url: string;
	description: string;
	group: string;
}

interface AlgoliaHit {
	objectID: string;
	url?: string;
	hierarchy?: {
		lvl0?: string;
		lvl1?: string;
		lvl2?: string;
	};
	content?: string;
	_snippetResult?: {
		content?: { value?: string };
		hierarchy?: {
			lvl1?: { value?: string };
			lvl2?: { value?: string };
		};
	};
}

interface AlgoliaResponse {
	hits: AlgoliaHit[];
}

// ---------------------------------------------------------------------------
// Tool: search
// ---------------------------------------------------------------------------
async function executeSearch(input: object): Promise<unknown> {
	const { query, limit = 5 } = input as { query: string; limit?: number };

	const clampedLimit = Math.min(Math.max(1, limit), 20);

	const response = await fetch(
		`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/query`,
		{
			method: "POST",
			headers: {
				"X-Algolia-Application-Id": ALGOLIA_APP_ID,
				"X-Algolia-API-Key": ALGOLIA_API_KEY,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
				filters: "type:content",
				hitsPerPage: clampedLimit,
				attributesToRetrieve: ["url", "hierarchy", "content"],
				attributesToSnippet: ["content:20", "hierarchy.lvl1:10"],
			}),
		},
	);

	if (!response.ok) {
		throw new Error(`Search failed: ${response.status} ${response.statusText}`);
	}

	const data = (await response.json()) as AlgoliaResponse;

	return data.hits.map((hit) => ({
		title:
			hit.hierarchy?.lvl2 ??
			hit.hierarchy?.lvl1 ??
			hit.hierarchy?.lvl0 ??
			"Untitled",
		url: hit.url ?? "",
		snippet:
			hit._snippetResult?.content?.value ??
			hit._snippetResult?.hierarchy?.lvl1?.value ??
			hit._snippetResult?.hierarchy?.lvl2?.value ??
			hit.content?.slice(0, 200) ??
			"",
	}));
}

// ---------------------------------------------------------------------------
// Tool: list-directories
// ---------------------------------------------------------------------------
async function executeListDirectories(
	_input: object,
): Promise<DirectoryEntry[]> {
	if (directoriesCache) {
		return directoriesCache;
	}

	const response = await fetch(LLMS_TXT_URL);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch directory: ${response.status} ${response.statusText}`,
		);
	}

	const text = await response.text();
	const results: DirectoryEntry[] = [];
	let currentGroup = "";

	for (const line of text.split("\n")) {
		// Group headings: "## Application performance"
		const headingMatch = /^##\s+(.+)$/.exec(line);
		if (headingMatch) {
			currentGroup = headingMatch[1].trim();
			continue;
		}

		// Product entries: "- [Name](url): description"
		const entryMatch = /^-\s+\[([^\]]+)\]\(([^)]+)\)(?::\s+(.*))?$/.exec(line);
		if (entryMatch) {
			const name = entryMatch[1].trim();
			// Convert per-product llms.txt URL to the docs root URL
			const llmsUrl = entryMatch[2].trim();
			const url = llmsUrl.replace(/\/llms\.txt$/, "/");
			const description = (entryMatch[3] ?? "").trim();

			results.push({ name, url, description, group: currentGroup });
		}
	}

	directoriesCache = results;
	return results;
}

// ---------------------------------------------------------------------------
// Registration / lifecycle
// ---------------------------------------------------------------------------
function registerTools(): void {
	if (!("modelContext" in navigator) || !navigator.modelContext) {
		return;
	}

	const controller = new AbortController();
	const { signal } = controller;

	navigator.modelContext.registerTool(
		{
			name: "search",
			title: "Search Cloudflare Docs",
			description:
				"Full-text search across Cloudflare developer documentation. Returns matching pages with titles, URLs, and content snippets. Use this to find documentation on any Cloudflare product or feature.",
			inputSchema: {
				type: "object",
				properties: {
					query: {
						type: "string",
						description: "The search query",
					},
					limit: {
						type: "integer",
						description:
							"Maximum number of results to return (1–20, default 5)",
						default: 5,
						minimum: 1,
						maximum: 20,
					},
				},
				required: ["query"],
			},
			execute: executeSearch,
			annotations: { readOnlyHint: true },
		},
		{ signal },
	);

	navigator.modelContext.registerTool(
		{
			name: "list-directories",
			title: "List Cloudflare Docs Products",
			description:
				"Returns a list of all Cloudflare products available in the developer documentation, including each product's name, docs URL, short description, and category group. Use this to discover what products exist before searching or navigating.",
			inputSchema: {
				type: "object",
				properties: {},
			},
			execute: executeListDirectories,
			annotations: { readOnlyHint: true },
		},
		{ signal },
	);

	// Unregister all tools on Astro page transitions.
	document.addEventListener(
		"astro:before-swap",
		() => {
			controller.abort();
		},
		{ once: true },
	);
}

// Register on initial load and after each Astro page navigation.
document.addEventListener("astro:page-load", registerTools);

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", registerTools);
} else {
	registerTools();
}
