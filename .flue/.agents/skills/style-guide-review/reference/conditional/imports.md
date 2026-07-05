---
title: Component Imports
description: Rules for importing and using MDX components.
---

## Rules

- If an import uses any path other than `~/components` → **warning**: all components must import from `~/components`.
- If imports are unused (imported but no corresponding tag in the patch) → **suggestion**: remove unused imports.

## Import Pattern

```mdx
import { ComponentA, ComponentB } from "~/components";
```

Multiple components can be imported in a single statement.
