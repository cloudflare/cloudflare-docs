---
title: Network-layer DDoS Attack Protection
pcx-content-type: concept
order: 3
---

# Network-layer DDoS Attack Protection Managed Ruleset

The Cloudflare Network-layer DDoS Attack Protection Managed Ruleset is a set of pre-configured rules used to match [known DDoS attack vectors](/about/attack-coverage) at levels 3 and 4 of the OSI model. Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

The Network-layer DDoS Attack Protection Managed Ruleset is always enabled — you can only customize its behavior.

## Ruleset configuration

<Aside type="warning">

Currently, you can only configure the Network-layer DDoS Attack Protection Managed Ruleset via API.

</Aside>

You may need to adjust the behavior of specific rules in case of false positives or due to specific traffic patterns.

Adjust the behavior of the rules in the Managed Ruleset by modifying the following parameters:

* The performed **action** when an attack is detected
* The **sensitivity** of attack detection mechanisms

To adjust rule behavior, [configure overrides via API](/managed-rulesets/network/configure-api).

You can only configure the behavior of the Managed Ruleset to set a stronger mitigation action or a lower sensitivity. Refer to [Managed Ruleset parameters](/managed-rulesets/network/override-parameters) for more information.

By default, your specific configurations (or overrides) apply to all packets, since the default rule expression is `true`. Specify a different rule expression to match a subset of incoming packets for which you want to apply the override. Refer to [Available expression fields](/managed-rulesets/network/fields) for more information on the available fields for expressions of Network-layer DDoS Attack Protection Managed Ruleset overrides.

## Availability

The Network-layer DDoS Attack Protection Managed Ruleset protects Cloudflare customers on all plans. However, only Magic Transit and Spectrum customers on an Enterprise plan can customize the Managed Ruleset.

## Related Cloudflare products

Magic Transit customers can create custom [Magic Firewall](https://developers.cloudflare.com/magic-firewall) rules to block additional network-layer attacks.

Spectrum customers can use [IP Access](https://support.cloudflare.com/hc/articles/217074967) rules to block additional network-layer attacks.
