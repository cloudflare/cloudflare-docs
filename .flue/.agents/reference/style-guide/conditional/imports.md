---
title: Component Imports
description: Rules for importing and using MDX components.
---

## Rules

- If an import uses any path other than `~/components` → **warning**: all components must import from `~/components`.
- If a component tag is used (e.g. `<Steps>`, `<Details>`, `<TypeScriptExample>`) and the patch does not include a matching import → **warning**: add the import.
- If imports appear before the frontmatter block → **warning**: imports must appear after the frontmatter, before any prose.
- If imports are unused (imported but no corresponding tag in the patch) → **suggestion**: remove unused imports.

## Import Pattern

```mdx
import { ComponentA, ComponentB } from "~/components";
```

Multiple components can be imported in a single statement.
