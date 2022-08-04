---
title: Configure tunnel endpoints
pcx_content_type: how-to
weight: 1
---

# Configure tunnel endpoints

Cloudflare recommends two tunnels for each ISP and data center router combination, one per Cloudflare endpoint. Cloudflare will assign two Cloudflare endpoint addresses shortly after your onboarding kickoff call that you can use as the tunnel destinations on your data center routers/endpoints.

To configure the tunnels between Cloudflare and your locations, you must provide the following data for each tunnel:

- **Customer edge IP address** — A public Internet routable IP address that is outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection ([Cloudflare Network Interconnect](/network-interconnect/)), you do not need to provide edge addresses. Cloudflare will provide them.
- **Interface address** — A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - 10.0.0.0–10.255.255.255
  - 172.16.0.0–172.31.255.255
  - 192.168.0.0–192.168.255.255
  - 169.254.244.0/20
- **Private IP addresses** — The private IP address assigned to the **Cloudflare** and **customer** sides of the tunnel

<details>
<summary>
  Edge routing configuration example
</summary>

<table>
  <thead>
    <tr>
      <th style="min-width:108px">Tunnel</th>
      <th style="min-width:125px">Customer edge IP</th>
      <th style="min-width:150px">Private subnet</th>
      <th style="min-width:100px">Customer private IP</th>
      <th style="min-width:100px">Cloudflare private IP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TNL_1_IAD</td>
      <td>104.18.112.75</td>
      <td>10.10.10.100/31</td>
      <td>10.10.10.100</td>
      <td>10.10.10.101</td>
    </tr>
    <tr>
      <td>TNL_2_IAD</td>
      <td>104.18.112.75</td>
      <td>10.10.10.102/31</td>
      <td>10.10.10.102</td>
      <td>10.10.10.103</td>
    </tr>
    <tr>
      <td>TNL_3_ATL</td>
      <td>104.40.112.125</td>
      <td>10.10.10.104/31</td>
      <td>10.10.10.104</td>
      <td>10.10.10.105</td>
    </tr>
    <tr>
      <td>TNL_4_ATL</td>
      <td>104.40.112.125</td>
      <td>10.10.10.106/31</td>
      <td>10.10.10.106</td>
      <td>10.10.10.107</td>
    </tr>
  </tbody>
</table>
</details>

### Add tunnels

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic WAN**.
2.  Next to **Manage Magic WAN configuration**, click **Configure**.

{{<render file="../../magic-transit/_partials/_tunnel-configuration.md">}}
