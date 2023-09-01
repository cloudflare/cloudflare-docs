---
pcx_content_type: how-to
source: https://support.cloudflare.com/hc/en-us/articles/200170196-Responding-to-DDoS-attacks
title: Respond to DDoS attacks
---

# Respond to DDoS attacks

Cloudflare's network automatically mitigates large [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/), but these attacks can still affect your application.

## All customers

All customers should perform the following steps to better secure their application:

1. Make sure all [DDoS managed rulesets](/ddos-protection/managed-rulesets/) are set to default settings (_High_ sensitivity level and mitigation actions) for optimal DDoS activation.
2. Deploy [WAF custom rules](/waf/custom-rules/) and [rate limiting rules](/waf/rate-limiting-rules/) to enforce a combined positive and negative security model. Reduce the traffic allowed to your website based on your known usage.
3. Make sure your origin is not exposed to the public Internet, meaning that access is only possible from [Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/). As an extra security precaution, we recommend contacting your hosting provider and requesting new origin server IPs if they have been targeted directly in the past.
4. If you have [Managed IP Lists](/fundamentals/global-configurations/lists/ip-lists/#managed-ip-lists) or [Bot Management](/bots/plans/bm-subscription/), consider using these in WAF custom rules.
5. Enable [caching](/cache/) as much as possible to reduce the strain on your origin servers, and when using [Workers](/workers/), avoid overwhelming your origin server with more subrequests than necessary.

## Enterprise customers

In addition to the steps for all customers, Cloudflare Enterprise customers subscribed to the Advanced DDoS Protection service should consider enabling [Adaptive DDoS Protection](/ddos-protection/managed-rulesets/adaptive-protection/), which mitigates attacks more intelligently based on your unique traffic patterns.