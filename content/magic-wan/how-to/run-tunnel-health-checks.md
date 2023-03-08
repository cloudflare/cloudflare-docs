---
pcx_content_type: how-to
title: Run tunnel health checks
meta:
    title: Configure tunnel health checks
---

# Configure tunnel health checks

By default, to check for [tunnel](/magic-wan/reference/tunnels-and-encapsulation/) health Cloudflare will send [health checks](/magic-wan/reference/health-checks/) consisting of ICMP (Internet Control Message Protocol) reply packets. These reply packets originate from an IP address within the prefix range `172.64.240.252/30` and have another public Cloudflare IP their destination address.

Cloudflare encapsulates the ICMP reply packet and sends the probe across the tunnel to the origin. When the probe reaches the origin router, the router decapsulates the ICMP reply and forwards it to the specified destination IP. The probe is successful when Cloudflare receives the reply. 

{{<Aside type="warning" header="Important">}} You may need to apply a policy-based route on your device to route ICMP echo reply packets sourced from `172.64.240.252/30` back through your tunnels.{{</Aside>}}

For ICMP request-style health checks, you need to assign the target IP to a device in your network that can respond to the health check requests.

{{<render file="_update-tunnel-health-checks-frequency.md" productFolder="magic-transit" withParameters="/magic-wan/reference/health-checks/" >}}