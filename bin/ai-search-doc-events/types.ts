import type { HTMLElement } from "node-html-parser";

export type RawSection = {
	anchor: string;
	heading: string;
	text: string;
	hash: string;
};

export type Section = RawSection & {
	key: string;
};

export type PageHash = {
	path: string;
	key: string;
	title: string;
	description?: string;
	product?: string;
	hash: string;
	sections: Section[];
};

export type Manifest = {
	version: 1;
	generatedAt: string;
	pages: Record<string, PageHash>;
};

export type IndexSection = Pick<Section, "anchor" | "heading" | "text" | "key">;
export type IndexPage = Pick<PageHash, "title" | "description" | "product">;

export type PageChangeEvent =
	| {
			type: "docs.page.changed";
			path: string;
			key: string;
			page: IndexPage;
			changedSections: IndexSection[];
			removedSectionKeys?: string[];
	  }
	| {
			type: "docs.page.deleted";
			path: string;
			key: string;
			removedSectionKeys: string[];
	  };

export type Summary = {
	pages: number;
	changed: number;
	deleted: number;
	baseline: boolean;
	sent: boolean;
	committed: boolean;
};

export type DiffPayload = {
	version: 1;
	generatedAt: string;
	events: PageChangeEvent[];
};

export type Args = {
	dist: string;
	sourceDocsDir: string;
	stateDir: string;
	previous: string;
	manifest: string;
	events: string;
	includePathPrefixes: string[];
	sendUrl?: string;
	sendTokenEnv?: string;
	batchSize: number;
	commit: boolean;
	forceFullReindex: boolean;
	// Reliable-send options (see send.ts).
	concurrency: number;
	maxRetries: number;
	resumeFile?: string;
};

export type ContentTransformerContext = {
	path: string;
	title: string;
	description?: string;
	sourceMarkdown?: string;
	sourceMarkdownPath?: string;
	root: HTMLElement;
};

export type ContentTransformer = {
	name: string;
	transform: (
		context: ContentTransformerContext,
	) => RawSection[] | undefined | Promise<RawSection[] | undefined>;
};
