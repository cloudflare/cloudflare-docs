---
pcx-content-type: concept
order: 7
---

# L3/4 DDoS Attack Mitigation

<Aside type="warning">

The Cloudflare L3/4 DDoS Managed Ruleset is available in early access to Magic Transit and Spectrum Enterprise customers.

</Aside>

Cloudflare provides protection against L3/4 DDoS attacks through several mitigation systems and rules. The L3/4 DDoS Managed Ruleset contains a subset of these rules, and you can adjust rule behavior according to your requirements.

---

## The Cloudflare L3/4 DDoS Managed Ruleset

The Cloudflare L3/4 DDoS Managed Ruleset is a set of pre-configured rules used to match known DDoS attack vectors at levels 3 and 4 of the OSI model. Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

The Cloudflare L3/4 DDoS Managed Ruleset is always enabled — you can only customize its behavior.

### Ruleset configuration

<Aside type="warning">

Currently, you can only configure the Cloudflare L3/4 DDoS Managed Ruleset via API.

</Aside>

You may need to adjust the behavior of specific rules in case of false positives or due to specific traffic patterns.

Adjust the behavior of the rules in the Managed Ruleset by modifying the following parameters:

* The performed **action** when an attack is detected
* The **sensitivity** of attack detection mechanisms

To adjust rule behavior, [configure overrides via API](/ddos-l34-mitigation/configure-api).

You can only configure the behavior of the Managed Ruleset to set a stronger mitigation action or a lower sensitivity. Refer to [Managed Ruleset parameters](/ddos-l34-mitigation/override-parameters) for more information.

By default, your specific configurations (or overrides) apply to all packets, since the default rule expression is `true`. Specify a different rule expression to match a subset of incoming packets for which you want to apply the override. Refer to [Available expression fields](/ddos-l34-mitigation/fields) for more information on the available fields for expressions of L3/4 DDoS Managed Ruleset overrides.

## Availability

The Cloudflare L3/4 DDoS Managed Ruleset is available in early access to Magic Transit and Spectrum Enterprise customers.
