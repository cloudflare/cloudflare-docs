---
pcx_content_type: concept
title: Routed subnets
---

# Routed Subnets

Each LAN interface (physical port + VLAN tag) is part of a directly-attached subnet. When you specify a static address for the LAN interface, you indicate both the interface’s address as well as the subnet it attaches to. For example, `192.168.100.13/24` means the LAN interface has address `192.168.100.13` and is part of the subnet `192.168.100.0/24`.

Some LAN networks are more complex; in addition to the directly-attached subnet, they might have additional subnets sitting behind L3 routers south of the Magic WAN Connector. We call these routed subnets.

Refer to the diagram below for an example of how this might work:

```mermaid
flowchart TB
accTitle: Routed subnets
accDescr: Some LANs are complex, and might have additional subnets behind L3 routers.

a((WAN)) --> b

subgraph b [Connector]
direction TB
c(LAN 1)
d(LAN n)
end

c --> e(subnet x):::blue
d --> f(subnet 192.168.100.0/24):::blue

f-->|192.168.100.10|g(Layer 3 router)

g --> h(routed subnet x):::red
g --> i(192.168.200.0/24):::red
g --> j(layer 3 router)
j --> k(routed subnet z):::red

classDef blue fill:#add8e6
classDef red fill:#ff6900
```

{{<Aside type="note">}}Blue color represents directly connected subnets, and red color represents routed subnets.{{</Aside>}}

To add a routed subnet to your LAN, you need:

- **Network prefix**: The subnet’s CIDR prefix; Cloudflare will automatically install static routes to this prefix in our global network (to forward packets for this subnet to the right Connector) and in your Connector (to forward packets for this subnet to the right LAN interface). In the figure above, the routed subnet on the right has prefix `192.168.200.0/24`.
- **Next-hop address**: The address of the L3 router to which the Connector should forward packets for this subnet. In the figure, the routed subnet on the right has next-hop address `192.168.100.10`.

Optionally, you can also enable NAT for this subnet by providing a static overlay prefix.

## Enable NAT for a subnet

Each subnet (directly-attached or routed) must have a unique address space within your Magic WAN. You can re-use address spaces locally by enabling static network address translation (NAT) for a subnet. Subnet NAT is 1:1. To enable it, supply an address prefix the same size as the subnet’s prefix, and the Magic WAN Connector will translate between the two.

For example:
- **Prefix**: `192.168.100.0/24`
- **Static NAT prefix**: `10.10.100.0/24`

Outbound traffic from host `192.168.100.13` in the subnet is translated to `10.10.100.13` in the Connector (and vice versa for incoming traffic).

In the dash, enable NAT for a subnet by populating its Static NAT Prefix field.

{{<Aside type="note">}}
Even if NAT is enabled, a subnet’s local prefix must be unique within its LAN. It can be reused on other LANs or other sites. Overlay-facing prefixes — that is, a subnet’s NAT prefix if NAT is enabled and its local prefix otherwise — must always be unique across your whole Magic WAN.
{{</Aside>}}