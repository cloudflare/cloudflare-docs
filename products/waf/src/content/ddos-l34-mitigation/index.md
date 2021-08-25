---
pcx-content-type: concept
order: 5
---

# DDoS L3/4 Attack Mitigation

Cloudflare provides protection against DDoS L3/4 attacks through several mitigation systems and rules. The L3/4 DDoS Managed Ruleset contains a subset of these rules. This Managed Ruleset is enabled by default for all customers, regardless of their Cloudflare plan, and provides protection against a broad range of DDoS attack vectors.

---

## The Cloudflare L3/4 DDoS Managed Ruleset

The Cloudflare L3/4 DDoS Managed Ruleset is a set of pre-configured rules used to match known DDoS attack vectors at levels 3 and 4 of the OSI model. Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

This Managed Ruleset provides users with increased observability into L3/4 DDoS attacks mitigated by Cloudflare, informing users of ongoing or past attacks. The Network Analytics dashboard, available from your Cloudflare account home, will display additional information on the types of layer 3/4 DDoS attacks detected for your account.

The Cloudflare L3/4 DDoS Managed Ruleset is always enabled — you can only customize its behavior.

### Ruleset configuration

<Aside type="warning">

The custom configuration of the Cloudflare L3/4 DDoS Managed Ruleset is available in early access to Magic Transit and Spectrum Enterprise customers. Currently, you can only configure this Managed Ruleset via API.

</Aside>

You may need to adjust the behavior of specific rules in case of false positives or due to specific traffic patterns.

Adjust the behavior of the rules in the Managed Ruleset by modifying the following parameters:

* The performed **action** when an attack is detected
* The **sensitivity** of attack detection mechanisms

To adjust rule behavior, [configure overrides via API](/ddos-l34-mitigation/configure-api).

You can only configure the behavior of the Managed Ruleset to set a stronger mitigation action or a lower sensitivity. Refer to [Managed Ruleset parameters](/ddos-l34-mitigation/override-parameters) for more information.

By default, your specific configurations (or overrides) apply to all requests, since the default rule expression is `true`. Specify a different rule expression to match a subset of incoming requests for which you want to apply the override. Refer to [Available expression fields](/ddos-l34-mitigation/fields) for more information on the available fields for expressions of L3/4 DDoS Managed Ruleset overrides.

## Availability

The L3/4 DDoS protection provided by Cloudflare is available to all customers. The custom configuration of the Cloudflare L3/4 DDoS Managed Ruleset is available in early access to Magic Transit and Spectrum Enterprise customers.
