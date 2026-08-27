---
title: Markdown
description: Rules for the Markdown component used to render Markdown strings in JSX contexts.
---

## Rules

- If `<Markdown>` is used outside a JSX or partial context → **suggestion**: use standard Markdown prose instead; `<Markdown>` is primarily for rendering variables passed into partials.

## Example

```mdx
import { Markdown } from "~/components";

<Markdown text="**bold** and [a link](/path/)" />

<!-- In a partial, for a formatted variable: -->

<Markdown text={props.instructions} />
```

Limitations: no MDX features, no Astro image optimization, no syntax highlighting, no heading IDs.
