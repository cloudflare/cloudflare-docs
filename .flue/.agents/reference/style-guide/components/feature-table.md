---
title: FeatureTable
description: Rules for the FeatureTable component.
---

## Rules

- If <FeatureTable> is used → **warning**: add `import { FeatureTable } from "~/components"`.
- If `<FeatureTable>` is missing the `id` prop → **warning**: `id` is required (dot-notation path into `src/content/plans/`).

## Example

```mdx
import { FeatureTable } from "~/components";

<FeatureTable id="analytics.logpush" />
```

Props: `id` (required, e.g. `analytics.logpush`), `skipAvailability` (boolean string `"true"`/`"false"`).
