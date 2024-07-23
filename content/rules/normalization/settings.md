---
title: Settings
pcx_content_type: reference
weight: 5
meta:
  title: URL normalization settings
---

# URL normalization settings

The Cloudflare dashboard provides the following settings to manage URL normalization:

{{<definitions>}}

- **Normalization type** {{<prop-meta>}}(default: _RFC-3986_){{</prop-meta>}}

  - Selects the type of normalization to perform:

    - _RFC-3986_ – Applies URL normalization strictly according to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986).

    - _Cloudflare_ – In addition to what is defined in RFC 3986, applies [extra URL normalization techniques](/rules/normalization/how-it-works/#cloudflare-normalization).

- **Normalize incoming URLs** {{<prop-meta>}}(default: _On_){{</prop-meta>}}

  - Configures the URLs of all incoming traffic to Cloudflare:

    - When enabled, all incoming URLs are normalized before they pass to subsequent Cloudflare features that can receive a URL as input, such as Page Rules, WAF custom rules, Workers, and Access.
    - When disabled, incoming URLs are not normalized before passing to subsequent Cloudflare features.

- **Normalize URLs to origin** {{<prop-meta>}}(default: _Off_){{</prop-meta>}}

  - Configures URLs sent to the origin:

    - When enabled, requests sent to the origin are normalized.
    - When disabled, requests sent to the origin are not modified.

  - You can only view and enable this option when **Normalize incoming URLs** is enabled.

{{</definitions>}}

For examples of how these settings affect URL normalization, refer to the [URL normalization examples](/rules/normalization/examples/).