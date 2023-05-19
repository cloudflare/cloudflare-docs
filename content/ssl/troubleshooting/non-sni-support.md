---
title: Non-SNI support
pcx_content_type: troubleshooting
weight: 3
---

# Non-SNI support

If your visitors use older devices/browsers that do not have [Server Name Indication (SNI)](https://www.cloudflare.com/learning/ssl/what-is-sni/) support, they may get `common name mismatch` errors when trying to access your website or application.

Consider the following options on how to avoid this situation.

## Custom certificates

Use [Custom certificates](/ssl/edge-certificates/custom-certificates/) with Legacy Client Support.

When you [upload a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate), you can specify a value of `Legacy` for its client support.

Unlike [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/), Cloudflare does not manage issuance and renewal for custom certificates.

## Dedicated IPs (paid zones only)

If you need to enable non-SNI support for a **paid zone**, you can [contact Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support) to enable **Dedicated IP** for your zone.

Since not having SNI means that the client is unable to specify its target hostname during the SSL/TLS handshake, when you make sure only one zone is served on a specific IP, this action prevents that sort of errors from happening.
    
Dedicated IPs can be used with [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates].

{{<Aside type="warning">}}
Note that a dedicated IP is not the same as a static IP. Dedicated IPs only serve one zone, but can eventually change. Static IPs, on the other hand, are contractually guaranteed to never change but can serve more than one zone.
{{</Aside>}}