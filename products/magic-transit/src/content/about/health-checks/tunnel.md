---
title: Tunnel
order: 1
---

# Tunnel health checks

Tunnel health checks monitor the status of the Generic Routing Encapsulation (GRE) tunnels that route traffic from Cloudflare to your origin network. Magic Transit relies on health checks to steer traffic to the best available routes.

Tunnel probes originate from Cloudflare’s edge network and target the GRE tunnel endpoints you supply during the Magic Transit [onboarding process](/set-up/onboarding/).

Tunnel health check results are exposed via an [API](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/). These results are aggregated from individual health check results done on Cloudflare servers.

## Probe construction

A tunnel health check probe consists of an ICMP (Internet Control Message Protocol) reply packet that originates from an IP address on the origin side of the GRE tunnel and whose destination address is a public Cloudflare IP.

Cloudflare encapsulates the ICMP reply packet and transmits the probe across the GRE tunnel to the origin. When the probe reaches the origin router, the router decapsulates the ICMP reply and forwards it to the specified destination IP. The probe is successful when Cloudflare receives the reply.

Every Cloudflare edge server configured to process your traffic sends a tunnel health check probe every 60 seconds. When a probe attempt fails, each server detecting the failure quickly probes up to 2 more times to obtain an accurate result.

<Aside type='note' header='Note'>

To avoid control plane policies enforced by the origin network, tunnel health checks use an encapsulated ICMP reply (rather than an ICMP echo request). To use echo request packets, please contact your Cloudflare account team.

</Aside>

This Wireshark screenshot shows a collection of example health check packets:

![Magic Transit Tunnel health check packets](../../static/tunnel-health-check-packets.png)

Since each Cloudflare edge server that processes your traffic emits a probe every 60 seconds, expect your network to receive several hundred health check packets per second. This represents a relatively trivial amount of traffic.

## Tunnel traffic management

Magic Transit uses tunnel health check packets to prioritize and steer traffic among tunnels.

### Health state and prioritization

There are three tunnel health states: **_Healthy_** tunnels are preferred to **_Degraded_** tunnels, and _Degraded_ tunnels are preferred to those that are **_Down_**.

Magic Transit steers traffic to tunnels based on priorities you set when you [assign tunnel route priorities](/set-up/provide-configuration-data/assign-tunnel-route-priorities) during the [onboarding process](/set-up/onboarding).

Tunnel routes with lower values have priority over those with higher values.

<Aside type='note' header='Note'>

Since Cloudflare does not synchronize the health checks among edge servers and the Internet is not homogenous, Cloudflare edge servers may be able to reach the origin infrastructure from some locations at a given time but not others.

As a result, tunnel health may be in different states in different parts of the world at the same time. In our example, both tunnels could receive traffic simultaneously, even though Tunnel 1 has priority over Tunnel 2.

</Aside>

#### Failure

When 0.1% or more of tunnel health checks (at least 2) fail in the previous 5 minutes, Magic Transit considers the link lossy and sets the tunnel state to _Degraded_. In response, Magic Transit immediately sets tunnel status to _Degraded_ and applies a priority penalty. Magic Transit requires 2 failures so that a single lost packet does not trigger a penalty.

When all health checks (at least 3 samples) in the last 1 second fail, Magic Transit immediately transitions the tunnel from _Healthy_ to _Down_ and applies a priority penalty to routes through that tunnel.

When Magic Transit identifies a route that is not healthy, it applies the these penalties:

- _Degraded_: Add 500,000 to priority.
- _Down_: Add 1,000,000 to priority.

The values for failure penalties are designed to be extreme so that they always exceed the priority values you assign in the [routing configuration](/set-up/provide-configuration-data/assign-tunnel-route-priorities).

Applying a penalty rather than removing the route altogether preserves redundancy and maintains options for customers with only one tunnel. It also supports the case when multiple tunnels are unhealthy.

#### Recovery

Once a tunnel is in the _Down_ state, edge servers continue to emit probes every 60 seconds. When a probe returns _Healthy_, the edge server that received the healthy packet immediately sends two more probes. If these probes return _Healthy_, Magic Transit sets tunnel status to _Degraded_.

Tunnels in a _Degraded_ state transition to _Healthy_ when the failure rate for the previous 30 probes is less than 5%. This transition may take up to 30 minutes.

Magic Transit’s tunnel health check system allows a tunnel to transition quickly from _Healthy_ to _Degraded_ or _Down_ but only slowly from _Degraded_ or _Down_ to _Healthy_. This [hysteresis](https://en.wikipedia.org/wiki/Hysteresis) dampens changes to tunnel routing caused by flapping and other intermittent network failures.

Cloudflare always attempts to send traffic over available tunnel routes with the highest priority, even when all configured tunnels are in an unhealthy state.

### Example

Consider 2 tunnels and their associated routing priorities. Lower route values have priority:

- Tunnel 1, route priority 100
- Tunnel 2, route priority 200

When both tunnels are in a _Healthy_ state, routing priority directs traffic exclusively to Tunnel 1, since its route priority of 100 beats that of Tunnel 2. Tunnel 2 does not receive any traffic, except for tunnel health check probes. Endpoint health checks only flow over Tunnel 1 to their destination inside the origin network.

#### Failure response

If the link between Tunnel 1 and Cloudflare becomes unusable, Cloudflare edge servers discover the failure on their next health check probe and immediately issue two more probes.

When an edge server does not receive the proper ICMP reply packets from these two additional probes, it labels Tunnel 1 _Down_ and downgrades Tunnel 1 priority to 1,000,100, shifting priority to Tunnel 2. Immediately, Magic Transit steers packets arriving at that edge server to Tunnel 2.

#### Recovery response

Suppose the connectivity issue that had set Tunnel 1 health to _Down_ is now resolved. At the next health check interval, the issuing edge server receives a successful probe and immediately sends two more probes to validate tunnel health.

When all three probes return successfully, Magic Transit transitions the tunnel from _Down_ to _Degraded_. As part of this transition, Cloudflare reduces the priority penalty for that route so that its priority is 500,100.  Since Tunnel 2 has a priority of 200, traffic continues to flow over Tunnel 2.

Edge servers continue probing Tunnel 1. When the health check failure rate drops below 0.1% for a 5-minute period, Magic Transit sets tunnel status to _Healthy_. Tunnel 1’s routing priority is fully restored to 100, and traffic steering returns the data flow to Tunnel 1.
