---
title: Available settings
type: overview
pcx_content_type: reference
weight: 5
layout: list
meta:
  title: URL normalization settings
---

# URL normalization settings

The Cloudflare dashboard provides the following settings to manage URL normalization:

{{<definitions>}}

- **Normalization type** {{<prop-meta>}}(default: _RFC-3986_){{</prop-meta>}}

  - Selects the type of normalization to perform:

    - _RFC-3986_ – Applies URL normalization strictly according to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986).

    - _Cloudflare_ – In addition to what is defined in RFC 3986, applies the following URL normalization techniques:

      - Normalize back slashes (`\`) into forward slashes (`/`).
      - Merge successive forward slashes (for example, `//` will be normalized to `/`).

- **Normalize incoming URLs** {{<prop-meta>}}(default: _On_){{</prop-meta>}}

  - Configures the URLs of all incoming traffic to Cloudflare:

    - When enabled, all incoming URLs are normalized before they pass to subsequent Cloudflare features that can receive a URL as input, such as Page Rules, Firewall Rules, Workers, and Access.
    - When disabled, incoming URLs are not normalized before passing to subsequent Cloudflare features.

- **Normalize URLs to origin** {{<prop-meta>}}(default: _Off_){{</prop-meta>}}

  - Configures URLs sent to the origin:

    - When enabled, requests sent to the origin are normalized.
    - When disabled, requests sent to the origin are not modified.

  - You can only view and enable this option when **Normalize incoming URLs** is enabled.

{{</definitions>}}

## Configuration examples

The following table shows how URL normalization settings affect incoming URLs before they pass to other Cloudflare features and to origin:

{{<table-wrap>}}

| Incoming URL | Normalization type | Normalize incoming URLs | Normalize URLs to origin | URL passed to Cloudflare edge | URL passed to origin |
| ---|---|---|---|---|--- |
| `www.example.com/hello` | (any)  | _Off_ | _Off_ | `www.example.com/hello`   | `www.example.com/hello` |
| `www.example.com/hello` | (any)  | _On_  | _Off_ | `www.example.com/hello`   | `www.example.com/hello` |
| `www.example.com/hello` | (any)  | _On_  | _On_  | `www.example.com/hello`   | `www.example.com/hello` |
| `example.com/%68ello` | (any) | _Off_ | _Off_ | `example.com/%68ello` | `example.com/%68ello` |
| `example.com/%68ello` | (any) | _On_  | _Off_ | `example.com/hello`   | `example.com/%68ello` |
| `example.com/%68ello` | (any) | _On_  | _On_  | `example.com/hello`   | `example.com/hello` |
| `example.com/%68ello//pa\th` | _RFC-3986_ | _Off_ | _Off_ | `example.com/%68ello//pa\th` | `example.com/%68ello//pa\th` |
| `example.com/%68ello//pa\th` | _RFC-3986_ | _On_  | _Off_ | `example.com/hello//pa\th`   | `example.com/%68ello//pa\th` |
| `example.com/%68ello//pa\th` | _RFC-3986_ | _On_  | _On_  | `example.com/hello//pa\th`   | `example.com/hello//pa\th` |
| `example.com/%68ello//pa\th` | _Cloudflare_ | _Off_ | _Off_ | `example.com/%68ello//pa\th` | `example.com/%68ello//pa\th` |
| `example.com/%68ello//pa\th` | _Cloudflare_ | _On_ | _Off_ | `example.com/hello/pa/th` | `example.com/%68ello//pa\th` |
| `example.com/%68ello//pa\th` | _Cloudflare_ | _On_ | _On_  | `example.com/hello/pa/th` | `example.com/hello/pa/th` |

{{</table-wrap>}}
