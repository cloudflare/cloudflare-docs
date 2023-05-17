---
title: Methods
pcx_content_type: concept
weight: 1
layout: single
meta:
  title: Methods — Domain Control Validation
  description: Review different methods to perform Domain Control Validation when using Cloudflare SSL/TLS.
---

# DCV Methods

{{<render file="_dcv-definition.md">}}

## Perform DCV

For details on each method available for DCV, refer to the following resources:

{{<directory-listing>}}

{{<Aside type="note">}}

For guidance on when you need to perform DCV, refer to [Domain Control Validation](/ssl/edge-certificates/changing-dcv-method/).

{{</Aside>}}

---

## Verify DCV status

To verify the [DCV status](/ssl/reference/certificate-statuses/) of a certificate, either monitor the certificate's status in the dashboard at **SSL/TLS** > **Edge Certificates** or use the [Verification Status endpoint](/api/operations/ssl-verification-ssl-verification-details).

A status of `active` means that the certificate has been deployed to Cloudflare’s global network and will be served as soon as HTTP traffic is proxied to Cloudflare.

## Update DCV methods

You cannot update the DCV method for an active certificate. To update the DCV method for a subdomain, wait until the DCV expires and then change the DCV method.

[^1]: Meaning that Cloudflare is your Authoritative DNS provider.
[^2]: Meaning that another DNS provider - not Cloudflare - maintains your Authoritative DNS.