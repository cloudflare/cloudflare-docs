---
title: Connect with cloudflared
pcx_content_type: overview
weight: 2
layout: learning-unit
---

Cloudflare Tunnel is an outbound-only daemon service that can run on nearly any host machine and proxies local traffic once validated from the Cloudflare network. User traffic initiated from the endpoint client onramps to Cloudflare, passes down your Cloudflare Tunnel connections, and terminates automatically in your local network. Traffic reaching your internal applications or services will carry the local source IP address of the host machine running the `cloudflared` daemon.

## Before you start

- Choose the [right VM or hardware]() on which to install `cloudflared`.
- In your on-premise or cloud firewall, allow egress traffic to the [`cloudflared` ports and IPs](/cloudflare-one/connections/connect-networks/deploy-tunnels/tunnel-with-firewall/#required-for-tunnel-operation).

## Create a tunnel

To connect your private network:

{{<render file="tunnel/_create-tunnel.md" productFolder="cloudflare-one">}}

9. In the **Private Networks** tab, enter the CIDR of your private network (for example, `10.0.0.0/8`).

10. Select **Save tunnel**.

All internal applications and services in this IP range are now connected to Cloudflare.

## Best practices

- Segregate production and staging traffic among different Cloudflare tunnels.
- When possible, distribute access to critical services (for example, private DNS, Active Directory, and other critical systems) across different tunnels for blast-radius reduction in the event of a server-side outage.
- [Enable notifications](/cloudflare-one/connections/connect-networks/monitor-tunnels/notifications/) in the Cloudflare dashboard to monitor tunnel health.
- [Monitor performance metrics](/cloudflare-one/connections/connect-networks/monitor-tunnels/metrics/) to identify potential bottlenecks.
- [Update `cloudflared`](/cloudflare-one/connections/connect-networks/downloads/update-cloudflared/) regularly.
