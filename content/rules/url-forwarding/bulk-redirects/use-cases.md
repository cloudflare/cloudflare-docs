---
title: Use cases
pcx_content_type: configuration
weight: 8
meta:
  title: Common Bulk Redirect use cases
---

# Common Bulk Redirect use cases

The following use cases go through example Bulk Redirect Rule configurations and sample request URLs.

## Redirect all requests from one domain to another domain

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

## Redirect all requests for a domain to the root page of different domain

In this example, an old website was discontinued and replaced by a new one in a different domain. The functionality is different, and all URLs should now point to the root of the new domain. The same applies to any subdomains of the old domain.

1.  Create a Bulk Redirect List with the following URL redirect:

    - **Source URL**: `example.com/`
    - **Target URL**: `https://example.net/`
    - **Subpath matching**: Enabled
    - **Include subdomains**: Enabled
    - **Preserve path suffix**: Disabled

2.  Create a Bulk Redirect Rule that enables this list.

This configuration will perform the following redirects:

| Request URL                               | URL after redirect     |
| ----------------------------------------- | ---------------------- |
| `http://example.com/`                     | `https://example.net/` |
| `https://example.com/`                    | `https://example.net/` |
| `https://subdomain.example.com/`          | `https://example.net/` |
| `https://example.com/my/path/to/page.htm` | `https://example.net/` |
| `https://example.com/search?q=term`       | `https://example.net/` |

## Redirect all requests from one country to another domain

In this example, all website visitors from the United Kingdom will be redirected to a different domain, but maintaining current functionality in the same paths.

1.  Create a Bulk Redirect List named `uk_redirect_list` with the following URL redirect:

    - **Source URL**: `https://example.com/`
    - **Target URL**: `https://example.co.uk/`
    - **Subpath matching**: Enabled
    - **Preserve query string**: Enabled

2.  Create a Bulk Redirect Rule that enables the previous Bulk Redirect List and set the rule expression to the following:

    ```txt
    ip.src.country == "GB" and http.request.full_uri in $uk_redirect_list
    ```

This configuration will perform the following redirects for UK visitors:

| Request URL                               | URL after redirect                          |
| ----------------------------------------- | ------------------------------------------- |
| `https://example.com/`                    | `https://example.co.uk/`                    |
| `https://example.com/my/path/to/page.htm` | `https://example.co.uk/my/path/to/page.htm` |
| `https://example.com/search?q=term`       | `https://example.co.uk/search?q=term`       |
