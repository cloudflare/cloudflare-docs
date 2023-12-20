---
title: Connect with WARP connector (optional)
pcx_content_type: overview
weight: 5
layout: learning-unit
---

WARP Connector uses the same underlying technology as our WARP endpoint client (today, building a Wireguard tunnel, in the future, a MASQ tunnel). It is installed in customer’s networks as software on a Linux server or virtual machine. It supports bidirectional proxy of traffic, meaning it supports proxying traffic initiated from a user running WARP into a private network, just like cloudflared, or it can enable traffic from a network to be on-ramped to Cloudflare, either for public or private destinations. It requires routing updates made to machines or networks ‘behind’ the WARP Connector to route traffic appropriately using the WARP Connector host as a gateway for specified subnets.

For most customers, [cloudflared](/learning-paths/replace-vpn/connect-private-network/cloudflared/) should be the primary connectivity method for end-users to connect with services in your private network.  Cloudflare Tunnel via WARP Connector is the preferred method for mesh or other software-defined networking — most of which require bidirectional connectivity — or when organizations do not want to make changes to their underlying network routing infrastructure.
