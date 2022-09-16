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

When you perform DCV through Cloudflare, we recommend that you validate against your domain apex (`example.com`) instead of individual subdomains (`blog.example.com`). This recommendation applies even if you do not intend to proxy traffic from your apex domain.

When you validate against the apex, Cloudflare can complete DCV for all subdomains. Otherwise, you will have to validate each subdomain manually.

For details on each method available for DCV, refer to the following resources:

{{<directory-listing>}}

## Verify DCV status

To verify the [DCV status](/ssl/reference/certificate-statuses/) of a certificate, either monitor the certificate's status in the dashboard at **SSL/TLS** > **Edge Certificates** or use the [Verification Status endpoint](https://api.cloudflare.com/#ssl-verification-ssl-verification-details).

A status of `active` means that the certificate has been deployed to Cloudflare’s edge network and will be served as soon as HTTP traffic is proxied to Cloudflare.

## Update DCV methods

You cannot update the DCV method for an active certificate. To update the DCV method for a subdomain, wait until the DCV expires and then change the DCV method.