---
title: Card / LinkTitleCard / ListCard
description: Rules for Card components used on overview and navigation pages.
---

## Rules

- If `<Card>`, `<LinkTitleCard>`, or `<ListCard>` are used without importing them → **warning**: add `import { Card, LinkTitleCard, ListCard } from "~/components"`.
- If `<Card>` is missing `title` → **warning**: `title` is required.
- If `<LinkTitleCard>` is missing `title` or `href` → **warning**: both are required.

## Example

```mdx
import { Card, LinkTitleCard, ListCard } from "~/components";

<Card title="Check this out" icon="puzzle">
	Interesting content to highlight.
</Card>

<LinkTitleCard title="Get started" icon="rocket" href="/workers/get-started/">
	Deploy your first Worker in minutes.
</LinkTitleCard>

<ListCard title="Resources" icon="open-book">
	- [Docs](/workers/) - [API reference](/api/)
</ListCard>
```
