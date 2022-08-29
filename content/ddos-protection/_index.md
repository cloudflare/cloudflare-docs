---
title: Overview
pcx_content_type: overview
layout: single
weight: 1
meta:
  title: Cloudflare DDoS Protection
---

# Cloudflare DDoS Protection

Cloudflare automatically detects and mitigates [Distributed Denial of Service](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) (DDoS) attacks using its Autonomous Edge.

The Autonomous Edge includes multiple dynamic mitigation rules exposed as [Cloudflare DDoS Protection Managed Rulesets](/ddos-protection/managed-rulesets/). You can customize the mitigation rules included in these rulesets to optimize and tailor the protection to your needs.

{{<button-group>}}
  {{<button type="primary" href="/ddos-protection/about/">}}Learn more{{</button>}}
  {{<button type="secondary" href="/ddos-protection/managed-rulesets/">}}Managed Rulesets{{</button>}}
{{</button-group>}}

***

## Availability

*   **HTTP DDoS attack protection**. Included in all Cloudflare plans for zones [onboarded to Cloudflare](/dns/zone-setups/full-setup/) (zones with their traffic routed through the Cloudflare network).

*   **Network-layer (L3/4) DDoS attack protection**. Included in all Cloudflare plans for:

    *   Zones [onboarded to Cloudflare](/dns/zone-setups/full-setup/) (zones with their traffic routed through the Cloudflare network)
    *   IP applications onboarded to [Spectrum](/spectrum/)
    *   IP Prefixes onboarded to [Magic Transit](/magic-transit/)

    Only Enterprise customers of Magic Transit and Spectrum can customize the Network-layer DDoS Attack Protection Managed Ruleset.

*   **Advanced TCP Protection Managed Ruleset**. The dashboard setting and API is available in early access to Magic Transit customers.

## Related resources

*   [How to prepare and respond to DDoS attacks](https://support.cloudflare.com/hc/sections/360007347692)
