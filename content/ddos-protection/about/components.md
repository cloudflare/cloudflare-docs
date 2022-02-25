---
pcx-content-type: concept
order: 1
---

# Main components

![Diagram with the main components of DDoS attack protection at Cloudflare](../images/ddos-diagram.png)

## Autonomous Edge

The Cloudflare Autonomous Edge is powered by the denial-of-service daemon (dosd), which is a home-grown software-defined system. A dosd instance runs in every single server in every one of [Cloudflare’s edge data centers](https://www.cloudflare.com/network/) around the world. dosd instances can detect and mitigate DDoS attacks autonomously without requiring centralized consensus.

Another component of Cloudflare’s Autonomous Edge includes the TCP flow tracking daemon (flowtrackd). This daemon is Cloudflare’s TCP state tracking machine for detecting and mitigating the most randomized and sophisticated TCP-based DDoS attacks in unidirectional routing topologies — such as the case of [Magic Transit](https://developers.cloudflare.com/magic-transit/). flowtrackd is able to identify the state of a TCP connection and then drops, challenges, or rate-limits packets that do not belong to a legitimate connection.

For more information, refer to our blog post *[A deep-dive into Cloudflare’s autonomous edge DDoS protection](https://blog.cloudflare.com/deep-dive-cloudflare-autonomous-edge-ddos-protection/)*.

## Centralized DDoS protection system

Complementary to the Autonomous Edge, Cloudflare’s entire global network is overwatched by Gatebot, Cloudflare’s centralized DDoS Protection system, and a global version of dosd. Together, these two components protect Cloudflare’s entire global network by detecting and mitigating globally distributed volumetric DDoS attacks.

The centralized systems run in Cloudflare's core data centers. They receive samples from every edge data center, analyze them, and automatically send mitigation instructions when detecting an attack. The system is also synchronized to each of our customers’ web servers to identify their health and trigger any required mitigation actions.
