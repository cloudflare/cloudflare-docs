---
order: 
type: table
pcx-content-type: how-to
---

# Specify tunnel endpoints

<ContentColumn>

## Anycast edge IP addresses

Cloudflare will assign two Anycast IP addresses shortly after your onboarding kickoff call. Use these Anycast edge addresses as the GRE tunnel destinations on your data center routers/endpoints.

## Generic Routing Encapsulation (GRE)

Cloudflare recommends two GRE tunnels for each ISP and data center router combination, one per Anycast IP.

To configure the GRE tunnel(s) between Cloudflare and your data centers, you must provide the following data for each tunnel:

- **GRE tunnel name** — A valid Linux interface name with 15 or less characters. The tunnel name cannot contain spaces or special characters, and the name cannot be shared with other GRE tunnels.
- **Customer GRE endpoint** — A public Internet routable IP address outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection like [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/), you do not need to provide GRE endpoints because Cloudflare will provide them.
- **Interface address** — A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - 10.0.0.0–10.255.255.255
  - 172.16.0.0–172.31.255.255
  - 192.168.0.0–192.168.255.255
- **TTL** — Time to Live (TTL) in number of hops for the GRE tunnel. The default value is 64.
- **MTU** — Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The default value is 1476.

</ContentColumn>

<details>
<summary>
    Edge routing configuration example
</summary>
<div>
<table>
  <thead>
    <tr>
      <th style='min-width:70px'>GRE tunnel</th>
      <th style='min-width:125px'>Customer edge IP</th>
      <th style='min-width:100px'>Anycast IP</th>
      <th style='min-width:130px'>Private subnet</th>
      <th style='min-width:115px'>Customer private IP</th>
      <th style='min-width:100px'>Cloudflare private IP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GRE_1_IAD</td>
      <td>104.18.112.75</td>
      <td>Anycast IP 1</td>
      <td>10.10.10.100/31</td>
      <td>10.10.10.100</td>
      <td>10.10.10.101</td>
    </tr>
    <tr>
      <td>GRE_2_IAD</td>
      <td>104.18.112.75</td>
      <td>Anycast IP 2</td>
      <td>10.10.10.102/31</td>
      <td>10.10.10.102</td>
      <td>10.10.10.103</td>
    </tr>
    <tr>
      <td>GRE_3_ATL</td>
      <td>104.40.112.125</td>
      <td>Anycast IP 1</td>
      <td>10.10.10.104/31</td>
      <td>10.10.10.104</td>
      <td>10.10.10.105</td>
    </tr>
    <tr>
      <td>GRE_4_ATL</td>
      <td>104.40.112.125</td>
      <td>Anycast IP 2</td>
      <td>10.10.10.106/31</td>
      <td>10.10.10.106</td>
      <td>10.10.10.107</td>
    </tr>
  </tbody>
</table>
</div>
</details>
