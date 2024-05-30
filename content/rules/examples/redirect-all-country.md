---
pcx_content_type: example
summary: A Redirects Rule where all website visitors from the United Kingdom are redirected to a different domain, but current functionality is maintained in the same paths.
tags:
  - Redirects
title: Redirect all requests from one country to another domain
layout: wide
---

# Redirect all requests from one country to another domain

In this example, all website visitors from the United Kingdom will be redirected to a different domain, but maintaining current functionality in the same paths.

1. Create a Bulk Redirect List named `uk_redirect_list` with the following URL redirect:

    - **Source URL**: `https://example.com/`
    - **Target URL**: `https://example.co.uk/`
    - **Subpath matching**: Enabled
    - **Preserve query string**: Enabled

2. Create a Bulk Redirect Rule that enables the previous Bulk Redirect List and set the rule expression to the following:

    ```txt
    ip.src.country == "GB" and http.request.full_uri in $uk_redirect_list
    ```

This configuration will perform the following redirects for UK visitors:

| Request URL                               | URL after redirect                          |
| ----------------------------------------- | ------------------------------------------- |
| `https://example.com/`                    | `https://example.co.uk/`                    |
| `https://example.com/my/path/to/page.htm` | `https://example.co.uk/my/path/to/page.htm` |
| `https://example.com/search?q=term`       | `https://example.co.uk/search?q=term`       |
