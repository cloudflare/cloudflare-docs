---
title: Specify tunnel endpoints
alwaysopen: true
order: 1
hidden: false
---

## Anycast edge IP addresses

Cloudflare will assign 2 Anycast IP addresses shortly after the [onboarding kickoff call](/magic-transit/set-up/onboarding). Use these Anycast edge IPs as the GRE tunnel destinations on your data center routers/endpoints.

## Generic Routing Encapsulation (GRE)

Cloudflare recommends 2 GRE tunnels for each ISP and data center router combination, one per Anycast IP.

To configure the GRE tunnel(s) between Cloudflare and your data center(s), you must provide the following data for each tunnel:

* **Customer edge IP address**—A public Internet routable IP address that is outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you are using a physical or virtual connection ([Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/about)), leave this section blank - Cloudflare will provide this IP.
* **Private subnet**—A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  * 10.0.0.0 – 10.255.255.255
  * 172.16.0.0 – 172.31.255.255
  * 192.168.0.0 – 192.168.255.255
* **Private IP addresses**—The private IP address assigned to the **Cloudflare** and **customer** sides of the tunnel

For an example GRE tunnel configuration, refer to this table:

<table>
  <thead>
    <tr>
      <td colspan="6" ><strong>Example GRE Tunnel IPs</strong></td>
    </tr>
    <tr>
      <td rowspan="2" ><strong>GRE tunnel</strong></td>
      <td rowspan="2" ><strong>Customer edge IP</strong></td>
      <td rowspan="2" ><strong>Cloudflare Anycast IP</strong></td>
      <td rowspan="2" ><strong>Private subnet</strong></td>
    </tr>
    <tr>
      <td><strong>Customer private IP</strong></td>
      <td><strong>Cloudflare private IP</strong></td>
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
