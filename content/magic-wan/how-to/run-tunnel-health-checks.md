---
pcx_content_type: how-to
title: Run tunnel health checks
meta:
    title: Configure tunnel health checks
---

# Configure tunnel health checks

By default, to check for [tunnel](/magic-wan/reference/tunnels/) health Cloudflare sends a [health check](/magic-wan/reference/probe-construction/) probe consisting of ICMP (Internet Control Message Protocol) reply packets to your network. By default, the source IP address of these ICMP reply packets is set to the tunnel endpoint IP address of the router at your origin, and has a Cloudflare public IP address as their destination.

Cloudflare encapsulates the ICMP reply packet and sends the probe across the tunnel to the origin router. When the probe reaches the origin router, the router forwards the decapsulated ICMP reply to its specified destination IP. The probe is successful when Cloudflare receives the reply.

As mentioned above, when you do not configure the target IP address for the tunnel health check Cloudflare uses the tunnel endpoint IP address for the router at your origin as the source IP address for the ICMP reply. Routing these unidirectional ICMP reply packets over the Internet to Cloudflare is sometimes subject to drops by intermediate network devices, such as stateful firewalls. To eliminate this uncertainty, we recommend that you configure your origin router to send these ICMP reply packets over the same tunnel they are received from, resulting in a symmetric routing pattern.

To accomplish this, we recommend that you:

1. Configure the IP address for your tunnel health check target to be one from within the prefix range `172.64.240.252/30`.
2. Apply a policy-based route that matches packets with source IP address equal to the configured tunnel health check target (for example  `172.64.240.253/32`), and route them over the tunnel back to Cloudflare.

## Change health check target

{{<render file="_change-health-check-target.md" withParameters="/magic-wan/get-started/configure-tunnels/#add-tunnels">}}

{{<render file="_icmp-mfirewall.md" productFolder="magic-transit">}}

## Update health check frequency

{{<render file="_update-tunnel-health-checks-frequency.md" productFolder="magic-transit" withParameters="/magic-wan/reference/probe-construction/;;/magic-wan/get-started/configure-tunnels/#add-tunnels" >}}

## Check for tunnel health in the dashboard

{{<render file="_tunnel-healthchecks-dash.md" withParameters="**Magic WAN** > **Tunnel health**" >}}