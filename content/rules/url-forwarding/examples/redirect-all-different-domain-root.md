---
pcx_content_type: example
summary: Create a redirect rule to redirect all URLs for a domain to point to the root of a new domain, including any subdomains of the old domain.
product:
  - Redirect Rules
title: Redirect all requests for a domain to the root page of different domain
---

# Redirect all requests for a domain to the root page of different domain

In this example, an old website was discontinued and replaced by a new one in a different domain. The functionality is different, and all URLs should now point to the root of the new domain. The same applies to any subdomains of the old domain.

1. Create a Bulk Redirect List with the following URL redirect:

    - **Source URL**: `example.com/`
    - **Target URL**: `https://example.net/`
    - **Subpath matching**: Enabled
    - **Include subdomains**: Enabled
    - **Preserve path suffix**: Disabled

2. Create a Bulk Redirect Rule that enables this list.

This configuration will perform the following redirects:

| Request URL                               | URL after redirect     |
| ----------------------------------------- | ---------------------- |
| `http://example.com/`                     | `https://example.net/` |
| `https://example.com/`                    | `https://example.net/` |
| `https://subdomain.example.com/`          | `https://example.net/` |
| `https://example.com/my/path/to/page.htm` | `https://example.net/` |
| `https://example.com/search?q=term`       | `https://example.net/` |