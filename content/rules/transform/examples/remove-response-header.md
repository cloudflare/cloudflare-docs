---
pcx_content_type: example
summary: Create a response header modification rule (part of Transform Rules) to remove the `cf-connecting-ip` HTTP header from the response.
product:
  - Transform Rules
operation:
  - Response modification
title: Remove a response header
---

# Remove a response header

The following HTTP response header modification rule removes the `cf-connecting-ip` header from the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/private/")
```

Selected operation under **Modify response header**: _Remove_

**Header name**: `cf-connecting-ip`

{{</example>}}
