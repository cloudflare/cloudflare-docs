---
title: Width
description: Rules for the Width component.
---

## Rules

- If <Width> is used → **warning**: add `import { Width } from "~/components"`.
- If `<Width>` is missing the `size` prop → **warning**: `size` is required.

## Valid Sizes

`large` (75%), `medium` (50%), `small` (25%).

## Example

```mdx
import { Width } from "~/components";

<Width size="large">75% of container width</Width>
<Width size="small" center>
	25%, centered
</Width>
```

Props: `size` (required), `center` (boolean).
