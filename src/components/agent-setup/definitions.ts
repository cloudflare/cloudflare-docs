// Centralized tooltip copy and display labels for agent capability badges.

export const capabilityDefinitions = {
	terminal:
		"Runs as a command-line tool. Great for scripting, automation, and CI pipelines.",
	ide: "A full code editor with AI built in. Visual diffs, inline suggestions, multi-file edits.",
	cloud:
		"Runs on hosted infrastructure. Accessible from anywhere, good for async long-running tasks.",
	extension:
		"Add-on that plugs into an existing editor. Lightweight install, inherits the editor's features.",
	standalone:
		"Can run on its own without embedding in an editor or extension host.",
	open_source: "Source code is openly licensed and available on GitHub.",
} as const;

export type CapabilityKey = keyof typeof capabilityDefinitions;

export const capabilityTooltips: Record<string, string> = {
	subscription: "Fixed recurring fee billed monthly or annually.",
	byok: "Bring Your Own Key — the tool is free; you pay your model provider directly.",
	hybrid:
		"Combines multiple pricing models, for example a free tier plus BYOK.",
	locked: "Models from other providers are not supported.",
	multi_provider:
		"Supports multiple model providers out of the box (OpenAI, Anthropic, Google, local models, etc.).",
	session:
		"Context is limited to the current conversation. No memory between runs.",
	project_memory:
		"Retains context about your project across runs — configuration files, past conversations, preferences.",
	indexed_codebase:
		"Builds a semantic index of your whole codebase so the agent can reference any file.",
};

export const capabilityLabels: Record<string, string> = {
	terminal: "Terminal",
	ide: "IDE",
	cloud: "Cloud",
	extension: "Extension",
	standalone: "Standalone",
	open_source: "Open Source",
	subscription: "Subscription",
	byok: "BYOK",
	hybrid: "Hybrid",
	locked: "Locked",
	multi_provider: "Multi-provider",
	session: "Session",
	project_memory: "Project memory",
	indexed_codebase: "Indexed codebase",
};
