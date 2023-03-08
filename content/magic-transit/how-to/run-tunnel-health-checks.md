---
pcx_content_type: how-to
title: Run tunnel health checks
weight: 5
meta:
    title: Configure bidirectional tunnel health checks for egresss traffic
---

# Configure bidirectional tunnel health checks for egresss traffic

If you are using egress traffic through Magic Transit, you can set up a Cloudflare public IP address as the `target` for your [health checks](/magic-transit/reference/health-checks/) instead of using Direct Server Return (DSR). In this type of setup, the packets necessary for Cloudflare to check tunnel health are sent and received though your [GRE or IPsec tunnel](/magic-transit/reference/tunnels-and-encapsulation/). This avoids DSR replies through the Internet which might fail.

Bidirectional tunnel health checks will work for both reply-style (default) and request-style health checks. For request-style health checks, you need to assign the target IP to a device in your network that can respond to the health check requests.

To enable bidirectional tunnel health checks, set the health check’s `target` to an IP address within the prefix `172.64.240.252/30`. You may also need to apply a policy-based route on your device to route ICMP echo reply packets sourced from this address through the tunnel.

{{<render file="_update-tunnel-health-checks-frequency.md" withParameters="/magic-transit/reference/health-checks/">}}