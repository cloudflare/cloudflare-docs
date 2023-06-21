---
title: Overview
pcx_content_type: overview
layout: single
weight: 1
meta:
  title: Cloudflare DDoS Protection
---

# Cloudflare DDoS Protection

Cloudflare automatically detects and mitigates [Distributed Denial of Service (DDoS) attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) using its Autonomous Edge.

The Autonomous Edge includes multiple dynamic mitigation rules exposed as [Cloudflare DDoS Attack Protection managed rulesets](/ddos-protection/managed-rulesets/). You can customize the mitigation rules included in these rulesets to optimize and tailor the protection to your needs.

{{<button-group>}}
  {{<button type="primary" href="/ddos-protection/about/">}}Learn more{{</button>}}
  {{<button type="secondary" href="/ddos-protection/managed-rulesets/">}}Managed rulesets{{</button>}}
{{</button-group>}}

***

## Availability

* **HTTP DDoS attack protection**. Included in all Cloudflare plans for zones [onboarded to Cloudflare](/dns/zone-setups/full-setup/) (zones with their traffic routed through the Cloudflare network).

* **Network-layer (L3/4) DDoS attack protection**. Included in all Cloudflare plans for:

    *   Zones [onboarded to Cloudflare](/dns/zone-setups/full-setup/) (zones with their traffic routed through the Cloudflare network)
    *   IP applications onboarded to [Spectrum](/spectrum/)
    *   IP Prefixes onboarded to [Magic Transit](/magic-transit/)

    Only Enterprise customers of Magic Transit and Spectrum can customize the Network-layer DDoS Attack Protection managed ruleset.

* **Advanced TCP Protection**. Available to all [Magic Transit](/magic-transit/) customers.

## Related resources

* [Using Cloudflare Logs to investigate DDoS traffic (Enterprise Only)](/support/troubleshooting/website-under-attack/using-cloudflare-logs-els-to-investigate-ddos-traffic-enterprise-only/)
