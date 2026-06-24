---
title: CURL
description: Rules for the CURL component used for arbitrary curl commands.
---

## Rules

- If documenting a Cloudflare API endpoint → **suggestion**: use `<APIRequest>` instead of `<CURL>`.

## Example

```mdx
import { CURL } from "~/components";

<CURL
	url="https://api.example.com/endpoint"
	method="POST"
	json={{ key: "value" }}
/>
```

Props: `url` (required), `method` (default `GET`), `headers`, `json`, `form`, `query`, `code`.
