---
pcx_content_type: example
summary: Bypass Cache on Cookie
title: Bypass Cache on Cookie
---

# Bypass Cache on Cookie

[Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to bypass cache for requests containing cookie `test_cookie` for any hostname containing `example.com`:

<div class="DocsMarkdown--example">

- **When incoming requests match**: Custom filter expression
    - Using the Expression Builder:<br>
        `Hostname contains "example.com" AND Cookie contains "test-cookie"`
    - Using the Expression Editor:<br>
        `(http.host contains "example.com" and http.cookie contains "test-cookie")`

- **Then**:
    - **Cache eligibility**: Bypass cache

</div>
