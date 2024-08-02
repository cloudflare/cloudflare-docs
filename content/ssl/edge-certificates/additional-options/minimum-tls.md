---
pcx_content_type: how-to
title: Minimum TLS Version
weight: 13
---

# Minimum TLS Version

Minimum TLS Version only allows HTTPS connections from visitors that support the selected TLS protocol version or newer.

For example, if TLS 1.1 is selected, visitors attempting to connect using TLS 1.0 will be rejected. Visitors attempting to connect using TLS 1.1, 1.2, or 1.3 ([if enabled](/ssl/edge-certificates/additional-options/tls-13/)) will be allowed to connect.

{{<Aside type="note">}}

If you are looking to restrict cipher suites, refer to [Customize cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/).

For guidance on which TLS version to use, refer to [TLS protocols](/ssl/reference/protocols/).

{{</Aside>}}

## Availability

{{<feature-table id="ssl.minimum_tls">}}

## How to disable TLS 1.0

You can disable TLS 1.0 by choosing a higher minimum TLS version.

All users can apply this configuration to all hostnames in their zones following the steps under [zone-level](#zone-level).

If you have an [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager//#advanced-certificate-manager) subscription, you also have the option to disable TLS 1.0 (or other versions) with a [per-hostname](#per-hostname) setup.

## Setup

### Zone-level

To manage the TLS version applied to your whole zone when proxied through Cloudflare:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2.  Select your website.
3.  Go to **SSL/TLS** > **Edge Certificates**.
4.  For **Minimum TLS Version**, select an option.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use the [Edit zone setting](/api/operations/zone-settings-edit-single-setting) endpoint with `min_tls_version` as the setting name in the URI path, and specify your preferred minimum version in the `value` parameter.

{{</tab>}}
{{</tabs>}}

### Per-hostname

[Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) users also have the option to specify minimum TLS versions per specific hostnames in their Cloudflare zone.

This is currently only available via the API:

* Use the [Edit TLS setting for hostname](/api/operations/per-hostname-tls-settings-put) endpoint to specify different values for `min_tls_version`.
* Use the [Delete TLS setting for hostname](/api/operations/per-hostname-tls-settings-delete) endpoint to clear previously defined `min_tls_version` setting.

Cloudflare uses the [hostname priority logic](/ssl/reference/certificate-and-hostname-priority/) to determine which setting to apply.

## Test supported TLS versions

To test supported TLS versions, attempt a request to your website or application while specifying a TLS version.

For example, use a `curl` command to test TLS 1.1 (replace `www.example.com` with your Cloudflare domain and hostname):

```sh
$ curl https://www.example.com -svo /dev/null --tls-max 1.1
```

If the TLS version you are testing is blocked by Cloudflare, the TLS handshake is not completed and returns an error:

`* error:1400442E:SSL routines:CONNECT_CR_SRVR_HELLO:tlsv1 alert`