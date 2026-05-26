---
title: GlossaryDefinition
description: Rules for the GlossaryDefinition component.
---

## Rules

- If <GlossaryDefinition> is used → **warning**: add `import { GlossaryDefinition } from "~/components"`.
- If `<GlossaryDefinition>` is missing the `term` prop → **warning**: `term` is required.

## Example

```mdx
import { GlossaryDefinition } from "~/components";

<GlossaryDefinition term="active-zone" prepend="An active zone is " />
```

Props: `term` (required), `prepend` (optional).
