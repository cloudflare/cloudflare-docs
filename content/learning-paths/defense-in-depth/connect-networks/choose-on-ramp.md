---
title: Choose an on-ramp
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

To on-ramp your networks to Cloudflare, we recommend you use the [WARP connector](#warp-connector). Alternatively, Enterprise users can on-ramp traffic by adding [Magic WAN](#magic-wan) to their plan and configuring Magic WAN Connector or a third-party device.

## Available on-ramps

### WARP Connector

[WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/), an extension of the WARP client, functions as a virtual device to establish a connection between your network and the Cloudflare global network. You can install WARP Connector on a dedicated Linux server or virtual machine.

WARP Connector supports bidirectional traffic proxies. This means it can proxy traffic initiated from a user running WARP into a private network (like `cloudflared`), or enable traffic initiated from a network to be on-ramped to Cloudflare for either public or private destinations.

### Magic WAN

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

[Magic WAN](/magic-wan/) can connect networks to Cloudflare via several methods:

- [Magic WAN Connector](/magic-wan/configuration/connector/), which automatically establishes IPsec tunnels to Cloudflare
- Manual setup via {{<glossary-tooltip term_id="anycast">}}Anycast{{</glossary-tooltip>}} {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}} or {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels
- [Cloudflare Network Interconnect](network-interconnect/) (CNI) at private peering locations or some public cloud instances (where compatible)

Magic WAN on-ramps and off-ramps the traffic via your IPSEC tunnels after transiting the Cloudflare network. You can upgrade Magic WAN traffic with Gateway to egress publicly. WARP traffic can traverse Magic WAN's IPSEC tunnels to reach a private network.

Next, you will learn how enforce policies with Cloudflare Gateway.
