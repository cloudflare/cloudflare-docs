---
title: Aruba EdgeConnect SD-WAN
pcx-content-type: tutorial
weight: 1
meta:
  title: Aruba EdgeConnect SD-WAN
---

# Aruba EdgeConnect SD-WAN

Cloudflare partners with Aruba’s EdgeConnect SD-WAN solution to provide users with an integrated solution. The EdgeConnect appliances manage subnets associated with branch offices, Anycast tunnels are set up between the EdgeConnect appliances and Cloudflare to securely route traffic. 

## Prerequisites

Before you can set up a connection between EdgeConnect and Cloudlfare, you must have:

- Purchased Magic WAN and Secure Web Gateway.
- Cloudflare provisioned Magic WAN and Secure Web Gateway.
- Received the Cloudflare GRE endpoint (Anycast IP address) assigned to Magic WAN.
- Aruba’s EdgeConnect appliances (physical or virtual). This ensures specific Internet-bound traffic from the sites' private networks is routed over the Anycast tunnel or IPsec tunnel to Magic WAN, and subsequently Secure Web Gateway, to enforce a user's specific web access policies.
- A static IP pair to use with the tunnel endpoints. The static IPs should be /31 addresses separate from the private IPs used in the subnet deployment where the EdgeConnect interfaces.
- The EdgeConnect devices used in this tutorial are v9.0. 

## Example scenario

For the purpose of the tutorial, the integration will refer to a scenario with two branch offices, each with distinct subnets.

- The east branch office has a 10.3.0.0/16 network with EdgeConnect terminating the Anycast tunnel.
- The west branch office has a 10.30.0.0/16 network with EdgeConnect terminating the Anycast tunnel.

![Table of branch subnet information](/magic-wan/static/branch-subnets.png)

Below are examples of the east_branch deployment on the Orchestrator.

![East branch deployment configuration](/magic-wan/static/east-branch-deployment.png)

![Modify Passthrough tunnel configuration](/magic-wan/static/east-branch-passthrough.png)

## Configure Anycast tunnels

Refer to [Specify tunnel endpoints](/magic-wan/get-started/configure-tunnels/specify-tunnel-endpoints/) for more information about configuring your Anycast tunnels.

![GRE tunnel for SD-WAN appliance](/magic-wan/static/gre-tunnel-sdwan.png)

## Configure static routes

Refer to [Static routes](/magic-wan/get-started/configure-tunnels/assign-tunnel-priorities/#static-routes) for more information about configuring your static routes.

![Static routes for SD-WAN](/magic-wan/static/static-routes-config.png)

## Configure overlay policies on Edgeconnect (Orchestrator)

Cloudflare’s tunnel health checks are ping reply packets encapsulated in GRE packets. The source IP is the Edgeconnect WAN interface used to establish the tunnel, and the destination IP is the Cloudflare servers. These packets need to be sent directly from the WAN interface and not through the established tunnels. 

1. Create a compound filter by creating an application group that is a combination of all Cloudflare public IPs and are ICMP packets. 
  ![Associate ACL sscreen ](/magic-wan/static/associate-acl.png)
2. Create an overlay to bypass the tunnel as the first policy and use this newly created application group.
  ![Overlay configuration](/magic-wan/static/overlay-config.png)
3. In addition to the overlay policy, define at least one additional **Match Everything** to flow through the established tunnel.
