---
pcx_content_type: example
summary: Query String Sort
title: Query String Sort
layout: wide
---

# Query String Sort

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to sort query string parameters for caching purposes, for any hostname containing `example.com`:

{{<example>}}

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com")`

- **Then**:
    - **Cache eligibility**: Eligible for cache
    - **Setting**: Cache key
        - **Sort query string**: On

{{</example>}}