---
title: AnchorHeading
description: Rules for the AnchorHeading component.
---

## Rules

- If `<AnchorHeading>` is used in a regular MDX file → **suggestion**: in regular MDX, headings get anchors automatically. Use an inline comment to override the anchor ID instead: `## My heading {/* custom-anchor */}`.

## Example

```mdx
import { AnchorHeading } from "~/components";

<AnchorHeading
	title="How to use AnchorHeading"
	slug="use-anchorheading"
	depth={2}
/>
```

Props: `title` (required), `slug` (required, custom anchor ID), `depth` (heading level, e.g. `2` for H2).
