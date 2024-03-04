---
title: Types of interconnect
pcx_content_type: concept
weight: 5
---

# Types of interconnect

Cloudflare supports two classic CNI connectivity options: physical and virtual. The network interconnect is the link between your infrastructure and Cloudflare's network.

The use case for classic CNI is Magic Transit. If your origins are behind Magic Transit over a classic CNI, then all Cloudflare services that work with public origins will run over the CNI (for example Load Balancer, WAF, Cache, etc).

## Physical Network Interconnect (Classic)

Classic CNI connections  are available at any of our [private peering facilities](https://www.peeringdb.com/net/4224).

Choose a physical connection if you are co-located with a Cloudflare data center. We also recommend a physical CNI if:
- Your link size is 10G or higher
- You want higher throughput than a virtual connection
- You want to eliminate as many intermediaries from an interconnect as possible

### Limitations

Classic CNI connections  can range from 10G to 100G. The smallest compatible link size for classic CNI  is 10G, but customers with less than 10G traffic can use part of a 10G link.

## Virtual Network Interconnect (Classic)

Cloudflare partners with Equinix, Megaport, Console Connect, PacketFabric, Coresite, Epsilon and Zayo to provide virtual circuits that easily connect you with Cloudflare at any of our interconnection platform locations. For more information about our partner program, see [Network Interconnect Partner Program](https://www.cloudflare.com/network-interconnect-partnerships/).

Choose a virtual connection  when you are already using our partner providers or when you want a quick and easy way to onboard a secure cloud experience.

### Limitations

Virtual CNI bandwidth may be limited by the interconnection platform partner.
