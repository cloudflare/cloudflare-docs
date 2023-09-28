---
pcx_content_type: concept
title: Private networks
weight: 5
layout: single
---

# Private networks

With Cloudflare Tunnel, you can connect private networks and the services running in those networks to Cloudflare's edge. There are two main differences between private network and [public hostname](/cloudflare-one/connections/connect-networks/routing-to-tunnel/) routes:

* Private network routes can expose both HTTP and non-HTTP resources.
* To connect to private network resources, end users must have the [WARP client](/cloudflare-one/connections/connect-devices/warp/) installed on their device or onboard traffic via a [Magic WAN on-ramp](/magic-wan/zero-trust/cloudflare-tunnel/).

Cloudflare Tunnel relies on a piece of software, `cloudflared`, to connect your private network to Cloudflare. Administrators define the IPs available in that environment and associate them with the tunnel. Users in your organization can then reach the service by installing the WARP client and [enrolling](/cloudflare-one/connections/connect-devices/warp/deployment/) into your organization's Cloudflare Zero Trust account. When users connect to an IP made available through Cloudflare Tunnel, WARP sends their connection through Cloudflare's network to the corresponding tunnel.
