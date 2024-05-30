---
pcx_content_type: example
summary: A Redirects Rule where the original domain was replaced with a different domain, maintaining all functionality, except for HTTP service (port 80).
tags:
  - Redirects
title: Redirect all requests from one domain to another domain
layout: wide
---

# Redirect all requests from one domain to another domain

In this example the original domain was replaced with a different domain. All functionality was maintained, except for the HTTP service (port 80) which was discontinued.

Create a Bulk Redirect List with the following URL redirect:

- **Source URL**: `example.com/`
- **Target URL**: `https://example.net/`
- **Subpath matching**: Enabled
- **Preserve query string**: Enabled

This configuration will perform the following redirects:

| Request URL                               | URL after redirect                        |
| ----------------------------------------- | ----------------------------------------- |
| `http://example.com/`                     | `https://example.net/`                    |
| `https://example.com/`                    | `https://example.net/`                    |
| `https://example.com/my/path/to/page.htm` | `https://example.net/my/path/to/page.htm` |
| `https://example.com/search?q=term`       | `https://example.net/search?q=term`       |
