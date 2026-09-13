import type { ReviewChunkInput } from "../agents/review-chunk";

/** Preserve the existing quality cases while exercising the new chunk agent. */
export interface ReviewFixture {
	pullRequest: { number: number; title: string; base: string; head: string };
	headSha: string;
	filename: string;
	addedLines: { line: number; content: string }[];
	fileContent?: string;
	repoAgentsMd?: string;
}

export function reviewChunkFixture(value: unknown): ReviewChunkInput {
	const fixture = value as ReviewFixture;
	const added = new Map(
		fixture.addedLines.map((line) => [line.line, line.content]),
	);
	const patch = fixture.fileContent
		? fixture.fileContent
				.split("\n")
				.map(
					(content, index) =>
						`${added.has(index + 1) ? "+" : " "} base:- head:${index + 1} ${content}`,
				)
				.join("\n")
		: fixture.addedLines
				.map(({ line, content }) => `+ base:- head:${line} ${content}`)
				.join("\n");
	return {
		job: {
			number: fixture.pullRequest.number,
			runId: "eval",
			headSha: fixture.headSha,
			baseSha: "production",
			baseRef: "production",
			title: fixture.pullRequest.title,
			body: "",
			author: "doc-author",
			moderate: false,
		},
		unit: {
			index: 0,
			filename: fixture.filename,
			status: "M",
			style: fixture.filename.endsWith(".mdx"),
			patch,
			headLines: [...added.keys()],
			baseLines: [],
		},
		repoInstructions: fixture.repoAgentsMd ?? "",
		comparisonBaseSha: "production",
		mergeBaseSha: "production",
	};
}
