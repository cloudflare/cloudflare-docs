---
pcx_content_type: example
product: Rules
title: Remove an HTTP response header
---
# Remove an HTTP response header

The following HTTP response header modification rule removes the `cf-connecting-ip` header from the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/private/")
```

Selected operation under **Modify response header**: _Remove_

**Header name**: `cf-connecting-ip`

{{</example>}}
