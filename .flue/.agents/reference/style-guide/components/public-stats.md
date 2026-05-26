---
title: PublicStats
description: Rules for the PublicStats component.
---

## Rules

- If <PublicStats> is used → **warning**: add `import { PublicStats } from "~/components"`.
- If `<PublicStats>` is missing the `id` prop → **warning**: `id` is required. Available IDs are defined in `src/components/PublicStats.astro`.

## Example

```mdx
import { PublicStats } from "~/components";

Cloudflare has data centers in <PublicStats id="data_center_cities" />.
```
