---
title: Aruba EdgeConnect SD-WAN
pcx-content-type: tutorial
weight: 1
meta:
  title: Aruba EdgeConnect SD-WAN
---

# Aruba EdgeConnect SD-WAN

Cloudflare partners with Aruba’s EdgeConnect SD-WAN solution to provide users with an integrated solution. The EdgeConnect appliances manage subnets associated with branch offices or retail locations. Anycast tunnels are set up between the EdgeConnect appliances and Cloudflare to securely route traffic. 

This tutorial describes how to configure the EdgeConnect device for both east-west (branch to branch) and north-south (Internet-bound) use cases.

{{<Aside type="warning">}}

Note that north-south traffic routed through Cloudflare’s Secure Web Gateway is an optional add-on feature set and requires a Cloudflare Zero Trust account. 

{{</Aside>}}

## Prerequisites

Before setting up a connection between EdgeConnect and Cloudflare, you must have:

- A contract that includes Magic WAN and Secure Web Gateway.
- Received two Cloudflare GRE endpoints (Anycast IP address).
- Determined a private static /31 IP pair to use with each GRE tunnel. The /31 pairs should be from a different private subnet, separate from the private subnets used behind each EdgeConnect appliance.
- The EdgeConnect devices used in this tutorial and on v9.0. 

## Example scenario

For the purpose of this tutorial, the integration will refer to a scenario with two branch offices, each with distinct subnets.

There are 2 branch offices each with distinct subnets.

- The east branch office has a 10.3.0.0/16 network with an EdgeConnect terminating the Anycast GRE tunnel.
- The west branch office has a 10.30.0.0/16 network with an EdgeConnect terminating the Anycast GRE tunnel.

![Table of branch subnet information](/magic-wan/static/branch-subnets.png)

Below are examples of the **east_branch** deployment on the Orchestrator.

![GCP East deployment configuraiton](/magic-wan/static/east-branch-deployment.png)

The Deployment screenshot displays several different IP addresses and interfaces. From left to right:
- **Next Hop 10.3.0.1**  - Our example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP. 
- **IP/Mask (LAN) 10.3.0.2/24** - This defines the LAN0 interface IP of the EdgeConnect appliance
- **IP/Mask (WAN) 10.2.0.2/24** - This defines the WAN0 interface IP of the EdgeConnect appliance
- **Next Hop 10.2.0.1**  - Our example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP.

## 1. Define a common site on the Orchestrator

For all EdgeConnect devices using Cloudflare, modify the devices to put them on the same site. This disables automatic IPSec tunnel creation between the EdgeConnect devices using the same labels for the WAN interfaces in use.

## 2. Configure overlay policies 

We use Aruba Orchestrator’s [Business Intent Overlays](https://www.silver-peak.com/sites/default/files/UserDocuments/WAN-OP-HTML/content/business_intent_overlays_bio.htm) to create intuitive policies which automatically identify and steer application traffic to Cloudflare. Two Business Intent Overlay (BIO) policies are created in this example.

Cloudflare’s [tunnel health checks](/magic-transit/about/probe-construction) are ping reply packets encapsulated in GRE packets. The source IP is the Edgeconnect WAN interface used to establish a tunnel, and the destination IP is Cloudflare servers. These packets need to be sent directly from the WAN interface and not through the established tunnels.

To create the overlay policy:

1. Create a compound application, which is a combination of all [Cloudflare public IPs](https://www.cloudflare.com/ips/) and ICMP packets.

![Application definition screen with IP values](/magic-wan/static/app-definition.png)

2. Create a breakout Business Intent Overlay (BIO) to bypass the GRE tunnel as the first policy and use this newly created application as the match criteria. 

3. Define at least one additional overlay policy and the traffic you want to send to Cloudflare over the GRE tunnels.

The service name used to send traffic through the tunnel created in the next step is **Cloudflare_GRE**. The example uses **Match Everything** to send all other traffic through the established tunnel (both private east-west traffic & Internet bound north-south traffic through Cloudflare’s Secure Web Gateway). 

![Business Intent Overlay screen with breakout and CF overlays](/magic-wan/static/biz-intent-overlay.png)

## 3. Create tunnels on Cloudflare and EdgeConnect

![Diagram of GCP, Aruba Orchestratror, and Cloudflare products](/magic-wan/static/gcp-edgeconnect-diagram.png)

1. Create a tunnel on the EdgeConnect using Cloudflare’s assigned public Anycast IP and the service used in the overlay policy in the [previous step](#2-configure-overlay-policies). 
2. Create a Virtual Tunnel Interface (VTI) using the private IP pair shared with CF GRE tunnel endpoint and the passthrough tunnel to match the newly created tunnel alias (**CF_GRE_east** in our example).

![Modify Passthrough Tunnel screen](/magic-wan/static/modify-passthrough.png)

![Edit Virtual Tunnel Interface screen](/magic-wan/static/edit-vti.png)

3. Define a GRE tunnel on the Cloudflare dashboard using the EdgeConnect appliance’s public IP and the private IP pair /31 shared with the appliance. 

![GRE tunnels information for each branch](/magic-wan/static/gre-tunnels-edgeconnect.png)

## 4. Create static routes on Cloudflare and EdgeConnect

1. Define static routes on the Cloudflare dashboard for the LAN subnet(s) attached to the EdgeConnect appliance. Use the private IP pair for the EdgeConnect tunnel endpoint. 

    In the example below, the traffic to subnet 10.3.0.0/16 attached to the **east_branch** EdgeConnect appliance has a next hop of 10.40.8.10.

![Static route information for each branch](/magic-wan/static/static-routes-cf.png)

2. Define static routes on the Orchestrator so Cloudflare can route traffic between sites. 

    In the example below, we create a route for the subnet 10.30.0.0/24 on the **west_branch** to be routed via the established GRE tunnel between the EdgeConnect appliance and Cloudflare.

![Static route information for each branch](/magic-wan/static/static-routes-edgeconnect.png)

## 5. Validate traffic flow

### Validate Secure Web Gateway

To validate traffic flow from the local subnet through Cloudflare’s Secure Web Gateway, perform a curl as show in the example below.

![Curl example for validating Secure Web Gateway](/magic-wan/static/validate-swg-curl.png)

You can validate the request went through Gateway with the presence of the `Cf-Team` response header, or by looking at the logs in the dashboard under **Logs** > **Gateway** > **HTTP**.

![Dashboard example for validating Secure Web Gateway](/magic-wan/static/dash-validate-swg.png)

### Validate east-west traffic

To validate east-west traffic flow, perform a traceroute as shown in the example.

![Traceroute example for verifying east-west traffic](/magic-wan/static/validate-traceroute.png)

The example shows a client in GCP East (10.3.0.3), which can ping the private IP of a client in GCP West (10.30.0.4). 

The traceroute shows the path going from the client (10.3.0.3) <br>
→ to the GCP East lan0 IP on the EdgeConnect (10.3.0.2) <br>
→ to the Cloudflare private GRE endpoint IP (10.4.8.11) <br>
→ to the GCP West lan0 IP on the West EdgeConnect (10.30.0.3) <br>
→ to the GCP West client (10.30.0.4). 

This validates the east-west traffic flow through Cloudflare Magic WAN.
