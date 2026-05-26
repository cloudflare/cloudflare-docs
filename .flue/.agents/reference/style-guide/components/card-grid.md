---
title: CardGrid
description: Rules for the CardGrid component.
---

## Rules

- If `CardGrid` is used → import it from `~/components`.
- If `CardGrid` wraps cards → keep each card concise and parallel in structure.
- If cards link to internal docs pages → use root-relative paths with trailing slashes.

## Example

```mdx
import { CardGrid, LinkCard } from "~/components";

<CardGrid>
	<LinkCard title="Workers" description="..." href="/workers/" />
	<LinkCard title="Pages" description="..." href="/pages/" />
</CardGrid>
```
