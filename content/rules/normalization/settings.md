---
title: Available settings
type: overview
pcx-content-type: reference
weight: 5
layout: list
meta:
  title: URL normalization settings
---

# URL normalization settings

The Cloudflare dashboard provides two settings to manage URL normalization:

{{<definitions>}}

*   **Normalize incoming URLs** {{<prop-meta>}}(default: *On*){{</prop-meta>}}

    *   Configures the URLs of all incoming traffic to Cloudflare:

        *   When enabled, all incoming URLs are normalized before they pass to subsequent Cloudflare features that can receive a URL as input, such as Page Rules, Firewall Rules, Workers, and Access.
        *   When disabled, incoming URLs are not normalized before passing to subsequent Cloudflare features.

*   **Normalize URLs to origin** {{<prop-meta>}}(default: *Off*){{</prop-meta>}}

    *   Configures URLs sent to the origin:

        *   When enabled, requests sent to the origin are normalized.
        *   When disabled, requests sent to the origin are not modified.

    *   You can only view and enable this option when **Normalize incoming URLs** is enabled.

{{</definitions>}}

## Configuration examples

The following table shows how URL normalization settings affect incoming URLs before they pass to other Cloudflare features and to origin:

{{<table-wrap>}}

Incoming URL | Normalize incoming URLs | Normalize URLs to origin | URL passed to Cloudflare edge | URL passed to origin
\---|---|---|---|---
`www.example.com/hello`   | *On*  | *Off* | `www.example.com/hello`   | `www.example.com/hello`
`www.example.com/hello`   | *On*  | *On*  | `www.example.com/hello`   | `www.example.com/hello`
`www.example.com/hello`   | *Off* | *Off* | `www.example.com/hello`   | `www.example.com/hello`
`www.example.com/%68ello` | *On*  | *Off* | `www.example.com/hello`   | `www.example.com/%68ello`
`www.example.com/%68ello` | *On*  | *On*  | `www.example.com/hello`   | `www.example.com/hello`
`www.example.com/%68ello` | *Off* | *Off* | `www.example.com/%68ello` | `www.example.com/%68ello`

{{</table-wrap>}}
