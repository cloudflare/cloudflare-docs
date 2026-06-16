# Choosing Components by Intent

Start from the content you have and pick the component that presents it correctly. This file is about _when_ and _why_ to reach for each component. For props, syntax, and full examples, read `.agents/references/components.md`.

Two rules first:

- Import every component you use from `~/components`, after the frontmatter. A used-but-unimported component is a silent build failure.
- For the mandatory mappings below, never use a bare code fence.

## Reverse lookup: the data you have → the component

| You have…                                                  | Use                                          | Mandatory? |
| ---------------------------------------------------------- | -------------------------------------------- | ---------- |
| A Workers JavaScript/TypeScript code sample                | `TypeScriptExample`                          | Yes        |
| A Wrangler configuration                                   | `WranglerConfig` (TOML input, `$today`)      | Yes        |
| A package install or exec command (npm/yarn/pnpm)          | `PackageManagers`                            | Yes        |
| A multi-step procedure                                     | `Steps`                                      | Yes        |
| A step that navigates the dashboard                        | `DashButton`                                 | Yes        |
| A Cloudflare API endpoint to call                          | `APIRequest`                                 | —          |
| A non-Cloudflare curl command                              | `CURL`                                       | —          |
| Code that lives in a Cloudflare GitHub repo                | `GitHubCode` (pin a full commit hash)        | —          |
| Mutually exclusive paths (Dashboard vs API, languages)     | `Tabs` / `TabItem`                           | —          |
| Reusable content shared across pages                       | `Render` (a partial)                         | —          |
| Supplementary detail that would clutter the main flow      | `Details`                                    | —          |
| A directory/file layout                                    | `FileTree`                                   | —          |
| Plan availability for a feature                            | `Plan`, or `FeatureTable` / `ProductFeatures` | —          |
| Lifecycle status (Beta/Alpha) inline or in a heading       | `ProductAvailabilityText`, `Badge`           | —          |
| Relational data (fields, limits, comparisons)              | a Markdown table                             | —          |
| A glossary term inline                                     | `GlossaryTooltip` / `GlossaryDefinition`     | —          |
| Links/cards routing to other pages                         | `LinkCard` / `CardGrid`, `Feature`, `RelatedProduct` | —    |
| A Wrangler command or namespace reference                  | `WranglerCommand` / `WranglerNamespace`      | —          |
| A video                                                    | `YouTube` or `Stream`                        | —          |
| A live statistic in prose                                  | `PublicStats`                                | —          |

## By intent

### Code and configuration

- **`TypeScriptExample`** — any Workers JS/TS. Auto-generates the JS tab from TS, so there is one source to maintain. Do not use bare `ts`/`js` fences.
- **`WranglerConfig`** — any Wrangler config. Provide TOML; JSON is generated. Use `$today` for `compatibility_date`. Note minimum compatibility dates in a `:::note`.
- **`PackageManagers`** — install/exec commands, so npm/yarn/pnpm tabs render automatically.
- **`GitHubCode`** — show real code from a Cloudflare repo without copying it into the page; pin a full 40-character commit so it stays stable.
- **Plain fenced block** — any other language (Python, Rust, Go) or non-Workers config (JSON, YAML). Use a lowercase language; use `txt` for generic output. For command output, add the `output` suffix to a second fence.

### API and CLI reference

- **`APIRequest`** — Cloudflare API endpoints; generates a correct curl from the OpenAPI schema.
- **`CURL`** — arbitrary non-Cloudflare endpoints.
- **`WranglerCommand` / `WranglerNamespace`** — auto-generated Wrangler CLI reference.

### Structure and flow

- **`Steps`** — every multi-step procedure. See `.agents/references/procedures.md`.
- **`Tabs` / `TabItem`** — present mutually exclusive paths (Dashboard / API / Terraform via `syncKey="dashPlusAPI"`, or languages via `syncKey="workersExamples"`). The primary answer is the first tab. Do not nest tabs.
- **`Details`** — collapse advanced options, long samples, or background that would otherwise break the main flow.
- **`FileTree`** — show project/directory structure.

### Reuse

- **`Render`** — embed a partial from `src/content/partials/{product}/`. Prefer this over copy-pasting shared content. See `information-architecture.md` for when to extract a partial.
- **`Markdown`** — render a Markdown string inside JSX, mainly for formatted variables passed into partials. Use sparingly.

### Availability and status

- **`Plan`** — plan availability badge near a feature or at the top of an overview.
- **`FeatureTable` / `ProductFeatures`** — availability by plan, sourced from `src/content/plans/`.
- **`ProductAvailabilityText`** — inline Beta/Alpha status that renders nothing once GA, so it is safe to leave in place.
- **`Badge`** — status label in a heading or sidebar. Prefer it over `InlineBadge`, which should generally be avoided.

### Navigation and overview pages

- **`LinkCard` / `CardGrid`** — link cards, optionally gridded, for routing readers onward.
- **`Feature`** — feature cards on a product overview.
- **`RelatedProduct`** — related-product cards with icons.
- **`DirectoryListing`** — auto-generated child-page listing on navigation/overview pages.
- **`LinkButton`** — primary call-to-action link on overview/get-started pages.
- **`ResourcesBySelector` / `ListTutorials`** — filterable/auto-generated listings for examples and tutorial indexes.

### Glossary and media

- **`GlossaryTooltip`** — hover definition for a term inline.
- **`GlossaryDefinition`** — pull a definition into the body.
- **`Glossary`** — full product glossary table on a dedicated page.
- **`YouTube`** — embed a YouTube video by ID.
- **`Stream`** — embed a Cloudflare Stream video.

### When no component fits

Use prose, a Markdown table (for relational data), or a plain fenced code block with a lowercase language. Do not force a component where plain Markdown is clearer, and do not use a table to lay out a page.
