---
pcx_content_type: example
summary: Cache Deception Armor
title: Cache Deception Armor
---

# Cache Deception Armor

{{<render file="_page-rules-migration.md">}}

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to protect against cache deception attacks for any hostname containing `example.com`:

{{<example>}}

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com")`

- **Then**:
    - **Cache eligibility**: Eligible for cache
    - **Setting**: Cache key
        - **Cache deception armor**: On

{{</example>}}