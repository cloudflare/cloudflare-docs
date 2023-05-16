---
title: About
pcx_content_type: concept
layout: single
weight: 4
meta:
  title: About Cloudflare DDoS protection
---

# About Cloudflare DDoS protection

Cloudflare provides unmetered and unlimited [distributed denial-of-service (DDoS)](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) protection at layers 3, 4, and 7 to all customers on all plans and services.

The protection is enabled by Cloudflare’s [Autonomous DDoS Protection Edge](/ddos-protection/about/components/#autonomous-edge), which automatically detects and mitigates DDoS attacks.

The Autonomous Edge includes multiple dynamic mitigation rules exposed as [managed rulesets](/ddos-protection/managed-rulesets/), which provide comprehensive protection against a variety of DDoS attacks across layers 3/4 and layer 7 of the OSI model.

## Default DDoS protection

Cloudflare’s network is built to automatically monitor and mitigate large DDoS attacks. Caching your content at Cloudflare also protects your website against small DDoS attacks, but uncached assets require additional [manual response to DDoS attacks](/ddos-protection/best-practices/respond-to-ddos-attacks/).

Additionally, Cloudflare helps mitigate smaller DDoS attacks:

- For zones on any plan, when the HTTP error rate is above the _High_ (default) sensitivity level of 1,000 errors-per-second rate threshold. You can decrease the sensitivity level by [configuring the HTTP DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/http/).

- For zones on Pro, Business, and Enterprise plans, Cloudflare performs an additional check for better detection accuracy: the errors-per-second rate must also be at least five times the normal origin traffic levels.

Cloudflare determines the error rate based on all HTTP errors in the 52X range (Internal Server Error) and in the 53X range, except for [error 530](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-530). Currently, for DDoS mitigations based on HTTP error rate, you cannot exclude specific HTTP error codes.

For more information on the types of DDoS attacks covered by Cloudflare's DDoS protection, refer to [DDoS attack coverage](/ddos-protection/about/attack-coverage/).