---
title: About
pcx_content_type: concept
weight: 2
meta:
  title: About Magic Transit
---

# About Magic Transit

Magic Transit is a network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

Magic Transit delivers its connectivity, security, and performance benefits by serving as the front door to your IP network. This means it accepts IP packets destined for your network, processes them, and then outputs them to your origin infrastructure.

The Cloudflare network uses Border Gateway Protocol (BGP) to announce your company’s IP address space, extending your network presence globally, and [Anycast](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) to ingest your traffic. Today, Cloudflare’s Anycast global network spans 275 cities in more than 100 countries around the world.

Once packets hit Cloudflare’s network, traffic is inspected for attacks, filtered, steered, accelerated, and sent onward to your origin. Magic Transit connects to your origin infrastructure using Anycast Generic Routing Encapsulation (GRE) tunnels over the Internet or, with [Cloudflare Network Interconnect (CNI)](/network-interconnect/), via physical or virtual interconnect.

Magic Transit users have two options for their implementation: ingress traffic or ingress and egress traffic. Users with an egress implementation will need to set up policy-based routing (PBR) or ensure default routing on their end forwards traffic to Cloudflare via tunnels.

```mermaid
flowchart LR
accTitle: Magic Transit
accDescr: Diagram showing how Magic Transit protects traffic on the customer's network.
A(DDoS attack) --x B[DDoS protection + Network firewall]
B[DDoS protection + Network firewall]-- Anycast <br> GRE tunnel ---C(Customer network)
B[DDoS protection + Network firewall]-- Cloudflare <br> Network Internconnect ---C(Customer network)
C(Customer network)-. "(Optional) Egress via <br> Direct Server Return" .-> D(User)
D(User) --- B[DDoS protection + Network firewall]
style A stroke: red
style B stroke: orange
style C stroke: blue
linkStyle 0 stroke-width:2px,stroke:red
linkStyle 1 stroke-width:2px,stroke:orange
linkStyle 2 stroke-width:2px,stroke:blue
linkStyle 3 stroke-width:2px,stroke:gray
linkStyle 4 stroke-width:2px,stroke:green
```

{{<Aside type="note">}}

Magic Transit is not yet supported on Cloudflare's China Network.

{{</Aside>}}

For detailed information on Magic Transit architecture, refer to [Magic Transit Use Cases and Reference Architecture](/reference-architecture/magic-transit-reference-architecture/).