---
title: Configure tunnel endpoints
pcx_content_type: how-to
weight: 1
meta:
    description: Cloudflare recommends two tunnels for each ISP and network location router combination, one per Cloudflare endpoint. Learn how to configure IPsec or GRE tunnels.
---

{{<render file="tunnel-endpoints/_tunnel-endpoints.md" productFolder="magic-transit" withParameters="`169.254.244.0/20` (this address space is also a [link-local address](https://en.wikipedia.org/wiki/Link-local_address));;Magic WAN;;**Magic WAN** > **Configuration**;;/magic-wan/reference/tunnels/#ipsec-tunnels;;/magic-wan/reference/tunnels/;;/magic-wan/configuration/manually/how-to/tunnel-health-checks/;;/magic-wan/reference/tunnel-health-checks/;;/magic-wan/reference/anti-replay-protection/;;bidirectional;;;;">}}

### Legacy health checks system

{{<render file="_legacy-hc-system.md" productFolder="magic-transit">}}

## Next steps

Now that you have set up your tunnel endpoints, you need to configure {{<glossary-tooltip term_id="static route" link="/magic-wan/configuration/manually/how-to/configure-static-routes/">}}static routes{{</glossary-tooltip>}} to route your traffic through Cloudflare.