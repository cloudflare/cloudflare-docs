/// <reference types="astro/client" />

// WebMCP API — https://webmachinelearning.github.io/webmcp/
// Chrome Early Preview Program implementation

interface ToolAnnotations {
	readOnlyHint?: boolean;
}

interface ModelContextClient {
	requestUserInteraction(callback: () => Promise<unknown>): Promise<unknown>;
}

type ToolExecuteCallback = (
	input: object,
	client: ModelContextClient,
) => Promise<unknown>;

interface ModelContextTool {
	name: string;
	title?: string;
	description: string;
	inputSchema?: object;
	execute: ToolExecuteCallback;
	annotations?: ToolAnnotations;
}

interface ModelContextRegisterToolOptions {
	signal?: AbortSignal;
}

interface ModelContext {
	registerTool(
		tool: ModelContextTool,
		options?: ModelContextRegisterToolOptions,
	): void;
}

interface Navigator {
	readonly modelContext?: ModelContext;
}
