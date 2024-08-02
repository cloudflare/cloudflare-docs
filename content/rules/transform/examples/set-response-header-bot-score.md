---
pcx_content_type: example
summary: Create a response header modification rule (part of Transform Rules) to set an `X-Bot-Score` HTTP header in the response with the current bot score.
product:
  - Transform Rules
operation:
  - Response modification
title: Set a response header with the current bot score
---

# Set an HTTP response header to the current bot score

The following HTTP response header modification rule sets a header named `X-Bot-Score` to the current bot score in the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

{{</example>}}

This rule would overwrite any existing `X-Bot-Score` headers already present in the response.