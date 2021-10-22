---
pcx-content-type: concept
order: 3
---

# L3/4 DDoS Protection Managed Ruleset

<Aside type="warning">

The L3/4 DDoS Protection Managed Ruleset is available in early access to Magic Transit and Spectrum Enterprise customers.

</Aside>

The Cloudflare L3/4 DDoS Protection Managed Ruleset is a set of pre-configured rules used to match known DDoS attack vectors at levels 3 and 4 of the OSI model. Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

The L3/4 DDoS Protection Managed Ruleset is always enabled — you can only customize its behavior.

---

## Ruleset configuration

<Aside type="warning">

Currently, you can only configure the L3/4 DDoS Protection Managed Ruleset via API.

</Aside>

You may need to adjust the behavior of specific rules in case of false positives or due to specific traffic patterns.

Adjust the behavior of the rules in the Managed Ruleset by modifying the following parameters:

* The performed **action** when an attack is detected
* The **sensitivity** of attack detection mechanisms

To adjust rule behavior, [configure overrides via API](/managed-rulesets/l34-ddos/configure-api).

You can only configure the behavior of the Managed Ruleset to set a stronger mitigation action or a lower sensitivity. Refer to [Managed Ruleset parameters](/managed-rulesets/l34-ddos/override-parameters) for more information.

By default, your specific configurations (or overrides) apply to all packets, since the default rule expression is `true`. Specify a different rule expression to match a subset of incoming packets for which you want to apply the override. Refer to [Available expression fields](/managed-rulesets/l34-ddos/fields) for more information on the available fields for expressions of L3/4 DDoS Protection Managed Ruleset overrides.

## Availability

The L3/4 DDoS Protection Managed Ruleset is available in early access to Magic Transit and Spectrum Enterprise customers.
