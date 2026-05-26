---
title: ExtraFlagDetails
description: Rules for the ExtraFlagDetails component used inside WranglerCommand.
---

## Rules

- If `ExtraFlagDetails` is used outside `WranglerCommand` → **warning**: it must be a direct child of `WranglerCommand`.
- If `ExtraFlagDetails` is missing `key` → **warning**: `key` is required.
- If replacing generated flag help text → use `mode="replace"`.

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
