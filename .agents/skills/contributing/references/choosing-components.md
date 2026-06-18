# Choosing Components by Intent

Start from the content you have and pick the component that presents it correctly. This file is about _when_ and _why_ to reach for each component. For props, syntax, and full examples, read `.agents/references/components.md`. The authoritative live list with rendered examples is at https://developers.cloudflare.com/style-guide/components/.

This covers the components in the synced catalog (`.agents/references/components.md`). Diagram, homepage, and layout-internal exports from `~/components` are omitted as non-authoring tools. A few utility components documented only in the live style guide (for example, the icon components and `RSSButton`) sit outside this list — check https://developers.cloudflare.com/style-guide/components/ if you need one that is not here.

Two rules first:

- Import every component you use from `~/components`, after the frontmatter. A used-but-unimported component is a silent build failure.
- For the mandatory mappings below, never use a bare code fence.

## Reverse lookup: the data you have → the component

| You have…                                              | Use                                          | Mandatory? |
| ------------------------------------------------------ | -------------------------------------------- | ---------- |
| A Workers JavaScript/TypeScript code sample            | `TypeScriptExample`                          | Yes        |
| A Wrangler configuration                               | `WranglerConfig` (TOML input, `$today`)      | Yes        |
| A package install or exec command (npm/yarn/pnpm)      | `PackageManagers`                            | Yes        |
| A multi-step procedure                                 | `Steps`                                      | Yes        |
| A step that navigates the dashboard                    | `DashButton`                                 | Yes        |
| A Cloudflare API endpoint to call                      | `APIRequest`                                 | —          |
| A non-Cloudflare curl command                          | `CURL`                                       | —          |
| Code that lives in a Cloudflare GitHub repo            | `GitHubCode` (pin a full commit hash)        | —          |
| A full Wrangler command or namespace reference         | `WranglerCommand` / `WranglerNamespace`      | —          |
| A parameter/field data type or constraint              | `Type` / `MetaInfo`                          | —          |
| Mutually exclusive paths (Dashboard vs API, languages) | `Tabs` / `TabItem`                           | —          |
| Supplementary detail that would clutter the main flow  | `Details`                                    | —          |
| A directory/file layout                                | `FileTree`                                   | —          |
| A sample to set apart in a styled box                  | `Example`                                    | —          |
| Content constrained to a narrower width                | `Width`                                      | —          |
| A heading with a custom anchor (inside a component)    | `AnchorHeading`                              | —          |
| Reusable content shared across pages                   | `Render` (a partial)                         | —          |
| A formatted Markdown string inside JSX                 | `Markdown`                                   | —          |
| Plan availability for a feature                        | `Plan`, `FeatureTable`, or `ProductFeatures` | —          |
| Lifecycle status (Beta/Alpha) inline or in a heading   | `ProductAvailabilityText`, `Badge`           | —          |
| A small inline status pill                             | `InlineBadge` (avoid; prefer `Badge`)        | —          |
| Inline changelog entries for a product                 | `ProductChangelog`                           | —          |
| Relational data (fields, limits, comparisons)          | a Markdown table                             | —          |
| A glossary term inline                                 | `GlossaryTooltip` / `GlossaryDefinition`     | —          |
| A full product glossary table                          | `Glossary`                                   | —          |
| Links/cards routing to other pages                     | `LinkCard` / `CardGrid`, `Card`              | —          |
| A primary call-to-action link                          | `LinkButton`                                 | —          |
| A product feature highlight on an overview             | `Feature`                                    | —          |
| A related Cloudflare product reference                 | `RelatedProduct`                             | —          |
| An auto-generated child-page list                      | `DirectoryListing`                           | —          |
| A filterable list of examples/resources                | `ResourcesBySelector`                        | —          |
| An auto-generated tutorial table                       | `ListTutorials`                              | —          |
| A description block below the page title               | `Description`                                | —          |
| A YouTube or Cloudflare Stream video                   | `YouTube` / `Stream`                         | —          |
| A live statistic in prose                              | `PublicStats`                                | —          |
| A copyable WAF/security rule ID                        | `RuleID`                                     | —          |
| Available notification types for a product             | `AvailableNotifications`                     | —          |
| Pages framework build-preset details                   | `PagesBuildPreset`                           | —          |
| An interactive IP-range subtraction calculator         | `SubtractIPCalculator`                       | —          |

## By intent

### Code and configuration

