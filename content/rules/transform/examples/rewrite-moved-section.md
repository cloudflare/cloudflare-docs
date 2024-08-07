---
pcx_content_type: example
summary: Create a rewrite URL rule (part of Transform Rules) to rewrite everything under `/blog/<PATH>` to `/marketing/<PATH>`.
product:
  - Transform Rules
operation:
  - Rewrite URL
title: Rewrite path of moved section of a website
---

# Rewrite path of moved section of a website

To rewrite everything under `/blog/<PATH>` to `/marketing/<PATH>` you must modify the first component of the path (`/blog/`). Create a rewrite URL rule and use the [`regex_replace()`](/ruleset-engine/rules-language/functions/#function-regex_replace) function for this purpose:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/blog/")
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/blog/", "/marketing/")
```

{{</example>}}

The `regex_replace()` function matches the path component on a regular expression (`^/blog/`) and then provides a replacement for that match (`/marketing/`).