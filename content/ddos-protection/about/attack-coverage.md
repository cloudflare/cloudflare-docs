---
title: Attack coverage
pcx_content_type: reference
type: overview
weight: 3
meta:
  title: DDoS attack coverage
---

# DDoS attack coverage

The [DDoS Attack Protection managed rulesets](/ddos-protection/managed-rulesets/) provide protection against a variety of {{<glossary-tooltip term_id="distributed denial-of-service (DDoS) attack">}}DDoS attacks{{</glossary-tooltip>}} across L3/4 (layers 3/4) and L7 of the OSI model. Cloudflare constantly updates these managed rulesets to improve the attack coverage, increase the mitigation consistency, cover new and emerging threats, and ensure cost-efficient mitigations.

[Advanced TCP Protection](/ddos-protection/tcp-protection/) and [Advanced DNS Protection](/ddos-protection/dns-protection/), available to [Magic Transit](/magic-transit/) customers, provide additional protection against sophisticated TCP-based DDoS attacks and sophisticated and fully randomized DNS attacks, respectively.

As a general guideline, Cloudflare customers are protected up to the layer on which their service operates. For example, a WAF customer is protected against DDoS attacks on Layer 7 (HTTP/HTTPS) all the way down including L3/4 attacks.

The following table includes a sample of covered attack vectors:

{{<render file=_ddos-attack-coverage.md productFolder="ddos-protection">}}

## Getting additional DNS protection

The Network-layer DDoS Attack Protection managed ruleset provides protection against some types of DNS attacks.

Magic Transit customers have access to [Advanced DNS Protection](/ddos-protection/dns-protection/) {{<inline-pill style="beta">}}. Other customers might consider the following options:

* Use Cloudflare as your authoritative DNS provider ([primary DNS](/dns/zone-setups/full-setup/) or [secondary DNS](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/)).
* If you are running your own {{<glossary-tooltip term_id="nameserver">}}nameservers{{</glossary-tooltip>}}, use [DNS Firewall](/dns/dns-firewall/) to get additional protection against DNS attacks like random prefix attacks.
