---
title: Analytics
pcx_content_type: reference
weight: 2
meta:
  title: DDoS analytics
---

# DDoS analytics

You can view DDoS analytics in different dashboards, depending on your service and plan:

- The [Security Events dashboard](/waf/security-events/) provides you with visibility into L7 security events that target your zone, including HTTP DDoS attacks and TCP attacks.

- The [Network Analytics dashboard](https://support.cloudflare.com/hc/articles/360038696631) provides you with visibility into L3/4 traffic and DDoS attacks that target your IP ranges or Spectrum applications.

## Availability

{{<table-wrap>}}

| Service       | Free              | Pro                | Business           | Enterprise         |
| ------------- | ----------------- | ------------------ | ------------------ | ------------------ |
| WAF/CDN       | Activity log only | Security Events    | Security Events    | Security Events, Security Analytics<sup>1</sup> |
| Spectrum      | –                 | –                  | –                  | Network Analytics  |
| Magic Transit | –                 | –                  | –                  | Network Analytics  |

<sup>1</sup> Available to Enterprise customers on Core and Advanced bundles.

{{</table-wrap>}}
