---
order: 
pcx-content-type: how-to
---

import StaticRoutesApi from "../../_partials/_static-routes-api.md"

# Map route prefixes smaller than /24

You must provide your prefixes and the tunnels they should be mapped to in order for Cloudflare to route your traffic from the edge to your data centers via GRE tunnels. Use the table below as reference.

| Prefix          | GRE Tunnel |
| --------------- | ---------- |
| 103.21.244.0/29 | GRE_1_IAD  |
| 103.21.244.8/29 | GRE_2_ATL  |

The minimum advertising prefix is /24, but because Cloudflare uses GRE tunnels as an outer wrapper for your traffic, we can route prefixes within that /24 to different tunnel end points.

For example, you can send `x.x.x.0/29` to Datacenter 1 and `x.x.x.8/29` to Datacenter 2. This is helpful when you operate in an environment with constrained IP resources.

## Create and edit static routes

<StaticRoutesApi/>
