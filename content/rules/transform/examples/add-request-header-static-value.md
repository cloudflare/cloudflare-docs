---
pcx_content_type: example
summary: A transform rule where the header `X-Source` with a static value (`Cloudflare`) is added to the request.
product:
  - Transform Rules
operation:
  - Request modification
title: Add an HTTP request header with a static value
---

# Add an HTTP request header with a static value

The following HTTP request header modification rule adds a header named `X-Source` with a static value (`Cloudflare`) to the request:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify request header**: _Set static_

**Header name**: `X-Source`

**Value**: `Cloudflare`

{{</example>}}