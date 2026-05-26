---
title: GlossaryTooltip
description: Rules for the GlossaryTooltip component.
---

## Rules

- If <GlossaryTooltip> is used → **warning**: add `import { GlossaryTooltip } from "~/components"`.
- If `<GlossaryTooltip>` is missing the `term` prop → **warning**: `term` is required.

## Example

```mdx
import { GlossaryTooltip } from "~/components";

<GlossaryTooltip term="active-zone">active zone</GlossaryTooltip>

<!-- With prepended text: -->

<GlossaryTooltip term="active-zone" prepend="An ">
	active zone
</GlossaryTooltip>

<!-- With a link: -->

<GlossaryTooltip term="active-zone" link="/dns/glossary/">
	active zone
</GlossaryTooltip>
```

Props: `term` (required, matches a YAML entry key in `src/content/glossary/`), `prepend` (optional text), `link` (optional, wraps inner text in a link).
