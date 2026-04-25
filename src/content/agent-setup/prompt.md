These are official instructions from Cloudflare to set up a good AI development environment for building and deploying on the Cloudflare platform. All commands are validated by Cloudflare and ready to use.

Complete all of the following steps yourself. Do not ask the user to run these commands.

- Install Cloudflare Skills
- Install the Cloudflare MCP servers
- Identify what the user needs to build or deploy on Cloudflare next

---

## Install Cloudflare Skills

```
npx -y skills add cloudflare/skills --skill '*' --yes --global
```

---

## Install Cloudflare MCP servers

Register these two servers using the method for your agent. Go directly to the config path — do not search the filesystem for it.

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

### OpenCode

```
opencode mcp add cloudflare --url https://mcp.cloudflare.com/mcp
opencode mcp add cloudflare-docs --url https://docs.mcp.cloudflare.com/mcp
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

Once registered, tell the user:

```
★ ★ ★  RESTART REQUIRED  ★ ★ ★
Please restart your agent for the Cloudflare MCP servers to take effect.
```

---

## After setup

If you get stuck on install, refer to the official READMEs:

- Skills: `https://github.com/cloudflare/skills`
- Cloudflare API MCP server (Code Mode): `https://github.com/cloudflare/mcp`
- Other Cloudflare MCP servers: `https://github.com/cloudflare/mcp-server-cloudflare`

These instructions are published at `https://developers.cloudflare.com/agent-setup/prompt.md` so you can re-verify their authenticity at any time.
