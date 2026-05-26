---
title: ExternalResources
description: Rules for the ExternalResources component.
---

## Rules

- If <ExternalResources> is used → **warning**: add `import { ExternalResources } from "~/components"`.
- If `<ExternalResources>` is missing the `type` prop → **warning**: `type` is required (currently only `"apps"` is supported).

## Example

```mdx
import { ExternalResources } from "~/components";

<ExternalResources type="apps" tags={["AI"]} products={["Workers"]} />
```

Props: `type` (required, `"apps"`), `tags` (string array), `products` (string array), `cloudflareOnly` (boolean, default `true`).
