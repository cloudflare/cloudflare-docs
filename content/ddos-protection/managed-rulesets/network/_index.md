---
title: Network-layer DDoS Attack Protection
pcx-content-type: concept
weight: 4
meta:
  title: Network-layer DDoS Attack Protection Managed Ruleset
---

# Network-layer DDoS Attack Protection Managed Ruleset

The Cloudflare Network-layer DDoS Attack Protection Managed Ruleset is a set of pre-configured rules used to match [known DDoS attack vectors](/ddos-protection/about/attack-coverage/) at levels 3 and 4 of the OSI model. Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

The Network-layer DDoS Attack Protection Managed Ruleset is always enabled — you can only customize its behavior.

## Ruleset configuration

You may need to adjust the behavior of specific rules in case of false positives or due to specific traffic patterns.

Adjust the behavior of the rules in the Managed Ruleset by modifying the following parameters:

*   The performed **action** when an attack is detected
*   The **sensitivity level** of attack detection mechanisms

To adjust rule behavior, do one of the following:

*   [Configure Network-layer DDoS Attack Protection in the dashboard](/ddos-protection/managed-rulesets/network/configure-dashboard/).
*   [Configure Network-layer DDoS Attack Protection Managed Ruleset overrides via API](/ddos-protection/managed-rulesets/network/configure-api/).

You can only configure the behavior of the Managed Ruleset to set a stronger mitigation action or a lower sensitivity. Refer to [Managed Ruleset parameters](/ddos-protection/managed-rulesets/network/override-parameters/) for more information.

Overrides can apply to all packets or to a subset of incoming packets, depending on the override expression. Refer to [Available expression fields](/ddos-protection/managed-rulesets/network/fields/) for more information on the available fields for expressions of Network-layer DDoS Attack Protection Managed Ruleset overrides.

## Availability

The Network-layer DDoS Attack Protection Managed Ruleset protects Cloudflare customers on all plans. However, only Magic Transit and Spectrum customers on an Enterprise plan can customize the Managed Ruleset.

## Related Cloudflare products

Magic Transit customers can create custom [Magic Firewall](/magic-firewall/) rules to block additional network-layer attacks.

Spectrum customers can use [IP Access](/waf/tools/ip-access-rules/) rules to block additional network-layer attacks.
