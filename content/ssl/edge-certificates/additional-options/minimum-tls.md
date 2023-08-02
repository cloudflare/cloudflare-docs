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

## Using Minimum TLS Version in Cloudflare SSL/TLS

You can manage the TLS version your domain uses when proxied through Cloudflare.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To update this setting in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2.  Select your zone.
3.  Go to **SSL/TLS** > **Edge Certificates**.
4.  For **Minimum TLS Version**, select an option.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To update your **Minimum TLS Version** with the API, send a [`PATCH`](/api/operations/zone-settings-change-minimum-tls-version-setting) request with the `value` parameter specifying your preferred minimum version.
 
{{</tab>}}
{{</tabs>}}

Selecting a minimum version ensures that all subsequent, newer versions of the protocol are also supported. TLS 1.0 is the version that Cloudflare sets by default for all customers using certificate-based encryption. In this case, it means that Cloudflare also accepts requests encrypted with all TLS versions beyond 1.0.

