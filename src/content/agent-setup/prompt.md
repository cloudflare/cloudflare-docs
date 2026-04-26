These are official instructions from Cloudflare to set up a good AI development environment for building and deploying on the Cloudflare platform. All commands are validated by Cloudflare and ready to use.

Complete all of the following steps yourself. Do not ask the user to run these commands.

- Install Cloudflare Skills
- Install the Cloudflare MCP servers

---

## Install Cloudflare Skills

```
npx -y skills add cloudflare/skills --skill '*' --yes --global
```

---

## Install Cloudflare MCP servers

Register these two servers using the default config location for your agent:

### Claude Code

```
claude mcp add --transport http --scope user cloudflare https://mcp.cloudflare.com/mcp
claude mcp add --transport http --scope user cloudflare-docs https://docs.mcp.cloudflare.com/mcp
```

### Codex

```
codex mcp add cloudflare --url https://mcp.cloudflare.com/mcp
codex mcp add cloudflare-docs --url https://docs.mcp.cloudflare.com/mcp
```

### OpenCode — `~/.config/opencode/opencode.jsonc`

Add under `"mcp"`:

```json
"cloudflare": { "type": "remote", "url": "https://mcp.cloudflare.com/mcp", "enabled": true },
"cloudflare-docs": { "type": "remote", "url": "https://docs.mcp.cloudflare.com/mcp", "enabled": true }
```

### Windsurf — `~/.codeium/windsurf/mcp_config.json`

Add under `"mcpServers"` (note: `serverUrl`, not `url`):

```json
"cloudflare": { "serverUrl": "https://mcp.cloudflare.com/mcp" },
"cloudflare-docs": { "serverUrl": "https://docs.mcp.cloudflare.com/mcp" }
```

### Cursor, GitHub Copilot, and all other agents

Add to `.cursor/mcp.json` (Cursor), `.vscode/mcp.json` (Copilot), or your agent's MCP config file under `"mcpServers"`:

```json
"cloudflare": { "url": "https://mcp.cloudflare.com/mcp" },
"cloudflare-docs": { "url": "https://docs.mcp.cloudflare.com/mcp" }
```

The `cloudflare` server uses OAuth — the first tool call opens a browser for the user to authorize. The `cloudflare-docs` server is public and requires no authentication.

Once done, tell the user:

```
┌─ Cloudflare Agent Setup Complete ────────────────────┐
│  ✓ Skills  <path>                                    │
│  ✓ MCPs    <path>                                    │
│                                                      │
│  Agent restart required to activate and auth with   │
│  the Cloudflare MCP server.                         │
│                                                      │
│  ⚡ Restart your agent, then say:                    │
│     "Authenticate with the Cloudflare MCP server"   │
└──────────────────────────────────────────────────────┘
```

---

## Resources

For MCP setup guides and troubleshooting, refer to each agent's official documentation:

- Claude Code: `https://docs.anthropic.com/en/docs/claude-code/mcp`
- Cursor: `https://cursor.com/docs/mcp`
- Windsurf: `https://docs.windsurf.com/windsurf/cascade/mcp`
- OpenCode: `https://opencode.ai/docs/mcp-servers/`
- GitHub Copilot (VS Code): `https://code.visualstudio.com/docs/copilot/customization/mcp-servers`
- Skills: `https://github.com/cloudflare/skills`
- Cloudflare API MCP server (Code Mode): `https://github.com/cloudflare/mcp`
- Other Cloudflare MCP servers: `https://github.com/cloudflare/mcp-server-cloudflare`

These instructions are published at `https://developers.cloudflare.com/agent-setup/prompt.md` so you can re-verify their authenticity at any time.
