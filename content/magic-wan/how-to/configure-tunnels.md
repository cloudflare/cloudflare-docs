---
title: Configure tunnel endpoints
pcx-content-type: how-to
weight: 1
---

# Configure tunnel endpoints

Cloudflare assigns two Anycast IP addresses shortly after your onboarding call. Use these Anycast edge addresses as the Anycast GRE or IPsec tunnel destinations on your location's routers/endpoints. Cloudflare recommends two Anycast GRE or IPsec tunnels for each ISP and location router combination, one per Anycast IP.

To configure the Anycast GRE or IPsec tunnels between Cloudflare and your locations, you must provide the following data for each tunnel:

- **Customer edge IP address** — A public Internet routable IP address that is outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection ([Cloudflare Network Interconnect](/network-interconnect/)), you do not need to provide edge addresses. Cloudflare will provide them.
- **Interface address** — A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - 10.0.0.0–10.255.255.255
  - 172.16.0.0–172.31.255.255
  - 192.168.0.0–192.168.255.255
- **Private IP addresses** — The private IP address assigned to the **Cloudflare** and **customer** sides of the tunnel

For an example Anycast GRE or IPsec tunnel configuration, see [Anycast GRE configuration example](/magic-wan/reference/configuration-examples/#gre-tunnel-configuration-example).

### Add GRE tunnels

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic WAN**.
2.  Next to **Manage Magic WAN configuration**, click **Configure**.

{{<render file="../../magic-transit/_partials/_tunnel-configuration.md">}}
