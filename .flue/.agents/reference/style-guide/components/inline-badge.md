---
title: InlineBadge
description: Rules for the InlineBadge component.
---

## Rules

- If <InlineBadge> is used → **warning**: add `import { InlineBadge } from "~/components"`.
- If `<InlineBadge>` is added in a heading → **suggestion**: prefer mentioning status (beta, alpha) in prose or use `Badge` in the page heading area instead.

## Valid Presets

`beta` (orange), `alpha` (green), `deprecated` (red), `early-access` (blue), `legacy` (red).

## Example

```mdx
import { InlineBadge } from "~/components";

<InlineBadge preset="beta" />
<InlineBadge text="Custom text" />
```
