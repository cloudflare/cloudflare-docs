---
title: WranglerConfig
description: Rules for the WranglerConfig component used in Wrangler config examples.
---

## Rules

- If a ` ```toml ` fence containing Wrangler config fields (`name =`, `compatibility_date =`, `[vars]`, `[[kv_namespaces]]`, etc.) → **warning**: use `<WranglerConfig>` instead of a bare fence.
- If `compatibility_date` inside `<WranglerConfig>` is a hardcoded date string → **warning**: use `$today` instead — it is replaced with the current date at build time.
- Always provide TOML as input; JSON is auto-generated.
- If using `removeSchema` prop → it omits the `$schema` line from JSON output (useful for snippets).

## Example

````mdx
import { WranglerConfig } from "~/components";

<WranglerConfig>
	```toml
	name = "my-worker"
	main = "src/index.ts"
	compatibility_date = "$today"
	```
</WranglerConfig>
````
