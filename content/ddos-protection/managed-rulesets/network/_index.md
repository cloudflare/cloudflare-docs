---
title: Network-layer DDoS Attack Protection
pcx_content_type: concept
weight: 4
meta:
  title: Network-layer DDoS Attack Protection managed ruleset
layout: single
---

# Network-layer DDoS Attack Protection managed ruleset

The Cloudflare Network-layer DDoS Attack Protection managed ruleset is a set of pre-configured rules used to match [known DDoS attack vectors](/ddos-protection/about/attack-coverage/) at levels 3 and 4 of the OSI model. Cloudflare updates the list of rules in the managed ruleset on a regular basis.

The Network-layer DDoS Attack Protection managed ruleset is always enabled — you can only customize its behavior.

## Ruleset configuration

You may need to adjust the behavior of specific rules in case of false positives or due to specific traffic patterns.

Adjust the behavior of the rules in the managed ruleset by modifying the following parameters:

* The performed **action** when an attack is detected
* The **sensitivity level** of attack detection mechanisms

To adjust rule behavior, do one of the following:

* [Configure Network-layer DDoS Attack Protection in the dashboard](/ddos-protection/managed-rulesets/network/configure-dashboard/).
* [Configure Network-layer DDoS Attack Protection managed ruleset overrides via API](/ddos-protection/managed-rulesets/network/configure-api/).

You can only configure the behavior of the managed ruleset to set a stronger mitigation action or a lower sensitivity. Refer to [Managed ruleset parameters](/ddos-protection/managed-rulesets/network/override-parameters/) for more information.

Overrides can apply to all packets or to a subset of incoming packets, depending on the override expression. Refer to [Override expressions](/ddos-protection/managed-rulesets/network/override-expressions/) for more information.

## Availability

The Network-layer DDoS Attack Protection managed ruleset protects Cloudflare customers on all plans. However, only Magic Transit and Spectrum customers on an Enterprise plan can customize the managed ruleset.

## Related Cloudflare products

Magic Transit customers can configure the following additional products:

* Enable [Advanced TCP Protection](/ddos-protection/tcp-protection/) to detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods or SYN and SYN-ACK floods.
* Create custom [Magic Firewall](/magic-firewall/) rules to block additional network-layer attacks.

Spectrum customers can use [IP Access](/waf/tools/ip-access-rules/) rules to block additional network-layer attacks.
