---
title: Methods
pcx_content_type: how-to
weight: 1
layout: single
meta:
  title: Methods — Domain Control Validation
---

# DCV Methods

{{<render file="_dcv-definition.md">}}

## Perform DCV

For details on each method available for DCV, refer to the following resources:

{{<directory-listing>}}

---

### DCV - Full zones

For full zones[^1], the only required action is to confirm the your nameservers are still [pointing to Cloudflare](https://support.cloudflare.com/hc/articles/4426809598605).

{{<render file="_full-zone-acm-dcv.md">}}

### DCV - Partial zones

For partial zones[^2], the process depends on whether the certificate uses a wildcard hostname.

{{<render file="_partial-zone-acm-dcv.md">}}

---

## Verify DCV status

To verify the [DCV status](/ssl/ssl-tls/certificate-statuses/) of a certificate, either monitor the certificate's status in the dashboard at **SSL/TLS** > **Edge Certificates** or use the [Verification Status endpoint](https://api.cloudflare.com/#ssl-verification-ssl-verification-details).

A status of `active` means that the certificate has been deployed to Cloudflare’s edge network and will be served as soon as HTTP traffic is proxied to Cloudflare.

## Update DCV methods

You cannot update the DCV method for an active certificate. To update the DCV method for a subdomain, wait until the DCV expires and then change the DCV method.

[^1]: Meaning that Cloudflare is your Authoritative DNS provider.
[^2]: Meaning that another DNS provider - not Cloudflare - maintains your Authoritative DNS.