// Centralized tooltip copy and display labels for agent capabilities and
// comparison-table tokens. Single source of truth — reused by card badges and
// table cell badges.

export const capabilityDefinitions = {
	// Card badges / workflow filters
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

	// Pricing (comparison table)
	subscription:
		"Fixed recurring fee. Usage is typically unlimited or generous within the plan.",
	byok: "Bring your own API key. The tool is free; you pay your model provider directly.",
	hybrid:
		"Combines multiple pricing options — for example a free subscription tier plus BYOK.",

	// Model flexibility (comparison table)
	locked:
		"Tied to a single model provider. No choice of which foundation model to use.",
	multi_provider:
		"Supports multiple model providers out of the box (OpenAI, Anthropic, Google, local models, etc.).",

	// Context approach (comparison table)
	session:
		"Context is limited to the current conversation. No memory between runs.",
	project_memory:
		"Retains context about your project — configuration files, past conversations, preferences.",
	indexed_codebase:
		"Builds a semantic index of your whole codebase so the agent can reference any file.",
} as const;

export type CapabilityKey = keyof typeof capabilityDefinitions;

// Display labels for each token.
export const capabilityLabels: Record<CapabilityKey, string> = {
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
