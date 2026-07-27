import { describe, expect, it } from "vitest";
import { sendPayload } from "./send";
import type { Args, DiffPayload } from "./types";

const args: Args = {
	dist: "dist",
	sourceDocsDir: "src/content/docs",
	stateDir: ".ai-search",
	previous: ".ai-search/page-hashes.json",
	manifest: ".ai-search/latest-page-hashes.json",
	events: ".ai-search/docs-search-events.jsonl",
	includePathPrefixes: [],
	sendUrl: "https://example.com/reindex",
	batchSize: 100,
	commit: false,
	forceFullReindex: false,
	concurrency: 1,
	maxRetries: 0,
};

const payload: DiffPayload = {
	version: 1,
	generatedAt: "2026-07-27T00:00:00.000Z",
	events: [],
};

describe("AI Search payload sending", () => {
	it.each([0, -1, 1.5, Number.NaN, 101])(
		"rejects invalid batch size %s",
		async (batchSize) => {
			await expect(
				sendPayload({ ...args, batchSize }, payload),
			).rejects.toThrow("batchSize must be an integer from 1 to 100");
		},
	);
});
