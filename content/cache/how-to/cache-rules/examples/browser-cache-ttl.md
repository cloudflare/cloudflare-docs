---
pcx_content_type: example
summary: Browser Cache TTL
title: Browser Cache TTL
---

# Browser Cache TTL

{{<render file="_page-rules-migration.md">}}

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to adjust browser cache TTL for caching resources in the browser to one day for any hostname containing `example.com`:

{{<example>}}

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com")`

- **Then**:
    - **Cache eligibility**: Eligible for cache
    - **Browser TTL**: Override origin and use this TTL
    - **Input time-to-live (TTL)**: _1 day_

{{</example>}}