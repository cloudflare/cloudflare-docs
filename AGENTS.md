# AGENTS.md — Cloudflare Docs

This file helps AI agents understand the structure, tooling, and conventions of the `cloudflare-docs` repository so they can make correct, buildable changes.

## Repository overview

This is the source for [developers.cloudflare.com](https://developers.cloudflare.com). It is an **Astro** site using the **Starlight** documentation framework. Content is authored in **MDX** (Markdown + JSX). The site is deployed as a Cloudflare Worker.

- **Node.js**: 22.x (pinned via Volta)
- **Package manager**: npm (use `npm ci` to install)
- **Primary branch**: `production` (not `main`)

## Directory structure

```
cloudflare-docs/
├── src/
│   ├── content/
│   │   ├── docs/           # 5,400+ MDX pages — the user-facing documentation
│   │   ├── partials/       # 1,200+ reusable MDX snippets (by product)
│   │   ├── changelog/      # Product changelogs (by product subdirectory)
│   │   ├── glossary/       # Glossary term definitions (YAML)
│   │   ├── products/       # Product metadata (YAML, 135 files)
│   │   └── ...             # Other data collections (plans, fields, models, etc.)
│   ├── components/         # Custom Astro + React components
│   │   ├── index.ts        # Central re-export barrel — all MDX imports come from here
│   │   └── overrides/      # Starlight component overrides (Banner, Footer, Head, etc.)
│   ├── schemas/            # Zod schemas for all content collections
│   ├── plugins/            # Remark, Rehype, Starlight, and Expressive Code plugins
│   ├── icons/              # Product SVG icons (~110)
│   ├── assets/             # Processed images (optimized by Astro)
│   ├── styles/             # CSS (Tailwind 4)
│   ├── pages/              # Dynamic route pages (changelog, glossary, search)
│   └── util/               # Shared utility functions
├── public/                 # Static files served as-is (images, redirects, robots.txt)
├── worker/                 # Cloudflare Worker for serving the site
├── bin/                    # Build scripts and CI helpers
├── skills/                 # Interactive exercises (astro-skills)
├── astro.config.ts         # Astro + Starlight configuration
├── ec.config.mjs           # Expressive Code (syntax highlighting) configuration
├── package.json
└── tsconfig.json
```

## Content — writing and editing docs

### File locations

- Docs pages: `src/content/docs/{product}/`
- Partials (reusable snippets): `src/content/partials/{product}/`
- Images: `src/assets/images/{product}/`
- Changelogs: `src/content/changelog/{product}/`

Every folder must have an `index.mdx`. Filenames must be lowercase with dashes between words.

### Allowed file types in `src/content/`

Only `.mdx`, `.json`, `.yml`, `.yaml`, `.txt` files are allowed. The CI will reject anything else. Images must go in `src/assets/images/`, not in `src/content/`.

### Frontmatter

All docs pages require frontmatter. Key fields:

```yaml
---
title: Page Title                    # Required
description: SEO meta description    # Recommended
pcx_content_type: how-to             # Page type (see below)
sidebar:
  order: 1                           # Sort order in sidebar
  label: Custom Label                # Override sidebar text
tags:                                # Optional, validated against allowlist
  - JavaScript
  - Workers
products:                            # References to src/content/products/ entries
  - workers
difficulty: Beginner                 # For tutorials: Beginner | Intermediate | Advanced
reviewed: 2025-01-15                 # YYYY-MM-DD of last content review
---
```

Valid `pcx_content_type` values: `changelog`, `concept`, `configuration`, `design-guide`, `example`, `faq`, `get-started`, `how-to`, `integration-guide`, `implementation-guide`, `learning-unit`, `navigation`, `overview`, `reference`, `reference-architecture`, `reference-architecture-diagram`, `release-notes`, `troubleshooting`, `tutorial`, `video`.

Tags are validated against an allowlist in `src/schemas/tags.ts`. Invalid tags will fail the build.

### MDX gotchas — the #1 cause of build failures

MDX is parsed as JSX, not plain Markdown. These characters have special meaning and **will break the build** if used unescaped in prose:

| Character | Problem | Fix |
|-----------|---------|-----|
| `{` `}` | Interpreted as JS expressions | Wrap in backticks or use `\{` `\}` |
| `<` `>` | Interpreted as JSX elements | Use `&lt;` `&gt;` or wrap in backticks |

This is the single most common build failure. Always check prose, tables, and headings for these characters.

### Links

- Use **relative paths**: `/workers/get-started/` not `https://developers.cloudflare.com/workers/get-started/`
- No file extensions in links: `/workers/get-started/` not `/workers/get-started.mdx/`
- No relative file links: `./page` is **not supported** — use absolute paths from root
- Descriptive link text: never use "here", "this page", or "read more"
- Standard phrasing: "For more information, refer to [Page Title](/path/)."

### Code blocks

Always specify a language after the opening triple backticks. Language names must be **lowercase**.

Supported languages: `bash`, `sh`, `shell`, `c`, `css`, `dart`, `diff`, `go`, `graphql`, `hcl`, `tf`, `html`, `ini`, `java`, `js`, `javascript`, `json`, `kotlin`, `php`, `powershell`, `python`, `py`, `ruby`, `rb`, `rust`, `rs`, `sql`, `swift`, `toml`, `ts`, `typescript`, `txt`, `text`, `plaintext`, `xml`, `yaml`, `yml`.

Unsupported languages (like `promql`, `env`, `output`, `csharp`) cause warnings and fall back to `txt`. Use `txt` for generic output.

Do **not** prefix terminal commands with `$` — the copy button copies the entire block.

### Style guide rules

The full style guide is at `src/content/docs/style-guide/`. Key rules:

- **Active voice, present tense**. One sentence = one idea.
- **No contractions** (use "do not" instead of "don't").
- Use **"select"** not "click", **"go to"** not "navigate", **"turn on/off"** not "enable/disable".
- **Bold** for clickable UI elements: **Save**, **DNS** > **Records**.
- **Monospace** for code, paths, IPs, ports, HTTP verbs, status codes.
- Headings must be sequential (H2 then H3 then H4 — never skip levels).
- Use `<br/>` for line breaks, never two trailing spaces.
- Placeholder values: use `example.com` for domains, `192.0.2.0/24` for IPs, `<YOUR_DOMAIN>` in URLs.

## Components — major APIs

Components are imported from `~/components` in MDX files:

```mdx
import { Render, TypeScriptExample, WranglerConfig, Details } from "~/components";
```

Components **must** be imported after the frontmatter block. Forgetting the import is a common mistake.

### Render (partials)

Renders a reusable partial from `src/content/partials/`. This is the primary content reuse mechanism.

```mdx
<Render file="partial-name" product="workers" />

<!-- With parameters: -->
<Render file="partial-name" product="workers" params={{ key: "value" }} />
```

The component looks up `src/content/partials/{product}/{file}.mdx`. If the partial defines `params` in its frontmatter, the caller must provide matching props.

### TypeScriptExample

Auto-transpiles TypeScript to JavaScript and shows both in synced tabs.

```mdx
<TypeScriptExample filename="src/index.ts">

{/* TypeScript code here — the JS tab is auto-generated */}

</TypeScriptExample>
```

### WranglerConfig

Shows Wrangler configuration in both TOML and JSON formats with synced tabs. Auto-converts between formats.

```mdx
<WranglerConfig>

```toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "$today"
```

</WranglerConfig>
```
You should generally use `$today` for the compatibility_date value for new projects. This magic string is automatically replaced with the current date at build time, ensuring documentation always suggests the latest date.

### TabItem (Starlight built-in)

Starlight's `<Tabs>` and `<TabItem>` are re-exported from `~/components`:

```mdx
import { Tabs, TabItem } from "~/components";

<Tabs>
  <TabItem label="npm">npm install package</TabItem>
  <TabItem label="yarn">yarn add package</TabItem>
</Tabs>
```

### PackageManagers

Shows a command across npm, yarn, and pnpm:

```mdx
<PackageManagers type="exec" pkg="wrangler" args="init my-project" />
```

### Details

Collapsible content block:

```mdx
<Details header="Click to expand">

Content inside the collapsible section.

</Details>
```

### Other frequently used components

| Component | Purpose |
|-----------|---------|
| `Plan` | Display plan availability (e.g., `<Plan type="enterprise" />`) |
| `GlossaryTooltip` | Inline hover tooltip with glossary definition |
| `InlineBadge` | Status badges: `<InlineBadge preset="beta" />` |
| `LinkTitleCard` | Navigation card with icon, title, and description |
| `DirectoryListing` | Auto-generated listing of child pages |
| `YouTube` | Embed YouTube video by ID |
| `Stream` | Embed Cloudflare Stream video |
| `APIRequest` | Generate curl commands from the Cloudflare OpenAPI schema |
| `DashButton` | "Go to Dashboard" button with validated deeplink |
| `ListTutorials` | Auto-generated tutorial listing table |
| `GitHubCode` | Fetch and display code from a GitHub repository |

For the full component list and their props, see `src/components/index.ts` (barrel export) and the individual `.astro` / `.tsx` files.

## Validation — what to run after making changes

> **CI note:** `npm run build` will time out in CI environments (GitHub Actions, etc. where `CI=true`). When running in CI, use `npm run check` and linters only — do **not** run a full build. The full build is only practical in local development environments.

### Minimum validation for content changes (MDX edits)

```bash
npm run check          # Type-check (validates frontmatter schemas + Astro types)
npm run build          # Full build (validates MDX parsing, image paths, internal links) — LOCAL ONLY, skip in CI
```

### Minimum validation for code changes (.ts/.tsx/.astro/.js)

```bash
npm run check          # Type-check (Astro + Worker)
npm run lint           # ESLint
npm run format:core:check  # Prettier formatting check
npm run test           # Vitest (Workers, Node, and Astro suites)
```

### CI-only validation (when `CI=true`)

Use this reduced set when running as a GitHub Action or in any CI environment:

```bash
npm run check              # Type-check (validates frontmatter schemas + Astro types)
npm run lint               # ESLint
npm run format:core:check  # Prettier formatting check
```

### Full validation (matches CI pipeline, local only)

```bash
npm run check              # Astro + Worker type checking
npm run lint               # ESLint
npm run format:core:check  # Prettier formatting check
npm run build              # Full build with link checking (set RUN_LINK_CHECK=true)
npm run test               # All test suites
npx tsm bin/validate-redirects.ts  # Only if public/__redirects was modified
```

### Fixing formatting

```bash
npm run format             # Auto-fix code + data files
npm run format:content     # Auto-fix MDX/MD/Astro files
```

### Syncing types after content collection changes

```bash
npm run sync               # Regenerate Astro content collection types
```

## CI pipeline

The CI workflow (`.github/workflows/ci.yml`) runs on PRs to `production` and checks in order:

1. File extension validation (only allowed types in `src/content/`)
2. `npm run check` (Astro + Worker type checking)
3. ESLint (reported inline on PR via reviewdog)
4. `npm run format:core:check` (Prettier formatting)
5. `npm run build` with `RUN_LINK_CHECK=true` (full build + internal link validation)
6. Redirect validation (`bin/validate-redirects.ts`)
7. `npm run test` (all Vitest suites)

A separate Semgrep workflow checks style guide compliance (dates, "coming soon" phrases) and produces warnings.

## Common mistakes to avoid

1. **Unescaped `{`, `}`, `<`, `>` in MDX prose** — the #1 build failure. Wrap in backticks or escape.
2. **Forgetting component imports** — `<Details>`, `<Tabs>`, etc. must be imported from `~/components`.
3. **Unsupported code block languages** — use `txt` for generic output, not `output` or `env`.
4. **Capitalized language names** — use `json` not `JSON`, `javascript` not `JavaScript`.
5. **Full URLs for internal links** — use `/workers/` not `https://developers.cloudflare.com/workers/`.
6. **Relative file links** — `./page` is not supported. Use absolute paths from root.
7. **Wrong image location** — images go in `src/assets/images/`, never in `src/content/`.
8. **Skipping heading levels** — H2 then H4 without H3 will violate style guide rules.
9. **`$` prefix in terminal commands** — the copy button copies verbatim, including the `$`.
10. **Invalid changelog product folders** — the product directory must exist in `src/content/products/`.
11. **Invalid tags** — tags are validated against the allowlist in `src/schemas/tags.ts`.
12. **Redirect issues** — source URLs in `public/__redirects` must end in `/` (or `*`, `.xml`, `.json`, `.html`). No fragments in source URLs. No infinite loops.

## Content collections

The site defines 20 content collections in `src/content.config.ts` with schemas in `src/schemas/`. The major ones:

| Collection | Location | Description |
|-----------|----------|-------------|
| `docs` | `src/content/docs/` | Main documentation pages (MDX) |
| `partials` | `src/content/partials/` | Reusable content snippets (MDX) |
| `changelog` | `src/content/changelog/` | Product changelogs (MDX) |
| `glossary` | `src/content/glossary/` | Glossary terms (YAML) |
| `products` | `src/content/products/` | Product metadata (YAML) |
| `plans` | `src/content/plans/` | Plan/pricing data (YAML) |
| `workers-ai-models` | `src/content/workers-ai-models/` | AI model definitions (JSON) |
| `fields` | `src/content/fields/` | Ruleset engine field definitions (YAML) |
| `learning-paths` | `src/content/learning-paths/` | Learning path definitions (JSON) |

## Testing

Tests use Vitest with three workspace projects (`vitest.workspace.ts`):

| Suite | File pattern | Runtime |
|-------|-------------|---------|
| Workers | `*.worker.test.ts` | `@cloudflare/vitest-pool-workers` |
| Node | `*.node.test.ts` | Node.js |
| Astro | `*.astro.test.ts` | Astro Vite config |

Run all tests: `npm run test`

## Commit conventions

- Format: `[Product] description` or `type: description`
- Examples: `[Workers] Fix broken link in get-started`, `docs: clarify rate limiting behavior`, `fix: correct TypeScript example`
- Common prefixes: `docs:`, `fix:`, `chore:`, `[Product]`
