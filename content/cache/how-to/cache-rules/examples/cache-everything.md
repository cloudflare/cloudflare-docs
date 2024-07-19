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

{{<Aside type="warning">}}
This option caches all HTML regardless of the presence of dynamic content. If you use this approach to cache pages containing dynamic content, visitors may receive information not intended for them. To avoid caching dynamic content, you can add a condition to check for the presence of a cookie. For more information, refer to [Bypass Cache on Cookie](/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/).
{{</Aside>}}

