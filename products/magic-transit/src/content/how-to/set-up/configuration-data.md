---
title: Configuration data
weight: 212
---

For details on the configuration data required for Cloudflare to set up Magic Transit for your organization, see these topics:

* [Subnets](#subnets)
* [Anycast edge IP addresses](#anycast-edge-ip-addresses)
* [Generic Routing Encapsulation (GRE)](#generic-routing-encapsulation-(gre))
* [Routing from edge to data center](#routing-from-edge-to-data-center)
* [Endpoint health checks](#endpoint-health-checks)

## Subnets

List all subnets and the ASNs from which you want them to originate.

When specifying subnets, observe the these guidelines:

* Subnets must support at least 256 hosts (/24 in classless inter-domain routing [CIDR] notation).
* Internet Routing Registry entries and Letters of Authorization must match the subnets and originating prefixes you submit to Cloudflare.
* When using contiguous subnets, specify aggregate prefixes where possible.
* When using [resource public key infrastructure (RPKI)](https://tools.ietf.org/html/rfc8210) to sign routes, Route Origin Authorizations must match the subnet and originating prefixes you submit to Cloudflare.
* If you do not own an ASN, you may use the Cloudflare ASN (AS13335) as the originating AS.

For an example subnet configuration, refer to this table:

<table>
  <thead>
    <tr>
      <td colspan="2" ><strong>List of subnets to advertise</strong></td>
    </tr>
    <tr>
      <td><strong>Subnet</strong></td>
      <td><strong>Originating AS</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>103.21.244.0/23</td>
      <td>AS13335</td>
    </tr>
    <tr>
      <td>131.0.72.0/22</td>
      <td>AS395747</td>
    </tr>
    <tr>
      <td>103.21.245.0/24</td>
      <td>AS395747</td>
    </tr>
  </tbody>
</table>

## Anycast edge IP addresses

Cloudflare will assign 2 Anycast IP addresses shortly after the kickoff call. Use these Anycast edge IPs as the GRE tunnel destinations on your data center routers/endpoints.

## Generic Routing Encapsulation (GRE)

Cloudflare recommends 2 GRE tunnels for each ISP and data center router combination, one per Anycast IP.

To configure the GRE tunnel(s) between Cloudflare and your data center(s), you must provide the following data for each tunnel:

* **Customer edge IP address**—A public Internet routable IP address that is outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP.
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

## Routing from edge to data center

Cloudflare uses a static configuration to route traffic from the edge through the GRE tunnels back to your data center(s).

You must assign a route priority to each GRE tunnel–subnet pair in your GRE configuration, as follows:

* Lower values have greater priority.

* When the priority values for two subnet entries match—as illustrated by the 103.21.244.0/24 subnet in the example configuration—Cloudflare uses equal-cost multi-path (ECMP) packet forwarding to route traffic to both tunnels.

For an example edge routing configuration, refer to this table:

<table>
  <thead>
    <tr>
      <td colspan="3" ><strong>Example routing configuration</strong></td>
    </tr>
    <tr>
      <td><strong>GRE tunnel</strong></td>
      <td><strong>Subnet</strong></td>
      <td><strong>Priority</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GRE_1_IAD</td>
      <td>103.21.244.0/24</td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_2_IAD</td>
      <td>103.21.244.0/24</td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_3_ATL</td>
      <td>103.21.244.0/24</td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_4_ATL</td>
      <td>103.21.244.0/24</td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_1_IAD</td>
      <td>103.21.245.0/24</td>
      <td>200</td>
    </tr>
    <tr>
      <td>GRE_2_IAD</td>
      <td>103.21.245.0/24</td>
      <td>200</td>
    </tr>
    <tr>
      <td>GRE_3_ATL</td>
      <td>103.21.245.0/24</td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_4_ATL</td>
      <td>103.21.245.0/24</td>
      <td>100</td>
    </tr>
  </tbody>
</table>

## Endpoint health checks

Magic Transit uses endpoint health checks to determine the overall health of your inter-network connections. Probes originate from Cloudflare infrastructure, outside customer network namespaces, and target IP addresses deep within your network, beyond the tunnel-terminating border router. These “long distance” probes are purely diagnostic.

When choosing which endpoint IP addresses to monitor with health checks, use these guidelines:

* Provide 1 IP address for each of the subnets that will be advertised by Cloudflare.
* Redundant IPs routed via the same ISP and infrastructure are not necessary but are useful when troubleshooting.

Cloudflare pings health check IPs from within the [published Cloudflare IP range](https://www.cloudflare.com/ips/), which is also available via the [Cloudflare API](https://api.cloudflare.com/#cloudflare-ips-properties).

For an example endpoint health check configuration, refer to this table:

<table>
  <thead>
    <tr>
      <td colspan="2" ><strong>Example endpoint health check configuration</strong></td>
    </tr>
    <tr>
      <td><strong>Subnet</strong></td>
      <td><strong>Endpoint IP address</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>103.21.244.0/24</td>
      <td>103.21.244.100</td>
    </tr>
    <tr>
      <td>103.21.245.0/24</td>
      <td>103.21.245.100</td>
    </tr>
  </tbody>
</table>