- **`TypeScriptExample`** — any Workers JS/TS. Auto-generates the JS tab from TS, so there is one source to maintain. Do not use bare `ts`/`js` fences.
- **`WranglerConfig`** — any Wrangler config. Provide TOML; JSON is generated. Use `$today` for `compatibility_date`. Note minimum compatibility dates in a `:::note`.
- **`PackageManagers`** — install/exec commands, so npm/yarn/pnpm tabs render automatically.
- **`GitHubCode`** — show real code from a Cloudflare repo without copying it into the page; pin a full 40-character commit so it stays stable.
- **`WranglerCommand` / `WranglerNamespace`** — auto-generated Wrangler CLI reference for a command or a whole namespace. Use `ExtraFlagDetails` as a child of `WranglerCommand` to add or replace a flag's help text.
- **Plain fenced block** — any other language (Python, Rust, Go) or non-Workers config (JSON, YAML). Use a lowercase language; use `txt` for generic output. For command output, add the `output` suffix to a second fence.

### API and reference data

- **`APIRequest`** — Cloudflare API endpoints; generates a correct curl from the OpenAPI schema.
- **`CURL`** — arbitrary non-Cloudflare endpoints.
- **`Type`** — a pill-shaped data-type badge for a parameter, field, or property (`string`, `boolean`, `Promise<T>`). Heavily used on API and reference pages.
- **`MetaInfo`** — a metadata annotation alongside a type: constraints and defaults (`required`, `optional`, `read-only`, `(default: false)`).

### Structure and flow

- **`Steps`** — every multi-step procedure. See `.agents/references/procedures.md`.
- **`Tabs` / `TabItem`** — present mutually exclusive paths (Dashboard / API / Terraform via `syncKey="dashPlusAPI"`, or languages via `syncKey="workersExamples"`). The primary answer is the first tab. Do not nest tabs.
- **`Details`** — collapse advanced options, long samples, or background that would otherwise break the main flow.
- **`FileTree`** — show project/directory structure.
- **`Example`** — wrap content in a styled box to set it apart from surrounding prose.
- **`Width`** — constrain content (often an image) to large/medium/small width.
- **`AnchorHeading`** — a heading with a custom anchor ID, for use inside components or non-MDX contexts. In normal MDX, headings get anchors automatically.

### Content reuse

- **`Render`** — embed a partial from `src/content/partials/{product}/`. Prefer this over copy-pasting shared content. See `information-architecture.md` for when to extract a partial.
- **`Markdown`** — render a Markdown string inside JSX, mainly for formatted variables passed into partials. Use sparingly.

### Availability and status

- **`Plan`** — plan availability badge near a feature or at the top of an overview.
- **`FeatureTable` / `ProductFeatures`** — availability by plan, sourced from `src/content/plans/`.
- **`ProductAvailabilityText`** — inline Beta/Alpha status that renders nothing once GA, so it is safe to leave in place.
- **`Badge`** — status label in a heading or sidebar. Prefer it over `InlineBadge`.
- **`InlineBadge`** — a small inline status pill. Avoid it; prefer `Badge` or stating status in prose.
- **`ProductChangelog`** — embed a product's or area's changelog entries inline on a page.

### Navigation and overview pages

- **`LinkCard` / `CardGrid`** — link cards, optionally gridded, for routing readers onward.
- **`Card` / `LinkTitleCard` / `ListCard`** — styled card containers for highlighting or grouping content.
- **`Feature`** — feature cards on a product overview.
- **`RelatedProduct`** — related-product cards with icons.
- **`DirectoryListing`** — auto-generated child-page listing on navigation/overview pages.
- **`LinkButton`** — primary call-to-action link on overview/get-started pages.
- **`ResourcesBySelector` / `ListTutorials`** — filterable/auto-generated listings for examples and tutorial indexes.
- **`Description`** — a description block rendered below the page title. Prefer the `summary` frontmatter field unless you need it conditionally or inside a component.

### Glossary and media

- **`GlossaryTooltip`** — hover definition for a term inline.
- **`GlossaryDefinition`** — pull a definition into the body.
- **`Glossary`** — full product glossary table on a dedicated page.
- **`YouTube`** — embed a YouTube video by ID.
- **`Stream`** — embed a Cloudflare Stream video.

### Stats and product-specific helpers

- **`PublicStats`** — a live statistic (data centers, bandwidth) inline in prose.
- **`DashButton`** — a button to a validated dashboard deeplink; use it for in-procedure dashboard navigation instead of a bare link.
- **`RuleID`** — a copyable WAF/security rule ID.
- **`AvailableNotifications`** — list a product's available notification types.
- **`PagesBuildPreset`** — Pages framework build-preset details.
- **`SubtractIPCalculator`** — interactive IP-range subtraction calculator (networking docs).

### When no component fits

Use prose, a Markdown table (for relational data), or a plain fenced code block with a lowercase language. Do not force a component where plain Markdown is clearer, and do not use a table to lay out a page. If you think a component exists but it is not listed here, check `.agents/references/components.md` or the live style guide before inventing markup.
