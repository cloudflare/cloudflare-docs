---
pcx_content_type: how-to
title: Minimum TLS Version
weight: 13
---

# Minimum TLS Version

Minimum TLS Version only allows HTTPS connections from visitors that support the selected TLS protocol version or newer.

For example, if TLS 1.1 is selected, visitors attempting to connect with TLS 1.0 will be rejected. Visitors attempting to connect using TLS 1.1, 1.2, or 1.3 (if enabled) will be allowed to connect.

You can use the API to [configure cipher suites](/ssl/reference/cipher-suites/).

## Availability

{{<feature-table id="ssl.minimum_tls">}}

## Setup

### Zone-level

To manage the TLS version applied to your whole zone when proxied through Cloudflare:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2.  Select your zone.
3.  Go to **SSL/TLS** > **Edge Certificates**.
4.  For **Minimum TLS Version**, select an option.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
Use the [Change Minimum TLS Version setting](/api/operations/zone-settings-change-minimum-tls-version-setting) endpoint, specifying your preferred minimum version in the `value` parameter.

{{</tab>}}
{{</tabs>}}

### Per-hostname

[Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) users also have the option to specify minimum TLS versions per specific hostnames in their Cloudflare zone.

This is currently only available via the API:

(**INSERT API LINKS**)