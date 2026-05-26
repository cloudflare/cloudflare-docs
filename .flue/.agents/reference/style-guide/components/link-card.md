---
title: LinkCard / CardGrid
description: Rules for the LinkCard and CardGrid Starlight components.
---

## Rules

- If `<LinkCard>` or `<CardGrid>` are used without importing them → **warning**: add `import { LinkCard, CardGrid } from "~/components"`.
- If `<LinkCard>` is missing `title`, `description`, or `href` → **warning**: all three are required.

## Example

```mdx
import { LinkCard, CardGrid } from "~/components";

<LinkCard
	title="Get started"
	description="Deploy your first Worker in minutes."
	href="/workers/get-started/"
/>

<CardGrid>
	<LinkCard title="Workers" description="..." href="/workers/" />
	<LinkCard title="Pages" description="..." href="/pages/" />
</CardGrid>
```
