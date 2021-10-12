---
title: Specify tunnel endpoints
order: 
pcx-content-type: how-to
---

# Specify tunnel endpoints

## Anycast edge IP addresses

Cloudflare assigns two Anycast IP addresses shortly after your onboarding kickoff call. Use these Anycast edge addresses as the GRE tunnel destinations on your location's routers/endpoints.

## Generic Routing Encapsulation (GRE)

Cloudflare recommends two GRE tunnels for each ISP and location router combination, one per Anycast IP.

To configure the GRE tunnel(s) between Cloudflare and your locations, you must provide the following data for each tunnel:

* **Customer edge IP address** — A public Internet routable IP address that is outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection ([Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/)), you do not need to provide edge addresses. Cloudflare will provide them.
* **Private subnet** — A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  * 10.0.0.0–10.255.255.255
  * 172.16.0.0–172.31.255.255
  * 192.168.0.0–192.168.255.255
* **Private IP addresses** — The private IP address assigned to the **Cloudflare** and **customer** sides of the tunnel

For an example GRE tunnel configuration, see [GRE tunnel configuration example](/reference/configuration-examples#gre-tunnel-configuration-example).

## Scoped routes for GRE tunnels

To reduce latency for your GRE tunnel configurations, especially if you operate your own Anycast network, Cloudflare can steer your traffic by scoping it to specific Cloudflare data center regions.

Valid Cloudflare regions include AFR, APAC, EEUR, ENAM, ME, OC, SAM, WEUR, and WNAM.

To configure scoping for your traffic, you must provide Cloudflare with GRE tunnel data for each Cloudflare region.

For an example of scoping configuration data, see [scoping configuration data example](/reference/configuration-examples#scoping-configuration-data-example).

For a list of Cloudflare's geographic regions across the world and their codes, see [regions and region codes](/reference/configuration-examples#regions-and-region-codes).
