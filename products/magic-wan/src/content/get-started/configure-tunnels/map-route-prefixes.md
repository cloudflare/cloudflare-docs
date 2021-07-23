---
title: Map route prefixes
order: 6
pcx-content-type: how-to
---

# Map route prefixes smaller than /24

Before Cloudflare can route your traffic from the edge to your locations via GRE tunnels, you must provide your prefixes and the tunnels to which they should be mapped, similar to the example in the table below.

| Prefix          | GRE Tunnel |
| --------------- | ---------- |
| 103.21.244.0/29 | GRE_1_IAD  |
| 103.21.244.8/29 | GRE_2_ATL  |

The minimum advertising prefix is /24. However, because Cloudflare uses GRE tunnels as an outer wrapper for your traffic, Cloudflare can route prefixes within that /24 to different tunnel endpoints.

For example, you can send `x.x.x.0/29` to Datacenter 1 and `x.x.x.8/29` to Datacenter 2, which is helpful when operating in environments with constrained IP resources.