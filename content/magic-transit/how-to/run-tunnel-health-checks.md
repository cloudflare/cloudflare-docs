---
pcx_content_type: how-to
title: Run tunnel health checks
weight: 5
meta:
    title: Configure bidirectional tunnel health checks for egresss traffic
---

# Configure bidirectional tunnel health checks for egresss traffic

If you are using egress traffic through Magic Transit, you can set up a Cloudflare public IP address as the `target` for your [health checks](/magic-transit/reference/probe-construction/) instead of using Direct Server Return (DSR). In this type of setup, the packets necessary for Cloudflare to check tunnel health are sent and received though your [GRE or IPsec tunnel](/magic-transit/reference/tunnels/). This avoids DSR replies through the Internet which might fail.

Bidirectional tunnel health checks will work for both reply-style (default) and request-style health checks. For request-style health checks, you need to assign the target IP to a device in your network that can respond to the health check requests.

To enable bidirectional tunnel health checks, set the health check’s `target` to an IP address within the prefix `172.64.240.252/30`. You may also need to apply a policy-based route on your device to route ICMP echo reply packets sourced from this address through the tunnel.

## Change health check target

### API 

You can configure the tunnel health check target IP address by updating your [GRE tunnels](/api/operations/magic-gre-tunnels-update-gre-tunnel) or [IPsec tunnels](/api/operations/magic-ipsec-tunnels-update-ipsec-tunnel).

### Dashboard

You can also configure the tunnel health check target IP address in the Cloudflare dashboard, by changing the [**Health check target**](/magic-transit/how-to/configure-tunnels/#add-tunnels) to _Custom_, and configuring the IP address for your tunnel health check target to be one from within the prefix range `172.64.240.252/30`.

{{<render file="_icmp-mfirewall.md">}}

{{<render file="_update-tunnel-health-checks-frequency.md" withParameters="/magic-transit/reference/probe-construction/">}}

## Check for tunnel health in the dashboard

{{<render file="_tunnel-healthchecks-dash.md" productFolder="magic-wan" withParameters="**Magic Transit** > **Tunnel health**" >}}