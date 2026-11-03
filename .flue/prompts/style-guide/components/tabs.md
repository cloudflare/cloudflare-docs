---
title: Tabs / TabItem
description: Rules for the Tabs and TabItem components.
---

## Rules

- If tabs are nested inside other tabs → do not nest tabs — restructure into separate headings instead.
- If the first tab is not the "primary answer" or most common path → the primary answer should be the first tab, visible without interaction.

## Standard syncKey Values

- `dashPlusAPI` — Dashboard / API / Terraform tabs (syncs selection across the page)
- `workersExamples` — JavaScript / TypeScript / Python / Rust tabs

## Example

```mdx
import { Tabs, TabItem } from "~/components";

<Tabs syncKey="dashPlusAPI">
	<TabItem label="Dashboard">Dashboard instructions</TabItem>
	<TabItem label="API">API instructions</TabItem>
	<TabItem label="Terraform">Terraform instructions</TabItem>
</Tabs>
```
