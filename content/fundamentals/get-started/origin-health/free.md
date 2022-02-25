---
pcx-content-type: how-to
hidden: true
title: Protect your origin server — Free
weight: 3
---

# Protect your origin server — Free

{{<render file="_origin-health-overview.md">}}

## Secure origin connections

{{<render file="_origin-secure-connections.md">}}

## Monitor origin health

{{<render file="_origin-passive-alert.md">}}

{{<render file="_origin-lb-alert.md">}}

## Reduce origin traffic

### Block traffic

{{<render file="_origin-ddos.md">}}

Additionally, adjust various settings in your **Firewall** to restrict potentially malicious traffic:

*   Set up customized [firewall rules](/firewall/cf-firewall-rules)
*   Enable [bot protection](/bots/get-started)
*   Block, challenge, or allow specific addresses with [IP access rules](https://support.cloudflare.com/hc/articles/217074967)
*   Create [rate limiting](https://support.cloudflare.com/hc/articles/115001635128) rules as a final defense against malicious traffic (usage-based billing)

### Increase caching

{{<render file="_origin-caching.md">}}

### Distribute traffic

{{<render file="_origin-load-balancing.md">}}
