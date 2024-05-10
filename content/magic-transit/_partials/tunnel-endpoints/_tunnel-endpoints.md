---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: ipRange
---

Cloudflare recommends two tunnels for each ISP and network location router combination, one per Cloudflare endpoint. Cloudflare will assign two Cloudflare endpoint addresses shortly after your onboarding kickoff call that you can use as the tunnel destinations on your network location's routers/endpoints.

To configure the tunnels between Cloudflare and your locations, you must provide the following data for each tunnel:

- **Tunnel name**: For GRE tunnels, the name must have 15 or fewer characters. IPsec tunnels have no character limit. For both GRE and IPsec tunnels, the name cannot contain spaces or special characters, and cannot be shared with other tunnels.
- **Cloudflare endpoint address**: The public IP address of the Cloudflare side of the tunnel.
- **Customer endpoint**: A public Internet routable IP address outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection like [Cloudflare Network Interconnect](/network-interconnect/), you do not need to provide endpoints because Cloudflare will provide them. <br>
This value is not required for {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels, unless your router is using an {{<glossary-tooltip term_id="Internet key exchange (IKE)">}}Internet Key Exchange (IKE){{</glossary-tooltip>}} ID of type `ID_IPV4_ADDR`.
- **Interface address**: A 31-bit (recommended) or 30-bit subnet (`/31` or `/30` in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - `10.0.0.0/8`
  - `172.16.0.0/12`
  - `192.168.0.0/16`
  - $1
  {{<Aside type="warning">}}Especially for cloud service providers that might automatically generate prefixes for you, make sure the prefixes are always within the allowed Cloudflare ranges, or the tunnel will not work.{{</Aside>}}
- **TTL**: Time to Live (TTL) in number of hops for the {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}} tunnel. The default value is 64.
- **MTU**: Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The default value is 1476.