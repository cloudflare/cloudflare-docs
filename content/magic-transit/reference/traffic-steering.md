---
pcx_content_type: concept
title: Traffic steering
---

# Traffic steering

Magic Transit uses a static configuration to route traffic through [Generic Routing Encapsulation (GRE) tunnels](/magic-transit/reference/tunnels-and-encapsulation/) from Cloudflare’s global network to your data center.

Magic Transit steers traffic along tunnel routes based on priorities you define during the onboarding process.

The example in this diagram has three tunnel routes. Tunnels 1 and 2 have top priority and Tunnel 3 is secondary.

```mermaid
flowchart LR
accTitle: Tunnels diagram
accDescr: The example in this diagram has three tunnel routes. Tunnels 1 and 2 have top priority and Tunnel 3 is secondary.

subgraph Cloudflare
direction LR
B[Cloudflare]
C[Cloudflare]
D[Cloudflare]
end

A((User)) --> Cloudflare --- E[Anycast IP]
E[Anycast IP] --> F[/Tunnel 1 / <br> priority 1/] --> I{{Customer <br> data center 1}}
E[Anycast IP] --> G[/Tunnel 2 / <br> priority 1/] --> J{{Customer <br> data center 2}}
E[Anycast IP] --> H[/Tunnel 3 / <br> priority 2/] --> K{{Customer <br> data center 3}}
```
<br />

When there are multiple routes with equal priority and different next-hops, Cloudflare uses equal-cost multi-path (ECMP) routing. An example of multiple routes with equal priority would be Tunnel 1 and Tunnel 2.

The use of ECMP routing provides load balancing across tunnels with the same priority.

## Equal-cost multi-path routing

Equal-cost multi-path routing uses hashes calculated from packet data to determine routes. The hash always uses the source and destination IP addresses. For TCP and UDP packets, the hash includes the source and destination ports as well. The ECMP algorithm divides the hash for each packet by the number of equal-cost next hops. The modulus (remainder) determines the route the packet takes.

Using ECMP has a number of consequences:

- Routing to equal-cost paths is probabilistic.

- Packets in the same session (or flow) with the same source and destination have the same hash. The packets also use the same next hop.

- Routing changes in the number of equal-cost next hops can cause traffic to use different tunnels. For example, dynamic prioritization triggered by health check events can cause traffic to use different tunnels.

As a result, ECMP provides load balancing across tunnels with the same priority.

{{<render file="_ecmp-flow-hashing.md">}}

### Examples

This diagram illustrates how ECMP distributes traffic equally across 2 paths with the same priority.

#### Normal traffic flow

```mermaid
flowchart LR
accTitle: Tunnels diagram
accDescr: This example has three tunnel routes, with traffic equally distributed across two paths.

subgraph Cloudflare
direction LR
B[Cloudflare]
C[Cloudflare]
D[Cloudflare]
end

Z("Load balancing for some <br> priority tunnels uses ECMP <br> (hashing on src IP, dst IP, <br> scr port, dst port)") --- Cloudflare
A((User)) --> Cloudflare --- E[Anycast IP]
E[Anycast IP] --> F[/"GRE Tunnel 1 / priority 1 <br> / ~50% of flows"/] --> I{{Customer <br> data center 1}}
E[Anycast IP] --> G[/"GRE Tunnel 2 / priority 1 <br> / ~50% of flows"/] --> J{{Customer <br> data center 2}}
E[Anycast IP] --> H[/GRE Tunnel 3 / priority 2 <br> / 0% of flows/] --o K{{Customer <br> data center 3}}
```
<br />

When Magic Transit health checks determine that Tunnel 2 is unhealthy, that route is dynamically de-prioritized, leaving Tunnel 1 the sole top-priority route. As a result, traffic is steered away from Tunnel 2, and all traffic flows to Tunnel 1:

####  Failover traffic flow: Scenario 1

Customer router failure

```mermaid
flowchart LR
accTitle: Tunnels diagram
accDescr: This example has Tunnel 2 unhealthy, and all traffic prioritized to Tunnel 1.

subgraph Cloudflare
direction LR
B[Cloudflare]
C[Cloudflare]
D[Cloudflare]
end

Z(Tunnel health is determined <br> by health checks that run <br> from all Cloudflare data centers) --- Cloudflare
A((User)) --> Cloudflare --- E[Anycast IP]
E[Anycast IP] --> F[/"Tunnel 1 / priority 1 <br> / ~100% of flows"/]:::green --> I{{Customer <br> data center 1}}
E[Anycast IP] --> G[/Tunnel 2 / priority 3 <br> / unhealthy / 0% of flows/]:::red --x J{{Customer <br> data center 2}}
E[Anycast IP] --> H[/Tunnel 3 / priority 2 <br> / 0% of flows/] --o K{{Customer <br> data center 3}}
classDef red fill:#FF0000
classDef green fill:#00FF00
```
<br />

When Magic Transit determines that Tunnel 1 is unhealthy as well, that route is also de-prioritized, leaving Tunnel 3 as the top priority route. In that case, all traffic flows to Tunnel 3.

####  Failover traffic flow: Scenario 2

Intermediary ISP failure

```mermaid
flowchart LR
accTitle: Tunnels diagram
accDescr: This example has Tunnel 1 and 2 unhealthy, and all traffic prioritized to Tunnel 3.

subgraph Cloudflare
direction LR
B[Cloudflare]
C[Cloudflare]
D[Cloudflare]
end

Z(Lower-priority tunnels <br> are used when <br> higher-priority tunnels <br> are unhealthy) --- Cloudflare
A((User)) --> Cloudflare --- E[Anycast IP]
E[Anycast IP]  -- Intermediary <br> network issue -->  F[/Tunnel 1 / priority 3 <br> / unhealthy / 0% of flows/]:::red --x I{{Customer <br> data center 1}}
E[Anycast IP]  -- Intermediary <br> network issue -->  G[/Tunnel 2 / priority 3 <br> / unhealthy / 0% of flows/]:::red --x J{{Customer <br> data center 2}}
E[Anycast IP] -->  H[/Tunnel 3 / priority 2 <br> / 100% of flows/]:::green --> K{{Customer <br> data center 3}}
classDef red fill:#FF0000
classDef green fill:#00FF00
linkStyle 6 color:red
linkStyle 8 color:red
```
<br />

When Magic Transit determines that Tunnels 1 and 2 are healthy again, it re-prioritizes those routes, and traffic flow returns to normal.

## ECMP and bandwidth utilization

Because ECMP is probabilistic, the algorithm routes roughly the same number of flows through each tunnel. However it does _not_ consider the amount of traffic already sent through a tunnel when deciding where to route the next packet.

For example, consider a scenario with many very low-bandwidth TCP connections and one very high-bandwidth TCP connection. Packets for the high-bandwidth connection have the same hash and thus use the same tunnel. As a result, that tunnel utilizes greater bandwidth than the others.

{{<Aside type="note" header="Note">}}

Magic Transit supports a "weight" field that you can apply to a tunnel so that a specified percentage of traffic uses that tunnel rather than other equal-cost tunnels.

For example, in a scenario where you want to route 70% of your traffic through ISP A and 30% through ISP B, you can use the weight field to help achieve that.

Keep in mind that because ECMP balances flows probabilistically, the use of weights is only approximate.

For more on Magic Transit tunnel weights, contact your Cloudflare customer service manager.

{{</Aside>}}
