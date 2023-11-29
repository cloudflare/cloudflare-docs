---
pcx_content_type: how-to
title: Configure tunnel endpoints
weight: 1
meta:
    description: Cloudflare recommends two tunnels for each ISP and network location router combination, one per Cloudflare endpoint. Learn how to configure IPsec or GRE tunnels.
---

{{<render file="_tunnel-endpoints.md" withParameters="`169.254.244.0/20`;;Magic Transit;;**Magic Transit** > **Configuration**;;/magic-transit/reference/tunnels/#ipsec-tunnels;;/magic-transit/reference/tunnels/;;/magic-transit/how-to/tunnel-health-checks/;;/magic-transit/reference/tunnel-health-checks/;;/magic-transit/reference/anti-replay-protection/;;unidirectional;;## CNI as onramp;;Beyond GRE and IPsec tunnels, you can also use Network Interconnect (CNI) to onboard your traffic to Magic Transit. Refer to [Network Interconnect and Magic Transit](/magic-transit/network-interconnect/) for more information.">}} {{<render file="_mt-egress.md">}}

### Legacy health checks system

{{<render file="_legacy-hc-system.md" >}}

## Next steps

Now that you have set up your tunnel endpoints, you need to configure {{<glossary-tooltip term_id="static route" link="/magic-transit/how-to/configure-static-routes/">}}static routes{{</glossary-tooltip>}} to route your traffic through Cloudflare.