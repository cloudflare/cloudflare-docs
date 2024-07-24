---
pcx_content_type: example
summary: Create a response header modification rule (part of Transform Rules) to add a `set-cookie` HTTP header to the response with a static value (`cookiename=value`).
product:
  - Transform Rules
operation:
  - Response modification
title: Add a response header with a static value
---

# Add an HTTP response header with a static value

The following HTTP response header modification rule adds a header named `set-cookie` with a static value (`cookiename=value`) to the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Add_

**Header name**: `set-cookie`

**Value**: `cookiename=value`

{{</example>}}

This rule would keep any existing `set-cookie` headers already present in the response.