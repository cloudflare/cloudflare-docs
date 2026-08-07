---
title: Component Imports
description: Rules for importing and using MDX components.
---

## Rules

- If an import uses any path other than `~/components` → **warning**: all components must import from `~/components`.
- Exception: `SubtractIPCalculator` is exported from `~/components` and should be imported from there. The direct path `~/components/SubtractIPCalculator.tsx` is a legacy shim and should not be used in new content.

## Import Pattern

```mdx
import { ComponentA, ComponentB } from "~/components";
```

Multiple components can be imported in a single statement.
