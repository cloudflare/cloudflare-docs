---
title: ProductAvailabilityText
description: Rules for the ProductAvailabilityText component.
---

## Rules

- If <ProductAvailabilityText> is used → **warning**: add `import { ProductAvailabilityText } from "~/components"`.
- If `<ProductAvailabilityText>` is missing the `product` prop → **warning**: `product` is required.

## Example

```mdx
import { ProductAvailabilityText } from "~/components";

Cloud Connector <ProductAvailabilityText product="cloud-connector" /> lets you route traffic.
```

Props: `product` (required, slug matching `src/content/directory/`), `parentheses` (string `"true"`/`"false"`, default `"true"`).
