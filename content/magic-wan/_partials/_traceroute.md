---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note" header="​​Run <code>traceroute</code>">}}

Magic WAN clients connecting through {{<glossary-tooltip term_id="GRE tunnel" link="/magic-wan/get-started/configure-tunnels/">}}GRE{{</glossary-tooltip>}}, {{<glossary-tooltip term_id="IPsec tunnel" link="/magic-wan/get-started/configure-tunnels/">}}IPsec{{</glossary-tooltip>}}, [CNI](/network-interconnect/) or [WARP](/cloudflare-one/connections/connect-devices/warp/) that want to perform a `traceroute` to an endpoint behind a [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) will need to change some settings to make the command useful. Refer to [Run `traceroute`](/magic-wan/how-to/traceroute/) for more information.

{{</Aside>}}
