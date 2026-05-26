---
title: RuleID
description: Rules for the RuleID component.
---

## Rules

- If <RuleID> is used → **warning**: add `import { RuleID } from "~/components"`.
- If `<RuleID>` is missing the `id` prop → **warning**: `id` is required.

## Example

```mdx
import { RuleID } from "~/components";

<RuleID id="abcdefghijklmnopqrstuvwxyz" />
```
