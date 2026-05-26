---
title: AvailableNotifications
description: Rules for the AvailableNotifications component.
---

## Rules

- If <AvailableNotifications> is used → **warning**: add `import { AvailableNotifications } from "~/components"`.
- If `<AvailableNotifications>` is missing the `product` prop → **warning**: `product` is required.

## Example

```mdx
import { AvailableNotifications } from "~/components";

<AvailableNotifications product="dns" />
<AvailableNotifications
	product="dns"
	notificationFilter="Secondary DNS all Primaries Failing"
/>
```

Props: `product` (required), `notificationFilter` (optional, filter to a specific notification type by name).
