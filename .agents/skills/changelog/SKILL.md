---
name: changelog
description: Creates, updates, and reviews product changelog entries for the Cloudflare documentation site. Load when generating changelog MDX files, editing existing entries, reviewing changelog style, or validating frontmatter.
---

Use this skill when creating, editing, or reviewing changelog entries under `src/content/changelog/`.

**Style reference:** `.agents/references/style-guide.md` contains the canonical rules for writing style, formatting, links, code blocks, and frontmatter. The changelog-specific additions below extend those rules — they do not replace them.

## Prerequisites

You need three things before writing:

1. A **product name** (for example, Workers, KV, Hyperdrive, Containers, R2)
2. A **description of the change** being documented
3. Enough context to explain the "why" and use cases

If any are missing, ask for clarification. Do not proceed without all three.

## Determine the product folder

Use the product name to find the correct folder under `src/content/changelog/{product}/`. Check existing folders for valid product names — do not guess.

## Create the changelog file

Path format:

```
src/content/changelog/{product}/{YYYY-MM-DD}-{useful-short-name}.mdx
```

Use today's date and a concise, hyphenated slug describing the change.

## Frontmatter

```yaml
---
title: <TITLE>
description: <ONE_SENTENCE_SUMMARY>
products:
  - <PRODUCT>
date: <YYYY-MM-DD>
---
```

## Writing style

Follow the rules in `.agents/references/style-guide.md`. Changelog-specific additions:

- Opening sentence: what the feature/change is and what problem it solves
- Expand on usage, use cases, and the "why" in subsequent paragraphs
- Assume a technical developer/cloud audience

## Code examples

Include a code example when the changelog describes an API, SDK, or configuration change.

- Keep snippets short and focused on the new feature — minimize boilerplate
- Import components after the frontmatter: `import { TypeScriptExample, WranglerConfig } from "~/components";`
- **Workers JS/TS** → use `TypeScriptExample` (not bare `js`/`ts` fences)
- **Wrangler config** → use `WranglerConfig` with TOML input and `$today` for `compatibility_date` (not bare `toml`/`jsonc` fences)
- **Other languages** (Python, Rust, Go, etc.) → use a plain fenced code block with the correct language identifier
- **Non-Workers config snippets** (JSON, YAML, etc.) → use a plain fenced code block (`json`, `yaml`, etc.)

## Documentation links

End the changelog with a link to relevant documentation:

- Use relative paths (for example, `/workers/configuration/placement/`)
- Link text must describe the destination — never "click here" or "read more"
- Check for uncommitted/staged `.md`/`.mdx` files that might be the related documentation

## Reference examples

Review these existing changelogs for style and format guidance:

- `src/content/changelog/workers/` - Workers changelogs with code examples
- `src/content/changelog/kv/` - KV changelogs
- `src/content/changelog/hyperdrive/` - Hyperdrive changelogs
- `src/content/changelog/containers/` - Container changelogs

Read 2-3 entries from the target product's changelog folder before writing to match style and depth. If the target folder has fewer than 2 entries, read from the folders listed above as a reference.

## Editing existing entries

When updating an existing changelog entry, preserve the original structure and voice. Apply only the requested changes — do not rewrite surrounding content.

## Reviewing changelog entries

When reviewing, validate against every section above: frontmatter fields, file path conventions, writing style, code example quality, and documentation links. Flag issues by severity:

- **Error**: Missing required frontmatter fields, wrong product folder, broken links
- **Warning**: Style violations, missing code examples for API changes, vague descriptions
- **Nit**: Minor phrasing improvements

## Output

Create or update the changelog file and show the complete file path and content.
