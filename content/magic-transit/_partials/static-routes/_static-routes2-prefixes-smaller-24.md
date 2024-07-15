---
_build:
  publishResources: false
  render: never
  list: never
---

## ​​Map route prefixes smaller than `/24`

You must provide your prefixes and the tunnels that should be mapped to for Cloudflare to route your traffic from our global network to your data centers via anycast tunnels. Use the table below as reference.

Prefix          | NextHop
---             | ---
`103.21.244.0/29` | `TUNNEL_1_IAD`
`103.21.244.8/29` | `TUNNEL_2_ATL`

The minimum advertising prefix is `/24`, but because Cloudflare uses anycast tunnels as an outer wrapper for your traffic, we can route prefixes within that `/24` to different tunnel endpoints. For example, you can send `x.x.x.0/29` to Data Center 1 and `x.x.x.8/29` to Data Center 2. This is helpful when you operate in an environment with constrained IP resources.
