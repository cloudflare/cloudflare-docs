---
title: Badge
description: Rules for the Badge component used in page headings.
---

## Rules

- If <Badge> is used → **warning**: add `import { Badge } from "~/components"`.
- If both `text` and `variant` props are not provided → **warning**: both are required.

## Valid Variants

`note` (blue), `tip` (purple), `caution` (orange), `danger` (red), `success` (green).

## Example

```mdx
import { Badge } from "~/components";

<Badge text="Beta" variant="caution" />
<Badge text="New" variant="tip" />
```

Can also be added via frontmatter (no import needed):

```yaml
sidebar:
  badge:
    text: Beta
    variant: caution
```
