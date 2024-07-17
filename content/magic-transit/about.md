---
title: About
pcx_content_type: concept
weight: 2
meta:
  title: About Magic Transit
---

# About Magic Transit

Magic Transit is a network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

Magic Transit delivers its connectivity, security, and performance benefits by serving as the front door to your IP network. This means it accepts IP {{<glossary-tooltip term_id="data packet">}}packets{{</glossary-tooltip>}} destined for your network, processes them, and then outputs them to your origin infrastructure.

The Cloudflare network uses [Border Gateway Protocol (BGP)](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) to announce your company’s IP address space, extending your network presence globally, and {{<glossary-tooltip term_id="anycast" link="https://www.cloudflare.com/learning/cdn/glossary/anycast-network/">}}anycast{{</glossary-tooltip>}} to ingest your traffic. Today, Cloudflare’s anycast global network spans [hundreds of cities worldwide](https://www.cloudflare.com/network/).

Once packets hit Cloudflare’s network, traffic is inspected for attacks, filtered, {{<glossary-tooltip term_id="traffic steering">}}steered{{</glossary-tooltip>}}, accelerated, and sent onward to your origin. Magic Transit connects to your origin infrastructure using anycast {{<glossary-tooltip term_id="GRE tunnel">}}Generic Routing Encapsulation (GRE){{</glossary-tooltip>}} tunnels over the Internet or, with [Cloudflare Network Interconnect (CNI)](/network-interconnect/), via physical or virtual interconnect.

Magic Transit users have two options for their implementation: ingress traffic or ingress and [egress traffic](/magic-transit/reference/egress/). Users with an egress implementation will need to set up {{<glossary-tooltip term_id="policy-based routing">}}policy-based routing (PBR){{</glossary-tooltip>}} or ensure default routing on their end forwards traffic to Cloudflare via tunnels.

```mermaid
flowchart LR
accTitle: Magic Transit
accDescr: Diagram showing how Magic Transit protects traffic on the customer's network.

A(DDoS <br> attack)
B[("Cloudflare global <br> anycast network <br> (DDoS protection + <br> network firewall)")]
C[Customer <br> network]
D((User))
E([BGP <br> announcement])

A --x B
E --- B
B-- Anycast <br> GRE tunnel ---C
B-- Cloudflare <br> Network <br> Interconnect ---C
C-- Egress via <br> Direct Server <br> Return --> D
D -- Ingress --> B

style A stroke: red,fill: red,color: white
style B stroke: orange,fill: orange,color: black
style C stroke: #ADD8E6,fill: #ADD8E6,color: black
style D stroke: blue,fill: blue,color: white
linkStyle 0 stroke-width:3px,stroke:red
linkStyle 1 stroke-width:2px,stroke:orange
linkStyle 2 stroke-width:2px,stroke:#ADD8E6
linkStyle 3 stroke-width:2px,stroke:gray
linkStyle 4 stroke-width:3px,stroke:green
```

{{<Aside type="note">}}

Magic Transit is not yet supported on Cloudflare's China Network.

{{</Aside>}}

For detailed information on Magic Transit architecture, refer to the [Reference section](/magic-transit/reference/).