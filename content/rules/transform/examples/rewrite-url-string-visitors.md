---
pcx_content_type: example
summary: Create a transform rule to rewrite the request path from `/blog` to `/blog?sort-by=date`.
product:
  - Transform Rules
operation:
  - Rewrite URL
title: Rewrite URL query string
---

# Rewrite URL query string of blog visitors

To rewrite a request to the `/blog` path to `/blog?sort-by=date`, create a rewrite URL rule with the following settings:

{{<example>}}

Text in **Expression Editor**:

```txt
http.request.uri.path == "/blog"
```

Text after **Query** > **Rewrite to...** > _Static_:

```txt
sort-by=date
```

{{</example>}}

Additionally, set the path rewrite action of the same rule to _Preserve_ so that the URL path does not change.