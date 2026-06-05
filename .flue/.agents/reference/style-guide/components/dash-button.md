---
title: DashButton
description: Rules for the DashButton component used for dashboard deeplinks.
---

## Rules

- If the `url` value does not exist in `src/content/dash-routes/index.json` → **warning**: the build will fail for invalid routes.
- If a prose step links directly to `dash.cloudflare.com` for navigation → **suggestion**: use `<DashButton>` instead for validated deeplinks.

## Example

```mdx
import { DashButton } from "~/components";

1. Go to the **WAF** page.

   <DashButton url="/?to=/:account/application-security/waf" />

<!-- Zero Trust dashboard: -->

<DashButton url="/?to=/:account/access/ai-controls" zeroTrust />
```

Props: `url` (required), `buttonName` (optional, overrides default label), `zeroTrust` (boolean).
