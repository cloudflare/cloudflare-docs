---
pcx_content_type: reference
title: Connection request details
weight: 1
---

# Connection request details

When forwarding connections to your origin server, Cloudflare will set request parameters according to the following:

## Host header

Cloudflare will not alter the Host header by default, and will forward exactly as sent by the client. If you wish to change the value of the Host header you can utilise [Page-Rules](/workers/configuration/workers-with-page-rules/) or [Workers](/workers/) using the steps outlined in [certificate management](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/).

## SNI

When establishing a TLS connection to your origin server, if the request is being sent to your configured Fallback Host then the value of the SNI sent by Cloudflare will match the value of the Host header sent by the client (i.e. the custom hostname).

If however the request is being forwarded to a Custom Origin, then the value of the SNI will be that of the Custom Origin.

With Origin Rules we introduced a new function of being able to explicitly set the SNI field. However, as you will see, changing the Host Header to a another value using the below products will also impact the SNI sent to the origin.

There are many areas the Host Header can be changed and it is dependent on Plan type and enabled features. The core areas are in the following areas:

|Eyeball|Page Rule Settings|Origin Rule Settings| |Load Balancing Settings|Output| |
|:----|:----|:----|:----|:----|:----|:----|
|Eyeball Hostname|Page Rule -Host Header Override Value|Origin Rule -Host Header Override Value|Origin Rule -SNI Override Value|Load Balancing -Host Header Override Value|Host Header at Origin|SNI at Origin|
|host-sni.example\.com|N/A|N/A|N/A|N/A|host-sni.example\.com|host-sni.example\.com|
|host-sni.example\.com|pagerule.example\.com|N/A|N/A|N/A|pagerule.example\.com|pagerule.example\.com|
|host-sni.example\.com|pagerule.example\.com|origin-host.example\.com|N/A|N/A|origin-host.example\.com|origin-host.example\.com|
|host-sni.example\.com|pagerule.example\.com|origin-host.example\.com|origin-sni.example\.com|N/A|origin-host.example\.com|origin-sni.example\.com|
|host-sni.example\.com|pagerule.example\.com|origin-host.example\.com|origin-sni.example\.com|loadbalancing.example\.com|loadbalancing.example\.com|loadbalancing.example\.com|
