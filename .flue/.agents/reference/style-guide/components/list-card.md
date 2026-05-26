---
title: ListCard
description: Rules for the ListCard component.
---

## Rules

- If `ListCard` is used → import it from `~/components`.
- If `ListCard` is missing `title` → **warning**: `title` is required.
- If list items include internal links → use root-relative paths with trailing slashes.

## Example

```mdx
import { ListCard } from "~/components";

<ListCard title="Resources" icon="open-book">
	- [Docs](/workers/) - [API reference](/api/)
</ListCard>
```
