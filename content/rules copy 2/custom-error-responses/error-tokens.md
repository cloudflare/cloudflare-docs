---
title: Error tokens
pcx_content_type: reference
weight: 4
meta:
  title: Custom error response tokens
---

# Error tokens

A custom response may include the following error tokens, which will be replaced with their real values before sending the response to the visitor:

{{<table-wrap>}}

Token | Description
------|------------
`::CLIENT_IP::` | The visitor's IP address.
`::RAY_ID::` | A unique identifier given to every request that goes through Cloudflare.
`::GEO::` | The country or region associated with the visitor's IP address.

{{</table-wrap>}}