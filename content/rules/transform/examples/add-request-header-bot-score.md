---
pcx_content_type: example
summary: Create a request header modification rule (part of Transform Rules) to add a `X-Bot-Score` HTTP header to the request with the current bot score.
product:
  - Transform Rules
operation:
  - Request modification
title: Add a request header with the current bot score
---

# Add an HTTP request header with the current bot score

The following HTTP request header modification rule adds a header named `X-Bot-Score` with the current bot score to the request:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

{{</example>}}
