---
title: LinkButton
description: Rules for the LinkButton component.
---

## Rules

- If <LinkButton> is used → **warning**: add `import { LinkButton } from "~/components"`.
- If `<LinkButton>` is missing the `href` prop → **warning**: `href` is required.

## Valid Variants

`primary` (default), `secondary`, `minimal`.

## Example

```mdx
import { LinkButton } from "~/components";

<LinkButton href="/workers/get-started/">Get started</LinkButton>
<LinkButton href="/workers/get-started/" variant="secondary" icon="external">
	More information
</LinkButton>
```
