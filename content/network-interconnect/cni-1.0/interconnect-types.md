---
title: Types of interconnect
pcx_content_type: reference
weight: 2
meta:
  title: Types of interconnect
---

# Types of interconnect

Cloudflare supports two CNI 1.0 connectivity options: physical and virtual. The network interconnect is the link between your infrastructure and Cloudflare's network.

## Physical Cloudflare Network Interconnect 1.0

CNI 1.0 connections  are available at any of our [private peering facilities](https://www.peeringdb.com/net/4224). Choose a physical CNI 1.0 connection if you are co-located with a Cloudflare data center. We also recommend a physical CNI if:

- Your link size is 10G or higher
- You want higher throughput than a virtual connection
- You want to eliminate as many intermediaries from an interconnect as possible

### Limitations

Physical CNI 1.0 connections can range from 10G to 100G. The smallest compatible link size for CNI 1.0  is 10G, but customers with less than 10G traffic can use part of a 10G link.

## Virtual Cloudflare Network Interconnect 1.0

Cloudflare partners with Equinix, Megaport, Console Connect, PacketFabric, Coresite, Epsilon and Zayo to provide virtual Cloudflare Network Interconnect 1.0 connection  that easily connect you with Cloudflare at any of our interconnection platform locations. For more information about our partner program, see [Network Interconnect Partner Program](https://www.cloudflare.com/network-interconnect-partnerships/).

Choose a virtual CNI 1.0 connection  when you are already using our partner providers or when you want a quick and easy way to onboard a secure cloud experience.

### Limitations
Virtual CNI bandwidth may be limited by the interconnection platform partner.