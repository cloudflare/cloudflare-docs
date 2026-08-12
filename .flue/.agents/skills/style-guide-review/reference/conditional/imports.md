---
title: Component Imports
description: Rules for importing and using MDX components.
---

## Rules

- Reusable components must be added to the `~/components` barrel export (`src/components.ts`) and imported from `~/components`. If a reusable component is imported via a deep path instead of from the barrel → **warning**.
- Page-specific wrapper components or one-off components may be imported via a deep path (e.g. `~/components/BaseSchemaProperties.astro`) instead of adding to the barrel. Deep imports for these components are allowed and should **not** be flagged.
- Exception: `SubtractIPCalculator` is exported from `~/components` and should be imported from there. The direct path `~/components/SubtractIPCalculator.tsx` is a legacy shim and should not be used in new content.

## Import Pattern

```mdx
import { ComponentA, ComponentB } from "~/components";
```

Multiple components can be imported in a single statement.

For page-specific wrapper components not in the barrel:

```mdx
import BaseSchemaProperties from "~/components/BaseSchemaProperties.astro";
```
