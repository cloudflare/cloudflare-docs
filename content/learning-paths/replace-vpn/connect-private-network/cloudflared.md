---
title: Connect via cloudflared
pcx_content_type: overview
weight: 2
layout: learning-unit
---

Cloudflare Tunnel is an outbound-only daemon service that can run on nearly any host machine and proxies local traffic once validated from the Cloudflare network. User traffic initiated from the endpoint client onramps to Cloudflare, passes down your Cloudflare Tunnel connections, and terminates automatically in your local network. Traffic reaching your internal applications or services will carry the local source IP address of the host machine running the `cloudflared` daemon.

## Requirements

- Choose the right VM or hardware to Deploy the Cloudflared Connectors (cloudflared servers)
- Allow the Cloudflared Tunnel traffic (egress) in the On-Premise or Cloud Firewalls to enable the Cloudflared Connectors to speak with Cloudflare Network

## Create a tunnel

{{<render file="tunnel/_create-tunnel.md" productFolder="cloudflare-one">}}

8.

## Best practices

- [Enable notifications](/cloudflare-one/connections/connect-networks/monitor-tunnels/notifications/) in the Cloudflare dashboard to monitor tunnel Hhealth.
- [Monitor performance metrics](/cloudflare-one/connections/connect-networks/monitor-tunnels/metrics/) to identify potential bottlenecks.
- Segregate production and staging traffic among different Cloudflare tunnels.
- When possible, distribute access to critical services (for example, private DNS, Active Directory, and other critical systems) across different tunnels for blast-radius reduction in the event of a server-side outage.
- [Update `cloudflared`](/cloudflare-one/connections/connect-networks/downloads/update-cloudflared/) regularly.
