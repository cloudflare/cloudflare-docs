---
title: TabItem
description: Rules for the TabItem component used inside Tabs.
---

## Rules

- If `TabItem` is used → import it from `~/components`.
- If `TabItem` is used outside `Tabs` → **warning**: `TabItem` must be a child of `Tabs`.
- If `TabItem` is missing `label` → **warning**: `label` is required.

## Example

```mdx
import { Tabs, TabItem } from "~/components";

<Tabs syncKey="dashPlusAPI">
	<TabItem label="Dashboard">Dashboard instructions</TabItem>
	<TabItem label="API">API instructions</TabItem>
</Tabs>
```
