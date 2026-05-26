---
title: ProductChangelog
description: Rules for the ProductChangelog component.
---

## Rules

- If <ProductChangelog> is used → **warning**: add `import { ProductChangelog } from "~/components"`.
- If `<ProductChangelog>` has both `product` and `area` props → **warning**: `product` and `area` are mutually exclusive.

## Example

```mdx
import { ProductChangelog } from "~/components";

<ProductChangelog product="workers" />
<ProductChangelog area="platform" />
```

Props: `product` and `area` (mutually exclusive), `hideEntry` (string), `scheduled` (boolean, default `false`).
