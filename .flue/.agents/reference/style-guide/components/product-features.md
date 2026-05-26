---
title: ProductFeatures
description: Rules for the ProductFeatures component.
---

## Rules

- If <ProductFeatures> is used → **warning**: add `import { ProductFeatures } from "~/components"`.
- If `<ProductFeatures>` is missing the `id` prop → **warning**: `id` is required.

## Example

```mdx
import { ProductFeatures } from "~/components";

<ProductFeatures id="dns" />
```

Props: `id` (required, product key in `src/content/plans/`).
