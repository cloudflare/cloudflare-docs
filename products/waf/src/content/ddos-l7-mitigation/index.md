---
pcx-content-type: concept
order: 7
---

# L7 DDoS Attack Mitigation

Cloudflare provides protection against layer 7 DDoS attacks through several mitigation systems and rules. The HTTP DDoS Managed Ruleset contains a subset of these rules. This Managed Ruleset is enabled by default for all customers, regardless of their Cloudflare plan, and provides protection against a broad range of DDoS attack vectors.

---

## The Cloudflare HTTP DDoS Managed Ruleset

The Cloudflare HTTP DDoS Managed Ruleset is a set of pre-configured rules used to match known DDoS attack vectors at the application layer on the edge, like the following:

* Requests causing large amounts of origin errors
* Excessive traffic hitting origin
* Excessive traffic hitting cache
* Abuse of search features and authentication endpoints
* Other attack vectors

Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

The Cloudflare HTTP DDoS Managed Ruleset provides users with increased observability into L7 DDoS attacks mitigated by Cloudflare, informing users of ongoing or past attacks. The Firewall dashboard, available at **Firewall** > **Overview**, will display additional information on the types of L7 DDoS attacks detected for a specific zone.

### Ruleset configuration

You can adjust the behavior of the rules in the Managed Ruleset by modifying the following parameters:

* The performed **action** when an attack is detected
* The **sensitivity** of attack detection mechanisms

**Note:** Certain actions or sensitivity levels may not be available to all Cloudflare plans.

To adjust rule behavior, do one of the following:

* [Configure the Cloudflare HTTP DDoS Managed Ruleset in the dashboard](/ddos-l7-mitigation/configure-dashboard).
* [Configure HTTP DDoS Managed Ruleset overrides via API](/ddos-l7-mitigation/configure-api).

For more information on the available configuration parameters, see [Managed Ruleset parameters](/ddos-l7-mitigation/override-parameters).

<Aside type='note' header='Note'>

The Cloudflare HTTP DDoS Managed Ruleset is always enabled — you can only customize its behavior.

</Aside>

## Availability

The Cloudflare HTTP DDoS feature is available to all customers.
