---
pcx_content_type: how-to
title: Configure tunnel endpoints
weight: 1
meta:
    description: Cloudflare recommends two tunnels for each ISP and network location router combination, one per Cloudflare endpoint. Learn how to configure IPsec or GRE tunnels.
---

# Configure tunnel endpoints

{{<render file="tunnel-endpoints/_tunnel-endpoints.md" withParameters="`169.254.240.0/20`">}}

## Ways to onboard traffic to Cloudflare

### GRE and IPsec tunnels

{{<render file="tunnel-endpoints/_gre-ipsec.md" withParameters="Magic Transit;;/magic-transit/reference/tunnels/;;/magic-transit/reference/tunnels/#supported-configuration-parameters">}}

#### Anti-replay protection

{{<render file="tunnel-endpoints/_anti-replay.md" withParameters="Magic Transit;;/magic-transit/reference/anti-replay-protection/">}}

### Network Interconnect (CNI)

{{<render file="tunnel-endpoints/_cni.md" withParameters="Magic Transit;;[Network Interconnect and Magic Transit](/magic-transit/network-interconnect/)">}}

## Add tunnels

{{<render file="tunnel-endpoints/_add-tunnels.md" withParameters="Magic Transit;;**Magic Transit** > **Configuration**;;/magic-transit/how-to/tunnel-health-checks/;;/magic-transit/reference/tunnel-health-checks/;;/magic-transit/reference/anti-replay-protection/;;unidirectional;;/magic-transit/how-to/check-tunnel-health-dashboard/">}}

## Bidirectional vs unidirectional health checks

{{<render file="tunnel-endpoints/_bi-uni-health-checks.md" withParameters="/magic-transit/reference/tunnel-health-checks/">}}

{{<render file="tunnel-endpoints/_mt-egress.md">}}

### Legacy health checks system

{{<render file="_legacy-hc-system.md" >}}

## Next steps

Now that you have set up your tunnel endpoints, you need to configure {{<glossary-tooltip term_id="static route" link="/magic-transit/how-to/configure-static-routes/">}}static routes{{</glossary-tooltip>}} to route your traffic through Cloudflare.