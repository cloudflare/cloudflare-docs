---
pcx_content_type: how-to
title: Always Use HTTPS
weight: 15
---

# Always Use HTTPS

Always Use HTTPS redirects all your visitor requests from `http` to `https`, for all subdomains and hosts in your application.

{{<Aside>}}
This process does not impact certificate validation. If you use [HTTP DCV](/ssl/edge-certificates/changing-dcv-method/methods/), you can still enable Always Use HTTPS.
{{</Aside>}}

Cloudflare recommends not performing redirects at your origin web server, as this can cause [redirect loop errors](/ssl/troubleshooting/too-many-redirects/).

## Availability

{{<feature-table id="ssl.always_use_https">}}

## Encrypt all visitor traffic

To redirect traffic for all subdomains and hosts in your application, you can enable **Always Use HTTPS**.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **Always Use HTTPS** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **SSL/TLS** > **Edge Certificates**.
3.  For **Always Use HTTPS**, switch the toggle to **On**.

{{<Aside type="note">}}

When you set your [SSL/TLS encryption mode](/ssl/origin-configuration/ssl-modes/off/) to **Off**, you will not have an option for **Always Use HTTPS** visible in your Cloudflare dashboard.

{{</Aside>}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable **Always Use HTTPS** with the API, send a [`PATCH`](/api/operations/zone-settings-change-always-use-https-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).

{{</tab>}}
{{</tabs>}}

### Encrypt some visitor traffic

If you only want specific subdomains redirected to HTTPS, redirect on a URL basis using Cloudflare [Bulk Redirects](/rules/url-forwarding/bulk-redirects/).

For example, you could forward traffic from a specific subdomain to HTTPS. You would likely want to include **Subpath matching** and **Preserve path suffix** to ensure requests to `http://example.com/examples` go to `https://example.com/examples`.

{{<example>}}
| **Source URL** | **Target URL** | **Status** | **Selected parameters** |
| --------- | --------- | --- | --- |
| `http://example.com` | `https://example.com` | 301 | _Subpath matching_ and _Preserve path suffix_ |
{{</example>}}

### Limitations

Forcing HTTPS does not resolve issues with [mixed content](/ssl/troubleshooting/mixed-content-errors/), as browsers check the protocol of included resources before making a request. You will need to use only relative links or HTTPS links on pages that you force to HTTPS. Cloudflare can automatically resolve some mixed-content links using our [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/) functionality.
