---
pcx-content-type: concept
title: Traffic steering
---

# Traffic steering

Magic WAN uses a static configuration to route traffic through [Anycast tunnels](/magic-wan/about/tunnels-and-encapsulation/) from Cloudflare’s edge to your network and from your network to Cloudflare's edge.

Magic WAN steers traffic along tunnel routes based on priorities you define during the onboarding process.

The example in this diagram has three tunnel routes. Tunnels 1 and 2 have top priority and Tunnel 3 is secondary.

![Example route priorities](/magic-transit/static/mt-traffic-steering-ecmp-baseline.png)

When there are multiple routes with equal priority and different next-hops, Cloudflare uses equal-cost multi-path (ECMP) routing. An example of multiple routes with equal priority would be Tunnel 1 and Tunnel 2.

The use of ECMP routing provides load balancing across tunnels with the same priority.

## Equal-cost multi-path routing

Equal-cost multi-path routing uses hashes calculated from packet data to determine routes. The hash always uses the source and destination IP addresses. For TCP and UDP packets, the hash includes the source and destination ports as well. The ECMP algorithm divides the hash for each packet by the number of equal-cost next hops. The modulus (remainder) determines the route the packet takes.

Using ECMP has a number of consequences:

- Routing to equal-cost paths is probabilistic.

- Packets in the same session (or flow) with the same source and destination have the same hash. The packets also use the same next hop.

- Routing changes in the number of equal-cost next hops can cause traffic to use different tunnels. For example, dynamic prioritization triggered by health check events can cause traffic to use different tunnels.

{{<render file="../../magic-transit/_partials/_ecmp-flow-hashing.md">}}


### Examples

This diagram illustrates how ECMP distributes traffic equally across 2 paths with the same priority.

<details>
<summary>
  Normal traffic flow
</summary>
  <div class="special-class" markdown="1">

![ECMP diagram of health network](/magic-transit/static/mt-traffic-steering-ecmp-normal.png)

</div>
</details>

When Magic WAN health checks determine that Tunnel 2 is unhealthy, that route is dynamically de-prioritized, leaving Tunnel 1 the sole top-priority route. As a result, traffic is steered away from Tunnel 2, and all traffic flows to Tunnel 1:

<details>
<summary>
  Failover traffic flow: Scenario 1
</summary>
  <div class="special-class" markdown="1">

![ECMP diagram of unhealthy Tunnel 2](/magic-transit/static/mt-traffic-steering-ecmp-failure-1.png)

</div>
</details>

When Magic WAN determines that Tunnel 1 is unhealthy as well, that route is also de-prioritized, leaving Tunnel 3 as the top priority route. In that case, all traffic flows to Tunnel 3.

<details>
<summary>
  Failover traffic flow: Scenario 2
</summary>
  <div class="special-class" markdown="1">

![ECMP diagram of unhealthy Tunnels 1 and 2](/magic-transit/static/mt-traffic-steering-ecmp-failure-2.png)

</div>
</details>

When Magic WAN determines that Tunnels 1 and 2 are healthy again, it re-prioritizes those routes, and traffic flow returns to normal.

## ECMP and bandwidth utilization

Because ECMP is probabilistic, the algorithm routes roughly the same number of flows through each tunnel. However it does _not_ consider the amount of traffic already sent through a tunnel when deciding where to route the next packet.

For example, consider a scenario with many very low-bandwidth TCP connections and one very high-bandwidth TCP connection. Packets for the high-bandwidth connection have the same hash and thus use the same tunnel. As a result, the high-bandwidth connection tunnel utilizes greater bandwidth than the others.

{{<Aside type="note" header="Note">}}

Magic WAN supports a weight field that you can apply to a tunnel so that a specified percentage of traffic uses that tunnel rather than other equal-cost tunnels.

For example, in a scenario where you want to route 70% of your traffic through ISP A and 30% through ISP B, you can use the weight field to help achieve that.

Note that because ECMP balances flows probabilistically, the use of weights is only approximate.

For more on Magic WAN tunnel weights, contact your Cloudflare account manager.

{{</Aside>}}
