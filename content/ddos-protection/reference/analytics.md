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
| WAF/CDN       | Activity log only | Security Events    | Security Events    | Security Events    |
| Spectrum      | –                 | –                  | –                  | Network Analytics  |
| Magic Transit | –                 | –                  | –                  | Network Analytics  |

{{</table-wrap>}}

## Remarks

In some situations, the analytics dashboards will not show you the ID of the DDoS managed rule that handled a packet/request. This means that an internal DDoS rule, which Cloudflare does not currently expose publicly, applied an action to the packet/request. These internal DDoS rules have a very low false positive rate and should always be enabled to protect your properties against DDoS attacks. For the same reason, DDoS rule IDs may also be unavailable in Cloudflare logs and API responses.
