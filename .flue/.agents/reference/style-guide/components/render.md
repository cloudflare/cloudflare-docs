---
title: Render
description: Rules for the Render component used to embed MDX partials.
---

## Rules

- If a partial defines required `params` and the `<Render>` call does not supply them → **warning**: all required params must be provided.

## Example

```mdx
import { Render } from "~/components";

<Render file="partial-name" product="workers" />

<!-- With parameters: -->

<Render file="partial-name" product="workers" params={{ key: "value" }} />
```

Props: `file` (required, partial filename without extension), `product` (required, product slug matching `src/content/partials/{product}/`), `params` (optional object).
