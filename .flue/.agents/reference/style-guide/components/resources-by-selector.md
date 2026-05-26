---
title: ResourcesBySelector
description: Rules for the ResourcesBySelector component.
---

## Rules

- If <ResourcesBySelector> is used → **warning**: add `import { ResourcesBySelector } from "~/components"`.
- If `<ResourcesBySelector>` is missing the `directory` prop → **warning**: `directory` is required.

## Example

```mdx
import { ResourcesBySelector } from "~/components";

<ResourcesBySelector
	directory="workers/examples/"
	types={["example"]}
	filterables={["tags"]}
/>
```

Props: `directory` (required, relative to `src/content/docs/`), `types`, `filterables`, `tags`, `products`, `showDescriptions` (boolean, default `true`), `showLastUpdated` (boolean, default `false`).
