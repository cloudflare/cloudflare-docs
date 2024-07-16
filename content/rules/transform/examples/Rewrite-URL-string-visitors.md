---
pcx_content_type: example
summary: A transform rule where a request to the `/blog` path is rewritten to `/blog?sort-by=date`.
product:
  - Transform Rules
operation:
  - Redirect
title: Rewrite URL query string of blog visitors
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