---
pcx_content_type: concept
title: Tunnels & encapsulation
weight: 
---

# Tunnels & encapsulation

Magic WAN uses [Generic Routing Encapsulation (GRE)](https://www.cloudflare.com/learning/network-layer/what-is-gre-tunneling/) and [IPsec](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/) tunnels to transmit packets from Cloudflare’s edge to your origin network. Cloudflare sets up tunnel endpoints on edge servers inside your network namespace, and you [set up tunnel endpoints](/magic-wan/how-to/configure-tunnels/) on routers at your data center.

## Encapsulation

Magic WAN [encapsulates IP packets](https://www.cloudflare.com/learning/network-layer/what-is-tunneling/) destined for your network and transmits them across the tunnels to your tunnel endpoint router, which decapsulates the packets and sends them to your internal network.

{{<Aside type="note" header="Note">}}

To accommodate additional header data introduced by encapsulation, the maximum segment size (MSS) must be adjusted so that packets comply with the standard Internet routable maximum transmission unit (MTU), which is 1500 bytes.

For instructions, refer to [Set Maximum Segment Size](/magic-wan/prerequisites/#set-maximum-segment-size).

{{</Aside>}}

## Anycast protocol

Magic WAN uses [Anycast](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) IP addresses for Cloudflare’s tunnel endpoints, meaning that any server in any data center is capable of encapsulating and decapsulating packets for the same tunnel.

This works because the Anycast protocol is stateless — each packet is processed independently and does not require any negotiation or coordination between tunnel endpoints. Tunnel endpoints are technically bound to IP addresses but do not need to be bound to specific devices. Any device that can strip off the outer headers and then route the inner packet can handle any packet sent over the tunnel.

Cloudflare’s Anycast architecture provides a conduit to your Anycast tunnel for every server in every data center on Cloudflare’s global edge network.
