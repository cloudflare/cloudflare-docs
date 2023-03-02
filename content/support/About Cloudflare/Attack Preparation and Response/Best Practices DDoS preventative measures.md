---
source: https://support.cloudflare.com/hc/en-us/articles/200170166-Best-Practices-DDoS-preventative-measures
title: Best practices DDoS preventative measures
---

# Best practices: DDoS preventative measures

## Overview

Ensure your site is fully prepared for possible DDoS attacks via the recommendations below.

### Handle a false positive

Refer to our guide on [DDoS false positive](https://developers.cloudflare.com/ddos-protection/managed-rulesets/adjust-rules/false-positive/) for further details.

### Handle a false negative or an incomplete mitigation

Refer to our guide on [DDoS false negative](https://developers.cloudflare.com/ddos-protection/managed-rulesets/adjust-rules/false-negative/) for further details.

### Proxy your DNS records to Cloudflare

Attackers attempt to identify your origin IP address to directly attack your origin web server without Cloudflare’s protections. Hide your origin IP address from direct attack by proxying traffic to Cloudflare.

Set your DNS records for maximum protection via the following steps:

1.  [Enable the Cloudflare proxy (orange-cloud)](https://support.cloudflare.com/hc/articles/200169626)
2.  Remove DNS records used for FTP or SSH and instead use your origin IP to directly perform FTP or SSH requests. Alternatively, proxy FTP and SSH via [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/get-started).
3.  [Grey-cloud A, AAAA, or CNAME records corresponding to your mail server](https://support.cloudflare.com/hc/articles/200168876)
4.  Remove wildcard records within Free, Pro, or Business domains because they expose your origin IP address. [Cloudflare only protects wildcard records for domains on Enterprise plans](https://support.cloudflare.com/hc/articles/360017421192#CloudflareDNSFAQ-DoesCloudflaresupportwildcardDNSentries).

### Managing attacks bypassing Cloudflare and do not limit or throttle requests from Cloudflare IPs

1.  It is important that your origin web server [allowlist Cloudflare IPs](https://support.cloudflare.com/hc/articles/201897700)[](https://support.cloudflare.com/hc/articles/201897700) and explicitly blocks traffic not from Cloudflare or your trusted partner, vendor, or application IP addresses.
2.  Block port 80 at your origin and enforce using HTTPS traffic by enabling the "Always use HTTPS" feature within the **Edge Certificates** tab of the Cloudflare **SSL/TLS** app or [via the **Page Rules** app](https://support.cloudflare.com/hc/en-us/articles/200172336-Creating-Page-Rules).
3.  Enable the feature [Authenticated Origin Pull](https://support.cloudflare.com/hc/en-us/articles/204899617-Authenticated-Origin-Pulls) as this will only accept requests from Cloudflare.

### Restore original visitor IPs in your origin server logs

To review the real IPs behind an attack, [restore the original visitor IPs](https://support.cloudflare.com/hc/sections/200805497) in your origin server logs. Otherwise, all traffic lists Cloudflare’s IPs in your logs. Cloudflare always includes the original visitor IP address in the request, [as an HTTP header.](https://support.cloudflare.com/hc/articles/200170986) Inform your hosting provider that you use a reverse proxy and that all traffic will come from Cloudflare’s IPs when looking at current connections.

### Change server IP addresses after moving site to Cloudflare

Cloudflare hides your origin server IP addresses for traffic you proxy to Cloudflare. As an extra security precaution, we recommend contacting your hosting provider and requesting new origin server IPs.

### Use Rate Limiting to prevent brute force and Layer 7 DDoS attacks

To thwart attacks disguised as normal HTTP requests, Rate Limiting allows website administrators to specify fine-grained thresholds on the load they expect their web server to receive. With one simple click, setup basic rate limiting to [protect your login pages from brute force attacks](https://support.cloudflare.com/hc/articles/115001993248).

Cloudflare Free, Pro, and Business plans include 10,000 free requests per month. Refer to our guide on [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/en-us/articles/235240767-Cloudflare-Rate-Limiting) for further details.

___

## Related resources

-   [Cloudflare DDoS Protection Developers Guide](https://developers.cloudflare.com/ddos-protection/)
-   [Understanding Cloudflare DDOS protection](https://support.cloudflare.com/hc/articles/200172676)
-   [Responding to DDoS attacks](https://support.cloudflare.com/hc/articles/200170196)
-   [What is a DDoS attack?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
