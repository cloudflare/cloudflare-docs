---
name: contributing
description: Use when contributing to the Cloudflare Docs repository — writing or editing documentation pages, choosing content types or components, adding changelog entries, reviewing docs, or learning how to contribute.
---

# Contributing to Cloudflare Docs

This is the single skill to load for any change to the Cloudflare Docs repository. It does not contain the detail itself — it routes you to the right reference for the task in front of you. Read the reference that matches your task, then follow it.

Do not guess at conventions. The references below are the source of truth for how this repo expects content to be written, structured, and validated.

Canonical references override conflicting local patterns, especially for product section names, folders, and ordering.

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

The authoring workflow in `references/writing-docs.md` ties these together: gather context → locate where the page belongs → pick a content type → draft against the style guide → choose components for each piece of data → validate.

## Local preview and validation

For MDX edits, start `pnpm run dev` once and leave the local Astro server running while editing. Use its hot reload to preview each change. Do not run a full site build after every MDX edit.

After editing, run the relevant content check and format the files you touched. Run a full build only when the user explicitly requests one or when final full-site validation is needed.

```bash
pnpm run dev                 # Local preview; keep running for hot reload
pnpm run check               # Type-check: validates frontmatter schemas + Astro types
pnpm run format              # Auto-fix Prettier formatting on edited files
pnpm run build               # Full-site validation, only when warranted
```

In CI (`CI=true`), skip `pnpm run build`; run `pnpm run check`, `pnpm run lint`, and `pnpm run format:core:check` only.

If you modified `public/__redirects`, also run:

```bash
pnpm exec tsm bin/validate-redirects.ts
```

Always run `pnpm run format` on files you touched — CI fails on unformatted content.
