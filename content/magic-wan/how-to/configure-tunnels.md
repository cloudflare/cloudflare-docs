---
title: Configure tunnel endpoints
pcx_content_type: how-to
weight: 1
---

# Configure tunnel endpoints

Cloudflare recommends two tunnels for each ISP and data center router combination, one per Cloudflare endpoint. Cloudflare will assign two Cloudflare endpoint addresses shortly after your onboarding kickoff call that you can use as the tunnel destinations on your data center routers/endpoints.

To configure the tunnels between Cloudflare and your locations, you must provide the following data for each tunnel:

- **Customer edge IP address** — A public Internet routable IP address that is outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection ([Cloudflare Network Interconnect](/network-interconnect/)), you do not need to provide edge addresses. Cloudflare will provide them.
- **Interface address** — A 31-bit subnet (`/31` in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - `10.0.0.0` – `10.255.255.255`
  - `172.16.0.0` – `172.31.255.255`
  - `192.168.0.0` – `192.168.255.255`
  - `169.254.244.0/20`
- **Private IP addresses** — The private IP address assigned to the **Cloudflare** and **customer** sides of the tunnel

<details>
<summary>
  Edge routing configuration example
</summary>

Tunnel | Customer edge IP | Private subnet | Customer private IP | Cloudflare private IP
--- | --- | --- | --- | ---
TNL_1_IAD | `104.18.112.75` | `10.10.10.100/31` | `10.10.10.100` | `10.10.10.101`
TNL_2_IAD | `104.18.112.75` | `10.10.10.102/31` | `10.10.10.102` | `10.10.10.103`
TNL_3_ATL | `104.40.112.125` | `10.10.10.104/31` | `10.10.10.104` | `10.10.10.105`
TNL_4_ATL | `104.40.112.125` | `10.10.10.106/31` | `10.10.10.106` | `10.10.10.107`

</details>

### Add tunnels

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Manage Magic WAN configuration** > **Configure**.

{{<render file="../../magic-transit/_partials/_tunnel-configuration.md">}}
