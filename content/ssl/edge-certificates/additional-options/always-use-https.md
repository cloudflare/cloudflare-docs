---
pcx-content-type: how-to
title: Always Use HTTPS
weight: 15
---

# Always Use HTTPS

{{<render file="_always-use-https-definition.md">}}

Cloudflare recommends not performing redirects at your origin web server, as this can cause [redirect loop errors](https://support.cloudflare.com/hc/articles/115000219871).

## Encrypt all visitor traffic

To redirect traffic for all subdomains and hosts in your application:

1.  Log into your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Navigate to **SSL/TLS** > **Edge Certificates**.
3.  For **Always Use HTTPS**, switch the toggle to **On**.

### Encrypt some visitor traffic

If you only want specific subdomains redirected to HTTPS, redirect on a URL basis using Cloudflare [Bulk Redirects](/rules/bulk-redirects).

For example, you could forward traffic from a specific subdomain to HTTPS. You would likely want to include **Subpath matching** and **Preserve path suffix** to ensure requests to `http://example.com/examples` go to `https://example.com/examples`.

{{<example>}}

| **Source URL** | **Target URL** | **Status** | **Selected parameters** |
| --------- | --------- | --- | --- |
| `https://example.com` | `https://example.com` | 301 | *Subpath matching* and *Preserve path suffix* |

{{</example>}}

### Limitations

Forcing HTTPS does not resolve issues with [mixed content](https://support.cloudflare.com/hc/articles/200170476), as browsers check the protocol of included resources before making a request. You will need to use only relative links or HTTPS links on pages that you force to HTTPS. Cloudflare can automatically resolve some mixed-content links using our [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/) functionality.
