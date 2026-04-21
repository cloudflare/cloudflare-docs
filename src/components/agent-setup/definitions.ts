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
