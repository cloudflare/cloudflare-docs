---
pcx_content_type: example
summary: You can use the example below for a demo Transform rule where a header named `X-Bot-Score` is set to the current bot score in the response.
tags:
  - Transform
title: Set an HTTP response header to the current bot score
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