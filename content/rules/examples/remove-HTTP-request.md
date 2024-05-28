---
pcx_content_type: example
product: Rules
title: Remove an HTTP request header
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
