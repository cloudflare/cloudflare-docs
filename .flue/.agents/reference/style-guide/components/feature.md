---
title: Feature
description: Rules for the Feature component used on product overview pages.
---

## Rules

- If <Feature> is used → **warning**: add `import { Feature } from "~/components"`.
- If `<Feature>` is missing `header` or `href` → **warning**: both are required.

## Example

```mdx
import { Feature } from "~/components";

<Feature header="Durable Objects" href="/durable-objects/">
	Coordinate state and logic across Workers with strongly consistent storage.
</Feature>
```

Props: `header` (required, feature name), `href` (required). Body text is the feature description.
