---
title: Details
description: Rules for the Details collapsible component.
---

## Rules

- If `<Details>` is missing a `header` prop → **warning**: `header` is required.

## Example

```mdx
import { Details } from "~/components";

<Details header="Advanced configuration">Content shown when expanded.</Details>

<!-- Open by default: -->

<Details header="Required reading" open={true}>
	Content visible without interaction.
</Details>
```

Props: `header` (required, string), `open` (optional boolean, defaults `false`), `id` (optional HTML id).
