# Choosing a Content Type

Every docs page sets `pcx_content_type` in its frontmatter. It signals intent to the reader and to the site's tooling (listings, filters, search). Pick the type that matches what the reader is trying to do, then follow the skeleton for that type.

When unsure, look at sibling pages in the same product area and match the type they use for similar content.

## Pick the type

| The reader wants to…                                       | Use                              |
| ---------------------------------------------------------- | -------------------------------- |
| Understand what a product is and where to go next          | `overview`                       |
| Get from zero to a first working result fast               | `get-started`                    |
| Accomplish one specific task                               | `how-to`                         |
| Follow a longer, end-to-end build with a finished artifact | `tutorial`                       |
| Understand a concept or how something works                | `concept`                        |
| Look up exact values — fields, limits, flags, API shapes   | `reference`                      |
| Configure a feature's settings                             | `configuration`                  |
| Solve an error or unexpected behavior                      | `troubleshooting`                |
| Get answers to recurring discrete questions                | `faq`                            |
| See a focused, copyable code sample                        | `example`                        |
| Land on a page that only routes to child pages             | `navigation`                     |
| Announce a product change                                  | `changelog` (see `changelog.md`) |

Other valid values exist for specialized content: `design-guide`, `integration-guide`, `implementation-guide`, `learning-unit`, `reference-architecture`, `reference-architecture-diagram`, `release-notes`, `solution-guide`, `video`. Use them only when a page clearly fits — otherwise prefer the common types above.

## Required frontmatter

Every page needs `title`, `pcx_content_type`, and (whenever `pcx_content_type` is set) a `description` of 1–2 self-contained sentences. See `.agents/references/style-guide.md` for the full frontmatter field reference.

## Page skeletons

These are starting structures, not rigid templates. Adapt to the surrounding product area. Headings are sentence case.

### overview

Purpose: orient a new reader and route them onward.

- Opening sentence: what the product is and the problem it solves.
- `Plan` badge if availability is restricted.
- A short "what you can do" framing.
- `Feature` / `RelatedProduct` cards or a `DirectoryListing` to route to key pages.
- Links to get-started and core concepts.

### get-started

Purpose: shortest path to a first success.

- One-sentence intro stating the end result.
- Prerequisites (before the steps, not inside them).
- A single `Steps` procedure: install → configure → run → verify.
- "Next steps" links at the end.

### how-to

Purpose: complete one task.

- One-sentence intro stating the goal.
- Prerequisites if any.
- A `Steps` procedure (location before action, purpose before action — see `.agents/references/procedures.md`).
- Verification of the result.

### tutorial

Purpose: a guided, end-to-end build.

- Frontmatter adds `difficulty` (`Beginner` | `Intermediate` | `Advanced`).
- Intro: what you will build and what you will learn.
- Prerequisites.
- Sequential sections, each a meaningful milestone, using `Steps` within.
- A working final artifact and "Next steps".

### concept

Purpose: explain how something works.

- Define the concept up front.
- Explain the model, behavior, and constraints in prose, broken by H2/H3.
- Use diagrams or tables for relationships; link to reference pages for exact values.
- No procedure — link to the relevant how-to instead.

### reference

Purpose: precise lookup.

- Minimal prose; lead with the data.
- Tables for fields, parameters, limits, return values.
- `APIRequest` for Cloudflare API endpoints; `WranglerCommand` / `WranglerNamespace` for CLI reference.
- Keep entries scannable and consistently ordered.

### configuration

Purpose: document settings.

- Describe each setting, its effect, default, and valid values (table or definition list).
- `WranglerConfig` for Wrangler settings; `Tabs` for Dashboard vs API vs Terraform.

### troubleshooting

Purpose: resolve a problem.

- State the symptom, then the cause, then the fix.
- One entry per problem; link to the canonical reference for error codes rather than re-explaining them.

### faq

Purpose: discrete recurring questions.

- One H2 (or `Details`) per question, phrased as the reader would ask it in the body — but section headings stay statements, not questions.
- Keep answers short; link out for depth.

### example

Purpose: a copyable sample.

- Brief context: what the code does and any assumptions.
- The sample in the correct component (`TypeScriptExample`, etc.).
- Often surfaced via `ResourcesBySelector` on an examples index — set `products` frontmatter so it is discoverable.
