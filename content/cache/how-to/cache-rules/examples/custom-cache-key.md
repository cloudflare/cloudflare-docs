---
pcx_content_type: example
summary: Custom Cache Key
title: Custom Cache Key
layout: wide
---

# Custom Cache Key

{{<render file="_page-rules-migration.md">}}

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to set a custom cache key for all query string parameters, for any hostname containing `example.com`:

{{<example>}}

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com")`

- **Then**:
    - **Cache eligibility**: Eligible for cache
    - **Setting**: Cache key
        - **Query string**: All query string parameters

{{</example>}}
