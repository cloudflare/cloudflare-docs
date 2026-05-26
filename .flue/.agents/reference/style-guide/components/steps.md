---
title: Steps
description: Rules for the Steps component used in procedures.
---

## Rules

- If a multi-step procedure uses a numbered list without `<Steps>` on a how-to or tutorial page → **suggestion**: wrap in `<Steps>` for visual step rendering.
- If `<Steps>` wraps a bulleted list instead of a numbered list → **warning**: `<Steps>` must wrap a numbered Markdown list.

## Example

```mdx
import { Steps } from "~/components";

<Steps>
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **DNS** > **Records**.
3. Select **Add record**.
</Steps>
```
