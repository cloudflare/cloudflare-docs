import { join } from "node:path";
import { parseArgs as nodeParseArgs } from "node:util";
import type { Args } from "./types";

export function parseArgs(): Args {
	const { values } = nodeParseArgs({
		args: process.argv.slice(2).filter((arg) => arg !== "--"),
		options: {
			dist: { type: "string", default: "dist" },
			"source-docs-dir": { type: "string", default: "src/content/docs" },
			"state-dir": { type: "string", default: ".ai-search" },
			previous: { type: "string" },
			manifest: { type: "string" },
			events: { type: "string" },
			"include-path-prefix": { type: "string", multiple: true, default: [] },
			"send-url": { type: "string" },
			"send-token-env": { type: "string" },
			"batch-size": { type: "string", default: "100" },
			commit: { type: "boolean", default: false },
			"force-full-reindex": { type: "boolean", default: false },
			concurrency: { type: "string", default: "1" },
			"max-retries": { type: "string", default: "5" },
			"resume-file": { type: "string" },
			help: { type: "boolean", default: false },
		},
	});

	if (values.help) {
		printHelp();
		process.exit(0);
	}

	const batchSize = Number.parseInt(values["batch-size"], 10);
	if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 100) {
		throw new Error("--batch-size must be an integer from 1 to 100");
	}

	const concurrency = Number.parseInt(values.concurrency, 10);
	if (!Number.isInteger(concurrency) || concurrency < 1) {
		throw new Error("--concurrency must be a positive integer");
	}

	const maxRetries = Number.parseInt(values["max-retries"], 10);
	if (!Number.isInteger(maxRetries) || maxRetries < 0) {
		throw new Error("--max-retries must be a non-negative integer");
	}

	const stateDir = values["state-dir"];

	return {
		dist: values.dist,
		sourceDocsDir: values["source-docs-dir"],
		stateDir,
		previous: values.previous ?? join(stateDir, "page-hashes.json"),
		manifest: values.manifest ?? join(stateDir, "latest-page-hashes.json"),
		events: values.events ?? join(stateDir, "docs-search-events.jsonl"),
		includePathPrefixes: values["include-path-prefix"],
		sendUrl: values["send-url"],
		sendTokenEnv: values["send-token-env"],
		batchSize,
		commit: values.commit,
		forceFullReindex: values["force-full-reindex"],
		concurrency,
		maxRetries,
		resumeFile: values["resume-file"],
	};
}

function printHelp() {
	console.log(`Usage: pnpm exec tsx bin/ai-search-doc-events.ts [options]

Build a hash manifest for rendered docs pages, diff it against local state, and optionally POST that diff.

Options:
  --dist <dir>             Astro build directory. Default: dist
  --source-docs-dir <dir>  Source docs Markdown/MDX directory. Default: src/content/docs
  --state-dir <dir>        Local state directory. Default: .ai-search
  --previous <file>        Previous manifest JSON. Default: <state-dir>/page-hashes.json
  --manifest <file>        New manifest JSON. Default: <state-dir>/latest-page-hashes.json
  --events <file>          JSONL change events. Default: <state-dir>/docs-search-events.jsonl
  --include-path-prefix <path>
                           Only include built pages whose docs path starts with this prefix.
                           Repeat to include multiple prefixes.
  --send-url <url>         POST the diff payload to this endpoint. The endpoint
                           enqueues each event for background indexing and
                           returns 202 Accepted; a 2xx means the batch was queued.
  --send-token-env <name>  Read a bearer token from this environment variable for --send-url.
                           Default: AI_SEARCH_REINDEX_TOKEN when that variable is set.
                           For Cloudflare Access, set CF_ACCESS_CLIENT_ID + CF_ACCESS_CLIENT_SECRET
                           (service token) or CF_ACCESS_TOKEN (JWT from cloudflared access token).
  --batch-size <count>     Number of events per POST when using --send-url. Default: 100
  --concurrency <n>        Number of batches to POST in parallel. Default: 1
  --max-retries <n>        Batch POST retry attempts on transient HTTP/network failures. Default: 5
  --resume-file <file>     Append-only JSONL of enqueued page paths; skipped on restart
                           so an interrupted run does not re-enqueue them.
  --force-full-reindex     Ignore any previous manifest and send every page as docs.page.changed
                           (full re-index). Use to rebuild the index from scratch. Without it, a
                           run with no previous manifest baselines (sends nothing).
  --commit                 Save the latest manifest as the new previous manifest after a successful send/diff.
  --help                   Show this help.
`);
}
