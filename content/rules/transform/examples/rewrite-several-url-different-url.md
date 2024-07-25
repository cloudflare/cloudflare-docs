---
pcx_content_type: example
summary: Create a rewrite URL rule (part of Transform Rules) to rewrite any requests for `/images/<FOLDER1>/<FOLDER2>/<FILENAME>` to `/img/<FILENAME>`.
product:
  - Transform Rules
operation:
  - Rewrite URL
title: Rewrite image paths with several URL segments
---

# Rewrite path with several URL segments to a different URL segment

To rewrite paths like `/images/<FOLDER1>/<FOLDER2>/<FILENAME>` — where `<FOLDER1>`, `<FOLDER2>`, and `<FILENAME>` can vary — to `/img/<FILENAME>`, create a rewrite URL rule with a dynamic rewrite of the path component:

{{<example>}}

Text in **Expression Editor**:

```txt
http.request.uri.path ~ "^/images/[^/]+/[^/]+/[^/]+$"
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/images/[^/]+/[^/]+/(.+)$", "/img/${1}")
```

{{</example>}}

For example, this rule would rewrite the `/images/nature/animals/tiger.png` path to `/img/tiger.png`.