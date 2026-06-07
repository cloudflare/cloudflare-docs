---
title: Frontmatter
description: Rules for MDX page frontmatter fields.
---

## Description

- If a file has a `pcx_content_type` set and no `description:` field → **warning**: `description` is required when `pcx_content_type` is set.

## pcx_content_type

Valid values: `changelog`, `concept`, `configuration`, `design-guide`, `example`, `faq`, `get-started`, `how-to`, `integration-guide`, `implementation-guide`, `learning-unit`, `navigation`, `overview`, `reference`, `reference-architecture`, `reference-architecture-diagram`, `release-notes`, `solution-guide`, `troubleshooting`, `tutorial`, `video`.

- If `pcx_content_type` value is not in the above list → **warning**: use a valid value.

## reviewed Date

- Do not flag a stale or missing `reviewed:` date — this is explicitly excluded from review.

## Tags

- If a tag value is not in the site's allowlist (`src/schemas/tags.ts`) → **warning**: use only validated tags. Common valid tags include `JavaScript`, `Workers`, `TypeScript`, `Python`, `Rust`, `Go`.

## Sidebar

- If `sidebar.label:` contains an emoji → **warning**: remove it.
