---
title: Choose an on-ramp
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Similar to the network onboarding practices in the [Replace your VPN](/learning-paths/replace-vpn/connect-private-network/) implementation guide, there are a number of ways to on-ramp your network traffic to the Cloudflare global network. In a defense-in-depth approach to security, you will source traffic from devices that would otherwise go to the Internet through a default route. Relevant targets for this may be branch offices, network subnets that need a secure path to the Internet, or anywhere that you control the Internet paths for groups of devices.

## Available on-ramps

The primary ways to source multi-device traffic to the Cloudflare network are {{<glossary-tooltip term_id="Cloudflare Tunnel" link="/cloudflare-one/connections/connect-networks/">}}Cloudflare Tunnel{{</glossary-tooltip>}} via either [`cloudflared`](#cloudflared) or the [WARP Connector](#warp-connector). Alternatively, Enterprise users can on-ramp traffic by adding [Magic WAN](#magic-wan) to their plan and configuring Magic WAN Connector or a dedicated third-party device.

### `cloudflared`

{{<glossary-definition term_id="cloudflared">}}

It only makes outbound connections, can be run on almost any infrastructure, and has a number of available options for server-side redundancy and steering. We recommend `cloudflared` for most users.

For more information on setting up Cloudflare Tunnel via `cloudflared`, refer to [Create a tunnel](/cloudflare-one/connections/connect-networks/get-started/).

{{<heading-pill style="beta" heading="h3">}}WARP Connector{{</heading-pill>}}

[WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/), an extension of the WARP client, functions as a virtual device to establish a connection between your network and the Cloudflare global network. You can install WARP Connector on a dedicated Linux server or virtual machine.

WARP Connector supports bidirectional traffic proxies. This means it can proxy traffic initiated from a user running WARP into a private network (like `cloudflared`), or allow traffic initiated from a network to be on-ramped to Cloudflare for either public or private destinations.

For more information on setting up Cloudflare Tunnel via WARP Connector, refer to [Set up WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/).

### Magic WAN

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

[Magic WAN](/magic-wan/) can connect networks to Cloudflare via several methods:

- [Magic WAN Connector](/magic-wan/configuration/connector/), which automatically establishes IPsec tunnels to Cloudflare
- Manual setup via {{<glossary-tooltip term_id="anycast">}}Anycast{{</glossary-tooltip>}} {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}} or {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels
- [Cloudflare Network Interconnect](/network-interconnect/) (CNI) at private peering locations or some public cloud instances (where compatible)

Magic WAN on-ramps and off-ramps the traffic via your IPSEC tunnels after transiting the Cloudflare network. You can upgrade Magic WAN traffic with Gateway to egress publicly. WARP traffic can traverse Magic WAN's IPSEC tunnels to reach a private network.
