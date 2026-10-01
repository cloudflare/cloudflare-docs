/**
 * Eval-only mock of the review agents' repository tools.
 *
 * Tool names, descriptions, and input schemas come from the real module, so
 * the model sees the same contract as in production. Only `run` differs:
 * `read_repo_file` looks up fixture content keyed by `ref` (the eval
 * `headSha`), and `search_repo` returns no results.
 *
 * Wired via Vite alias only when `DOCS_FLUE_AGENT_EVALS=1` — see `vite.config.ts`.
 * Production and normal dev builds import the real `../lib/github-repo-tools`.
 */
import { defineTool, type ToolDefinition } from "@flue/runtime";
import {
	readRepoFileDefinition,
	renderRepoFile,
	SEARCH_REPO_DEFINITION,
} from "../../lib/github-repo-tools";
import type { TokenProvider } from "../../lib/token-provider";
import { REPO_FIXTURES } from "../review-fixtures";

export function makeReadRepoFileTool(
	_getToken: TokenProvider,
	defaultRef: string = "production",
): ToolDefinition {
	return defineTool({
		...readRepoFileDefinition(defaultRef),
		run({ data }) {
			const text = REPO_FIXTURES[data.ref ?? defaultRef]?.[data.path];
			if (text === undefined) return `File not found: ${data.path}`;
			return renderRepoFile(data.path, text, {
				start_line: data.start_line,
				end_line: data.end_line,
			});
		},
	});
}

export function makeSearchRepoTool(_getToken: TokenProvider): ToolDefinition {
	return defineTool({
		...SEARCH_REPO_DEFINITION,
		run() {
			return "No results found.";
		},
	});
}
