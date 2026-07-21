# AGENTS.md — Cloudflare Docs

This file helps AI agents understand the structure, tooling, and conventions of the `cloudflare-docs` repository so they can make correct, buildable changes.

## Repository overview

This is the source for [developers.cloudflare.com](https://developers.cloudflare.com). It is an **Astro** site using the **Starlight** documentation framework. Content is authored in **MDX** (Markdown + JSX). The site is deployed as a Cloudflare Worker.

- **Node.js**: 24.x
- **Package manager**: pnpm (use `pnpm install --frozen-lockfile` to install)
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
│   └── fetch-skills.ts     # Downloads skills.tar.gz from middlecache, extracts to skills/
├── skills/                 # Agent Skills served at /.well-known/skills/ — GENERATED, do not edit
│                           # Fetched from https://middlecache.ced.cloudflare.com/v1/cloudflare-skills/skills.tar.gz
│                           # by bin/fetch-skills.ts, which runs automatically via prebuild/predev hooks.
│                           # skills/ is in .gitignore and is NOT committed to the repository.
├── .flue/                  # Flue cloudflare-docs-bot — see .flue/AGENTS.md
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
title: Page Title # Required
description: SEO meta description # Required when pcx_content_type is set
pcx_content_type: how-to # Page type (see below)
sidebar:
  order: 1 # Sort order in sidebar
  label: Custom Label # Override sidebar text
products: # References to src/content/products/ entries
  - workers
difficulty: Beginner # For tutorials: Beginner | Intermediate | Advanced
reviewed: 2025-01-15 # YYYY-MM-DD of last content review
---
```

Valid `pcx_content_type` values: `changelog`, `concept`, `configuration`, `design-guide`, `example`, `faq`, `get-started`, `how-to`, `integration-guide`, `implementation-guide`, `learning-unit`, `navigation`, `overview`, `reference`, `reference-architecture`, `reference-architecture-diagram`, `release-notes`, `solution-guide`, `troubleshooting`, `tutorial`, `video`.

### Writing and style rules

For MDX syntax, links, code blocks, formatting, and writing style, see `.agents/references/style-guide.md`. That file is the canonical agent reference — distilled from the full style guide at `src/content/docs/style-guide/`.

## Components — major APIs

Components are imported from `~/components` in MDX files. Imports must appear after the frontmatter block — forgetting the import is a common mistake.

For full component documentation including props, examples, and mandatory usage rules, see `.agents/references/components.md`.

## Validation — what to run after making changes

> **CI note:** `pnpm run build` will time out in CI environments (GitHub Actions, etc. where `CI=true`). When running in CI, use `pnpm run check` and linters only — do **not** run a full build. The full build is only practical in local development environments.

### Minimum validation for content changes (MDX edits)

```bash
pnpm run check          # Type-check (validates frontmatter schemas + Astro types)
pnpm run build          # Full build (validates MDX parsing, image paths, internal links) — LOCAL ONLY, skip in CI
```

### Minimum validation for code changes (.ts/.tsx/.astro/.js)

```bash
pnpm run check          # Type-check (Astro + Worker)
pnpm run lint           # ESLint
pnpm run format:core:check  # Prettier formatting check
pnpm run test           # Vitest (Workers, Node, and Astro suites)
```

### CI-only validation (when `CI=true`)

Use this reduced set when running as a GitHub Action or in any CI environment:

```bash
pnpm run check              # Type-check (validates frontmatter schemas + Astro types)
pnpm run lint               # ESLint
pnpm run format:core:check  # Prettier formatting check
```

### Full validation (matches CI pipeline, local only)

```bash
pnpm run check              # Astro + Worker type checking
pnpm run lint               # ESLint
pnpm run format:core:check  # Prettier formatting check
pnpm run build              # Full build with link checking (set RUN_LINK_CHECK=true)
pnpm run test               # All test suites
pnpm exec tsm bin/validate-redirects.ts  # Only if public/__redirects was modified
```

### Fixing formatting

After editing any prettier-scoped file, run:

```bash
pnpm run format             # Auto-fix all prettier-scoped files
```

Always format edited files before committing — CI runs `pnpm run format:core:check` and will fail if formatting is off.

### Syncing types after content collection changes

```bash
pnpm run sync               # Regenerate Astro content collection types
```

## CI pipeline

The CI workflow (`.github/workflows/ci.yml`) runs on PRs to `production` and checks in order:

1. File extension validation (only allowed types in `src/content/`)
2. `pnpm run check` (Astro + Worker type checking)
3. ESLint (reported inline on PR via reviewdog)
4. `pnpm run format:core:check` (Prettier formatting)
5. `pnpm run build` with `RUN_LINK_CHECK=true` (full build + internal link validation)
6. Redirect validation (`bin/validate-redirects.ts`)
7. `pnpm run test` (all Vitest suites)

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
11. **Redirect issues** — source URLs in `public/__redirects` must end in `/` (or `*`, `.xml`, `.json`, `.html`). No fragments in source URLs. No infinite loops.
12. **Hand-crafted directory entry IDs** — never manually write `id` values in `src/content/directory/` files. Always run `node tools/directory-entry-ids --fix` to generate them.

## Content collections

The site defines 20 content collections in `src/content.config.ts` with schemas in `src/schemas/`. The major ones:

| Collection          | Location                         | Description                              |
| ------------------- | -------------------------------- | ---------------------------------------- |
| `docs`              | `src/content/docs/`              | Main documentation pages (MDX)           |
| `partials`          | `src/content/partials/`          | Reusable content snippets (MDX)          |
| `changelog`         | `src/content/changelog/`         | Product changelogs (MDX)                 |
| `glossary`          | `src/content/glossary/`          | Glossary terms (YAML)                    |
| `products`          | `src/content/products/`          | Product metadata (YAML)                  |
| `plans`             | `src/content/plans/`             | Plan/pricing data (YAML)                 |
| `workers-ai-models` | `src/content/workers-ai-models/` | AI model definitions (JSON)              |
| `directory`         | `src/content/directory/`         | Product/feature directory entries (YAML) |
| `fields`            | `src/content/fields/`            | Ruleset engine field definitions (YAML)  |
| `learning-paths`    | `src/content/learning-paths/`    | Learning path definitions (JSON)         |

### Directory entry IDs

Every file in `src/content/directory/` **must** have a unique `id` field on the very first line. This is enforced by Semgrep rules in CI (`.semgrep/directory-entry-validation.yaml`).

**Rules:**

- The `id` must be exactly **6 characters** long.
- Characters are drawn from a reduced-confusion set: `abcdefghijkmnopqrstuvwxyzACDEFGHJKLMNPQRTUVWXY34679`. This deliberately omits visually ambiguous characters (`l`/`1`/`I`, `O`/`0`, `B`/`8`, `S`/`5`, `Z`/`2`).
- IDs are **randomly generated** — they must not contain human names or be hand-crafted.
- The `id` is a **stable identifier** that stays with the YAML file even when the `name` or filename changes. Never modify an existing `id` unless fixing a validation error.
- Files must use the `.yaml` extension, not `.yml`.

**Generating IDs:**

Use the `tools/directory-entry-ids` script to generate and validate IDs:

```bash
node tools/directory-entry-ids        # Check all files, report errors
node tools/directory-entry-ids --fix  # Auto-fix missing, malformed, or duplicate IDs
```

**Do not** manually write `id` values. Always use the script to generate them.

## Testing

Tests use Vitest with three workspace projects (`vitest.workspace.ts`):

| Suite   | File pattern       | Runtime                           |
| ------- | ------------------ | --------------------------------- |
| Workers | `*.worker.test.ts` | `@cloudflare/vitest-pool-workers` |
| Node    | `*.node.test.ts`   | Node.js                           |
| Astro   | `*.astro.test.ts`  | Astro Vite config                 |

Run all tests: `pnpm run test`

## Web components

New web components in this codebase should use the `cfdocs-` prefix for custom element names (e.g., `<cfdocs-sheet>`, `<cfdocs-explain-code>`). This establishes a consistent naming pattern going forward.

### Naming conventions

- **Custom element names**: Use kebab-case with `cfdocs-` prefix (e.g., `cfdocs-sheet`)
- **Class names**: Use PascalCase with `Element` suffix (e.g., `SheetElement`, `ExplainCodeElement`)
- **File locations**: Place components in `src/components/{component-name}/` directories

### Existing components

Existing components (`warp-download`, `stream-player`, `rule-id`, `check-box`, `r2-local-uploads-diagram`, `animated-workflow-diagram`, `autoconfig-diagram`) are exempt from the `cfdocs-` prefix requirement and do not need to be renamed.

## Flue cloudflare-docs-bot

The PR review bot for this repository lives in `.flue/`. It is a Cloudflare Worker (`cloudflare-docs-flue`) built with the Flue framework that reviews pull requests and posts structured feedback as GitHub comments.

**If the bot is relevant to the task, read `.flue/AGENTS.md` first.** That file covers the worker architecture, workflow routing, specialist agents (code review, conventions, style-guide), R2 state management, local dev scripts, and deployment. All bot-related npm scripts are prefixed `flue:` in the root `package.json` (e.g. `pnpm run flue:dev`, `pnpm run flue:deploy`).

## Agent skills, commands, and agents

Repo-specific agent config lives in `.agents/`. All subdirectories are committed. Tool-specific paths (`.opencode/agents`, `CLAUDE.md`) are symlinks into `.agents/`.

### Skills

Skills live in `.agents/skills/`. Each skill's `SKILL.md` describes what it does and when to use it. Load a skill when the task matches its description.

The `contributing` skill is the entry point for any change to the docs — writing or editing pages, choosing content types and components, reviewing docs or code examples, adding changelog entries, and opening pull requests. It is a router that dispatches to task-specific files under `.agents/skills/contributing/references/`. Load it first for contribution tasks.

### Agents

Custom agent definitions live in `.agents/agents/` (symlinked from `.opencode/agents/`). Each agent's frontmatter describes its role.

### Reference files

Shared reference files in `.agents/references/`:

| File             | Contents                                                    |
| ---------------- | ----------------------------------------------------------- |
| `style-guide.md` | Canonical writing and formatting rules for all content work |
| `components.md`  | Full MDX component catalog with props and usage examples    |
| `procedures.md`  | Rules for writing step-by-step procedural instructions      |

## Commit conventions

- Format: `[Product] description` or `type: description`
- Examples: `[Workers] Fix broken link in get-started`, `docs: clarify rate limiting behavior`, `fix: correct TypeScript example`
- Common prefixes: `docs:`, `fix:`, `chore:`, `[Product]`
