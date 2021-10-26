---
title: Overview
pcx-content-type: landing-page
order: 0
---

# Cloudflare DDoS Protection

Cloudflare automatically detects and mitigates [Distributed Denial of Service](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) (DDoS) attacks using its [Autonomous Edge](https://blog.cloudflare.com/deep-dive-cloudflare-autonomous-edge-ddos-protection/).

The Autonomous Edge includes multiple dynamic mitigation rules exposed as [Cloudflare DDoS Protection Managed Rulesets](/managed-rulesets), and are enabled by default. You can customize the mitigation rules included in these rulesets to optimize and tailor the protection to your needs.

<ButtonGroup>
  <Button type="primary" href="/about">Learn more</Button>
  <Button type="secondary" href="/managed-rulesets">Managed Rulesets</Button>
{/*  <Button type="secondary" href="/managed-rulesets/changelog">Managed Rulesets change log</Button> */}
</ButtonGroup>

---

## Availability

Network-level (L3/4) DDoS attack protection is included in all Cloudflare plans. However, only Magic Transit and Spectrum Enterprise customers can customize the Network-level DDoS Attack Protection Managed Ruleset.

HTTP (L7) DDoS attack protection is included as part of the WAF/CDN services and Workers.

## Related resources

* View DDoS analytics in the Cloudflare dashboard under [Network Analytics](https://support.cloudflare.com/hc/articles/360038696631).

* Use the [Cloudflare GraphQL API](https://developers.cloudflare.com/analytics/graphql-api) to export attack logs and integrate Cloudflare Logs into your Security Information Event Management (SIEM) systems.

* Learn how to [prepare and respond to DDoS attacks](https://support.cloudflare.com/hc/sections/360007347692).
