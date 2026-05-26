---
title: PagesBuildPreset
description: Rules for the PagesBuildPreset component.
---

## Rules

- If <PagesBuildPreset> is used → **warning**: add `import { PagesBuildPreset } from "~/components"`.
- If `<PagesBuildPreset>` is missing the `framework` prop → **warning**: `framework` is required.

## Example

```mdx
import { PagesBuildPreset } from "~/components";

<PagesBuildPreset framework="next-js" />
```

Props: `framework` (required, framework slug).
