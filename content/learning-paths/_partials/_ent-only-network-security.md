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
      - Support Anycast tunneling.
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

[Cloudflare Aegis](https://blog.cloudflare.com/cloudflare-aegis/) prevents external connections by providing dedicated egress IP addresses.

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**: Requires network-level firewall policies.

{{</details>}}