---
pcx_content_type: example
summary: Create a request header modification rule (part of Transform Rules) to remove the `cf-connecting-ip` HTTP header from the request.
product:
  - Transform Rules
operation:
  - Request modification
title: Remove a request header
---

# Remove an HTTP request header

The following HTTP request header modification rule removes the `cf-connecting-ip` header from the request:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/private/")
```

Selected operation under **Modify request header**: _Remove_

**Header name**: `cf-connecting-ip`

{{</example>}}
