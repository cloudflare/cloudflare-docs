---
title: Plan
description: Rules for the Plan component used to show plan availability.
---

## Rules

- If <Plan> is used → **warning**: add `import { Plan } from "~/components"`.
- If `<Plan>` has no `type` or `id` prop → **warning**: one of `type` or `id` is required.

## Valid `type` Values

`all`, `paid`, `pro`, `business`, `add-on`, `ent-add-on`, `workers-all`, `workers-paid`.

## Example

```mdx
import { Plan } from "~/components";

<Plan type="all" />
<Plan type="pro" />
<Plan id="web3.ethereum.properties.availability.summary" />
```
