---
title: Types of Interconnect
order: 1
---

# Types of interconnect

Cloudflare supports two types of network interconnect: Private network interconnect and virtual private network interconnect. The network interconnect is the link between your infrastructure and Cloudflare's network.

## Private network interconnect

Private network interconnects (PNI) are available at any of our [private peering facilities](https://www.peeringdb.com/net/4224). 

Choose a PNI if you are co-located with a Cloudflare data center. We also recommend a PNI if:

- Your link size is 10G or higher
- You want higher throughput than a virtual connection
- You want to eliminate as many intermediaries from an interconnect as possible

### Limitations

Private network interconnects can range from 10G to 100G. The smallest compatible link size for PNI is 10G, but customers with less than 10G traffic can use part of a 10G link.

## Virtual private network interconnect

Cloudflare partners with Equinix, Megaport, PCCW ConsoleConnect, PacketFabric, and Zayo to provide virtual private network interconnects (vPNI) that easily connect you with Cloudflare at any of our interconnection platform locations. For more information about our partner program, see [Network Interconnect Partner Program](https://www.cloudflare.com/network-interconnect-partnerships/).

Choose a vPNI when you are already using our partner providers or when you want a quick and easy way to onboard a secure cloud experience.

### Limitations

Virtual private network interconnection size depends on the interconnection platform partner.
