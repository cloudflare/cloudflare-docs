---
order: 3
---

# Map route prefixes smaller than /24

In order for Cloudflare to route your traffic from the edge to your data center(s) via GRE tunnels, you must provide your prefixes and the tunnels to which they should be mapped, similar to the example in the table below.

| Prefix          | GRE Tunnel |
| --------------- | ---------- |
| 103.21.244.0/29 | GRE_1_IAD  |
| 103.21.244.8/29 | GRE_2_ATL  |

The minimum advertising prefix is /24. However, since we use GRE tunnels as an outer wrapper for your traffic, we can route prefixes within that /24 to different tunnel end points.

For example, you can send `x.x.x.0/29` to Datacenter 1 and `x.x.x.8/29` to Datacenter 2. This is helpful when you operate in an environment with constrained IP resources.
