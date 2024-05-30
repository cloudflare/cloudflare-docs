---
pcx_content_type: example
summary: A Transform Rule where `/images/<FOLDER1>/<FOLDER2>/<FILENAME>` is rewritten to `/img/<FILENAME>`.
tags:
  - Transform
title: Rewrite path with several URL segments to a different URL segment
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