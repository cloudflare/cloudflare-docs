---
title: Cloudflare Gateway
pcx_content_type: tutorial
meta:
  title: Connect to Cloudflare Gateway with Magic WAN
---

# Connect to Cloudflare Gateway with Magic WAN

You can route traffic through Magic WAN and [Cloudflare Gateway](/cloudflare-one/policies/filtering/) to secure Internet browsing and SaaS application access from internal users and devices.

In this tutorial, you will learn how to configure the Anycast GRE or IPsec tunnel on-ramp to Magic WAN, which connects to Cloudflare Gateway, from enterprise site routers.

## Prerequisites

Before you can configure the Anycast GRE or IPsec tunnel on-ramp to Magic WAN, make sure that you already have:

- Purchased Magic WAN and Gateway
- Added a [Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#download-the-cloudflare-root-certificate) if you are not using [WARP](/cloudflare-one/connections/connect-devices/warp/)
- Talked to your Cloudflare team to provision the combination of Magic WAN and Gateway
- Received the Cloudflare GRE endpoint (Anycast IP address) assigned to Magic WAN
- Established connectivity between site edge routers and the Cloudflare GRE endpoint via the Internet or Cloudflare Network Interconnect (CNI)
- Chosen site routers that support Anycast GRE or IPsec tunnels and Policy-based Routing (PBR). This is required so that specific Internet-bound traffic from the sites' private networks can be routed over the Anycast GRE or IPsec tunnel to Magic WAN, and subsequently Gateway, to enforce a user's specific web access policies.

You should also make sure that your site routers use proper routing techniques such as policy-based routing. This is needed to match relevant Internet-bound traffic from the site’s appropriate local private subnets and route them over the GRE tunnel to Cloudflare Magic WAN and Gateway for processing. Otherwise, such Internet-bound traffic would likely be routed straight out of the physical uplink of the site router without the protection enforced by Cloudflare Gateway.

## Example scenario

For the purpose of this tutorial, setup will reference a scenario where an enterprise has three sites: headquarters, a branch office, and a data center. Each site has a local private network with RFC 1918 address assignments:

- Headquarters is assigned a `192.168.0.0/16` network, and Router A is the site router terminating the Anycast GRE or IPsec tunnel
- Branch office is assigned `10.0.1.0/24` network, and Router B is the site router terminating the Anycast GRE or IPsec tunnel
- Data center is assigned with `172.16.0.0/12` network, and Router C is the site router terminating the Anycast GRE or IPsec tunnel

Each site's private network has an on-ramp to Cloudflare's Anycast network using Anycast GRE or IPsec tunnels, and the Cloudflare tunnel endpoint IP address is `192.0.2.10`. The table below summarizes the Anycast GRE or IPsec tunnel configuration and route table entries for the Magic WAN topology.

### Configuration examples
{{<table-wrap>}}

Tunnel name | Cloudflare GRE endpoint | Customer GRE endpoint | Interface address | MWAN prefix | MWAN next hop | MWAN route priority
--- | --- | --- | --- | --- | --- | ---
to_Router_A	| 192.0.2.10 | 198.51.100.10 | 10.255.255.1/31 | 192.168.0.0/16 | 10.255.255.0 | 100
to_Router_B | 192.0.2.10 | 198.51.100.101 | 10.255.255.3/31 | 10.0.1.0/24 | 10.255.255.2 | 100
to_Router_C	| 192.0.2.10 | 198.51.100.202 | 10.255.255.5/31 | 172.16.0.0/12 | 10.255.255.4 | 100

{{</table-wrap>}}

### 1. Add Anycast GRE or IPsec tunnel

1. Follow the instructions in [Configure tunnel endpoints](/magic-wan/get-started/configure-tunnels/#add-tunnels) to create all the GRE tunnels for routers A, B, and C.
2. In keeping with the example scenario, fill out the tunnel information to match the example below.

![Tunnel configuration for each branch office, including interface address, Customer and Cloudflare GRE endpoints, and TTL and MTU](/magic-wan/static/gre-tunnel-values.png)

{{<Aside type="note">}}
When you create a GRE tunnel the TTL and MTU fields are auto-populated. The default MTU value of 1476 bytes takes into account the GRE encapsulation overhead of 24 bytes (20 bytes for the outer IP header plus 4 bytes for the mandatory GRE header) that will be added to the original (inner) IP packet when they are sent over the GRE tunnel. Refer to [Set maximum segment size](/magic-wan/prerequisites/#set-maximum-segment-size) for more information.
{{</Aside>}}

### 2. Add static routes

1. Follow the instructions in [Create a static route](/magic-wan/get-started/configure-static-routes/#create-a-static-route) to create a new static route.
2. The **Priority** and **Region code** fields are auto-populated. Tunnels with lower priority numbers will be chosen first. You can also steer traffic to a certain region to reduce latency by scoping your tunnel to specific Cloudflare data center regions. Refer to [Create a static route](/magic-wan/get-started/configure-static-routes/#create-a-static-route) for more information.
3. In keeping with the example scenario, the list of static routes should match the example below.

![Static route configuration with defined prefixes, next hops, and priorities](/magic-wan/static/static-route-values.png)

### 3. Setup site routers

After setting up tunnels on Magic WAN side, you need to configure your site routers. In keeping with this example, refer to the [Configuration examples](#configuration-examples) table to find the IP addresses you should use.

### 4. Set up Cloudflare Gateway

The last step is to configure your Cloudflare Gateway policies from the [Zero Trust](https://one.dash.cloudflare.com/) dashboard. To set up the policies, refer to our [Gateway documentation](/cloudflare-one/policies/filtering/).

The Cloudflare Gateway upgrade supports all TCP and UDP ports, traffic sourced from RFC, and BYOIP.

After you have configured Cloudflare Gateway, enterprise users and devices from each of the sites mentioned in the example scenario will be able to safely browse or access Internet resources under the protection of the Cloudflare global network.

{{<render file="_traceroute.md">}}