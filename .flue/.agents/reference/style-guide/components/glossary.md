---
title: Glossary
description: Rules for the Glossary component used on glossary pages.
---

## Rules

- If <Glossary> is used → **warning**: add `import { Glossary } from "~/components"`.
- If `<Glossary>` is missing the `product` prop → **warning**: `product` is required.
- If a glossary page is missing `pcx_content_type: glossary` in frontmatter → **suggestion**: add it.

## Example

```mdx
import { Glossary } from "~/components";

<Glossary product="dns" />
```

Props: `product` (required, matches a file in `src/content/glossary/{product}.yaml`).
