---
title: Advanced DNS Protection (beta)
pcx_content_type: concept
weight: 7
layout: single
---

{{<heading-pill style="beta">}}Cloudflare Advanced DNS Protection{{</heading-pill>}}

Cloudflare Advanced DNS Protection (beta), powered by [`flowtrackd`](https://blog.cloudflare.com/announcing-flowtrackd/), provides stateful protection against DNS-based DDoS attacks, specifically sophisticated and fully randomized DNS attacks such as [random prefix attacks](/dns/dns-firewall/random-prefix-attacks/about/).

## How it works

Cloudflare's Advanced DNS Protection works by first learning your traffic patterns and forming a baseline of the type of DNS queries you normally receive. Later, the system will be able to distinguish between legitimate and malicious queries, protecting your DNS infrastructure without impacting legitimate traffic.

The [Network Analytics v2 dashboard](/analytics/network-analytics/) will display high-level data about Advanced DNS Protection in the **All Traffic** tab.

## Availability

Advanced DNS Protection is available in beta to all [Magic Transit](/magic-transit/) customers.

Protection for simpler DNS-based DDoS attacks is also included as part of the [Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/).

## Initial setup

Request your account team to enable Advanced DNS Protection and make the initial configuration. The initial thresholds are based on your network’s individual behavior.

By default, Advanced DNS Protection will be enabled in monitoring mode.

## Configuration

After getting Advanced DNS Protection enabled, you can create rules to configure the protection system.

Currently, you must configure the Cloudflare API to create and manage DNS protection rules. For more information, refer to [Configure via API](/ddos-protection/dns-protection/api/).

For more information on the configuration settings, refer to [Available settings](/ddos-protection/dns-protection/settings/).

---

## Data collection

Cloudflare collects DNS-related data such as query type (for example, `A` record) and the queried domains. For details, refer to [Data collection](/analytics/network-analytics/reference/data-collection/).

{{<Aside type="warning">}}
Currently, to disable this data collection you must remove your prefixes from the protection system using the [Delete a prefix](/ddos-protection/tcp-protection/api/#prefix-operations) API operation, but this operation will remove the prefixes from both Advanced DNS Protection and [Advanced TCP Protection](/ddos-protection/tcp-protection/).
{{</Aside>}}

---

## Related products

Advanced DNS Protection can protect you against volumetric DNS DDoS attacks. To perform DNS caching, proxying, and configuration, use the [Cloudflare DNS Firewall](/dns/dns-firewall/).
