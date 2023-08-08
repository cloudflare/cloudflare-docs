---
title: Advanced DNS Protection
pcx_content_type: concept
weight: 7
layout: single
meta:
  title: Cloudflare Advanced DNS Protection
---

# Cloudflare Advanced DNS Protection

Cloudflare Advanced DNS Protection, powered by [`flowtrackd`](https://blog.cloudflare.com/announcing-flowtrackd/), provide stateful protection against DNS-based DDoS attacks, specifically sophisticated and fully randomized DNS attacks such as [random prefix attacks](/dns/dns-firewall/random-prefix-attacks/about/).

## How it works

Cloudflare's Advanced DNS Protection works by first learning you traffic patterns and forming a baseline of the type of DNS queries you normally receive. Later, the system will be able to distinguish between legitimate and malicious queries, protecting your DNS infrastructure without impacting legitimate traffic.

Advanced DNS Protection provides protection for both DNS-over-UDP and DNS-over-TCP traffic. DNS-over-TCP traffic will first go through the [Advanced TCP Protection](/ddos-protection/tcp-protection/) system and then through the Advanced DNS Protection system.

The [Network Analytics v2 dashboard](/analytics/network-analytics/) will display high-level data about Advanced DNS Protection in the **All Traffic** tab.

## Availability

Advanced DNS Protection is available to all [Magic Transit](/magic-transit/) customers, and is enabled by default.

Protection for simpler DNS-based DDoS attacks is also included as part of the [Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/).

## Get started

To get started with Advanced DNS Protection, refer to [Setup](/ddos-protection/dns-protection/setup/).

---

Advanced DNS Protection offers protection for the following types of DNS queries:
* **Profiled Queries**: DNS queries that Cloudflare already received before.
* **Unprofiled Queries**: DNS queries that Cloudflare never received.

Create a policy for each type of DNS query. A policy determines the behavior and sensitivity of the Advanced DNS Protection system when handling incoming DNS traffic.

Each policy has a mode and a sensitivity level. For more information on these settings, refer to [Policy settings](/ddos-protection/dns-protection/settings/).

## Data collection

Cloudflare collects DNS-related data such as query type (for example, `A` record) and the queried domains. For details, refer to [Data collection](/analytics/network-analytics/reference/data-collection/).

You can [opt out](/ddos-protection/dns-protection/settings/) from this data collection, but this means that you will not be protected by the Advanced DNS Protection system.

---

## Related products

Advanced DNS Protection can protect you against volumetric DNS DDoS attacks. To perform DNS caching, proxying, and configuration, use the [Cloudflare DNS Firewall](/dns/dns-firewall/).