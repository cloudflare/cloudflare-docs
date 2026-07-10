// AI coding agents shown on the landing page, plus the prompt they copy.

export const AGENT_SETUP_PROMPT =
	"Fetch https://developers.cloudflare.com/agent-setup/prompt.md";

// Each id maps to /icons/agents/{id}/{light,dark}.svg.
export const AGENTS = [
	{ id: "claude", label: "Claude Code", href: "/agent-setup/claude-code/" },
	{ id: "codex", label: "Codex", href: "/agent-setup/codex/" },
	{ id: "cursor", label: "Cursor", href: "/agent-setup/cursor/" },
	{ id: "opencode", label: "OpenCode", href: "/agent-setup/opencode/" },
	{
		id: "copilot",
		label: "GitHub Copilot",
		href: "/agent-setup/github-copilot/",
	},
	{ id: "windsurf", label: "Windsurf", href: "/agent-setup/windsurf/" },
] as const;

export type AgentId = (typeof AGENTS)[number]["id"];
