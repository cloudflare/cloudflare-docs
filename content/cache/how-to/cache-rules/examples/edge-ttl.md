---
pcx_content_type: example
summary: Edge Cache TTL
title: Edge Cache TTL
layout: wide
---

# Edge Cache TTL

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to adjust edge cache TTL for caching resources on Cloudflare edge to one day, for any hostname containing `example.com`:

{{<example>}}

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com")`

- **Then**:
    - **Cache eligibility**: Eligible for cache
    - **Setting**: Edge TTL
        - Ignore cache-control header and use this TTL
            - **Input time-to-live (TTL)**: _1 day_

{{</example>}}