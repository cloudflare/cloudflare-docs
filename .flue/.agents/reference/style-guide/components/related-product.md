---
title: RelatedProduct
description: Rules for the RelatedProduct component used on overview pages.
---

## Rules

- If <RelatedProduct> is used → **warning**: add `import { RelatedProduct } from "~/components"`.
- If `<RelatedProduct>` is missing `header`, `href`, or `product` → **warning**: all three are required.

## Example

```mdx
import { RelatedProduct } from "~/components";

<RelatedProduct header="R2" href="/r2/" product="r2">
	Store large amounts of unstructured data without egress fees.
</RelatedProduct>
```

Props: `header` (required), `href` (required), `product` (required, slugified product name for icon lookup). Body text is the description.
