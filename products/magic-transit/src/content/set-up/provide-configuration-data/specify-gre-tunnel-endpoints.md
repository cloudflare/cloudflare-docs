---
order: 1
type: table
---

# Specify tunnel endpoints

<ContentColumn>

## Anycast edge IP addresses

Cloudflare will assign 2 Anycast IP addresses shortly after your [onboarding](/set-up/onboarding)  kickoff call. Use these Anycast edge addresses as the GRE tunnel destinations on your data center routers/endpoints.

## Generic Routing Encapsulation (GRE)

Cloudflare recommends 2 GRE tunnels for each ISP and data center router combination, one per Anycast IP.

To configure the GRE tunnel(s) between Cloudflare and your data center(s), you must provide the following data for each tunnel:

* **Customer edge IP address**—A public Internet routable IP address that is outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection ([Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/about)), you do not need to provide edge addresses—Cloudflare will provide them.
* **Private subnet**—A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  * 10.0.0.0–10.255.255.255
  * 172.16.0.0–172.31.255.255
  * 192.168.0.0–192.168.255.255
* **Private IP addresses**—The private IP address assigned to the **Cloudflare** and **customer** sides of the tunnel

For an example GRE tunnel configuration, refer to this table:

</ContentColumn>

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

<ContentColumn>

## Scoped routes for GRE tunnels

To reduce latency for your GRE tunnel configurations, especially if you operate your own Anycast network, Cloudflare can steer your traffic by scoping it to specific Cloudflare data center regions.

Valid Cloudflare regions include AFR, APAC, EEUR, ENAM, ME, OC, SAM, WEUR, and WNAM.

To configure scoping for your traffic, you must provide Cloudflare with GRE tunnel data for each Cloudflare region.

For an example of scoping configuration data, see the table below. It lists GRE tunnels and their associated Cloudflare region codes:

<table>
 <thead>
  <tr>
   <th>GRE tunnel</th>
   <th>Region code</th>
   </tr>
  </thead>
  <tbody>
  <tr>
     <td>GRE_1_IAD</td>
     <td>AFR</td>
  </tr>
  <tr>
    <td>GRE_2_IAD</td>
    <td>EEUR</td>
  </tr>
  <tr>
    <td>GRE_3_ATL</td>
    <td>ENAM</td>
  </tr>
  <tr>
    <td>GRE_4_ATL</td>
    <td>ME</td>
    </tr>
</tbody>
</table>

Cloudflare has 13 geographic regions across the world. This table lists region codes and their associated regions:

<table>
  <thead>
    <tr>
      <th>Region code</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>WNAM</td>
    <td>Western North America
    </td>
    </tr>
    <tr>
    <td>ENAM</td>
    <td>Eastern North America
    </td>
    </tr>
    <tr>
    <td>WEU</td>
    <td>Western Europe
    </td>
    </tr>
    <tr>
    <td>EEU</td>
    <td>Eastern Europe
    </td>
    </tr>
    <tr>
    <td>NSAM</td>
    <td>Northern South America
    </td>
    </tr>
    <tr>
    <td>SSAM</td>
    <td>Southern South America
    </td>
    </tr>
    <tr>
    <td>OC</td>
    <td>Oceania
    </td>
    </tr>
    <tr>
    <td>ME</td>
    <td>Middle East
    </td>
    </tr>
    <tr>
    <td>NAF</td>
    <td>Northern Africa
    </td>
    </tr>
    <tr>
    <td>SAF</td>
    <td>Southern Africa
    </td>
    </tr>
    <tr>
    <td>IN</td>
    <td>India
    </td>
    </tr>
    <tr>
    <td>SEAS</td>
    <td>Southeast Asia
    </td>
    </tr>
    <tr>
    <td>NEAS</td>
    <td>Northeast Asia
    </td>
    </tr>
  </tbody>
</table>

</ContentColumn>
