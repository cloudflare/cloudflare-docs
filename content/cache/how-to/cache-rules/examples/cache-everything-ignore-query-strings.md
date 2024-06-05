---
pcx_content_type: example
summary: Cache Everything while ignoring query strings
title: Cache Everything while ignoring query strings
layout: wide
---

# Cache Everything while ignoring query strings

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to adjust cache level for any hostname containing `example.com`:

<div class="DocsMarkdown--example">

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com")`

- **Then**:
    - **Cache eligibility**: Eligible for cache
    - **Setting**: Cache key
        - **Query string**: Ignore query string

</div>