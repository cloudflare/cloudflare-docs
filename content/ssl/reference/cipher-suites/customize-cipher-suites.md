---
title: Customize cipher suites
pcx_content_type: how-to
weight: 2
meta:
  title: Customize cipher suites — Edge certificates
---

# Customize cipher suites — Edge certificates

With [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) or within [SSL for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/), you can restrict connections to specific cipher suites. Currently, this functionality is only available when using the API:

- [Zone](/api/operations/zone-settings-change-ciphers-setting)
- [Hostname (SSL for SaaS only)](/api/operations/custom-hostname-for-a-zone-create-custom-hostname)

When you customize cipher suites for a [zone](/fundamentals/get-started/concepts/accounts-and-zones/#zones), the restriction affects all certificates within the zone, regardless of certificate type. For example: if you have an advanced certificate for `domain.test`, a universal certificate for `*.domain.test`, and custom certificates for `*.*.domain.test`, all of them should only used the specified cipher suites. To check the different certificates you have in a zone, go to **SSL/TLS** > **Edge Certificates** on the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates).

## Cipher suite values

### TLS 1.2 or lower

To specify certain cipher suites, include an array of applicable cipher suites used for TLS 1.2 or lower in the `value` field. Cloudflare offers a list of [recommended ciphers by security requirements](/ssl/reference/cipher-suites/recommendations/), but you can also refer to the [full list](/ssl/reference/cipher-suites/supported-cipher-suites/) of supported ciphers.

### TLS 1.3

{{<render file="_tls-1.3-cipher-limitations.md">}}

## Reset to default values

To reset to the default cipher suites, send an empty array in the `value` field.