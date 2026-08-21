---
title: ExtraFlagDetails
description: Rules for the ExtraFlagDetails component.
---

## Rules

- If `ExtraFlagDetails` is used outside `WranglerCommand` → **warning**: it must be a direct child of `WranglerCommand`.
- Note: The current `WranglerCommand` implementation does not render `ExtraFlagDetails` slot content. This component exists for compatibility but its slot machinery was dropped during the Nimbus migration. Do not recommend its use in new content.

## Example

```mdx
import { WranglerCommand, ExtraFlagDetails } from "~/components";

<WranglerCommand command="deploy">
	<ExtraFlagDetails key="dry-run">
		Additional detail appended to the flag help text.
	</ExtraFlagDetails>
	<ExtraFlagDetails key="compatibility-date" mode="replace">
		Custom text that replaces the flag help text.
	</ExtraFlagDetails>
</WranglerCommand>
```
