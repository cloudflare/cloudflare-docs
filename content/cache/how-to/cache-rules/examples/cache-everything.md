---
pcx_content_type: example
summary: Cache Level (Cache Everything)
title: Cache Level (Cache Everything)
layout: wide
---

# Cache Level (Cache Everything)

{{<render file="_page-rules-migration.md">}}

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to adjust cache level for any hostname containing `example.com`:

{{<example>}}

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com")`

- **Then**:
    - **Cache eligibility**: Eligible for cache

{{</example>}}
