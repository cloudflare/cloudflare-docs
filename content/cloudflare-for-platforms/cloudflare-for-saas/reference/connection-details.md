---
pcx_content_type: reference
title: Connection request details
weight: 1
---

# Connection request details

When forwarding connections to your origin server, Cloudflare will set request parameters according to the following:

## Host header

Cloudflare will not alter the Host header by default, and will forward exactly as sent by the client. If you wish to change the value of the Host header you can utilise [Page-Rules](/workers/platform/workers-with-page-rules/) or [Workers](/workers/) using the steps outlined in [certificate management](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/).

## SNI

When establishing a TLS connection to your origin server, if the request is being sent to your configured Fallback Host then the value of the SNI sent by Cloudflare will match the value of the Host header sent by the client (i.e. the custom hostname).

If however the request is being forwarded to a Custom Origin, then the value of the SNI will be that of the Custom Origin.
