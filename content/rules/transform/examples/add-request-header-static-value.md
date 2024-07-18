---
pcx_content_type: example
summary: Create a request header modification rule (part of Transform Rules) to add an `X-Source` HTTP header to the request with a static value (`Cloudflare`).
product:
  - Transform Rules
operation:
  - Request modification
title: Add request header with a static value
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