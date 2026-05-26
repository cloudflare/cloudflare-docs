---
title: Description
description: Rules for the Description component.
---

## Rules

- If <Description> is used → **warning**: add `import { Description } from "~/components"`.
- If `<Description>` is used where the `summary` frontmatter field would suffice → **suggestion**: prefer `summary` frontmatter for most use cases; use `<Description>` only when the description must appear conditionally or within a component.

## Example

```mdx
import { Description } from "~/components";

<Description>A short description rendered below the page title.</Description>
```
