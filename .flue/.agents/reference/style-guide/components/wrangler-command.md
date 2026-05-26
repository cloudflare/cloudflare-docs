---
title: WranglerCommand
description: Rules for the WranglerCommand component used in Wrangler reference docs.
---

## Rules

- If <WranglerCommand> is used → **warning**: add `import { WranglerCommand } from "~/components"`.
- If `<WranglerCommand>` is missing the `command` prop → **warning**: `command` is required.
- If `<ExtraFlagDetails>` is used without importing it → **warning**: add `ExtraFlagDetails` to the import.

## Example

```mdx
import { WranglerCommand, ExtraFlagDetails } from "~/components";

<WranglerCommand command="deploy" />
<WranglerCommand command="d1 execute" />

<WranglerCommand command="deploy">
	<ExtraFlagDetails key="dry-run">
		Additional detail appended to flag help text.
	</ExtraFlagDetails>
</WranglerCommand>
```

Props: `command` (required), `headingLevel` (default `2`), `description` (overrides default).
