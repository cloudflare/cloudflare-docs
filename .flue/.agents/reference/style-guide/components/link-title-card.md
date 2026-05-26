---
title: LinkTitleCard
description: Rules for the LinkTitleCard component.
---

## Rules

- If `LinkTitleCard` is used → import it from `~/components`.
- If `LinkTitleCard` is missing `title` or `href` → **warning**: both are required.
- If `href` points to an internal docs page → use a root-relative path with trailing slash.

## Example

```mdx
import { LinkTitleCard } from "~/components";

<LinkTitleCard title="Get started" icon="rocket" href="/workers/get-started/">
	Deploy your first Worker in minutes.
</LinkTitleCard>
```
