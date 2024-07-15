---
pcx_content_type: example
summary: Cache TTL by status code
title: Cache TTL by status code
---

# Cache TTL by status code

{{<render file="_page-rules-migration.md">}}

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to cache responses with status code between `200` and `599` for one day for any hostname containing `example.com`:

{{<example>}}

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com")`

- **Then**:
    - **Cache eligibility**: Eligible for cache
    - **Setting**: Edge TTL
        - Use cache-control header if present, use default Cloudflare caching behavior if not
        - **Status code TTL**:
            - **Scope**: _Range_
            - **From**: _200_
            - **To**: _599_
            - **Duration**: _1 day_

{{</example>}}

