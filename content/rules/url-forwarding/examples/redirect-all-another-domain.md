---
pcx_content_type: example
summary: Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).
product:
  - Redirect Rules
title: Redirect all requests from one domain to another
---

# Redirect all requests from one domain to another domain

In this example the original domain was replaced with a different domain. All functionality was maintained, except for the HTTP service (port 80) which was discontinued.

1. Create a Bulk Redirect List with the following URL redirect:

- **Source URL**: `example.com/`
- **Target URL**: `https://example.net/`
- **Subpath matching**: Enabled
- **Preserve query string**: Enabled

2. Create a Bulk Redirect Rule that enables this list.

This configuration will perform the following redirects:

| Request URL                               | URL after redirect                        |
| ----------------------------------------- | ----------------------------------------- |
| `http://example.com/`                     | `https://example.net/`                    |
| `https://example.com/`                    | `https://example.net/`                    |
| `https://example.com/my/path/to/page.htm` | `https://example.net/my/path/to/page.htm` |
| `https://example.com/search?q=term`       | `https://example.net/search?q=term`       |
