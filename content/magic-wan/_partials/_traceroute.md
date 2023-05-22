---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note" header="​​Run <code>traceroute</code>">}}

Magic WAN clients connecting through [GRE, IPsec](/magic-wan/get-started/configure-tunnels/), [CNI](/network-interconnect/) or [WARP](/magic-wan/tutorials/warp/) that want to perform a `traceroute` to an endpoint behind a [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) will need to change some settings to make the command useful. Refer to [Run `traceroute`](/magic-wan/how-to/traceroute/) for more information.

