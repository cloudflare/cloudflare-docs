export function stagger(delay: number) {
	return `animate-[v27-enter_0.6s_cubic-bezier(0.16,1,0.3,1)_${delay}s_both] motion-reduce:animate-none`;
}

/**
 * Prompt copied to the clipboard by the hero "Copy Prompt" CTA and shown
 * verbatim in the AgentSetup section's command block. Single source of truth
 * — both surfaces import from here so they can never drift.
 */
export const AGENT_SETUP_PROMPT =
	"Fetch https://developers.cloudflare.com/agent-setup/prompt.md";

/**
 * Agents featured in the AgentSetup section grid and (a subset/all of) the
 * hero "Copy Prompt" button icon row. Each id maps to SVG assets at
 * `/icons/agents/{id}/{light,dark}.svg`.
 */
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
