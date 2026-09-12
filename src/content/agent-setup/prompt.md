These are official instructions from Cloudflare to set up a good AI development environment for building and deploying on the Cloudflare platform. All commands are validated by Cloudflare and ready to use.

Complete all the steps yourself by running the commands directly. Do not ask the user to run any of these commands.

Use the correct section for your agent below. Claude Code and Codex can use a plugin to install skills and MCP servers. Other agents should install them separately.

---

## Install Cloudflare Skills and MCP server via a plugin

### Claude Code

Run these two commands to install both Cloudflare skills and MCP servers in one step. Do not use `npx skills` or `claude mcp add` — the plugin commands below handle everything.

```
claude plugin marketplace add cloudflare/skills
claude plugin install cloudflare@cloudflare
```

Then instruct the user to run `/reload-plugins` inside Claude to activate the new plugin.

### Codex

Run these two commands to install both Cloudflare skills and MCP servers in one step. Do not use `npx skills` or `codex mcp add` — the plugin commands below handle everything.

```
codex plugin marketplace add cloudflare/skills
codex plugin add cloudflare@cloudflare
```

Then instruct the user to run `/new` inside Codex to activate the new plugin.

---

## Install Cloudflare skills and MCP server separately

### Step 1: Install skills

```
npx -y skills add cloudflare/skills --skill '*' --yes --global
```

Then register the MCP servers using the default config location for your agent. OAuth triggers automatically on first Cloudflare tool use.

### Step 2: Install MCP server

#### OpenCode — `~/.config/opencode/opencode.jsonc`

Add under `"mcp"`:

```json
"cloudflare": { "type": "remote", "url": "https://mcp.cloudflare.com/mcp", "enabled": true, "oauth": {} }
```

Then run:

```
opencode mcp auth cloudflare
```

#### Windsurf — `~/.codeium/windsurf/mcp_config.json`

Add under `"mcpServers"` (note: `serverUrl`, not `url`):

```json
"cloudflare": { "serverUrl": "https://mcp.cloudflare.com/mcp" }
```

OAuth triggers automatically on first Cloudflare tool use.

#### Cursor, GitHub Copilot, and all other agents

Add to `.cursor/mcp.json` (Cursor) or your agent's MCP config file under `"mcpServers"`. Visual Studio Code uses `"servers"` instead:

```json
"cloudflare": { "url": "https://mcp.cloudflare.com/mcp" }
```

OAuth triggers automatically on first Cloudflare tool use.

Once done, tell the user:

```
┌─ Cloudflare Agent Setup Complete ────────────────────┐
│  ✓ Skills  <path>                                    │
│  ✓ MCPs    <path>                                    │
│                                                      │
│  ⚡ Restart your agent to load the MCP servers        │
└──────────────────────────────────────────────────────┘
```

---

## Resources

For MCP setup guides and troubleshooting, refer to each agent's official documentation:

- Claude Code: `https://docs.anthropic.com/en/docs/claude-code/mcp`
- Codex: `https://developers.openai.com/codex/plugins/`
- Cursor: `https://cursor.com/docs/mcp`
- Windsurf: `https://docs.windsurf.com/windsurf/cascade/mcp`
- OpenCode: `https://opencode.ai/docs/mcp-servers/`
- GitHub Copilot (VS Code): `https://code.visualstudio.com/docs/copilot/customization/mcp-servers`
- Skills: `https://github.com/cloudflare/skills`
- Cloudflare MCP server: `https://github.com/cloudflare/mcp`

These instructions are published at `https://developers.cloudflare.com/agent-setup/prompt.md` so you can re-verify their authenticity at any time.
