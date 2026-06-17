# Writing and Editing Docs — Authoring Workflow

The end-to-end process for adding or changing a documentation page. Work through these steps in order. Each step links to the reference that holds the detail.

You are an editor first. Match the existing voice, structure, and depth of the pages around the one you are changing. Keep edits small unless the task is a deliberate restructure.

## 1. Gather context

Confirm you have enough to write something accurate before you write anything. If the source material is thin, ask the user (see the intake list in `SKILL.md`). Never invent technical behavior — verify it against a PR, spec, API schema, existing page, or the `cloudflare-docs` search tool.

## 2. Locate where the change belongs

Before creating a file, find where it fits. Read sibling pages in the same product area to learn the local patterns, and decide whether this is even a new page.

Read `information-architecture.md` for: file locations, sidebar ordering, whether to extract a partial instead of a page, whether existing content already covers this (link to it rather than duplicate), and what to do when you rename or move a page (redirects).

## 3. Pick a content type

Every page declares a `pcx_content_type`. It drives the page's shape and the reader's expectations. Choose the type, then follow its skeleton.

Read `content-types.md` for the type-to-use guide and per-type page skeletons.

## 4. Draft against the style guide

Write the prose. The canonical rules live in `.agents/references/style-guide.md` — read it. The essentials:

- Active voice, present tense, second person ("you"), no contractions.
- Short sentences (8–12 words), short paragraphs (1–2 sentences).
- No marketing or LLM-filler language ("seamless", "leverage", "it's important to note", "perfect for").
- Sentence-case headings, no gerunds, no questions as headings, sequential levels (no H2 → H4 jump).
- Spell out acronyms on first use; use inclusive, non-jargon terminology.
- No time-bound phrasing ("recently", "now available", month/year references) outside changelogs.

For multi-step procedures, follow `.agents/references/procedures.md` (wrap in `Steps`, location before action, consolidate login + navigation, prefix optional steps).

## 5. Choose components for each piece of data

For every distinct piece of content — a code sample, a config block, a command, a comparison, a set of mutually exclusive paths — pick the right component instead of a bare fence or ad-hoc markup.

Read `choosing-components.md`. It starts with a reverse-lookup table (the data you have → the component to reach for) and then explains each component by intent. For full props and syntax, use `.agents/references/components.md`.

Mandatory mappings (do not use bare fences for these):

- Workers JS/TS → `TypeScriptExample`
- Wrangler config → `WranglerConfig` (TOML input, `$today` for `compatibility_date`)
- Package install/exec → `PackageManagers`
- Multi-step procedure → `Steps`
- Dashboard navigation step → `DashButton`

Remember to import every component you use from `~/components`, after the frontmatter block. Remove unused imports.

## 6. Handle assets and related artifacts

- **Images** go in `src/assets/images/{product}/`, never in `src/content/`. Use descriptive alt text. See the screenshots section of `.agents/references/style-guide.md`.
- **Redirects** — if you renamed, moved, or deleted a page, add a redirect. See `information-architecture.md`.
- **Changelog** — if the change documents a new feature, enhancement, or noteworthy product change, add a changelog entry per `changelog.md`.
- **Glossary / new product metadata** — see `information-architecture.md`.

## 7. Validate

Run the validation commands from `SKILL.md` (`check`, local `build`, `format`, plus redirect validation if you touched `public/__redirects`). Fix everything before handing off. Always run `pnpm run format` on files you changed.

## 8. Open a pull request

When the change is ready, follow `pr.md` to create the PR (drafts only, `[Product]` title convention, body from the repo template).

## Editing existing pages

When editing rather than creating: preserve the existing structure and voice, change only what the task requires, and do not rewrite surrounding content or "improve" unrelated phrasing. Read the whole file (and its neighbors) for context before touching a diff.
