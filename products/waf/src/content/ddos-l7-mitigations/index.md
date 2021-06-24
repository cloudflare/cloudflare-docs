---
pcx-content-type: concept
order: 4
---

# DDoS L7 Attack Mitigation (Beta)

<Aside type='warning'>

This feature is available for all customers, but only selected customers on an Enterprise plan may override the Managed Ruleset.

</Aside>

Cloudflare provides protection against DDoS L7 attacks through several mitigation systems and rules. The DDoS L7 Attack Mitigation Managed Ruleset contains a subset of these rules. This Managed Ruleset is enabled by default for all customers, regardless of their Cloudflare plan, and provides protection against a broad range of DDoS attack vectors.

## The DDoS L7 Attack Mitigation Managed Ruleset

The DDoS L7 Attack Mitigation Managed Ruleset is a set of pre-configured rules used to match known DDoS attack vectors at the application layer on the edge, like the following:

* Credential stuffing attacks
* Requests causing large amounts of origin errors
* Excessive traffic hitting origin
* Excessive traffic hitting cache
* Abuse of search features
* Many other attack vectors

Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

The DDoS L7 Attack Mitigation Managed Ruleset provides users with increased observability into layer-7 DDoS attacks mitigated by Cloudflare, informing users of ongoing or past attacks. The Firewall dashboard will display additional information on the types of layer-7 DDoS attacks detected for a specific zone.

Depending on your Cloudflare plan, you may be able to adjust the behavior of the rules in the Managed Ruleset using **overrides**. You can change the performed action when an attack is detected and the sensitivity of attack detection mechanisms.

To define overrides using the Rulesets API, see [Configure DDoS L7 Attack Mitigation Managed Ruleset overrides via API](/ddos-l7-mitigations/configure-api).

For more information on the available override parameters, check [Managed Ruleset override parameters](/ddos-l7-mitigations/override-parameters).

<Aside type='note' header='Note'>

The DDoS L7 Attack Mitigation Managed Ruleset is always enabled. You can only modify its behavior via overrides.

</Aside>

## Availability

The DDoS L7 Attack Mitigation feature is available in Beta to all customers.

However, only customers on an Enterprise plan can customize the behavior of the DDoS L7 Attack Mitigation Managed Ruleset using overrides.
