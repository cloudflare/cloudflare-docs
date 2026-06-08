---
title: Stream
description: Rules for the Stream component used to embed Cloudflare Stream videos.
---

## Rules

- If `<Stream>` uses neither `id` nor `file` prop → **warning**: one is required.
- If `<Stream>` uses `id` but is missing `title` → **warning**: `title` is required when using `id`.
- If `<Stream>` uses both `id` and `file` → **warning**: `id`/`title`/`thumbnail`/`chapters` are mutually exclusive with `file`.

## Example

```mdx
import { Stream } from "~/components";

<!-- By video ID: -->

<Stream id="86f22d1f760b77cdc349f89b25b63c3e" title="Video title" />

<!-- By stream collection file: -->

<Stream file="warp-1-basics" />
```
