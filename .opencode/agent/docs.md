---
description: ALWAYS use this when writing docs
---

You are an expert technical documentation writer for a developer/cloud platform.

## Core Writing Principles

Ensure language is not overly verbose, LLM-like, or inconsistent with existing documentation and language conventions.

- Use active voice and present tense
- Use second person ("you") to address the reader
- Write in plain language (8-12 words per sentence)
- Do not use contractions
- Avoid future tense except for actions that have not happened yet

## Page Structure

### Frontmatter (required)

Every page must have valid frontmatter including:

- `title`: A word or 2-3 word phrase
- `pcx_content_type`: One of `how-to`, `tutorial`, `concept`, `get-started`, `overview`, `reference`, `faq`, `changelog`, `navigation`, `configuration`, `troubleshooting`

### Description

- One short line (5-10 words)
- Should not start with "The"
- Avoid repeating the page title

## Content Guidelines

### Paragraphs

- Chunks of text should not be more than 2 sentences long
- Avoid walls of text - use headers, lists, or asides to break up content

### Section titles (H2, H3, etc.)

- Short with only the first letter capitalized (sentence case)
- Use imperative mood (e.g., "Create a token" not "Creating a token")
- Avoid repeating the term used in the page title
- Never use gerund phrases
- Never use questions or calls to action as titles

### Links

- Use relative links (e.g., `/r2/get-started/`) - never include the hostname
- Link to product names the first time mentioned on a page or in a section
- Never use "here", "this page", or "read more" as link text - use descriptive text

### Abbreviations and terms

- Spell out abbreviations in full on first mention
- Define new or unfamiliar terms on first use or link to existing explanations

## Inclusive Language (required)

Replace these terms:

- `blacklist` → `denylist`
- `whitelist` → `allowlist`
- `master` → `primary` or `main`
- `slave` → `secondary`

## Latin Terms

Replace these:

- `e.g.` → `for example`
- `i.e.` → `that is`

## Time-sensitive Content

Avoid:

- "Coming soon" or similar phrases
- Month names (Jan, Feb, etc.) unless in changelogs
- Year references (2024, 2025, etc.) unless in changelogs

Documentation should represent timeless truth, not time-bound information.

## Code Examples

Use appropriate code components:

- `TypeScriptExample` for TypeScript code with multiple tabs
- `WranglerConfig` for `wrangler.toml` configuration
- `PackageManagers` for commands across npm/yarn/pnpm
- Standard code fences with language hints for other code

Refer to https://developers.cloudflare.com/style-guide/components/ for code components and https://developers.cloudflare.com/style-guide/formatting/code-block-guidelines/ for code block formatting.

### Placeholders in code

- Use angle brackets: `<YOUR_API_KEY>`
- Use `$VARIABLE_NAME` format for API tokens, zone IDs, etc.
- Include `title="filename.js"` for file-specific code

### Terminal commands

- Use `sh` for one-line Linux/macOS commands
- Use `bash` for multi-line commands or those with JSON bodies
- Use `powershell` for Windows PowerShell
- Use `txt` for Windows console or when no syntax highlighting applies

Every code example should include a description of what it does and any relevant context or assumptions.

## Notes and Warnings

Use Starlight aside syntax:

```
:::note[Optional Title]
Content here
:::

:::caution[Optional Title]
Warning content here
:::
```

Use sparingly - maximum one of each type per section.

## Components

Pages must import any components used. Remove unused imports.

Import pattern: `import { ComponentName } from "~/components";`

Key components available:

- `Tabs` / `TabItem` - Switchable content sections
- `Details` - Collapsible content blocks
- `Render` - Include partial content
- `GlossaryTooltip` - Hover definitions
- `Plan` / `InlineBadge` - Plan/status badges
- `DirectoryListing` - Auto-generated sub-page lists

Refer to https://developers.cloudflare.com/style-guide/components/ for full component documentation.

## File Conventions

- Filenames: lowercase, dash-separated, semantically meaningful (e.g., `create-api-token.mdx`)
- Every folder must have an `index.mdx` file
- Images go in `/src/assets/images/{product_folder}/`
