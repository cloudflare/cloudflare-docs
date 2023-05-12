---
title: Cloudflare Gateway
pcx_content_type: tutorial
meta:
  title: Connect to Cloudflare Gateway with Magic WAN
---

# Connect to Cloudflare Gateway with Magic WAN

You can route traffic through Magic WAN and filter it with [Cloudflare Gateway](/cloudflare-one/policies/filtering/). Cloudflare Gateway allows you to set up policies to inspect outbound traffic to the Internet through DNS, network, HTTP and egress filtering. Each policy serves different use cases, and we recommend that you read the [Gateway documentation](/cloudflare-one/policies/filtering/) to learn more.

In this tutorial, you will learn how to configure the Anycast GRE or IPsec tunnel on-ramp to Magic WAN, which connects to Cloudflare Gateway, from enterprise site routers.

{{<render file="_traceroute.md">}}

## Prerequisites

Before you can configure the Anycast GRE or IPsec tunnel on-ramp to Magic WAN, make sure that you already have:

- Purchased Magic WAN and Gateway.
- Added a [Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#download-the-cloudflare-root-certificate) to the client machine you are accessing the network with, if you do not have [WARP](/cloudflare-one/connections/connect-devices/warp/) installed.
- Talked to your Cloudflare team to provision the combination of Magic WAN and Gateway.
- Received the Cloudflare GRE endpoint (Anycast IP address) assigned to Magic WAN.
- Established connectivity between site edge routers and the Cloudflare GRE endpoint via the Internet or Cloudflare Network Interconnect (CNI).
- Chosen site routers that support Anycast GRE or IPsec tunnels and Policy-based Routing (PBR). This is required so that specific Internet-bound traffic from the sites' private networks can be routed over the Anycast GRE or IPsec tunnel to Magic WAN, and subsequently Gateway, to enforce a user's specific web access policies.

You should also make sure that your site routers use proper routing techniques such as policy-based routing. This is needed to match relevant Internet-bound traffic from the site’s appropriate local private subnets and route them over the GRE tunnel to Cloudflare Magic WAN and Gateway for processing. Otherwise, such Internet-bound traffic would likely be routed straight out of the physical uplink of the site router without the protection enforced by Cloudflare Gateway.

## Example scenario

For the purpose of this tutorial, setup will reference a scenario where an enterprise has three sites: headquarters, a branch office, and a data center. Each site has a local private network with RFC 1918 address assignments:

- Headquarters is assigned a `192.168.0.0/16` network, and Router A is the site router terminating the Anycast GRE or IPsec tunnel.
- Branch office is assigned `10.0.1.0/24` network, and Router B is the site router terminating the Anycast GRE or IPsec tunnel.
- Data center is assigned with `172.16.0.0/12` network, and Router C is the site router terminating the Anycast GRE or IPsec tunnel.

Each site's private network has an on-ramp to Cloudflare's Anycast network using Anycast GRE or IPsec tunnels, and the Cloudflare tunnel endpoint IP address is `192.0.2.10`.

The table below summarizes the Anycast GRE or IPsec tunnel configuration and route table entries for the Magic WAN topology.

{{<table-wrap>}}

Tunnel name | Cloudflare GRE endpoint | Customer GRE endpoint | Interface address | MWAN prefix | MWAN next hop | MWAN route priority
--- | --- | --- | --- | --- | --- | ---
to_Router_A	| 192.0.2.10 | 198.51.100.10 | 10.255.255.1/31 | 192.168.0.0/16 | 10.255.255.0 | 100
to_Router_B | 192.0.2.10 | 198.51.100.101 | 10.255.255.3/31 | 10.0.1.0/24 | 10.255.255.2 | 100
to_Router_C	| 192.0.2.10 | 198.51.100.202 | 10.255.255.5/31 | 172.16.0.0/12 | 10.255.255.4 | 100

{{</table-wrap>}}

## 1. Add the GRE tunnels

1. Follow the instructions in [Configure tunnel endpoints](/magic-wan/get-started/configure-tunnels/#add-tunnels) to create all the tunnels for routers A, B, and C. This example creates GRE tunnels, but you can also follow the same steps to add IPsec tunnels.
2. In keeping with the example scenario, fill out the tunnel information to match the example below. You can leave any default values not mentioned here.

{{<table-wrap>}}

GRE tunnel name | Description | Interface address | Customer GRE endpoint | Cloudflare GRE endpoint
--- | --- | --- | --- | --- 
`to_Router_A` | To HQ router A | `10.255.255.1/31` | `198.51.100.10` | `192.0.2.10`
`to_Router_B` | To branch router B | `10.255.255.3/31` | `198.51.100.202` | `192.0.2.10`
`to_Router_C` | To data center router C | `10.255.255.5/31` | `198.51.100.202` | `192.0.2.10`

{{</table-wrap>}}

{{<Aside type="note">}}
When you create a GRE tunnel the TTL and MTU fields are auto-populated. The default MTU value of 1476 bytes takes into account the GRE encapsulation overhead of 24 bytes (20 bytes for the outer IP header plus 4 bytes for the mandatory GRE header) that will be added to the original (inner) IP packet when they are sent over the GRE tunnel. Refer to [Set maximum segment size](/magic-wan/prerequisites/#set-maximum-segment-size) for more information.
{{</Aside>}}

## 2. Add static routes

1. [Create a static route](/magic-wan/get-started/configure-static-routes/#create-a-static-route).
2. The **Priority** and **Region code** fields are auto-populated. Tunnels with lower priority numbers will be chosen first. You can also steer traffic to a certain geographic region to reduce latency. Refer to [Create a static route](/magic-wan/get-started/configure-static-routes/#create-a-static-route) for more information.
3. In keeping with the example scenario, the list of static routes should match the example below.

Prefix | Tunnel/Next hop | Priority | Region code
--- | --- | --- | --- 
`192.168.0.0/16` | `10.255.255.0` | `100` | `All regions`
`10.0.1.0/24` | `10.255.255.2` | `100` | `All regions`
`172.16.0.0/12` | `10.255.255.4` | `100` | `All regions` 

## 3. Set up Cloudflare Gateway

The last step is to configure your Cloudflare Gateway policies from the [Zero Trust](https://one.dash.cloudflare.com/) dashboard. To set up the policies, refer to our [Gateway documentation](/cloudflare-one/policies/filtering/).

Cloudflare Gateway supports all TCP and UDP ports, traffic sourced from private IP addresses on TCP/IP networks, and [BYOIP](/byoip/).

After you have configured Cloudflare Gateway, enterprise users and devices from each of the sites mentioned in the example scenario will be able to safely browse or access Internet resources under the protection of the Cloudflare global network.