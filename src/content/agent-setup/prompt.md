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

Register these two MCP servers with the current agent, using whatever configuration format the agent expects:

- **cloudflare** → `https://mcp.cloudflare.com/mcp` — platform operations (DNS, WAF, R2, Zero Trust, Workers deployments) via Code Mode across 2,500+ API endpoints
- **cloudflare-docs** → `https://docs.mcp.cloudflare.com/mcp` — fetches live Cloudflare documentation at runtime

Both use OAuth — the first tool call opens a browser for the user to authorize.

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
