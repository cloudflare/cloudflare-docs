---
title: APIRequest
description: Rules for the APIRequest component used to generate curl commands from the Cloudflare OpenAPI schema.
---

## Rules

- If documenting a Cloudflare API endpoint with a raw `curl` example instead of `<APIRequest>` → **suggestion**: use `<APIRequest>` for Cloudflare API endpoints to get auto-generated auth tokens and consistent formatting.

## Example

```mdx
import { APIRequest } from "~/components";

<APIRequest
	path="/zones/{zone_id}/page_shield/scripts"
	method="GET"
	parameters={{ direction: "asc" }}
/>
```

Props: `path` (required), `method` (required), `parameters` (URL path + query substitutions), `json` (JSON body), `form` (FormData body), `roles`, `code`.
