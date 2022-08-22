---
title: Probe construction
pcx_content_type: concept
weight: 0
---

# Probe construction

A tunnel health check probe contains an [ICMP (Internet Control Message Protocol)](https://www.cloudflare.com/learning/ddos/glossary/internet-control-message-protocol-icmp) reply packet that originates from an IP address on the origin side of the tunnel and whose destination address is a public Cloudflare IP.

Cloudflare encapsulates the ICMP reply packet and sends the probe across the tunnel to the origin. When the probe reaches the origin router, the router decapsulates the ICMP reply and forwards it to the specified destination IP. The probe is successful when Cloudflare receives the reply.

Every Cloudflare edge server configured to process your traffic sends a tunnel health check probe every 60 seconds. When a probe attempt fails, each server detecting the failure quickly probes up to two more times to obtain an accurate result. Because Cloudflare edge servers send probes every 60 seconds, you can expect your network to receive several hundred health check packets per second. This represents a relatively trivial amount of traffic.

{{<Aside type="note" header="Note">}}

To avoid control plane policies enforced by the origin network, tunnel health checks use an encapsulated ICMP reply instead of an ICMP echo request. To use echo request packets, contact your Cloudflare account team.

{{</Aside>}}

<details>
<summary>
    Wireshark example of health check packets
</summary>
  <div class="special-class" markdown="1">

![Wireshark example for tunnel health checks with ICMP reply packet](/magic-transit/static/tunnel-health-check-packets.png)

</div>
</details>

## Health state and prioritization

There are three tunnel health states: **Healthy**, **Degraded**, and **Down**.

**Healthy** tunnels are preferred to **Degraded** tunnels, and Degraded tunnels are preferred to those that are **Down**.

Magic Transit steers traffic to tunnels based on priorities you set when you [assign tunnel route priorities](/magic-transit/how-to/configure-static-routes/) during onboarding. Tunnel routes with lower values have priority over those with higher values.

{{<Aside type="note" header="Note">}}

Cloudflare edge servers may be able to reach the origin infrastructure from some locations at a given time but not others. This occurs because Cloudflare does not synchronize health checks among edge servers and because the Internet is not homogeneous.

As a result, tunnel health may be in different states in different parts of the world at the same time. In this example, both tunnels could receive traffic simultaneously, even though Tunnel 1 has priority over Tunnel 2.

{{</Aside>}}

## Tunnel health check failure

When at least two or 0.1% or more of tunnel health checks fail in the previous five minutes, Magic Transit considers the link lossy and sets the tunnel state to **Degraded**. Magic Transit then immediately sets the tunnel status to **Degraded** and applies a priority penalty and requires two failures so that a single lost packet does not trigger a penalty.

When all health checks or at least three samples in the last one second fail, Magic Transit immediately transitions the tunnel from **Healthy** to **Down** and applies a priority penalty to routes through that tunnel.

When Magic Transit identifies a route that is not healthy, it applies the these penalties:

- Degraded: Add 500,000 to priority.
- Down: Add 1,000,000 to priority.

The values for failure penalties are intentionally extreme so that they always exceed the priority values assigned during [routing configuration](/magic-transit/how-to/configure-static-routes/).

Applying a penalty instead of removing the route altogether preserves redundancy and maintains options for customers with only one tunnel. Penalties also support the case when multiple tunnels are unhealthy.

### Cloudflare data centers and tunnels

In the event a Cloudflare data center is down, Cloudflare's edge network does not advertise your prefixes, and your packets are routed to the next closest data center. To check the system status for Cloudflare's edge network and dashboard, refer to [Cloudflare System Status](https://www.cloudflarestatus.com/).

## Recovery

Once a tunnel is in the **Down** state, edge servers continue to emit probes every 60 seconds. When a probe returns **Healthy**, the edge server that received the healthy packet immediately sends two more probes. If the two probes return **Healthy**, Magic Transit sets the tunnel status to **Degraded**.

Tunnels in a **Degraded** state transition to **Healthy** when the failure rate for the previous 30 probes is less than 5%. This transition may take up to 30 minutes.

Magic Transit’s tunnel health check system allows a tunnel to quickly transition from **Healthy** to **Degraded** or **Down**, but tunnel transition occurs slowly from **Degraded** or **Down** to **Healthy**. This scenario is referred to as hysteresis — which is when a system's output depends on its history of past inputs — and dampens changes to tunnel routing caused by flapping and other intermittent network failures.

{{<Aside type="note" header="Note">}}
Cloudflare always attempts to send traffic over available tunnel routes with the highest priority, even when all configured tunnels are in an unhealthy state.
{{</Aside>}}

## Example

Consider two tunnels and their associated routing priorities. Remember that lower route values have priority.

- Tunnel 1, route priority 100
- Tunnel 2, route priority 200

When both tunnels are in a **Healthy** state, routing priority directs traffic exclusively to Tunnel 1 because its route priority of 100 beats that of Tunnel 2. Tunnel 2 does not receive any traffic, except for tunnel health check probes. Endpoint health checks only flow over Tunnel 1 to their destination inside the origin network.

### Failure response

If the link between Tunnel 1 and Cloudflare becomes unusable, Cloudflare edge servers discover the failure on their next health check probe and immediately issue two more probes.

When an edge server does not receive the proper ICMP reply packets from these two additional probes, the edge server labels Tunnel 1 as **Down** and downgrades Tunnel 1 priority to 1,000,100. The priority then shifts to Tunnel 2, and Magic Transit immediately steers packets arriving at that edge server to Tunnel 2.

### Recovery response

Suppose the connectivity issue that set Tunnel 1 health to **Down** becomes resolved. At the next health check interval, the issuing edge server receives a successful probe and immediately sends two more probes to validate tunnel health.

When all three probes return successfully, Magic Transit transitions the tunnel from **Down** to **Degraded**. As part of this transition, Cloudflare reduces the priority penalty for that route so that its priority becomes 500,100. Because Tunnel 2 has a priority of 200, traffic continues to flow over Tunnel 2.

Edge servers will continue probing Tunnel 1. When the health check failure rate drops below 0.1% for a five minute period, Magic Transit sets tunnel status to **Healthy**. Tunnel 1’s routing priority is fully restored to 100, and traffic steering returns the data flow to Tunnel 1.
