---
title: Component Imports
description: Rules for importing and using MDX components.
---

## Rules

- Components exported from the `~/components` barrel must be imported from `~/components`, not via a deep path (e.g. `~/components/ui/tabs.astro`). If a barrel-exported component is imported via a deep path → **warning**.
- Page-specific wrapper components or one-off components that are **not** exported from the `~/components` barrel may be imported via a deep path (e.g. `~/components/models/AIModelCatalog.astro`). These do not belong in the barrel. Deep imports for non-barrel components are allowed and should **not** be flagged.
- Exception: `SubtractIPCalculator` is exported from `~/components` and should be imported from there. The direct path `~/components/SubtractIPCalculator.tsx` is a legacy shim and should not be used in new content.

## Import Pattern

```mdx
import { ComponentA, ComponentB } from "~/components";
```

Multiple components can be imported in a single statement.

For page-specific wrapper components not in the barrel:

```mdx
import AIModelCatalog from "~/components/models/AIModelCatalog.astro";
```
