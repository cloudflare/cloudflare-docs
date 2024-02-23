---
title: About
pcx_content_type: concept
weight: 2
meta:
  title: About Cloudlfare Network Interconnect
---

# About Cloudlfare Network Interconnect

Cloudflare supports a variety of options to connect your network to Cloudflare Network Interconnect (CNI), and peering via either an Internet exchange, or a private network interconnect (PNI). Below is a brief overview of the options to help you decide which method best fits your network. Some customers may find that it makes sense to deploy both CNI and PNI.

## Public Peering, Internet Exchanges, and Private Network Interconnects (PNIs)

Cloudflare has an [open peering policy](https://www.cloudflare.com/peering-policy/). We will peer with anyone we exchange traffic with, and there is no requirement to be a Cloudflare customer. You can use BGP to peer with Cloudflare at any of the Public Internet Exchanges listed on [Cloudflare’s PeeringDB page](https://www.peeringdb.com/net/4224). If you have many users accessing websites protected and proxied by Cloudflare, then peering with Cloudflare may help you remove bandwidth from your Internet transit links, and increase performance by reducing latency to Cloudflare. You may also optionally sign up for the [Cloudflare Peering Portal](https://www.cloudflare.com/partners/peering-portal/), which allows operators of public [BGP](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) [Autonomous System Number (ASN)](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) listed on PeeringDB to view where their network exchanges traffic with Cloudflare. Finally, if our networks exchange more than 1 Gbps of traffic in a single location, we can move your peering from the Internet Exchange to a Private Network Interconnect.

### Peering requirements:

- Operate a public BGP autonomous system (no obligation to be a customer)
- Connect to Cloudflare at a public internet exchange

## Cloudflare Network Interconnect 2.0

Cloudflare Network Interconnect 2.0 (CNI 2.0) [link to blog] is the fastest and easiest way to physically connect your Magic Transit or Magic WAN connected network directly to Cloudflare. You can use your Cloudflare account to find a Cloudflare data center near you, and order a CNI 2.0 directly from the Interconnects section of the Cloudflare dashboard in three minutes. Once deployed, you can view any CNI 2.0 connections from the dashboard. CNI 2.0 integrates with Magic Transit and Magic WAN, and removes the requirement for a GRE tunnel for all traffic over the circuit.

### CNI 2.0 requirements

To be able to use CNI 2.0, you need:

- A Cloudflare Enterprise account
- To be a Magic Transit or Magic WAN customer
- To be able to physically connect to Cloudflare at a CNI 2.0 capable location

## Cloudflare Network Interconnect 1.0

Cloudflare Network Interconnect 1.0 enables customers to connect their network directly to Cloudflare. You will need to work with an Implementation Manager to discover the best location to connect to Cloudflare, and to order a circuit. In addition to physically connecting to Cloudflare with a cross-connect, CNI 1.0 also supports virtual CNIs via our technology partners like Megaport and Equinix. If you are a Magic Transit customer, Cloudflare can send you clean traffic over a CNI 1.0 without a GRE tunnel.

### CNI 1.0 requirements

To be able to use CNI 1.0, you need:

- A Cloudflare Enterprise account
- To be able to physically or virtually connect to Cloudflare at a CNI 1.0 capable location
- To coordinate circuit provisioning with your Cloudflare Implementation Manager

## Compare CNI Versions

Below, you can compare the several CNI options.

Capability                          | CNI 2.0                               | CNI 1.0
---                                 | ---                                   | ---
Supported port speeds               | 1, 10, 100 Gbps                       | 10 Gbps, 100 Gbps
Circuit ordering and management     | Self-service via Cloudflare Dashboard | Manual with Implementation Manager
Magic Transit Integration           | No GRE tunnel required                | No GRE required to receive clean traffic from Cloudflare. <br> Outbound Internet traffic through Magic Transit requires a GRE.
Magic WAN Integration               | No GRE tunnel required                | Not supported. Refer to IPsec over PNI.
Virtual CNI via Technology Partners | Not supported (coming soon)           | Console Connect, Equinix Users, Megaport, PacketFabric

