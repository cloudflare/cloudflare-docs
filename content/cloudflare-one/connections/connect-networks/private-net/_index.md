---
pcx_content_type: concept
title: Private networks
weight: 5
layout: single
---

# Private networks

With Cloudflare Zero Trust, you can connect private networks and the services running in those networks to Cloudflare's global network. This involves installing a [connector](#connectors) on the private network, and then [setting up routes](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/#3-connect-a-network) which define the IP addresses available in that environment. Unlike [public hostname routes](/cloudflare-one/connections/connect-networks/routing-to-tunnel/), private network routes can expose both HTTP and non-HTTP resources.

To reach private network IPs, end users must connect their device to Cloudflare and enroll in your Zero Trust organization. The most common method is to install the [WARP client](/cloudflare-one/connections/connect-devices/warp/) on their device, or you can onboard their network traffic to Cloudflare using our WARP connector or [Magic WAN](/magic-wan/zero-trust/cloudflare-tunnel/).

Administrators can optionally set [Gateway network policies](/cloudflare-one/policies/gateway/network-policies/) to control access to services based on user identity and device posture.

## Connectors

Here are the different ways you can connect your private network to Cloudflare:

- [**Cloudflare Tunnel**](/cloudflare-one/connections/connect-networks/private-net/cloudflared/) relies on a piece of software, `cloudflared`, to establish an outbound-only connection between your private network and Cloudflare. Outbound-only means that only traffic initiated from a user to a server routes through Cloudflare.
- [**WARP-to-WARP**](/cloudflare-one/connections/connect-networks/private-net/warp-to-warp/) relies on the WARP client to establish peer-to-peer connectivity between two or more devices. Each device running the WARP client can access services on any other WARP device via an assigned virtual IP address.
- [**WARP connector**](/cloudflare-one/connections/connect-networks/private-net/warp-connector/) relies on the WARP client to establish site-to-site connectivity between two or more private networks. When installed as a WARP connector, the WARP client acts as a subnet router to relay inbound and outbound traffic between all devices on a private network and Cloudflare.
- [**Magic WAN**](/magic-wan/) relies on GRE or IPsec tunnels to connect legacy network infrastructure to Cloudflare.
