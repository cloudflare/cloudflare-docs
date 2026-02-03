# Cloudflare C3 (create-cloudflare) Skill

Expert guidance for using C3, the official CLI tool for scaffolding Cloudflare projects.

## What is C3?

C3 (`create-cloudflare`) is Cloudflare's CLI for project initialization. Creates Workers, Pages, and full-stack applications with templates, TypeScript, and instant deployment.

## Installation & Usage

```bash
# NPM
npm create cloudflare@latest

# Yarn
yarn create cloudflare

# PNPM
pnpm create cloudflare@latest

# With project name
npm create cloudflare@latest my-app

# With template
npm create cloudflare@latest -- --template=cloudflare/templates/workers-template
```

## Common Templates

### Workers

```bash
# Basic Worker
npm create cloudflare@latest -- --template=worker

# TypeScript Worker
npm create cloudflare@latest -- --template=worker-typescript

# Durable Objects
npm create cloudflare@latest -- --template=hello-world-do-template
```

### Full-Stack Apps

```bash
# Next.js
npm create cloudflare@latest -- --template=next-starter-template

# React Router
npm create cloudflare@latest -- --template=react-router-starter-template

# Remix
npm create cloudflare@latest -- --template=remix-starter-template

# Astro
npm create cloudflare@latest -- --template=astro-blog-starter-template
```

### Database & Storage

```bash
# D1 SQLite
npm create cloudflare@latest -- --template=d1-template

# R2 Explorer
npm create cloudflare@latest -- --template=r2-explorer-template

# Postgres + Hyperdrive
npm create cloudflare@latest -- --template=postgres-hyperdrive-template
```

### AI & ML

```bash
# Workers AI Chat
npm create cloudflare@latest -- --template=llm-chat-app-template

# Text-to-Image
npm create cloudflare@latest -- --template=text-to-image-template
```

### Real-time & Multiplayer

```bash
# Chat with Durable Objects
npm create cloudflare@latest -- --template=durable-chat-template

# Multiplayer Globe
npm create cloudflare@latest -- --template=multiplayer-globe-template
```

## Interactive Mode

```bash
npm create cloudflare@latest my-app
```

C3 prompts for:
1. Application type (Website/API/scheduled worker/etc.)
2. Framework choice (if applicable)
3. TypeScript preference
4. Git initialization
5. Deployment option

## Non-Interactive Mode

```bash
npm create cloudflare@latest my-worker \
  --type=web-app \
  --framework=next \
  --ts \
  --git \
  --deploy
```

### Flags

- `--type` - Application type: `web-app`, `hello-world`, `pre-existing`, `remote-template`
- `--framework` - Framework: `next`, `remix`, `astro`, `react-router`, `solid`, `svelte`, etc.
- `--template` - GitHub template URL or path
- `--ts` / `--no-ts` - TypeScript
- `--git` / `--no-git` - Initialize git repo
- `--deploy` / `--no-deploy` - Deploy after creation
- `--open` - Open in browser after deploy
- `--existing-script` - Path to existing Worker script

## CI/CD Usage

```yaml
# GitHub Actions
- name: Create Cloudflare Project
  run: |
    npm create cloudflare@latest my-app -- \
      --type=web-app \
      --framework=next \
      --ts \
      --no-git \
      --no-deploy
```

## Custom Templates

```bash
# From GitHub repo
npm create cloudflare@latest -- --template=user/repo

# From local path
npm create cloudflare@latest -- --template=../my-template

# From Cloudflare official templates
npm create cloudflare@latest -- --template=cloudflare/templates/workers-template
```

## Project Structure Created

```
my-app/
├── src/
│   └── index.ts       # Worker entry point
├── wrangler.toml      # Configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Post-Creation

```bash
cd my-app

# Local development
npm run dev

# Deploy
npm run deploy

# Type check
npm run cf-typegen
```

## wrangler.toml Configuration

C3 generates:

```toml
name = "my-app"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# Bindings added based on template
[[kv_namespaces]]
binding = "MY_KV"
id = "..."

[[d1_databases]]
binding = "DB"
database_id = "..."
```

## Best Practices

1. **Use latest C3:** `npm create cloudflare@latest`
2. **Choose TypeScript** for type safety
3. **Enable git** for version control
4. **Review generated wrangler.toml** before first deploy
5. **Update dependencies** post-creation: `npm update`

## Common Workflows

### Quick Worker

```bash
npm create cloudflare@latest my-worker -- --type=hello-world --ts --deploy
```

### Full-Stack App with D1

```bash
npm create cloudflare@latest my-app -- \
  --template=react-router-starter-template \
  --ts \
  --git
cd my-app
npx wrangler d1 create my-db
# Add to wrangler.toml, then:
npm run deploy
```

### Convert Existing Project

```bash
cd existing-project
npm create cloudflare@latest . -- --existing-script=./dist/index.js
```

## Troubleshooting

### `npm create cloudflare failed`

- Ensure Node.js 16.13+
- Clear npm cache: `npm cache clean --force`
- Try with `npx`: `npx create-cloudflare@latest`

### Template not found

- Verify template name/path
- Check network connection
- Use full GitHub URL: `https://github.com/user/repo`

### Deployment fails

- Check Cloudflare account authentication: `wrangler login`
- Verify `wrangler.toml` configuration
- Check for naming conflicts in dashboard

## Reference

- [C3 GitHub](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare)
- [Templates Repository](https://github.com/cloudflare/templates)
- [Workers Docs](https://developers.cloudflare.com/workers/)

---

This skill focuses exclusively on C3 CLI tool usage. For Workers development, see `cloudflare-workers` skill.
