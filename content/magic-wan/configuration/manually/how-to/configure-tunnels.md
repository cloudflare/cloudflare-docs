---
title: Configure tunnel endpoints
pcx_content_type: how-to
weight: 1
meta:
    description: Cloudflare recommends two tunnels for each ISP and network location router combination, one per Cloudflare endpoint. Learn how to configure IPsec or GRE tunnels.
---

# Configure tunnel endpoints

{{<render file="tunnel-endpoints/_tunnel-endpoints.md" productFolder="magic-transit" withParameters="`169.254.240.0/20` (this address space is also a [link-local address](https://en.wikipedia.org/wiki/Link-local_address))">}}

## GRE and IPsec tunnels

{{<render file="tunnel-endpoints/_gre-ipsec.md" productFolder="magic-transit" withParameters="Magic WAN;;/magic-wan/reference/tunnels/;;/magic-wan/reference/tunnels/#supported-configuration-parameters">}}

### Anti-replay protection

{{<render file="tunnel-endpoints/_anti-replay.md" productFolder="magic-transit" withParameters="Magic WAN;;/magic-wan/reference/anti-replay-protection/">}}

## Add tunnels

{{<render file="tunnel-endpoints/_add-tunnels.md" productFolder="magic-transit" withParameters="Magic WAN;;**Magic WAN** > **Configuration**;;/magic-wan/configuration/manually/how-to/tunnel-health-checks/;;/magic-wan/reference/tunnel-health-checks/;;/magic-wan/reference/anti-replay-protection/;;bidirectional;;/magic-wan/configuration/common-settings/check-tunnel-health-dashboard/">}}

## Bidirectional vs unidirectional health checks

{{<render file="tunnel-endpoints/_bi-uni-health-checks.md" productFolder="magic-transit" withParameters="/magic-wan/reference/tunnel-health-checks/">}}


### Legacy health checks system

{{<render file="_legacy-hc-system.md" productFolder="magic-transit">}}

## Next steps

Now that you have set up your tunnel endpoints, you need to configure {{<glossary-tooltip term_id="static route" link="/magic-wan/configuration/manually/how-to/configure-static-routes/">}}static routes{{</glossary-tooltip>}} to route your traffic through Cloudflare.