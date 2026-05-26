---
title: WranglerNamespace
description: Rules for the WranglerNamespace component.
---

## Rules

- If <WranglerNamespace> is used → **warning**: add `import { WranglerNamespace } from "~/components"`.
- If `<WranglerNamespace>` is missing the `namespace` prop → **warning**: `namespace` is required.

## Example

```mdx
import { WranglerNamespace } from "~/components";

<WranglerNamespace namespace="d1" />
```

Props: `namespace` (required), `headingLevel` (default `2`).
