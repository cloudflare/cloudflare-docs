---
name: contributing
description: The entry point for ANY contribution to the Cloudflare Docs repository (developers.cloudflare.com). Load this whenever working on the docs repo: creating, editing, or adding documentation pages, partials, images, or changelog entries; choosing a content type or component; deciding where content belongs; reviewing docs or code examples; or learning how to contribute. ALSO load this for ANY pull request action — creating, opening, submitting, updating, or editing a PR, or writing a PR title or description. This skill is a router that dispatches to task-specific references (writing docs, PRs, changelogs, reviews, components, style).
---

# Contributing to Cloudflare Docs

This is the single skill to load for any change to the Cloudflare Docs repository. It does not contain the detail itself — it routes you to the right reference for the task in front of you. Read the reference that matches your task, then follow it.

Do not guess at conventions. The references below are the source of truth for how this repo expects content to be written, structured, and validated.

## Ground rules

These apply to every task below.

- **This is an open-source, public repository.** Never put private Cloudflare information, secrets, credentials, internal URLs, or environment variable values into pages, code examples, commits, pull requests, comments, or anywhere else in this repository. If there is any doubt — even slight — about whether something is safe to publish, stop and ask the user.
- **Branch off the latest `production`.** Before starting work, create your branch from an up-to-date `production` commit (`git fetch origin` then branch from `origin/production`), unless the user asks for a different base. This repo's default branch is `production`, not `main`.
- **Never commit or push automatically.** Make the file changes, then ask the user whether they want to commit and push. Do not run `git commit` or `git push` unprompted.

## Before you start: gather context

When the source material is thin or ambiguous, pause and ask the user before writing. You need enough to write something accurate, not just well-formatted. Ask for whatever is missing:

- **Source of truth** — a PR, RFC, engineering spec, API schema, existing page, or product owner to verify behavior against. Do not invent technical claims.
- **Product and feature area** — which Cloudflare product, and where in that product the change belongs.
- **Audience and intent** — who reads this and what they are trying to do (get started, look something up, follow a procedure, understand a concept).
- **Availability** — plan availability (Free/Pro/Business/Enterprise) and lifecycle status (GA, Beta, Alpha).
- **Scope** — is this a new page, an edit, a restructure, or a changelog entry.

If the user already provided a clear spec or PR, proceed without interrogating them.

## Task index

Find your task and read the listed reference(s). Paths are relative to this skill directory unless prefixed with `.agents/`.

| Your task                                      | Read                                                                                                     |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Write or edit a documentation page             | `references/writing-docs.md` (the authoring workflow — start here)                                       |
| Decide which `pcx_content_type` and page shape | `references/content-types.md`                                                                            |
| Decide how to present data / which component   | `references/choosing-components.md`                                                                      |
| Decide where a page belongs, redirects, reuse  | `references/information-architecture.md`                                                                 |
| Look up writing and formatting rules           | `.agents/references/style-guide.md` (canonical) and `.agents/references/procedures.md` for step-by-steps |
| Look up a component's props and examples       | `.agents/references/components.md`                                                                       |
| Add or edit a changelog entry                  | `references/changelog.md`                                                                                |
| Review docs / post PR suggestions              | `references/reviewing-docs.md`                                                                           |
| Review the code examples in docs               | `references/code-review/index.md`                                                                        |
| Create or edit a pull request                  | `references/pr.md`                                                                                       |

The authoring workflow in `references/writing-docs.md` ties these together: gather context → locate where the page belongs → pick a content type → draft against the style guide → choose components for each piece of data → validate → open a PR.

## Validate before you finish

Run validation after any content change. Match the command set to your environment — a full build is local-only.

```bash
pnpm run check              # Type-check: validates frontmatter schemas + Astro types
pnpm run build              # Full build: validates MDX parsing, image paths, internal links — LOCAL ONLY (times out in CI)
pnpm run format             # Auto-fix Prettier formatting on edited files
```

In CI (`CI=true`), skip `pnpm run build`; run `pnpm run check`, `pnpm run lint`, and `pnpm run format:core:check` only.

If you modified `public/__redirects`, also run:

```bash
pnpm exec tsm bin/validate-redirects.ts
```

Always run `pnpm run format` on files you touched — CI fails on unformatted content.
