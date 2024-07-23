---
_build:
  publishResources: false
  render: never
  list: never
---

{{<details header="Cloudflare Magic Transit">}}

[Cloudflare Magic Transit](/magic-transit/) is a network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**
  - Client's routers must:
      - Support anycast tunneling.
      - Allow configuration of at least one tunnel per Internet service provider (ISP).
      - Support maximum segment size (MSS) clamping.

{{</details>}}

{{<details header="Cloudflare Network Interconnect">}}

[Cloudflare Network Interconnect](/network-interconnect/) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**
  - Requires some networking knowledge.
  - Only applies to some customer use cases.

{{</details>}}

{{<details header="Cloudflare Aegis">}}

Cloudflare Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 [WAF](/waf/) and {{<glossary-tooltip term_id="content delivery network (CDN)">}}CDN{{</glossary-tooltip>}} services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing a small list of IP addresses through your {{<glossary-tooltip term_id="layer 3">}}layer 3{{</glossary-tooltip>}} firewall.

Refer to the [introductory blog post](https://blog.cloudflare.com/cloudflare-aegis/) for details, or to the [Multi-vendor reference architecture](/reference-architecture/architectures/multi-vendor/#internet-default) for an example use case.

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**: Requires network-level firewall policies.

{{</details>}}