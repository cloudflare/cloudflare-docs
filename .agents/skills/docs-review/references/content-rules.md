# Content Review Rules

Checklist for reviewing MDX documentation changes. Each rule includes what to check and how to fix it.

## MDX Syntax

| Check                                            | Fix                                                         |
| ------------------------------------------------ | ----------------------------------------------------------- |
| `{` `}` in prose (outside code blocks)           | Wrap in backticks or escape: `\{` `\}`                      |
| `<` `>` in prose (outside code blocks)           | Use `&lt;` `&gt;` or wrap in backticks                      |
| Component used without import                    | Add import from `~/components` after frontmatter            |
| Code block without language                      | Add lowercase language identifier                           |
| Unsupported code block language                  | Use `txt` for generic output; check AGENTS.md for full list |
| Capitalized language name (`JSON`, `JavaScript`) | Use lowercase (`json`, `javascript`)                        |

## Frontmatter

| Check                      | Fix                                           |
| -------------------------- | --------------------------------------------- |
| Missing `title`            | Add a descriptive title                       |
| Invalid `pcx_content_type` | Use a valid value from AGENTS.md list         |
| Invalid `tags`             | Check against `src/schemas/tags.ts` allowlist |
| `reviewed` date in future  | Set to today or a past date                   |

## Links

| Check                                                      | Fix                                         |
| ---------------------------------------------------------- | ------------------------------------------- |
| Full URL to docs (`https://developers.cloudflare.com/...`) | Use root-relative path (`/workers/...`)     |
| Relative file link (`./page`)                              | Use root-relative path (`/workers/page/`)   |
| File extension in link (`/workers/page.mdx`)               | Remove extension (`/workers/page/`)         |
| Missing trailing slash (`/workers/page`)                   | Add trailing slash (`/workers/page/`)       |
| Vague link text ("here", "this page", "read more")         | Use descriptive text: the target page title |

## Headings

| Check                                          | Fix               |
| ---------------------------------------------- | ----------------- |
| Skipped heading level (H2 then H4)             | Insert missing H3 |
| H1 in content (only frontmatter title uses H1) | Demote to H2      |

## Style Guide

| Check                              | Fix                                                      |
| ---------------------------------- | -------------------------------------------------------- |
| Contractions ("don't", "can't")    | Expand ("do not", "cannot")                              |
| "click" for UI actions             | Use "select"                                             |
| "navigate to"                      | Use "go to"                                              |
| "enable/disable"                   | Use "turn on/turn off"                                   |
| UI element not bolded              | Bold clickable elements: **Save**, **DNS** > **Records** |
| Code/paths/IPs not in monospace    | Wrap in backticks                                        |
| `$` prefix in terminal commands    | Remove — copy button copies verbatim                     |
| Two trailing spaces for line break | Use `<br/>`                                              |
| Passive voice                      | Rewrite in active voice                                  |
| "See" | Use "Refer to" |
## Code Examples — Component Usage

These checks are docs-specific (which component to use). For deeper code correctness (types, API usage, binding access, error handling, security), load the `code-review` skill.

| Check                                     | Fix                                            |
| ----------------------------------------- | ---------------------------------------------- |
| Workers JS/TS in bare code fence          | Use `TypeScriptExample` component              |
| Wrangler config in bare code fence        | Use `WranglerConfig` component with TOML input |
| Hardcoded compatibility date              | Use `$today` in `WranglerConfig`               |
| Package install without `PackageManagers` | Use `PackageManagers` component                |
| `js` fence for Workers code               | Convert to TypeScript first                    |

## Content Accuracy

| Check                                                  | Action                                            |
| ------------------------------------------------------ | ------------------------------------------------- |
| Unverified API behavior claim                          | Verify against types or config schema (see below) |
| Inline explanation of something with its own docs page | Replace with link to canonical page               |
| Recommendation without rationale                       | Add brief "why" or link to supporting docs        |
| Outdated API pattern                                   | Check latest types and update                     |
| Nested tabs (tabs inside tabs)                         | Restructure into separate headings                |

To verify API behavior, types, or config fields, use the same sources as the `code-review` skill: `node_modules/@cloudflare/workers-types/index.d.ts` for APIs and `node_modules/wrangler/config-schema.json` for config. Read these files directly — do not rely on pre-training.
